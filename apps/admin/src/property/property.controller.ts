import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { AdminGuard } from "../auth/admin.guard";
import { AdminHttpService } from "../admin.http.service";

function extractToken(req: {
  headers: Record<string, string | string[] | undefined>;
}): string {
  const auth = req.headers["authorization"];
  if (typeof auth === "string") return auth.replace("Bearer ", "");
  return "";
}

@Controller("admin/properties")
@UseGuards(JwtAuthGuard, AdminGuard)
export class PropertyController {
  private readonly listingUrl =
    process.env.LISTING_SERVICE_URL ?? "http://localhost:3003";

  constructor(private readonly http: AdminHttpService) {}

  @Get()
  getAllProperties(@Request() req: any) {
    return this.http.get(`${this.listingUrl}/api/listings`, extractToken(req));
  }

  @Get("pending")
  getPendingProperties(@Request() req: any) {
    return this.http.get(`${this.listingUrl}/api/listings`, extractToken(req), {
      verificationStatus: "PENDING",
    });
  }

  @Patch(":id/verify")
  verifyProperty(
    @Param("id") id: string,
    @Body() body: { status: string; ownerEmail: string },
    @Request() req: any,
  ) {
    return this.http.patch(
      `${this.listingUrl}/api/listings/${id}/verify`,
      extractToken(req),
      body,
    );
  }
}
