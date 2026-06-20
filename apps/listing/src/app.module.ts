import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { KafkaModule } from "./kafka/kafka.module";
import { UploadModule } from "./upload/upload.module";
import { PropertyModule } from "./property/property.module";
import { SaveModule } from "./save/save.module";

@Module({
  imports: [
    PrismaModule,
    KafkaModule,
    UploadModule,
    PropertyModule,
    SaveModule,
  ],
})
export class AppModule {}
