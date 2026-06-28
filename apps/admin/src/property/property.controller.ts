import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { GatewayGuard } from "../auth/gateway.guard";
import { AdminGuard } from "../auth/admin.guard";
import { AdminHttpService } from "../admin.http.service";

function extractToken(req: any): string {
  const auth = req.headers["authorization"];
  if (typeof auth === "string") return auth.replace("Bearer ", "");
  return "";
}

function extractUserHeaders(req: any): Record<string, string> {
  return {
    "x-user-id": req.user?.id ?? "",
    "x-user-email": req.user?.email ?? "",
    "x-user-is-admin": "true",
  };
}

@Controller("admin/properties")
@UseGuards(GatewayGuard, AdminGuard)
export class PropertyController {
  private readonly listingUrl =
    process.env.LISTING_SERVICE_URL ?? "http://localhost:3003";

  constructor(private readonly http: AdminHttpService) {}

  @Get()
  getAllProperties(@Request() req: any) {
    return this.http.get(
      `${this.listingUrl}/api/listings`,
      extractToken(req),
      undefined,
      extractUserHeaders(req),
    );
  }

  @Get("pending")
  getPendingProperties(@Request() req: any) {
    return this.http.get(
      `${this.listingUrl}/api/listings/admin/pending`,
      extractToken(req),
      undefined,
      extractUserHeaders(req),
    );
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
      extractUserHeaders(req),
    );
  }
}
