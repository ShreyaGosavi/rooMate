import { IsEnum, IsString, IsOptional, IsObject, MinLength } from "class-validator";
import { NoticeType } from "../prisma/generated";

export class CreateNoticeDto {
  @IsEnum(NoticeType)
  type: NoticeType;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
