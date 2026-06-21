import { NoticeType } from "../prisma/generated";

export class CreateNoticeDto {
  type: NoticeType;
  title: string;
  description: string;
  metadata?: Record<string, unknown>;
}
