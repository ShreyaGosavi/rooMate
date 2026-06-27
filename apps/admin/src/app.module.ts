import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { AuthModule } from "./auth/auth.module";
import { AdminHttpService } from "./admin.http.service";
import { PropertyController } from "./property/property.controller";
import { CommunityController } from "./community/community.controller";
import { StatsController } from "./stats/stats.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),HttpModule, AuthModule],
  controllers: [PropertyController, CommunityController, StatsController],
  providers: [AdminHttpService],
})
export class AppModule {}
