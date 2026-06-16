import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { Resend } from 'resend';

jest.mock('resend');

describe('EmailService', () => {
  let service: EmailService;
  let mockResendSend: jest.Mock;

  beforeEach(async () => {
    mockResendSend = jest
      .fn()
      .mockResolvedValueOnce({ data: { id: 'test-email-id' }, error: null });

    (Resend as jest.Mock).mockImplementation(() => ({
      emails: {
        send: mockResendSend,
      },
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sendWelcomeEmail', () => {
    it('should call Resend with correct payload', async () => {
      await service.sendWelcomeEmail({
        userId: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });

      expect(mockResendSend).toHaveBeenCalledTimes(1);
      expect(mockResendSend).toHaveBeenCalledWith({
        from: 'RooMate <onboarding@resend.dev>',
        to: 'test@example.com',
        subject: 'Welcome to RooMate!',
        html: expect.stringContaining('Hey Test User'),
      });
    });

    it('should retry on failure and succeed on second attempt', async () => {
      mockResendSend
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ data: { id: 'test-email-id' }, error: null });

      await service.sendWelcomeEmail({
        userId: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });

      expect(mockResendSend).toHaveBeenCalledTimes(2);
    });

    it('should throw after all retries are exhausted', async () => {
      mockResendSend.mockRejectedValue(new Error('Resend is down'));

      await expect(
        service.sendWelcomeEmail({
          userId: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
        }),
      ).rejects.toThrow('Resend is down');

      expect(mockResendSend).toHaveBeenCalledTimes(3);
    });
  });
});