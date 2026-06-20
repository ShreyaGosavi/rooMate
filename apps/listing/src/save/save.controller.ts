import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { SaveService } from "./save.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller("listings")
@UseGuards(JwtAuthGuard)
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post(":id/save")
  save(@Param("id") id: string, @Request() req: any) {
    return this.saveService.save(req.user.id, id);
  }

  @Delete(":id/save")
  unsave(@Param("id") id: string, @Request() req: any) {
    return this.saveService.unsave(req.user.id, id);
  }

  @Get("saved")
  getSaved(@Request() req: any) {
    return this.saveService.getSaved(req.user.id);
  }
}
