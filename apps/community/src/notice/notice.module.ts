import { Module } from "@nestjs/common";
import { NoticeController } from "./notice.controller";
import { NoticeService } from "./notice.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
