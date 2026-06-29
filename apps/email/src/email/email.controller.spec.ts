import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('EmailController', () => {
  let controller: EmailController;
  let mockEmailService: {
    sendWelcomeEmail: jest.Mock;
    sendPropertySubmittedEmail: jest.Mock;
    sendPropertyApprovedEmail: jest.Mock;
    sendPropertyRejectedEmail: jest.Mock;
    sendCommunitySubmittedEmail: jest.Mock;
    sendCommunityApprovedEmail: jest.Mock;
    sendCommunityRejectedEmail: jest.Mock;
  };

  beforeEach(async () => {
    mockEmailService = {
      sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
      sendPropertySubmittedEmail: jest.fn().mockResolvedValue(undefined),
      sendPropertyApprovedEmail: jest.fn().mockResolvedValue(undefined),
      sendPropertyRejectedEmail: jest.fn().mockResolvedValue(undefined),
      sendCommunitySubmittedEmail: jest.fn().mockResolvedValue(undefined),
      sendCommunityApprovedEmail: jest.fn().mockResolvedValue(undefined),
      sendCommunityRejectedEmail: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [{ provide: EmailService, useValue: mockEmailService }],
    }).compile();

    controller = module.get<EmailController>(EmailController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleUserCreated', () => {
    it('should call sendWelcomeEmail with the correct payload', async () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      };
      await controller.handleUserCreated(payload);
      expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(payload);
    });
  });

  describe('handlePropertyCreated', () => {
    it('should call sendPropertySubmittedEmail with ownerEmail', async () => {
      await controller.handlePropertyCreated({
        propertyId: 'p-1',
        ownerId: 'u-1',
        ownerEmail: 'owner@test.com',
      });
      expect(mockEmailService.sendPropertySubmittedEmail).toHaveBeenCalledWith(
        'owner@test.com',
      );
    });
  });

  describe('handlePropertyApproved', () => {
    it('should call sendPropertyApprovedEmail with ownerEmail', async () => {
      await controller.handlePropertyApproved({
        propertyId: 'p-1',
        ownerId: 'u-1',
        ownerEmail: 'owner@test.com',
      });
      expect(mockEmailService.sendPropertyApprovedEmail).toHaveBeenCalledWith(
        'owner@test.com',
      );
    });
  });

  describe('handlePropertyRejected', () => {
    it('should call sendPropertyRejectedEmail with ownerEmail', async () => {
      await controller.handlePropertyRejected({
        propertyId: 'p-1',
        ownerId: 'u-1',
        ownerEmail: 'owner@test.com',
      });
      expect(mockEmailService.sendPropertyRejectedEmail).toHaveBeenCalledWith(
        'owner@test.com',
      );
    });
  });

  describe('handleCommunityRequested', () => {
    it('should call sendCommunitySubmittedEmail when requester email provided', async () => {
      await controller.handleCommunityRequested({
        requestedByEmail: 'user@test.com',
        communityName: 'PCCOE',
      });
      expect(mockEmailService.sendCommunitySubmittedEmail).toHaveBeenCalledWith(
        'user@test.com',
        'PCCOE',
      );
    });
  });

  describe('handleCommunityApproved', () => {
    it('should call sendCommunityApprovedEmail when requester email provided', async () => {
      await controller.handleCommunityApproved({
        requestedById: 'u-1',
        communityName: 'PCCOE',
        requesterEmail: 'user@test.com',
      });
      expect(mockEmailService.sendCommunityApprovedEmail).toHaveBeenCalledWith(
        'user@test.com',
        'PCCOE',
      );
    });
  });

  describe('handleCommunityRejected', () => {
    it('should call sendCommunityRejectedEmail when requester email provided', async () => {
      await controller.handleCommunityRejected({
        requestedById: 'u-1',
        communityName: 'PCCOE',
        requesterEmail: 'user@test.com',
      });
      expect(mockEmailService.sendCommunityRejectedEmail).toHaveBeenCalledWith(
        'user@test.com',
        'PCCOE',
      );
    });
  });
});
