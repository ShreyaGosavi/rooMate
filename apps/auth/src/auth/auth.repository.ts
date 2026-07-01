import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository implements OnModuleInit {
  private prisma: PrismaClient;

  async onModuleInit() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
    await this.prisma.$connect();
  }

  async createUser(dto: SignupDto) {
    const passwordHash = await bcrypt.hash(dto.password, 12);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        username: dto.username,
        phone: dto.phone,
        gender: dto.gender,
        isEmailVerified: true,
      },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        gender: true,
        isEmailVerified: true,
        isAdmin: true,
        createdAt: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        phone: true,
        gender: true,
        isEmailVerified: true,
        isAdmin: true,
        createdAt: true,
      },
    });
  }

  async markEmailVerified(email: string) {
    return this.prisma.user.update({
      where: { email },
      data: { isEmailVerified: true },
    });
  }
}
