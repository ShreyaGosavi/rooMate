import { Controller, Get, UseGuards, Request } from "@nestjs/common";
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

@Controller("admin/stats")
@UseGuards(JwtAuthGuard, AdminGuard)
export class StatsController {
  private readonly listingUrl =
    process.env.LISTING_SERVICE_URL ?? "http://localhost:3003";
  private readonly communityUrl =
    process.env.COMMUNITY_SERVICE_URL ?? "http://localhost:3004";
  private readonly notificationUrl =
    process.env.NOTIFICATION_SERVICE_URL ?? "http://localhost:3008";

  constructor(private readonly http: AdminHttpService) {}

  @Get()
  async getStats(@Request() req: any) {
    const token = extractToken(req);

    const [listings, communities, adminNotifications] =
      await Promise.allSettled([
        this.http.get<unknown>(`${this.listingUrl}/api/listings`, token),
        this.http.get<unknown>(`${this.communityUrl}/api/communities`, token, {
          query: "",
        }),
        this.http.get<unknown>(
          `${this.notificationUrl}/api/notifications/admin`,
          token,
        ),
      ]);

    return {
      listings: listings.status === "fulfilled" ? listings.value : null,
      communities:
        communities.status === "fulfilled" ? communities.value : null,
      adminNotifications:
        adminNotifications.status === "fulfilled"
          ? adminNotifications.value
          : null,
    };
  }
}
