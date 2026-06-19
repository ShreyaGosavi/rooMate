import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { NotificationController } from './notification.controller';
import { NotificationConsumer } from './notification.consumer';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),
      }),
    }),
  ],
  controllers: [NotificationController, NotificationConsumer],
  providers: [NotificationService, NotificationRepository, JwtStrategy],
})
export class NotificationModule {}
