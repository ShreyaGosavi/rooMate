import { Test, TestingModule } from "@nestjs/testing";
import { NoticeService } from "../notice.service";
import { PrismaService } from "../../prisma/prisma.service";
import { NotFoundException, ForbiddenException } from "@nestjs/common";
import { NoticeType } from "../../prisma/generated";

const mockPrisma = {
  notice: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  communityMember: {
    findUnique: jest.fn(),
  },
};

const mockNotice = {
  id: "notice-1",
  communityId: "comm-1",
  postedById: "user-1",
  type: NoticeType.ROOMMATE_NEEDED,
  title: "Need a roommate",
  description: "Looking for a flatmate in Kothrud",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("NoticeService", () => {
  let service: NoticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoticeService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<NoticeService>(NoticeService);
    jest.clearAllMocks();
  });

  describe("getNotices", () => {
    it("should return notices for a community", async () => {
      mockPrisma.notice.findMany.mockResolvedValue([mockNotice]);
      const result = await service.getNotices("comm-1");
      expect(result).toHaveLength(1);
      expect(mockPrisma.notice.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ communityId: "comm-1" }),
        }),
      );
    });

    it("should filter by type when provided", async () => {
      mockPrisma.notice.findMany.mockResolvedValue([mockNotice]);
      await service.getNotices("comm-1", NoticeType.ROOMMATE_NEEDED);
      expect(mockPrisma.notice.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ type: NoticeType.ROOMMATE_NEEDED }),
        }),
      );
    });
  });

  describe("getNoticeById", () => {
    it("should return a notice by id", async () => {
      mockPrisma.notice.findFirst.mockResolvedValue(mockNotice);
      const result = await service.getNoticeById("comm-1", "notice-1");
      expect(result).toEqual(mockNotice);
    });

    it("should throw NotFoundException if notice not found", async () => {
      mockPrisma.notice.findFirst.mockResolvedValue(null);
      await expect(service.getNoticeById("comm-1", "bad-id")).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("createNotice", () => {
    it("should create a notice if user is a member", async () => {
      mockPrisma.communityMember.findUnique.mockResolvedValue({ id: "mem-1" });
      mockPrisma.notice.create.mockResolvedValue(mockNotice);

      const result = await service.createNotice("comm-1", "user-1", {
        type: NoticeType.ROOMMATE_NEEDED,
        title: "Need a roommate",
        description: "Looking for a flatmate in Kothrud",
      });

      expect(result).toEqual(mockNotice);
    });

    it("should throw ForbiddenException if user is not a member", async () => {
      mockPrisma.communityMember.findUnique.mockResolvedValue(null);
      await expect(
        service.createNotice("comm-1", "user-1", {
          type: NoticeType.ROOMMATE_NEEDED,
          title: "Need a roommate",
          description: "Looking for a flatmate",
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("deleteNotice", () => {
    it("should soft delete notice if user is owner", async () => {
      mockPrisma.notice.findFirst.mockResolvedValue(mockNotice);
      mockPrisma.notice.update.mockResolvedValue({
        ...mockNotice,
        isActive: false,
      });

      const result = await service.deleteNotice("comm-1", "notice-1", "user-1");
      expect(result).toEqual({ deleted: true });
    });

    it("should throw NotFoundException if notice not found", async () => {
      mockPrisma.notice.findFirst.mockResolvedValue(null);
      await expect(
        service.deleteNotice("comm-1", "bad-id", "user-1"),
      ).rejects.toThrow(NotFoundException);
    });

    it("should throw ForbiddenException if user is not the owner", async () => {
      mockPrisma.notice.findFirst.mockResolvedValue(mockNotice);
      await expect(
        service.deleteNotice("comm-1", "notice-1", "other-user"),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
