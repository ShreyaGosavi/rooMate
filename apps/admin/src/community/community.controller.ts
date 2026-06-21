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

@Controller("admin/communities")
@UseGuards(JwtAuthGuard, AdminGuard)
export class CommunityController {
  private readonly communityUrl =
    process.env.COMMUNITY_SERVICE_URL ?? "http://localhost:3004";

  constructor(private readonly http: AdminHttpService) {}

  @Get("requests")
  getCommunityRequests(@Request() req: any) {
    return this.http.get(
      `${this.communityUrl}/api/communities/my/requests`,
      extractToken(req),
    );
  }

  @Patch("requests/:id/status")
  updateRequestStatus(
    @Param("id") id: string,
    @Body() body: { status: string },
    @Request() req: any,
  ) {
    return this.http.patch(
      `${this.communityUrl}/api/communities/requests/${id}/status`,
      extractToken(req),
      body,
    );
  }
}
