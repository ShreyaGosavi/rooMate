import { Test, TestingModule } from "@nestjs/testing";
import { PropertyService } from "../property.service";
import { PrismaService } from "../../prisma/prisma.service";
import { UploadService } from "../../upload/upload.service";
import { KafkaProducer } from "../../kafka/kafka.producer";
import { NotFoundException, ForbiddenException } from "@nestjs/common";
import {
  PropertyVerificationStatus,
  PropertyType,
  Gender,
  BHK,
} from "../../prisma/generated";

const mockPrisma = {
  property: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  propertyStats: {
    update: jest.fn(),
  },
  savedProperty: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  $queryRaw: jest.fn(),
};

const mockUpload = {
  uploadPhoto: jest.fn().mockResolvedValue("https://s3.example.com/photo.jpg"),
  uploadOwnershipProof: jest
    .fn()
    .mockResolvedValue("ownership-proof/123/proof.pdf"),
};

const mockKafka = {
  emit: jest.fn().mockResolvedValue(undefined),
};

const mockProperty = {
  id: "prop-1",
  title: "Test PG",
  propertyType: PropertyType.PG_HOSTEL,
  rent: 10000,
  deposit: 20000,
  maintenance: 500,
  sharing: 2,
  genderPreference: Gender.MALE,
  bhk: BHK.ONE_BHK,
  city: "Pune",
  locality: "Kothrud",
  district: "Pune",
  state: "Maharashtra",
  country: "India",
  postalCode: "411038",
  addressLine1: "123 Main St",
  latitude: 18.5074,
  longitude: 73.8077,
  ownerId: "user-1",
  ownerPhone: "9999999999",
  images: [],
  suitableFitFor: [],
  amenities: [],
  verificationStatus: PropertyVerificationStatus.VERIFIED,
  isAvailable: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("PropertyService", () => {
  let service: PropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: UploadService, useValue: mockUpload },
        { provide: KafkaProducer, useValue: mockKafka },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a property and emit kafka event", async () => {
      mockPrisma.property.create.mockResolvedValue(mockProperty);

      const dto = {
        title: "Test PG",
        propertyType: PropertyType.PG_HOSTEL,
        rent: 10000,
        deposit: 20000,
        maintenance: 500,
        sharing: 2,
        genderPreference: Gender.MALE,
        bhk: BHK.ONE_BHK,
        addressLine1: "123 Main St",
        locality: "Kothrud",
        city: "Pune",
        district: "Pune",
        state: "Maharashtra",
        country: "India",
        postalCode: "411038",
        latitude: 18.5074,
        longitude: 73.8077,
        ownerPhone: "9999999999",
        suitableFitFor: [],
        amenities: [],
      };

      const result = await service.create(dto, "user-1", "user@test.com", []);

      expect(result).toHaveProperty("propertyId");
      expect(mockPrisma.property.create).toHaveBeenCalledTimes(1);
      expect(mockKafka.emit).toHaveBeenCalledWith(
        "property.created",
        expect.objectContaining({
          ownerId: "user-1",
          ownerEmail: "user@test.com",
        }),
      );
    });
  });

  describe("findById", () => {
    it("should return property and increment viewCount", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);
      mockPrisma.propertyStats.update.mockResolvedValue({});

      const result = await service.findById("prop-1");

      expect(result).toEqual(mockProperty);
      expect(mockPrisma.propertyStats.update).toHaveBeenCalledWith({
        where: { propertyId: "prop-1" },
        data: { viewCount: { increment: 1 } },
      });
    });

    it("should throw NotFoundException if property not found", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(null);

      await expect(service.findById("bad-id")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("findSimilar", () => {
    it("should return similar properties within ±30% rent range", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);
      mockPrisma.property.findMany.mockResolvedValue([]);

      await service.findSimilar("prop-1");

      expect(mockPrisma.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            city: "Pune",
            propertyType: PropertyType.PG_HOSTEL,
            rent: { gte: 7000, lte: 13000 },
          }),
        }),
      );
    });
  });

  describe("update", () => {
    it("should update property if user is owner", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);
      mockPrisma.property.update.mockResolvedValue({
        ...mockProperty,
        rent: 12000,
      });

      const result = await service.update("prop-1", "user-1", { rent: 12000 });

      expect(result.rent).toBe(12000);
    });

    it("should throw ForbiddenException if user is not owner", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);

      await expect(
        service.update("prop-1", "other-user", { rent: 12000 }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("remove", () => {
    it("should delete property if user is owner", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);
      mockPrisma.property.delete.mockResolvedValue({});

      const result = await service.remove("prop-1", "user-1");

      expect(result).toEqual({ deleted: true });
    });

    it("should throw ForbiddenException if user is not owner", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);

      await expect(service.remove("prop-1", "other-user")).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe("updateVerificationStatus", () => {
    it("should approve property and emit property.approved", async () => {
      mockPrisma.property.update.mockResolvedValue({
        ...mockProperty,
        ownerId: "user-1",
      });

      await service.updateVerificationStatus(
        "prop-1",
        PropertyVerificationStatus.VERIFIED,
        "user@test.com",
      );

      expect(mockKafka.emit).toHaveBeenCalledWith(
        "property.approved",
        expect.objectContaining({
          propertyId: "prop-1",
        }),
      );
    });

    it("should reject property and emit property.rejected", async () => {
      mockPrisma.property.update.mockResolvedValue({
        ...mockProperty,
        ownerId: "user-1",
      });

      await service.updateVerificationStatus(
        "prop-1",
        PropertyVerificationStatus.REJECTED,
        "user@test.com",
      );

      expect(mockKafka.emit).toHaveBeenCalledWith(
        "property.rejected",
        expect.objectContaining({
          propertyId: "prop-1",
        }),
      );
    });
  });

  describe("findAll", () => {
    it("should return paginated listings without geo filter", async () => {
      mockPrisma.property.findMany.mockResolvedValue([mockProperty]);
      mockPrisma.property.count.mockResolvedValue(1);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.results).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it("should use $queryRaw when lat and lng are provided", async () => {
      mockPrisma.$queryRaw.mockResolvedValue([mockProperty]);

      const result = await service.findAll({
        lat: 18.5074,
        lng: 73.8077,
        radius: 5,
      });

      expect(mockPrisma.$queryRaw).toHaveBeenCalled();
      expect(result.results).toHaveLength(1);
    });
  });

  describe("findMyListings", () => {
    it("should return all listings for an owner", async () => {
      mockPrisma.property.findMany.mockResolvedValue([mockProperty]);

      const result = await service.findMyListings("user-1");

      expect(result).toHaveLength(1);
      expect(mockPrisma.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { ownerId: "user-1" },
        }),
      );
    });
  });

  describe("remove", () => {
    it("should throw NotFoundException if property does not exist", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(null);

      await expect(service.remove("bad-id", "user-1")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("update", () => {
    it("should throw NotFoundException if property does not exist", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(null);

      await expect(
        service.update("bad-id", "user-1", { rent: 12000 }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
