import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { NoticeService } from "./notice.service";
import { GatewayGuard } from "../auth/gateway.guard";
import { CreateNoticeDto } from "./notice.dto";
import { NoticeType } from "../prisma/generated";

@Controller("communities/:id/notices")
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @UseGuards(GatewayGuard)
  getNotices(
    @Param("id") communityId: string,
    @Query("type") type?: NoticeType,
  ) {
    return this.noticeService.getNotices(communityId, type);
  }

  @Get(":noticeId")
  @UseGuards(GatewayGuard)
  getNoticeById(
    @Param("id") communityId: string,
    @Param("noticeId") noticeId: string,
  ) {
    return this.noticeService.getNoticeById(communityId, noticeId);
  }

  @Post()
  @UseGuards(GatewayGuard)
  createNotice(
    @Param("id") communityId: string,
    @Body() dto: CreateNoticeDto,
    @Request() req: any,
  ) {
    return this.noticeService.createNotice(communityId, req.user.id, dto);
  }

  @Delete(":noticeId")
  @UseGuards(GatewayGuard)
  deleteNotice(
    @Param("id") communityId: string,
    @Param("noticeId") noticeId: string,
    @Request() req: any,
  ) {
    return this.noticeService.deleteNotice(communityId, noticeId, req.user.id);
  }
}
