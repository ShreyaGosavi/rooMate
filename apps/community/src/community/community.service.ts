import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "../prisma/prisma.service";
import { KafkaProducer } from "../kafka/kafka.producer";
import { RequestCommunityDto } from "./community.dto";
import { RequestStatus } from "../prisma/generated";

@Injectable()
export class CommunityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaProducer,
  ) {}

  async search(query: string) {
    const communities = await this.prisma.community.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { city: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        _count: { select: { members: true, notices: true } },
      },
    });

    const exactNameMatch = communities.some(
      (c) => c.name.toLowerCase() === query.toLowerCase(),
    );

    return { communities, showRequestButton: !exactNameMatch };
  }

  async requestCommunity(
    dto: RequestCommunityDto,
    userId: string,
    userEmail: string,
  ) {
    const existing = await this.prisma.community.findUnique({
      where: { name_city: { name: dto.communityName, city: dto.city } },
    });
    if (existing) {
      throw new ConflictException("Community already exists. You can join it!");
    }

    const existingRequest = await this.prisma.communityRequest.findUnique({
      where: {
        communityName_city: {
          communityName: dto.communityName,
          city: dto.city,
        },
      },
    });
    if (existingRequest) {
      throw new ConflictException(
        "A request for this community is already pending.",
      );
    }

    const request = await this.prisma.communityRequest.create({
      data: {
        requestedById: userId,
        communityName: dto.communityName,
        type: dto.type,
        city: dto.city,
        officialWebsite: dto.officialWebsite,
        email: dto.email,
        ctgId: dto.ctgId,
      },
    });

    await this.kafka.emit("community.requested", {
      requestId: request.id,
      communityName: dto.communityName,
      type: dto.type,
      city: dto.city,
      requestedById: userId,
      requestedByEmail: userEmail,
    });

    return { message: "Request submitted successfully.", request };
  }

  async join(communityId: string, userId: string) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
    });
    if (!community) throw new NotFoundException("Community not found.");

    const alreadyMember = await this.prisma.communityMember.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
    if (alreadyMember) throw new ConflictException("You are already a member.");

    const member = await this.prisma.communityMember.create({
      data: { userId, communityId },
    });

    return { message: "Joined successfully.", member };
  }

  async leave(communityId: string, userId: string) {
    const member = await this.prisma.communityMember.findUnique({
      where: { userId_communityId: { userId, communityId } },
    });
    if (!member) throw new NotFoundException("You are not a member.");

    await this.prisma.communityMember.delete({
      where: { userId_communityId: { userId, communityId } },
    });

    return { message: "Left community successfully." };
  }

  async getMyCommunities(userId: string) {
    return this.prisma.communityMember.findMany({
      where: { userId },
      include: {
        community: {
          include: { _count: { select: { members: true, notices: true } } },
        },
      },
      orderBy: { joinedAt: "desc" },
    });
  }

  async getMyRequests(userId: string) {
    return this.prisma.communityRequest.findMany({
      where: { requestedById: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateRequestStatus(requestId: string, status: RequestStatus) {
    const request = await this.prisma.communityRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) throw new NotFoundException("Request not found.");

    const updated = await this.prisma.communityRequest.update({
      where: { id: requestId },
      data: { status },
    });

    let requesterEmail = "";
    try {
      const authUrl = process.env.AUTH_SERVICE_URL ?? "http://localhost:3001";
      const res = await axios.get(
        `${authUrl}/api/auth/users/${request.requestedById}`,
      );
      requesterEmail = res.data?.email ?? "";
    } catch {
      /* email lookup failed, continue without it */
    }

    if (status === RequestStatus.APPROVED) {
      await this.prisma.community.create({
        data: {
          name: request.communityName,
          type: request.type,
          city: request.city,
          officialWebsite: request.officialWebsite,
          email: request.email,
          ctgId: request.ctgId,
        },
      });

      await this.kafka.emit("community.approved", {
        requestId,
        communityName: request.communityName,
        requestedById: request.requestedById,
        requesterEmail,
      });
    } else {
      await this.kafka.emit("community.rejected", {
        requestId,
        communityName: request.communityName,
        requestedById: request.requestedById,
        requesterEmail,
      });
    }

    return updated;
  }

  async findAllPendingRequests() {
    return this.prisma.communityRequest.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
  }
}
