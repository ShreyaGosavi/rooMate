import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoticeDto } from "./notice.dto";
import { NoticeType } from "../prisma/generated";
import { Prisma } from "../prisma/generated";

@Injectable()
export class NoticeService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotices(communityId: string, type?: NoticeType) {
    return this.prisma.notice.findMany({
      where: {
        communityId,
        isActive: true,
        ...(type && { type }),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getNoticeById(communityId: string, noticeId: string) {
    const notice = await this.prisma.notice.findFirst({
      where: { id: noticeId, communityId, isActive: true },
    });
    if (!notice) throw new NotFoundException("Notice not found.");
    return notice;
  }

  async createNotice(
    communityId: string,
    userId: string,
    dto: CreateNoticeDto,
  ) {
    const membership = await this.prisma.communityMember.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
    if (!membership) {
      throw new ForbiddenException("You must join this community to post.");
    }

    return this.prisma.notice.create({
      data: {
        communityId,
        postedById: userId,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        metadata: (dto.metadata ?? {}) as Prisma.InputJsonValue,
      },
    });
  }

  async deleteNotice(communityId: string, noticeId: string, userId: string) {
    const notice = await this.prisma.notice.findFirst({
      where: { id: noticeId, communityId },
    });
    if (!notice) throw new NotFoundException("Notice not found.");
    if (notice.postedById !== userId) {
      throw new ForbiddenException("You can only delete your own notices.");
    }

    await this.prisma.notice.update({
      where: { id: noticeId },
      data: { isActive: false },
    });

    return { deleted: true };
  }
}
