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
import axios from "axios";
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
        propertyType: dto.propertyType,
        rent: dto.rent,
        deposit: dto.deposit,
        maintenance: dto.maintenance,
        sharing: dto.sharing,
        genderPreference: dto.genderPreference,
        bhk: dto.bhk,
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
        availableFrom: dto.availableFrom,
        suitableFitFor: { set: dto.suitableFitFor },
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
      search,
      page = 1,
      limit = 10,
    } = filters;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

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
      ...(minRent && maxRent && { rent: { gte: Number(minRent), lte: Number(maxRent) } }),
      ...(minRent && !maxRent && { rent: { gte: Number(minRent) } }),
      ...(maxRent && !minRent && { rent: { lte: Number(maxRent) } }),
      ...(gender && { genderPreference: gender }),
      ...(propertyType && { propertyType }),
      ...(bhk && { bhk }),
    };

    if (search) {
      const cleanSearch = (search as string).replace(/^near\s+/i, '').trim();
      const searchTerm = `%${cleanSearch}%`;

      const textResults = await this.prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM "Property"
        WHERE "verificationStatus" = 'VERIFIED'
        AND "isAvailable" = true
        AND (
          title ILIKE ${searchTerm}
          OR city ILIKE ${searchTerm}
          OR locality ILIKE ${searchTerm}
          OR district ILIKE ${searchTerm}
          OR "formattedAddress" ILIKE ${searchTerm}
          OR "addressLine1" ILIKE ${searchTerm}
          OR EXISTS (
            SELECT 1 FROM unnest("suitableFitFor") AS place
            WHERE place ILIKE ${searchTerm}
          )
        )
      `;

      let geoIds: string[] = [];
      try {
        const googleKey = process.env.GOOGLE_MAPS_KEY;
        const geoRes = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cleanSearch)}&key=${googleKey}&region=in`
        );
        if (geoRes.data.results?.length > 0) {
          const { lat: gLat, lng: gLng } = geoRes.data.results[0].geometry.location;
          const radiusKm = 5;
          const geoResults = await this.prisma.$queryRaw<{ id: string }[]>`
            SELECT id FROM "Property"
            WHERE "verificationStatus" = 'VERIFIED'
            AND "isAvailable" = true
            AND (
              6371 * acos(
                cos(radians(${gLat})) * cos(radians(CAST(latitude AS FLOAT))) *
                cos(radians(CAST(longitude AS FLOAT)) - radians(${gLng})) +
                sin(radians(${gLat})) * sin(radians(CAST(latitude AS FLOAT)))
              )
            ) <= ${radiusKm}
          `;
          geoIds = geoResults.map((r: any) => r.id);
          this.logger.log(`Geocoded "${cleanSearch}" to ${gLat},${gLng} - ${geoIds.length} nearby`);
        }
      } catch (e: any) {
        this.logger.warn(`Geocoding failed: ${e.message}`);
      }

      const allIds = [...new Set([...textResults.map((r: any) => r.id), ...geoIds])];
      where.id = allIds.length > 0 ? { in: allIds } : { in: [] };
    }

    const [results, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        skip: offset,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        include: { PropertyStats: true },
      }),
      this.prisma.property.count({ where }),
    ]);

    return { results, total, page: pageNum, limit: limitNum };
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
      ...(dto.rent && { rent: dto.rent }),
      ...(dto.deposit && { deposit: dto.deposit }),
      ...(dto.maintenance && { maintenance: dto.maintenance }),
      ...(dto.sharing && { sharing: dto.sharing }),
      ...(dto.isAvailable !== undefined && { isAvailable: dto.isAvailable }),
      ...(dto.visitingHrs && { visitingHrs: dto.visitingHrs }),
      ...(dto.amenities && { amenities: { set: dto.amenities } }),
      ...(dto.rules && { rules: dto.rules as Prisma.InputJsonValue }),
      ...(dto.suitableFitFor && { suitableFitFor: { set: dto.suitableFitFor } }),
      ...(dto.availableFrom && { availableFrom: dto.availableFrom }),
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
  async findPending() {
    const results = await this.prisma.property.findMany({
      where: { verificationStatus: PropertyVerificationStatus.PENDING },
      include: { PropertyStats: true },
      orderBy: { createdAt: 'desc' },
    });
    return { results, total: results.length, page: 1, limit: 100 };
  }
}