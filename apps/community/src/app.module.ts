import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { KafkaModule } from "./kafka/kafka.module";
import { CommunityModule } from "./community/community.module";
import { NoticeModule } from "./notice/notice.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    KafkaModule,
    CommunityModule,
    NoticeModule,
  ],
})
export class AppModule {}
