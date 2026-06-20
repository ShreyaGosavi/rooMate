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
}
