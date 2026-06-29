import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Gender } from './dto/signup.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: {
    sendVerificationEmail: jest.Mock;
    verifyEmail: jest.Mock;
    signup: jest.Mock;
    login: jest.Mock;
    refresh: jest.Mock;
    logout: jest.Mock;
  };

  beforeEach(async () => {
    mockAuthService = {
      sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
      verifyEmail: jest.fn().mockResolvedValue('test@example.com'),
      signup: jest.fn(),
      login: jest.fn(),
      refresh: jest.fn(),
      logout: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendVerification', () => {
    it('should call authService.sendVerificationEmail with the correct email', async () => {
      const result = await controller.sendVerification({
        email: 'test@example.com',
      });
      expect(mockAuthService.sendVerificationEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(result).toEqual({ message: 'Verification email sent' });
    });
  });

  describe('verifyEmail', () => {
    it('should call authService.verifyEmail with the correct token', async () => {
      const mockRes = {
        redirect: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      await controller.verifyEmail('some-token', mockRes);
      expect(mockAuthService.verifyEmail).toHaveBeenCalledWith('some-token');
    });
  });

  describe('signup', () => {
    it('should call authService.signup with the dto and return its result', async () => {
      const signupDto = {
        email: 'test@example.com',
        password: 'Test1234',
        username: 'testuser',
        phone: '9876543210',
        gender: Gender.FEMALE,
      };
      const expectedResult = {
        id: 'user-1',
        email: 'test@example.com',
        username: 'testuser',
      };
      mockAuthService.signup.mockResolvedValue(expectedResult);
      const result = await controller.signup(signupDto);
      expect(mockAuthService.signup).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('login', () => {
    it('should call authService.login with the dto and return its result', async () => {
      const loginDto = { email: 'test@example.com', password: 'Test1234' };
      const expectedResult = { accessToken: 'token', refreshToken: 'token' };
      mockAuthService.login.mockResolvedValue(expectedResult);
      const result = await controller.login(loginDto);
      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('refresh', () => {
    it('should call authService.refresh with the refresh token and return its result', async () => {
      const expectedResult = { accessToken: 'new-token' };
      mockAuthService.refresh.mockResolvedValue(expectedResult);
      const result = await controller.refresh('refresh-token-value');
      expect(mockAuthService.refresh).toHaveBeenCalledWith(
        'refresh-token-value',
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('logout', () => {
    it('should call authService.logout with the user id from the request', async () => {
      const mockRequest = { user: { id: 'user-1' } } as unknown as Request;
      const result = await controller.logout(mockRequest);
      expect(mockAuthService.logout).toHaveBeenCalledWith('user-1');
      expect(result).toEqual({ message: 'Logged out successfully' });
    });
  });

  describe('me', () => {
    it('should return the user from the request', () => {
      const mockUser = { id: 'user-1', email: 'test@example.com' };
      const mockRequest = { user: mockUser } as unknown as Request;
      const result = controller.me(mockRequest);
      expect(result).toEqual(mockUser);
    });
  });
});
