import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { CommunityService } from "./community.service";
import { GatewayGuard } from "../auth/gateway.guard";
import { RequestCommunityDto, UpdateRequestStatusDto } from "./community.dto";

@Controller("communities")
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  search(@Query("query") query: string) {
    return this.communityService.search(query ?? "");
  }

  @Post("request")
  @UseGuards(GatewayGuard)
  requestCommunity(@Body() dto: RequestCommunityDto, @Request() req: any) {
    return this.communityService.requestCommunity(
      dto,
      req.user.id,
      req.user.email,
    );
  }

  @Get("my")
  @UseGuards(GatewayGuard)
  getMyCommunities(@Request() req: any) {
    return this.communityService.getMyCommunities(req.user.id);
  }

  @Get("my/requests")
  @UseGuards(GatewayGuard)
  getMyRequests(@Request() req: any) {
    return this.communityService.getMyRequests(req.user.id);
  }

  @Post(":id/join")
  @UseGuards(GatewayGuard)
  join(@Param("id") id: string, @Request() req: any) {
    return this.communityService.join(id, req.user.id);
  }

  @Delete(":id/leave")
  @UseGuards(GatewayGuard)
  leave(@Param("id") id: string, @Request() req: any) {
    return this.communityService.leave(id, req.user.id);
  }

  @Patch("requests/:requestId/status")
  @UseGuards(GatewayGuard)
  updateStatus(
    @Param("requestId") requestId: string,
    @Body() dto: UpdateRequestStatusDto,
  ) {
    return this.communityService.updateRequestStatus(requestId, dto.status);
  }
}
