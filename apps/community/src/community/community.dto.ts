import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
  IsUrl,
} from "class-validator";
import { CommunityType } from "../prisma/generated";

export class RequestCommunityDto {
  @IsString()
  @IsNotEmpty()
  communityName: string;

  @IsEnum(CommunityType)
  type: CommunityType;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsUrl()
  officialWebsite?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  ctgId?: string;
}

export class UpdateRequestStatusDto {
  @IsEnum(["APPROVED", "REJECTED"])
  status: "APPROVED" | "REJECTED";
}
