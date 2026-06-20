import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SaveService {
  constructor(private readonly prisma: PrismaService) {}

  async save(userId: string, propertyId: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) throw new NotFoundException("Property not found");

    const existing = await this.prisma.savedProperty.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (existing) throw new ConflictException("Already saved");

    await this.prisma.savedProperty.create({
      data: { userId, propertyId },
    });

    await this.prisma.propertyStats.update({
      where: { propertyId },
      data: { saveCount: { increment: 1 } },
    });

    return { saved: true };
  }

  async unsave(userId: string, propertyId: string) {
    const existing = await this.prisma.savedProperty.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (!existing) throw new NotFoundException("Not saved");

    await this.prisma.savedProperty.delete({
      where: { userId_propertyId: { userId, propertyId } },
    });

    await this.prisma.propertyStats.update({
      where: { propertyId },
      data: { saveCount: { decrement: 1 } },
    });

    return { unsaved: true };
  }

  async getSaved(userId: string) {
    return this.prisma.savedProperty.findMany({
      where: { userId },
      include: {
        Property: {
          include: { PropertyStats: true },
        },
      },
      orderBy: { savedAt: "desc" },
    });
  }
}
