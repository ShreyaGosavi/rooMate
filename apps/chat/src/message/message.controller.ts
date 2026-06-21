import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("conversations/:id/messages")
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getMessages(
    @Param("id") conversationId: string,
    @Query("page") page = "1",
    @Query("limit") limit = "30",
    @Request() req: any,
  ) {
    return this.messageService.getMessages(
      conversationId,
      req.user.id,
      Number(page),
      Number(limit),
    );
  }

  @Patch("read")
  markAsRead(@Param("id") conversationId: string, @Request() req: any) {
    return this.messageService.markAsRead(conversationId, req.user.id);
  }
}
