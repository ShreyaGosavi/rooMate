import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Gender } from './dto/signup.dto';
import { of } from 'rxjs';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { KafkaProducer } from './kafka.producer';

jest.mock('bcrypt');

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn().mockResolvedValue('OK'),
    get: jest.fn(),
    del: jest.fn().mockResolvedValue(1),
  }));
});

describe('AuthService', () => {
  let service: AuthService;
  let mockRedisInstance: {
    set: jest.Mock;
    get: jest.Mock;
    del: jest.Mock;
  };
  let mockAuthRepository: {
    findByEmail: jest.Mock;
    findByUsername: jest.Mock;
    findById: jest.Mock;
    updatePassword: jest.Mock;
    createUser: jest.Mock;
  };
  let mockJwtService: { sign: jest.Mock; verify: jest.Mock };
  let mockKafkaProducer: { emitUserCreated: jest.Mock };
  let mockHttpService: { post: jest.Mock };

  beforeEach(async () => {
    mockAuthRepository = {
      findByEmail: jest.fn(),
      findByUsername: jest.fn().mockResolvedValue(null),
      findById: jest.fn(),
      updatePassword: jest.fn().mockResolvedValue(undefined),
      createUser: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
      verify: jest.fn(),
    };

    mockKafkaProducer = {
      emitUserCreated: jest.fn().mockResolvedValue(undefined),
    };

    mockHttpService = {
      post: jest.fn().mockReturnValue(of({ data: {} })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AuthRepository, useValue: mockAuthRepository },
        { provide: JwtService, useValue: mockJwtService },
        { provide: KafkaProducer, useValue: mockKafkaProducer },
        { provide: HttpService, useValue: mockHttpService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, string> = {
                REDIS_HOST: 'localhost',
                REDIS_PORT: '6379',
                EMAIL_SERVICE_URL: 'http://localhost:3002',
                JWT_ACCESS_SECRET: 'access-secret',
                JWT_REFRESH_SECRET: 'refresh-secret',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Redis = jest.requireMock('ioredis');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const lastResult: { value: unknown } | undefined =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      Redis.mock.results[Redis.mock.results.length - 1];
    if (!lastResult) {
      throw new Error('Redis mock was not instantiated');
    }
    mockRedisInstance = lastResult.value as typeof mockRedisInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendVerificationEmail', () => {
    it('should store token in Redis and call Email service', async () => {
      await service.sendVerificationEmail('test@example.com');

      expect(mockRedisInstance.set).toHaveBeenCalledWith(
        expect.stringContaining('email:verify:token:'),
        'test@example.com',
        'EX',
        900,
      );
      expect(mockHttpService.post).toHaveBeenCalledWith(
        'http://localhost:3002/api/email/send-verification',
        expect.objectContaining({ email: 'test@example.com' }),
      );
    });
  });

  describe('verifyEmail', () => {
    it('should throw BadRequestException if token not found', async () => {
      mockRedisInstance.get.mockResolvedValue(null);

      await expect(service.verifyEmail('invalid-token')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should mark email as verified and delete token', async () => {
      mockRedisInstance.get.mockResolvedValue('test@example.com');

      await service.verifyEmail('valid-token');

      expect(mockRedisInstance.set).toHaveBeenCalledWith(
        'email:verified:test@example.com',
        'true',
        'EX',
        3600,
      );
      expect(mockRedisInstance.del).toHaveBeenCalledWith(
        'email:verify:token:valid-token',
      );
    });
  });

  describe('signup', () => {
    const signupDto = {
      email: 'test@example.com',
      password: 'Test1234',
      username: 'testuser',
      phone: '9876543210',
      gender: Gender.FEMALE,
    };

    it('should throw ForbiddenException if email not verified', async () => {
      mockRedisInstance.get.mockResolvedValue(null);

      await expect(service.signup(signupDto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ConflictException if user already exists', async () => {
      mockRedisInstance.get.mockResolvedValue('true');
      mockAuthRepository.findByEmail.mockResolvedValue({ id: 'existing' });

      await expect(service.signup(signupDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create user, emit Kafka event and return tokens', async () => {
      mockRedisInstance.get.mockResolvedValue('true');
      mockAuthRepository.findByEmail.mockResolvedValue(null);
      mockAuthRepository.createUser.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        username: 'testuser',
        isAdmin: false,
      });

      const result = await service.signup(signupDto);

      expect(mockKafkaProducer.emitUserCreated).toHaveBeenCalledWith({
        userId: 'user-1',
        email: 'test@example.com',
        name: 'testuser',
      });
      expect(result.id).toBe('user-1');
      expect(result.email).toBe('test@example.com');
    });
  });

  describe('login', () => {
    const loginDto = { email: 'test@example.com', password: 'Test1234' };

    it('should throw UnauthorizedException if user not found', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw ForbiddenException if email not verified', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue({
        isEmailVerified: false,
      });

      await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue({
        isEmailVerified: true,
        passwordHash: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return tokens and user on success', async () => {
      mockAuthRepository.findByEmail.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        username: 'testuser',
        phone: '9876543210',
        gender: 'FEMALE',
        isEmailVerified: true,
        isAdmin: false,
        passwordHash: 'hashed',
        createdAt: new Date(),
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(loginDto);

      expect(result.accessToken).toBe('mock-token');
    });
  });

  describe('refresh', () => {
    it('should throw UnauthorizedException if token verification fails', async () => {
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('invalid');
      });

      await expect(service.refresh('bad-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if token not in Redis', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'user-1' });
      mockRedisInstance.get.mockResolvedValue(null);

      await expect(service.refresh('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return new access token on success', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'user-1' });
      mockRedisInstance.get.mockResolvedValue('valid-token');
      mockAuthRepository.findById.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        isAdmin: false,
      });

      const result = await service.refresh('valid-token');

      expect(result.accessToken).toBe('mock-token');
    });
  });

  describe('logout', () => {
    it('should delete refresh token from Redis', async () => {
      await service.logout('user-1');

      expect(mockRedisInstance.del).toHaveBeenCalledWith('refresh:user-1');
    });
  });
});
