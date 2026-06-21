import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AdminGuard } from "./admin.guard";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "secret",
    }),
  ],
  providers: [JwtStrategy, AdminGuard],
  exports: [JwtStrategy, AdminGuard],
})
export class AuthModule {}
