import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AxiosError } from 'axios';
import { of, throwError } from 'rxjs';
import type { Request } from 'express';
import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  let service: ProxyService;
  let mockHttpService: { request: jest.Mock };
  let mockConfigService: { get: jest.Mock };
  let mockJwtService: { verify: jest.Mock };

  beforeEach(async () => {
    mockHttpService = { request: jest.fn() };
    mockConfigService = {
      get: jest.fn((key: string) => {
        const config: Record<string, string> = {
          AUTH_SERVICE_URL: 'http://localhost:3001',
          NOTIFICATION_SERVICE_URL: 'http://localhost:3008',
          LISTING_SERVICE_URL: 'http://localhost:3003',
          COMMUNITY_SERVICE_URL: 'http://localhost:3004',
          ADMIN_SERVICE_URL: 'http://localhost:3005',
          CHAT_SERVICE_URL: 'http://localhost:3006',
        };
        return config[key];
      }),
    };
    mockJwtService = {
      verify: jest.fn().mockReturnValue({
        sub: 'user-1',
        email: 'test@test.com',
        isAdmin: false,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProxyService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<ProxyService>(ProxyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = (url: string, method = 'GET') =>
    ({
      originalUrl: url,
      method,
      body: {},
      headers: { 'content-type': 'application/json' },
    }) as unknown as Request;

  describe('forward', () => {
    it('should return null for unknown route prefix', async () => {
      expect(await service.forward(mockRequest('/api/unknown'))).toBeNull();
    });

    it('should forward to Auth service', async () => {
      mockHttpService.request.mockReturnValue(of({ status: 200, data: {} }));
      await service.forward(mockRequest('/api/auth/login', 'POST'));
      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3001/api/auth/login',
        }),
      );
    });

    it('should forward to Notification service', async () => {
      mockHttpService.request.mockReturnValue(of({ status: 200, data: {} }));
      await service.forward({
        ...mockRequest('/api/notifications'),
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer valid.token.here',
        },
      } as any);
      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3008/api/notifications',
        }),
      );
    });

    it('should forward to Listing service', async () => {
      mockHttpService.request.mockReturnValue(of({ status: 200, data: {} }));
      await service.forward(mockRequest('/api/listings'));
      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'http://localhost:3003/api/listings' }),
      );
    });

    it('should forward to Community service', async () => {
      mockHttpService.request.mockReturnValue(of({ status: 200, data: {} }));
      await service.forward(mockRequest('/api/communities'));
      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3004/api/communities',
        }),
      );
    });

    it('should forward to Admin BFF', async () => {
      mockHttpService.request.mockReturnValue(of({ status: 200, data: {} }));
      await service.forward(mockRequest('/api/admin/properties'));
      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3005/api/admin/properties',
        }),
      );
    });

    it('should forward to Chat service', async () => {
      mockHttpService.request.mockReturnValue(of({ status: 200, data: {} }));
      await service.forward({
        ...mockRequest('/api/conversations'),
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer valid.token.here',
        },
      } as any);
      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3006/api/conversations',
        }),
      );
    });

    it('should forward downstream error with correct status', async () => {
      const axiosError = new AxiosError('Unauthorized');
      axiosError.response = {
        status: 401,
        data: { message: 'Unauthorized' },
        statusText: 'Unauthorized',
        headers: {},
        config: {} as never,
      };
      mockHttpService.request.mockReturnValue(throwError(() => axiosError));
      const result = await service.forward(mockRequest('/api/auth/me'));
      expect(result).toEqual({
        status: 401,
        data: { message: 'Unauthorized' },
      });
    });

    it('should return 503 when service unreachable', async () => {
      const axiosError = new AxiosError('Connection refused');
      mockHttpService.request.mockReturnValue(throwError(() => axiosError));
      const result = await service.forward({
        ...mockRequest('/api/auth/login', 'POST'),
        headers: { 'content-type': 'application/json' },
      } as any);
      expect(result).toEqual({
        status: 503,
        data: expect.objectContaining({ message: 'Service unavailable' }),
      });
    });
  });
});
