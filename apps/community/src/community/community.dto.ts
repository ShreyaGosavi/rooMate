import { CommunityType } from "../prisma/generated";

export class RequestCommunityDto {
  communityName: string;
  type: CommunityType;
  city: string;
  officialWebsite?: string;
  email?: string;
  ctgId?: string;
}

export class UpdateRequestStatusDto {
  status: "APPROVED" | "REJECTED";
}
