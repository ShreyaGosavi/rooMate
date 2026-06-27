import { GatewayGuard } from "../auth/gateway.guard";
import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';
import { NotificationService } from './notification.service';
import { NotificationQueryDto } from './dto/notification-query.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(GatewayGuard)
  async getNotifications(
    @Req() req: Request,
    @Query() query: NotificationQueryDto,
  ) {
    const user = req.user as { id: string };
    return this.notificationService.getNotifications(user.id, query);
  }

  @Get('unread-count')
  @UseGuards(GatewayGuard)
  async getUnreadCount(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.notificationService.getUnreadCount(user.id);
  }

  @Patch('mark-all-read')
  @UseGuards(GatewayGuard)
  @HttpCode(HttpStatus.OK)
  async markAllRead(@Req() req: Request) {
    const user = req.user as { id: string };
    return this.notificationService.markAllRead(user.id);
  }

  @Patch(':id/read')
  @UseGuards(GatewayGuard)
  @HttpCode(HttpStatus.OK)
  async markOneRead(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: string };
    return this.notificationService.markOneRead(id, user.id);
  }

  @Delete(':id')
  @UseGuards(GatewayGuard)
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as { id: string };
    return this.notificationService.deleteOne(id, user.id);
  }
}
