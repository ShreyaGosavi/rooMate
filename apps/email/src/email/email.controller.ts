import { Controller, Post, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmailService } from './email.service';
import { UserCreatedEvent } from '@roomate/shared-types';

class SendVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

interface PropertyEvent {
  propertyId: string;
  ownerId: string;
  ownerEmail: string;
}

interface CommunityEvent {
  requestId: string;
  communityName: string;
  city?: string;
  requestedById: string;
  requestedByEmail?: string;
  ownerEmail?: string;
}

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-verification')
  async sendVerification(@Body() dto: SendVerificationDto) {
    await this.emailService.sendVerificationEmail(dto.email, dto.token);
    return { message: 'Verification email sent' };
  }

  @MessagePattern('user.created')
  async handleUserCreated(@Payload() data: UserCreatedEvent): Promise<void> {
    await this.emailService.sendWelcomeEmail(data);
  }

  @MessagePattern('property.created')
  async handlePropertyCreated(@Payload() data: PropertyEvent): Promise<void> {
    await this.emailService.sendPropertySubmittedEmail(data.ownerEmail);
  }

  @MessagePattern('property.approved')
  async handlePropertyApproved(@Payload() data: PropertyEvent): Promise<void> {
    await this.emailService.sendPropertyApprovedEmail(data.ownerEmail);
  }

  @MessagePattern('property.rejected')
  async handlePropertyRejected(@Payload() data: PropertyEvent): Promise<void> {
    await this.emailService.sendPropertyRejectedEmail(data.ownerEmail);
  }

  @MessagePattern('community.requested')
  async handleCommunityRequested(@Payload() data: CommunityEvent): Promise<void> {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@roomate.in';
    await Promise.all([
      this.emailService.sendCommunityRequestedEmail(
        adminEmail,
        data.communityName,
        data.city ?? '',
        data.requestedByEmail ?? '',
      ),
      this.emailService.sendCommunityRequestConfirmationEmail(
        data.requestedByEmail ?? '',
        data.communityName,
      ),
    ]);
  }

  @MessagePattern('community.approved')
  async handleCommunityApproved(@Payload() data: CommunityEvent): Promise<void> {
    if (data.ownerEmail) {
      await this.emailService.sendCommunityApprovedEmail(data.ownerEmail, data.communityName);
    }
  }

  @MessagePattern('community.rejected')
  async handleCommunityRejected(@Payload() data: CommunityEvent): Promise<void> {
    if (data.ownerEmail) {
      await this.emailService.sendCommunityRejectedEmail(data.ownerEmail, data.communityName);
    }
  }
}
