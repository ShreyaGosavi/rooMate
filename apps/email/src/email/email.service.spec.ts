import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('EmailService', () => {
  let service: EmailService;
  let mockSend: jest.Mock;

  beforeEach(async () => {
    mockSend = sgMail.send as jest.Mock;
    mockSend.mockResolvedValue([{ statusCode: 202 }, {}]);

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
    it('should call SendGrid with correct payload', async () => {
      await service.sendWelcomeEmail({
        userId: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Welcome to RooMate!',
          html: expect.stringContaining('Hey Test User'),
        }),
      );
    });

    it('should retry on failure and succeed on second attempt', async () => {
      mockSend
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce([{ statusCode: 202 }, {}]);

      await service.sendWelcomeEmail({
        userId: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      });
      expect(mockSend).toHaveBeenCalledTimes(2);
    });

    it('should throw after all retries are exhausted', async () => {
      mockSend.mockRejectedValue(new Error('SendGrid is down'));

      await expect(
        service.sendWelcomeEmail({
          userId: 'user-123',
          email: 'test@example.com',
          name: 'Test User',
        }),
      ).rejects.toThrow('SendGrid is down');
      expect(mockSend).toHaveBeenCalledTimes(3);
    });
  });

  describe('sendPropertySubmittedEmail', () => {
    it('should send property submitted email', async () => {
      await service.sendPropertySubmittedEmail('owner@example.com');
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'owner@example.com',
          subject: expect.stringContaining('received'),
        }),
      );
    });
  });

  describe('sendPropertyApprovedEmail', () => {
    it('should send property approved email', async () => {
      await service.sendPropertyApprovedEmail('owner@example.com');
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'owner@example.com',
          subject: expect.stringContaining('live'),
        }),
      );
    });
  });

  describe('sendPropertyRejectedEmail', () => {
    it('should send property rejected email', async () => {
      await service.sendPropertyRejectedEmail('owner@example.com');
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'owner@example.com',
          subject: expect.stringContaining('listing'),
        }),
      );
    });
  });
});
