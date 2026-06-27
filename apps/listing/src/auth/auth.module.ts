import { Module } from "@nestjs/common";
import { GatewayGuard } from "./gateway.guard";

@Module({
  providers: [GatewayGuard],
  exports: [GatewayGuard],
})
export class AuthModule {}
