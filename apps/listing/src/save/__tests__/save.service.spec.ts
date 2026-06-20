import { Test, TestingModule } from "@nestjs/testing";
import { SaveService } from "../save.service";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundException, ConflictException } from "@nestjs/common";

const mockPrisma = {
  property: {
    findUnique: jest.fn(),
  },
  savedProperty: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  propertyStats: {
    update: jest.fn(),
  },
};

const mockProperty = {
  id: "prop-1",
  title: "Test PG",
  ownerId: "user-1",
};

describe("SaveService", () => {
  let service: SaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SaveService>(SaveService);
    jest.clearAllMocks();
  });

  describe("save", () => {
    it("should save a property and increment saveCount", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);
      mockPrisma.savedProperty.findUnique.mockResolvedValue(null);
      mockPrisma.savedProperty.create.mockResolvedValue({});
      mockPrisma.propertyStats.update.mockResolvedValue({});

      const result = await service.save("user-2", "prop-1");

      expect(result).toEqual({ saved: true });
      expect(mockPrisma.savedProperty.create).toHaveBeenCalledWith({
        data: { userId: "user-2", propertyId: "prop-1" },
      });
      expect(mockPrisma.propertyStats.update).toHaveBeenCalledWith({
        where: { propertyId: "prop-1" },
        data: { saveCount: { increment: 1 } },
      });
    });

    it("should throw NotFoundException if property does not exist", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(null);

      await expect(service.save("user-2", "bad-id")).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw ConflictException if already saved", async () => {
      mockPrisma.property.findUnique.mockResolvedValue(mockProperty);
      mockPrisma.savedProperty.findUnique.mockResolvedValue({ id: "saved-1" });

      await expect(service.save("user-2", "prop-1")).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe("unsave", () => {
    it("should unsave a property and decrement saveCount", async () => {
      mockPrisma.savedProperty.findUnique.mockResolvedValue({ id: "saved-1" });
      mockPrisma.savedProperty.delete.mockResolvedValue({});
      mockPrisma.propertyStats.update.mockResolvedValue({});

      const result = await service.unsave("user-2", "prop-1");

      expect(result).toEqual({ unsaved: true });
      expect(mockPrisma.propertyStats.update).toHaveBeenCalledWith({
        where: { propertyId: "prop-1" },
        data: { saveCount: { decrement: 1 } },
      });
    });

    it("should throw NotFoundException if not saved", async () => {
      mockPrisma.savedProperty.findUnique.mockResolvedValue(null);

      await expect(service.unsave("user-2", "prop-1")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("getSaved", () => {
    it("should return all saved properties for a user", async () => {
      const mockSaved = [
        {
          id: "saved-1",
          userId: "user-2",
          propertyId: "prop-1",
          savedAt: new Date(),
          Property: mockProperty,
        },
      ];
      mockPrisma.savedProperty.findMany.mockResolvedValue(mockSaved);

      const result = await service.getSaved("user-2");

      expect(result).toEqual(mockSaved);
      expect(mockPrisma.savedProperty.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId: "user-2" },
          orderBy: { savedAt: "desc" },
        }),
      );
    });

    it("should return empty array if no saved properties", async () => {
      mockPrisma.savedProperty.findMany.mockResolvedValue([]);

      const result = await service.getSaved("user-2");

      expect(result).toEqual([]);
    });
  });
});
