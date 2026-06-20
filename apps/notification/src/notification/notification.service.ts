import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationType } from './schemas/notification.schema';
import { NotificationQueryDto } from './dto/notification-query.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async createWelcomeNotification(userId: string, name: string): Promise<void> {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.WELCOME,
      title: 'Welcome to RooMate!',
      message: `Hi ${name}, welcome to RooMate! Start exploring listings and find your perfect place.`,
      link: '/',
    });
  }

  async createPropertyCreatedNotification(userId: string, propertyId: string): Promise<void> {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.PROPERTY_CREATED,
      title: 'Listing received!',
      message: 'Your property has been submitted and is under review. We\'ll verify it within 24 hours.',
      link: `/listings/${propertyId}`,
    });
  }

  async createPropertyApprovedNotification(userId: string, propertyId: string): Promise<void> {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.PROPERTY_APPROVED,
      title: 'Your listing is live!',
      message: 'Your property has been verified and is now visible to potential tenants.',
      link: `/listings/${propertyId}`,
    });
  }

  async createPropertyRejectedNotification(userId: string, propertyId: string): Promise<void> {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.PROPERTY_REJECTED,
      title: 'Listing not approved',
      message: 'Your property listing could not be approved. Please review and resubmit.',
      link: `/listings/${propertyId}`,
    });
  }

  async getNotifications(userId: string, query: NotificationQueryDto) {
    const { page, limit, unreadOnly } = query;
    const { notifications, total } =
      await this.notificationRepository.findByUserId(userId, page, limit, unreadOnly);
    return {
      data: notifications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const count = await this.notificationRepository.countUnread(userId);
    return { count };
  }

  async markOneRead(id: string, userId: string) {
    const notification = await this.notificationRepository.markOneRead(id, userId);
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async markAllRead(userId: string): Promise<{ message: string }> {
    await this.notificationRepository.markAllRead(userId);
    return { message: 'All notifications marked as read' };
  }

  async deleteOne(id: string, userId: string): Promise<{ message: string }> {
    const notification = await this.notificationRepository.deleteOne(id, userId);
    if (!notification) throw new NotFoundException('Notification not found');
    return { message: 'Notification deleted' };
  }
}
