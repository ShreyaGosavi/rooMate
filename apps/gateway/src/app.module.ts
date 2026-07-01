import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './proxy/proxy.module';

import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProxyModule],
})
export class AppModule {}
