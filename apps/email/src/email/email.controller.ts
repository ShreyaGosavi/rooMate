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
}
