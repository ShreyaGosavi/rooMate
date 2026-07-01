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
  async handleCommunityRequested(
    @Payload() data: { requestedByEmail: string; communityName: string },
  ): Promise<void> {
    if (data.requestedByEmail) {
      await this.emailService.sendCommunitySubmittedEmail(
        data.requestedByEmail,
        data.communityName,
      );
    }
  }

  @MessagePattern('community.approved')
  async handleCommunityApproved(
    @Payload()
    data: {
      requestedById: string;
      communityName: string;
      requesterEmail?: string;
    },
  ): Promise<void> {
    if (data.requesterEmail) {
      await this.emailService.sendCommunityApprovedEmail(
        data.requesterEmail,
        data.communityName,
      );
    }
  }

  @MessagePattern('community.rejected')
  async handleCommunityRejected(
    @Payload()
    data: {
      requestedById: string;
      communityName: string;
      requesterEmail?: string;
    },
  ): Promise<void> {
    if (data.requesterEmail) {
      await this.emailService.sendCommunityRejectedEmail(
        data.requesterEmail,
        data.communityName,
      );
    }
  }


  @Post('send-password-reset')
  async handlePasswordResetHttp(@Body() data: { email: string; token: string }): Promise<void> {
    await this.emailService.sendPasswordResetEmail(data.email, data.token);
  }

}
