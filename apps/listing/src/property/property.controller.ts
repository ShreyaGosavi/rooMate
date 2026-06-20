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
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { PropertyService } from "./property.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import {
  UpdatePropertyDto,
  FilterPropertiesDto,
  parseCreateDto,
} from "./property.dto";
import { PropertyVerificationStatus } from "../prisma/generated";

@Controller("listings")
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photos", maxCount: 10 },
      { name: "ownershipProof", maxCount: 1 },
    ]),
  )
  create(
    @Body() body: any,
    @Request() req: any,
    @UploadedFiles()
    files: {
      photos?: Express.Multer.File[];
      ownershipProof?: Express.Multer.File[];
    },
  ) {
    const dto = parseCreateDto(body);
    return this.propertyService.create(
      dto,
      req.user.id,
      req.user.email,
      files.photos ?? [],
      files.ownershipProof?.[0],
    );
  }

  @Get()
  findAll(@Query() filters: FilterPropertiesDto) {
    return this.propertyService.findAll(filters);
  }

  @Get("my")
  @UseGuards(JwtAuthGuard)
  findMyListings(@Request() req: any) {
    return this.propertyService.findMyListings(req.user.id);
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.propertyService.findById(id);
  }

  @Get(":id/similar")
  findSimilar(@Param("id") id: string) {
    return this.propertyService.findSimilar(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Request() req: any,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, req.user.id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string, @Request() req: any) {
    return this.propertyService.remove(id, req.user.id);
  }

  @Patch(":id/verify")
  @UseGuards(JwtAuthGuard)
  verify(
    @Param("id") id: string,
    @Body() body: { status: PropertyVerificationStatus; ownerEmail: string },
  ) {
    return this.propertyService.updateVerificationStatus(
      id,
      body.status,
      body.ownerEmail,
    );
  }
}
