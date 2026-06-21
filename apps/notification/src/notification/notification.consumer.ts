import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import type { UserCreatedEvent } from '@roomate/shared-types';

interface PropertyEvent {
  propertyId: string;
  ownerId: string;
  ownerEmail: string;
}

interface CommunityEvent {
  requestId: string;
  communityName: string;
  requestedById: string;
}

@Controller()
export class NotificationConsumer {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('user.created')
  async handleUserCreated(@Payload() data: UserCreatedEvent): Promise<void> {
    await this.notificationService.createWelcomeNotification(data.userId, data.name);
  }

  @MessagePattern('property.created')
  async handlePropertyCreated(@Payload() data: PropertyEvent): Promise<void> {
    await this.notificationService.createPropertyCreatedNotification(data.ownerId, data.propertyId);
  }

  @MessagePattern('property.approved')
  async handlePropertyApproved(@Payload() data: PropertyEvent): Promise<void> {
    await this.notificationService.createPropertyApprovedNotification(data.ownerId, data.propertyId);
  }

  @MessagePattern('property.rejected')
  async handlePropertyRejected(@Payload() data: PropertyEvent): Promise<void> {
    await this.notificationService.createPropertyRejectedNotification(data.ownerId, data.propertyId);
  }

  @MessagePattern('community.requested')
  async handleCommunityRequested(@Payload() data: CommunityEvent): Promise<void> {
    await this.notificationService.createCommunityRequestedNotification(
      data.requestedById,
      data.communityName,
    );
  }

  @MessagePattern('community.approved')
  async handleCommunityApproved(@Payload() data: CommunityEvent): Promise<void> {
    await this.notificationService.createCommunityApprovedNotification(
      data.requestedById,
      data.communityName,
    );
  }

  @MessagePattern('community.rejected')
  async handleCommunityRejected(@Payload() data: CommunityEvent): Promise<void> {
    await this.notificationService.createCommunityRejectedNotification(
      data.requestedById,
      data.communityName,
    );
  }
}
