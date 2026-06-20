import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UploadService } from "../upload/upload.service";
import { KafkaProducer } from "../kafka/kafka.producer";
import {
  CreatePropertyDto,
  UpdatePropertyDto,
  FilterPropertiesDto,
} from "./property.dto";
import { v4 as uuidv4 } from "uuid";
import { Prisma, PropertyVerificationStatus } from "../prisma/generated";

@Injectable()
export class PropertyService {
  private readonly logger = new Logger(PropertyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly upload: UploadService,
    private readonly kafka: KafkaProducer,
  ) {}

  async create(
    dto: CreatePropertyDto,
    ownerId: string,
    ownerEmail: string,
    photos: Express.Multer.File[],
    proofFile?: Express.Multer.File,
  ) {
    const propertyId = uuidv4();

    const imageUrls = await Promise.all(
      photos.map((f) => this.upload.uploadPhoto(f, propertyId)),
    );

    let ownershipProofKey: string | undefined;
    if (proofFile) {
      ownershipProofKey = await this.upload.uploadOwnershipProof(
        proofFile,
        propertyId,
      );
    }

    const property = await this.prisma.property.create({
      data: {
        id: propertyId,
        title: dto.title,
        description: dto.description,
        propertyType: dto.propertyType,
        rent: dto.rent,
        deposit: dto.deposit,
        maintenance: dto.maintenance,
        sharing: dto.sharing,
        genderPreference: dto.genderPreference,
        bhk: dto.bhk,
        suitableFitFor: dto.suitableFitFor,
        addressLine1: dto.addressLine1,
        addressLine2: dto.addressLine2,
        locality: dto.locality,
        city: dto.city,
        district: dto.district,
        state: dto.state,
        country: dto.country,
        postalCode: dto.postalCode,
        latitude: dto.latitude,
        longitude: dto.longitude,
        formattedAddress: dto.formattedAddress,
        placeId: dto.placeId,
        ownerPhone: dto.ownerPhone,
        visitingHrs: dto.visitingHrs,
        amenities: { set: dto.amenities },
        rules: (dto.rules ?? {}) as Prisma.InputJsonValue,
        ownerId,
        images: { set: imageUrls },
        ownershipProof: ownershipProofKey,
        PropertyStats: {
          create: { viewCount: 0, saveCount: 0 },
        },
      },
    });

    await this.kafka.emit("property.created", {
      propertyId: property.id,
      ownerId,
      ownerEmail,
    });

    this.logger.log(`Property created → ${property.id}`);
    return { propertyId: property.id };
  }

  async findAll(filters: FilterPropertiesDto) {
    const {
      lat,
      lng,
      radius = 5,
      minRent,
      maxRent,
      gender,
      propertyType,
      bhk,
      page = 1,
      limit = 10,
    } = filters;

    const offset = (page - 1) * limit;

    if (lat && lng) {
      const results = await this.prisma.$queryRaw<any[]>`
        SELECT p.*,
          (6371 * acos(
            cos(radians(${lat})) * cos(radians(CAST(p.latitude AS FLOAT))) *
            cos(radians(CAST(p.longitude AS FLOAT)) - radians(${lng})) +
            sin(radians(${lat})) * sin(radians(CAST(p.latitude AS FLOAT)))
          )) AS distance
        FROM "Property" p
        WHERE p."verificationStatus" = 'VERIFIED'
          AND p."isAvailable" = true
        HAVING (6371 * acos(
            cos(radians(${lat})) * cos(radians(CAST(p.latitude AS FLOAT))) *
            cos(radians(CAST(p.longitude AS FLOAT)) - radians(${lng})) +
            sin(radians(${lat})) * sin(radians(CAST(p.latitude AS FLOAT)))
          )) <= ${radius}
        ORDER BY distance ASC
        LIMIT ${limit} OFFSET ${offset}
      `;
      return { results, page, limit };
    }

    const where: any = {
      verificationStatus: PropertyVerificationStatus.VERIFIED,
      isAvailable: true,
      ...(minRent && maxRent && { rent: { gte: minRent, lte: maxRent } }),
      ...(minRent && !maxRent && { rent: { gte: minRent } }),
      ...(maxRent && !minRent && { rent: { lte: maxRent } }),
      ...(gender && { genderPreference: gender }),
      ...(propertyType && { propertyType }),
      ...(bhk && { bhk }),
    };

    const [results, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { PropertyStats: true },
      }),
      this.prisma.property.count({ where }),
    ]);

    return { results, total, page, limit };
  }

  async findById(propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      include: { PropertyStats: true },
    });

    if (!property) throw new NotFoundException("Property not found");

    await this.prisma.propertyStats.update({
      where: { propertyId },
      data: { viewCount: { increment: 1 } },
    });

    return property;
  }

  async findSimilar(propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException("Property not found");

    const minRent = Math.floor(property.rent * 0.7);
    const maxRent = Math.ceil(property.rent * 1.3);

    return this.prisma.property.findMany({
      where: {
        id: { not: propertyId },
        city: property.city,
        propertyType: property.propertyType,
        rent: { gte: minRent, lte: maxRent },
        verificationStatus: PropertyVerificationStatus.VERIFIED,
        isAvailable: true,
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  }

  async update(propertyId: string, userId: string, dto: UpdatePropertyDto) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException("Property not found");
    if (property.ownerId !== userId)
      throw new ForbiddenException("Not your property");

    const data: Prisma.PropertyUpdateInput = {
      ...(dto.title && { title: dto.title }),
      ...(dto.description && { description: dto.description }),
      ...(dto.rent && { rent: dto.rent }),
      ...(dto.deposit && { deposit: dto.deposit }),
      ...(dto.maintenance && { maintenance: dto.maintenance }),
      ...(dto.sharing && { sharing: dto.sharing }),
      ...(dto.isAvailable !== undefined && { isAvailable: dto.isAvailable }),
      ...(dto.visitingHrs && { visitingHrs: dto.visitingHrs }),
      ...(dto.amenities && { amenities: { set: dto.amenities } }),
      ...(dto.rules && { rules: dto.rules as Prisma.InputJsonValue }),
      ...(dto.suitableFitFor && { suitableFitFor: dto.suitableFitFor }),
    };

    return this.prisma.property.update({
      where: { id: propertyId },
      data,
    });
  }

  async remove(propertyId: string, userId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) throw new NotFoundException("Property not found");
    if (property.ownerId !== userId)
      throw new ForbiddenException("Not your property");

    await this.prisma.property.delete({ where: { id: propertyId } });
    return { deleted: true };
  }

  async findMyListings(ownerId: string) {
    return this.prisma.property.findMany({
      where: { ownerId },
      include: { PropertyStats: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateVerificationStatus(
    propertyId: string,
    status: PropertyVerificationStatus,
    ownerEmail: string,
  ) {
    const property = await this.prisma.property.update({
      where: { id: propertyId },
      data: {
        verificationStatus: status,
        verifiedAt:
          status === PropertyVerificationStatus.VERIFIED ? new Date() : null,
      },
    });

    const topic =
      status === PropertyVerificationStatus.VERIFIED
        ? "property.approved"
        : "property.rejected";

    await this.kafka.emit(topic, {
      propertyId,
      ownerId: property.ownerId,
      ownerEmail,
    });

    return property;
  }
}
