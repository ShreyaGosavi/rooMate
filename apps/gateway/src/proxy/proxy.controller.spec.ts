import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

describe('ProxyController', () => {
  let controller: ProxyController;
  let mockProxyService: { forward: jest.Mock };

  beforeEach(async () => {
    mockProxyService = {
      forward: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyController],
      providers: [{ provide: ProxyService, useValue: mockProxyService }],
    }).compile();

    controller = module.get<ProxyController>(ProxyController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = () =>
    ({ originalUrl: '/api/auth/login' }) as unknown as Request;

  const mockResponse = () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    res.status.mockReturnValue(res);
    return res as unknown as Response;
  };

  describe('forward', () => {
    it('should throw NotFoundException when service returns null', async () => {
      mockProxyService.forward.mockResolvedValue(null);

      await expect(
        controller.forward(mockRequest(), mockResponse()),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return correct status and data from proxy service', async () => {
      mockProxyService.forward.mockResolvedValue({
        status: 200,
        data: { accessToken: 'token' },
      });

      const res = mockResponse();
      await controller.forward(mockRequest(), res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ accessToken: 'token' });
    });

    it('should correctly forward a 4xx error status from downstream', async () => {
      mockProxyService.forward.mockResolvedValue({
        status: 403,
        data: { message: 'Forbidden' },
      });

      const res = mockResponse();
      await controller.forward(mockRequest(), res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    });
  });
});
