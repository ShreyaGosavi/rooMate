import { Test, TestingModule } from "@nestjs/testing";
import { CommunityService } from "../community.service";
import { PrismaService } from "../../prisma/prisma.service";
import { KafkaProducer } from "../../kafka/kafka.producer";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { CommunityType, RequestStatus } from "../../prisma/generated";

const mockPrisma = {
  community: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  communityMember: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
  communityRequest: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

const mockKafka = { emit: jest.fn().mockResolvedValue(undefined) };

const mockCommunity = {
  id: "comm-1",
  name: "COEP",
  type: CommunityType.COLLEGE,
  city: "Pune",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRequest = {
  id: "req-1",
  requestedById: "user-1",
  communityName: "COEP",
  type: CommunityType.COLLEGE,
  city: "Pune",
  status: RequestStatus.PENDING,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("CommunityService", () => {
  let service: CommunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: KafkaProducer, useValue: mockKafka },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    jest.clearAllMocks();
  });

  describe("search", () => {
    it("should return communities and showRequestButton false when exact match exists", async () => {
      mockPrisma.community.findMany.mockResolvedValue([mockCommunity]);
      const result = await service.search("COEP");
      expect(result.communities).toHaveLength(1);
      expect(result.showRequestButton).toBe(false);
    });

    it("should return showRequestButton true when no exact match", async () => {
      mockPrisma.community.findMany.mockResolvedValue([]);
      const result = await service.search("XYZ");
      expect(result.showRequestButton).toBe(true);
    });
  });

  describe("requestCommunity", () => {
    it("should create a request and emit kafka event", async () => {
      mockPrisma.community.findUnique.mockResolvedValue(null);
      mockPrisma.communityRequest.findUnique.mockResolvedValue(null);
      mockPrisma.communityRequest.create.mockResolvedValue(mockRequest);

      const result = await service.requestCommunity(
        { communityName: "COEP", type: CommunityType.COLLEGE, city: "Pune" },
        "user-1",
        "user@test.com",
      );

      expect(result.message).toBe("Request submitted successfully.");
      expect(mockKafka.emit).toHaveBeenCalledWith(
        "community.requested",
        expect.objectContaining({
          communityName: "COEP",
        }),
      );
    });

    it("should throw ConflictException if community already exists", async () => {
      mockPrisma.community.findUnique.mockResolvedValue(mockCommunity);
      await expect(
        service.requestCommunity(
          { communityName: "COEP", type: CommunityType.COLLEGE, city: "Pune" },
          "user-1",
          "user@test.com",
        ),
      ).rejects.toThrow(ConflictException);
    });

    it("should throw ConflictException if request already pending", async () => {
      mockPrisma.community.findUnique.mockResolvedValue(null);
      mockPrisma.communityRequest.findUnique.mockResolvedValue(mockRequest);
      await expect(
        service.requestCommunity(
          { communityName: "COEP", type: CommunityType.COLLEGE, city: "Pune" },
          "user-1",
          "user@test.com",
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe("join", () => {
    it("should join a community successfully", async () => {
      mockPrisma.community.findUnique.mockResolvedValue(mockCommunity);
      mockPrisma.communityMember.findUnique.mockResolvedValue(null);
      mockPrisma.communityMember.create.mockResolvedValue({ id: "mem-1" });

      const result = await service.join("comm-1", "user-1");
      expect(result.message).toBe("Joined successfully.");
    });

    it("should throw NotFoundException if community not found", async () => {
      mockPrisma.community.findUnique.mockResolvedValue(null);
      await expect(service.join("bad-id", "user-1")).rejects.toThrow(
        NotFoundException,
      );
    });

    it("should throw ConflictException if already a member", async () => {
      mockPrisma.community.findUnique.mockResolvedValue(mockCommunity);
      mockPrisma.communityMember.findUnique.mockResolvedValue({ id: "mem-1" });
      await expect(service.join("comm-1", "user-1")).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe("leave", () => {
    it("should leave a community successfully", async () => {
      mockPrisma.communityMember.findUnique.mockResolvedValue({ id: "mem-1" });
      mockPrisma.communityMember.delete.mockResolvedValue({});

      const result = await service.leave("comm-1", "user-1");
      expect(result.message).toBe("Left community successfully.");
    });

    it("should throw NotFoundException if not a member", async () => {
      mockPrisma.communityMember.findUnique.mockResolvedValue(null);
      await expect(service.leave("comm-1", "user-1")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("updateRequestStatus", () => {
    it("should approve request, create community and emit kafka event", async () => {
      mockPrisma.communityRequest.findUnique.mockResolvedValue(mockRequest);
      mockPrisma.communityRequest.update.mockResolvedValue({
        ...mockRequest,
        status: RequestStatus.APPROVED,
      });
      mockPrisma.community.create.mockResolvedValue(mockCommunity);

      await service.updateRequestStatus("req-1", RequestStatus.APPROVED);

      expect(mockPrisma.community.create).toHaveBeenCalled();
      expect(mockKafka.emit).toHaveBeenCalledWith(
        "community.approved",
        expect.objectContaining({
          requestId: "req-1",
        }),
      );
    });

    it("should reject request and emit kafka event", async () => {
      mockPrisma.communityRequest.findUnique.mockResolvedValue(mockRequest);
      mockPrisma.communityRequest.update.mockResolvedValue({
        ...mockRequest,
        status: RequestStatus.REJECTED,
      });

      await service.updateRequestStatus("req-1", RequestStatus.REJECTED);

      expect(mockPrisma.community.create).not.toHaveBeenCalled();
      expect(mockKafka.emit).toHaveBeenCalledWith(
        "community.rejected",
        expect.objectContaining({
          requestId: "req-1",
        }),
      );
    });

    it("should throw NotFoundException if request not found", async () => {
      mockPrisma.communityRequest.findUnique.mockResolvedValue(null);
      await expect(
        service.updateRequestStatus("bad-id", RequestStatus.APPROVED),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
