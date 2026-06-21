import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("conversations")
@UseGuards(JwtAuthGuard)
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  getOrCreate(@Body("otherUserId") otherUserId: string, @Request() req: any) {
    return this.conversationService.getOrCreate(req.user.id, otherUserId);
  }

  @Get()
  getMyConversations(@Request() req: any) {
    return this.conversationService.getMyConversations(req.user.id);
  }

  @Delete(":id")
  deleteConversation(@Param("id") id: string, @Request() req: any) {
    return this.conversationService.deleteConversation(id, req.user.id);
  }
}
