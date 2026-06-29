import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ALLOWED_PROOF_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
];
const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_PROOF_SIZE = 10 * 1024 * 1024; // 10MB

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private readonly s3 = new S3Client({
    region: process.env.AWS_REGION ?? "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });
  private readonly bucket = process.env.AWS_S3_BUCKET ?? "";

  async uploadPhoto(
    file: Express.Multer.File,
    propertyId: string,
  ): Promise<string> {
    if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      );
    }
    if (file.size > MAX_PHOTO_SIZE) {
      throw new BadRequestException(`File too large. Max size: 10MB`);
    }

    const ext = file.originalname.split(".").pop();
    const key = `properties/${propertyId}/${uuidv4()}.${ext}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    const url = `https://${this.bucket}.s3.${process.env.AWS_REGION ?? "ap-south-1"}.amazonaws.com/${key}`;
    this.logger.log(`Photo uploaded → ${url}`);
    return url;
  }

  async uploadOwnershipProof(
    file: Express.Multer.File,
    propertyId: string,
  ): Promise<string> {
    if (!ALLOWED_PROOF_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: JPEG, PNG, PDF`,
      );
    }
    if (file.size > MAX_PROOF_SIZE) {
      throw new BadRequestException(`File too large. Max size: 10MB`);
    }

    const ext = file.originalname.split(".").pop();
    const key = `ownership-proof/${propertyId}/${uuidv4()}.${ext}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );
    this.logger.log(`Ownership proof uploaded → ${key}`);
    return key;
  }

  async getSignedProofUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }
}
