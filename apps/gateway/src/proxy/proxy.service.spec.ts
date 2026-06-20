import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { of, throwError } from 'rxjs';
import type { Request } from 'express';
import { ProxyService } from './proxy.service';

describe('ProxyService', () => {
  let service: ProxyService;
  let mockHttpService: { request: jest.Mock };
  let mockConfigService: { get: jest.Mock };

  beforeEach(async () => {
    mockHttpService = {
      request: jest.fn(),
    };
    mockConfigService = {
      get: jest.fn((key: string) => {
        const config: Record<string, string> = {
          AUTH_SERVICE_URL: 'http://localhost:3001',
          NOTIFICATION_SERVICE_URL: 'http://localhost:3008',
          LISTING_SERVICE_URL: 'http://localhost:3003',
        };
        return config[key];
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProxyService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
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
      const req = mockRequest('/api/unknown/endpoint');
      const result = await service.forward(req);
      expect(result).toBeNull();
    });

    it('should forward request to Auth service and return response', async () => {
      mockHttpService.request.mockReturnValue(
        of({ status: 200, data: { message: 'ok' } }),
      );

      const req = mockRequest('/api/auth/login', 'POST');
      const result = await service.forward(req);

      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: 'http://localhost:3001/api/auth/login',
        }),
      );
      expect(result).toEqual({ status: 200, data: { message: 'ok' } });
    });

    it('should forward request to Notification service and return response', async () => {
      mockHttpService.request.mockReturnValue(
        of({ status: 200, data: { data: [], meta: {} } }),
      );

      const req = mockRequest('/api/notifications');
      const result = await service.forward(req);

      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3008/api/notifications',
        }),
      );
      expect(result?.status).toBe(200);
    });

    it('should forward request to Listing service and return response', async () => {
      mockHttpService.request.mockReturnValue(
        of({ status: 200, data: { results: [], total: 0 } }),
      );

      const req = mockRequest('/api/listings');
      const result = await service.forward(req);

      expect(mockHttpService.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3003/api/listings',
        }),
      );
      expect(result?.status).toBe(200);
    });

    it('should forward downstream error response with correct status', async () => {
      const axiosError = new AxiosError('Unauthorized');
      axiosError.response = {
        status: 401,
        data: { message: 'Unauthorized' },
        statusText: 'Unauthorized',
        headers: {},
        config: {} as never,
      };
      mockHttpService.request.mockReturnValue(throwError(() => axiosError));

      const req = mockRequest('/api/auth/me');
      const result = await service.forward(req);

      expect(result).toEqual({
        status: 401,
        data: { message: 'Unauthorized' },
      });
    });

    it('should return 503 when downstream service is unreachable', async () => {
      const axiosError = new AxiosError('Connection refused');
      mockHttpService.request.mockReturnValue(throwError(() => axiosError));

      const req = mockRequest('/api/auth/login', 'POST');
      const result = await service.forward(req);

      expect(result).toEqual({
        status: 503,
        data: { message: 'Service unavailable' },
      });
    });
  });
});
