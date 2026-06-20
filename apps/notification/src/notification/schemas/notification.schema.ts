import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
  WELCOME = 'WELCOME',
  PROPERTY_CREATED = 'PROPERTY_CREATED',
  PROPERTY_APPROVED = 'PROPERTY_APPROVED',
  PROPERTY_REJECTED = 'PROPERTY_REJECTED',
  COMMUNITY_REQUESTED = 'COMMUNITY_REQUESTED',
  COMMUNITY_APPROVED = 'COMMUNITY_APPROVED',
  NEW_POST = 'NEW_POST',
}

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Notification {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Object, default: {} })
  payload: Record<string, unknown>;

  @Prop({ default: '' })
  link: string;

  @Prop({ default: false, index: true })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
