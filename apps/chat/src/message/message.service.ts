import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./message.schema";
import {
  Conversation,
  ConversationDocument,
} from "../conversation/conversation.schema";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<ConversationDocument>,
  ) {}

  async getMessages(
    conversationId: string,
    userId: string,
    page = 1,
    limit = 30,
  ): Promise<{ messages: MessageDocument[]; total: number }> {
    const conversation = await this.conversationModel.findById(conversationId);
    if (!conversation) throw new NotFoundException("Conversation not found.");

    const isParticipant =
      conversation.participant1Id === userId ||
      conversation.participant2Id === userId;
    if (!isParticipant) throw new ForbiddenException("Not your conversation.");

    const [messages, total] = await Promise.all([
      this.messageModel
        .find({ conversationId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.messageModel.countDocuments({ conversationId }),
    ]);

    return { messages: messages.reverse(), total };
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    await this.messageModel.updateMany(
      { conversationId, senderId: { $ne: userId }, read: false },
      { read: true },
    );
  }

  async createMessage(
    conversationId: string,
    senderId: string,
    text: string,
  ): Promise<MessageDocument> {
    return this.messageModel.create({ conversationId, senderId, text });
  }
}
