import { Module } from "@nestjs/common";
import { SaveController } from "./save.controller";
import { SaveService } from "./save.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
