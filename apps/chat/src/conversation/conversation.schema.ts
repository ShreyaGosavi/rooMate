import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true, index: true })
  participant1Id: string;

  @Prop({ required: true, index: true })
  participant2Id: string;

  @Prop({ type: String, default: null })
  lastMessage: string | null;

  @Prop({ type: Date, default: null })
  lastMessageAt: Date | null;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
ConversationSchema.index({ participant1Id: 1, participant2Id: 1 }, { unique: true });
