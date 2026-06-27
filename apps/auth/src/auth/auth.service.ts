import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import Redis from 'ioredis';
import { AuthRepository } from './auth.repository';
import { KafkaProducer } from './kafka.producer';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

interface JwtPayload {
  sub: string;
  email: string;
  isAdmin: boolean;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly redis: Redis;

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly kafkaProducer: KafkaProducer,
    private readonly httpService: HttpService,
  ) {
    this.redis = new Redis({
      host: this.configService.get<string>('REDIS_HOST') ?? 'localhost',
      port: this.configService.get<number>('REDIS_PORT') ?? 6379,
    });
  }

  async sendVerificationEmail(email: string): Promise<void> {
    const token = crypto.randomBytes(32).toString('hex');
    await this.redis.set(`email:verify:token:${token}`, email, 'EX', 900);
    const emailServiceUrl =
      this.configService.get<string>('EMAIL_SERVICE_URL') ??
      'http://localhost:3002';
    await firstValueFrom(
      this.httpService.post(`${emailServiceUrl}/api/email/send-verification`, {
        email,
        token,
      }),
    );
    this.logger.log(`Verification email sent to ${email}`);
  }

  async verifyEmail(token: string): Promise<string> {
    const email = await this.redis.get(`email:verify:token:${token}`);
    if (!email) {
      throw new BadRequestException('Invalid or expired verification token');
    }
    await this.redis.set(`email:verified:${email}`, 'true', 'EX', 3600);
    await this.redis.del(`email:verify:token:${token}`);
    this.logger.log(`Email verified: ${email}`);
    return email;
  }

  async checkVerificationStatus(email: string): Promise<boolean> {
    const val = await this.redis.get(`email:verified:${email}`);
    return val === 'true';
  }

  async signup(dto: SignupDto) {
    const isVerified = await this.redis.get(`email:verified:${dto.email}`);
    if (!isVerified) {
      throw new ForbiddenException('Email not verified');
    }
    const existingUser = await this.authRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.authRepository.createUser(dto);
    await this.kafkaProducer.emitUserCreated({
      userId: user.id,
      email: user.email,
      name: user.username,
    });
    this.logger.log(`User signed up: ${user.email}`);
    return { id: user.id, email: user.email, username: user.username };
  }

  async login(dto: LoginDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.isEmailVerified) {
      throw new ForbiddenException('Email not verified');
    }
    const isValidPassword = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const tokens = await this.generateTokens(user.id, user.email, user.isAdmin);
    this.logger.log(`User logged in: ${user.email}`);
    return tokens;
  }

  async refresh(refreshToken: string) {
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const stored = await this.redis.get(`refresh:${payload.sub}`);
    if (!stored || stored !== refreshToken) {
      throw new UnauthorizedException('Refresh token revoked');
    }
    const tokens = await this.generateTokens(
      payload.sub,
      payload.email,
      payload.isAdmin,
    );
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    await this.redis.del(`refresh:${userId}`);
    this.logger.log(`User logged out: ${userId}`);
  }

  private async generateTokens(
    userId: string,
    email: string,
    isAdmin: boolean,
  ) {
    const payload: JwtPayload = { sub: userId, email, isAdmin };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '7d',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
    await this.redis.set(`refresh:${userId}`, refreshToken, 'EX', 604800);
    return { accessToken, refreshToken };
  }

  async getUserById(id: string) {
    return this.authRepository.findById(id);
  }
}