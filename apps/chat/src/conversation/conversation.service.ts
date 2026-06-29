import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Conversation, ConversationDocument } from "./conversation.schema";
import { Message, MessageDocument } from "../message/message.schema";

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async getOrCreate(
    userId: string,
    otherUserId: string,
  ): Promise<ConversationDocument> {
    const p1 = userId < otherUserId ? userId : otherUserId;
    const p2 = userId < otherUserId ? otherUserId : userId;
    const existing = await this.conversationModel.findOne({
      participant1Id: p1,
      participant2Id: p2,
    });
    if (existing) return existing;
    return this.conversationModel.create({
      participant1Id: p1,
      participant2Id: p2,
    });
  }

  async getMyConversations(userId: string): Promise<ConversationDocument[]> {
    return this.conversationModel
      .find({ $or: [{ participant1Id: userId }, { participant2Id: userId }] })
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .exec();
  }

  async getUnreadCount(userId: string): Promise<number> {
    const convs = await this.conversationModel
      .find({ $or: [{ participant1Id: userId }, { participant2Id: userId }] })
      .select("_id")
      .exec();
    const convIds = convs.map((c) => c._id);
    return this.messageModel.countDocuments({
      conversationId: { $in: convIds },
      senderId: { $ne: userId },
      read: false,
    });
  }

  async deleteConversation(
    conversationId: string,
    userId: string,
  ): Promise<{ deleted: boolean }> {
    const conversation = await this.conversationModel.findById(conversationId);
    if (!conversation) throw new NotFoundException("Conversation not found.");
    const isParticipant =
      conversation.participant1Id === userId ||
      conversation.participant2Id === userId;
    if (!isParticipant) throw new ForbiddenException("Not your conversation.");
    await this.messageModel.deleteMany({ conversationId });
    await this.conversationModel.findByIdAndDelete(conversationId);
    return { deleted: true };
  }

  async updateLastMessage(conversationId: string, text: string): Promise<void> {
    await this.conversationModel.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      lastMessageAt: new Date(),
    });
  }
}
