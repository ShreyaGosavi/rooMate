import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
  NotificationType,
} from './schemas/notification.schema';

interface CreateNotificationDto {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  payload?: Record<string, unknown>;
  link?: string;
}

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async create(dto: CreateNotificationDto): Promise<NotificationDocument> {
    return this.notificationModel.create(dto);
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
    unreadOnly: boolean,
  ): Promise<{ notifications: NotificationDocument[]; total: number }> {
    const filter: { userId: string; read?: boolean } = { userId };
    if (unreadOnly) filter.read = false;

    const [notifications, total] = await Promise.all([
      this.notificationModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.notificationModel.countDocuments(filter),
    ]);

    return { notifications, total };
  }

  async countUnread(userId: string): Promise<number> {
    return this.notificationModel.countDocuments({ userId, read: false });
  }

  async markOneRead(
    id: string,
    userId: string,
  ): Promise<NotificationDocument | null> {
    return this.notificationModel.findOneAndUpdate(
      { _id: id, userId },
      { read: true },
      { new: true },
    );
  }

  async markAllRead(userId: string): Promise<void> {
    await this.notificationModel.updateMany(
      { userId, read: false },
      { read: true },
    );
  }

  async deleteOne(
    id: string,
    userId: string,
  ): Promise<NotificationDocument | null> {
    return this.notificationModel.findOneAndDelete({ _id: id, userId });
  }
}
