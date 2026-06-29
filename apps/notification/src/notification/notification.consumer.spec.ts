import { Test, TestingModule } from '@nestjs/testing';
import { NotificationConsumer } from './notification.consumer';
import { NotificationService } from './notification.service';

describe('NotificationConsumer', () => {
  let consumer: NotificationConsumer;
  let mockService: {
    createWelcomeNotification: jest.Mock;
    createPropertyCreatedNotification: jest.Mock;
    createPropertyApprovedNotification: jest.Mock;
    createPropertyRejectedNotification: jest.Mock;
    createCommunityRequestedNotification: jest.Mock;
    createCommunityApprovedNotification: jest.Mock;
    createCommunityRejectedNotification: jest.Mock;
  };

  beforeEach(async () => {
    mockService = {
      createWelcomeNotification: jest.fn().mockResolvedValue(undefined),
      createPropertyCreatedNotification: jest.fn().mockResolvedValue(undefined),
      createPropertyApprovedNotification: jest
        .fn()
        .mockResolvedValue(undefined),
      createPropertyRejectedNotification: jest
        .fn()
        .mockResolvedValue(undefined),
      createCommunityRequestedNotification: jest
        .fn()
        .mockResolvedValue(undefined),
      createCommunityApprovedNotification: jest
        .fn()
        .mockResolvedValue(undefined),
      createCommunityRejectedNotification: jest
        .fn()
        .mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationConsumer],
      providers: [{ provide: NotificationService, useValue: mockService }],
    }).compile();

    consumer = module.get<NotificationConsumer>(NotificationConsumer);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleUserCreated', () => {
    it('should call createWelcomeNotification with userId and name', async () => {
      await consumer.handleUserCreated({
        userId: 'user-1',
        email: 'test@example.com',
        name: 'Alice',
      });
      expect(mockService.createWelcomeNotification).toHaveBeenCalledWith(
        'user-1',
        'Alice',
      );
    });
  });

  describe('handlePropertyCreated', () => {
    it('should call createPropertyCreatedNotification with ownerId and propertyId', async () => {
      await consumer.handlePropertyCreated({
        propertyId: 'p-1',
        ownerId: 'u-1',
        ownerEmail: 'o@test.com',
      });
      expect(
        mockService.createPropertyCreatedNotification,
      ).toHaveBeenCalledWith('u-1', 'p-1');
    });
  });

  describe('handlePropertyApproved', () => {
    it('should call createPropertyApprovedNotification', async () => {
      await consumer.handlePropertyApproved({
        propertyId: 'p-1',
        ownerId: 'u-1',
        ownerEmail: 'o@test.com',
      });
      expect(
        mockService.createPropertyApprovedNotification,
      ).toHaveBeenCalledWith('u-1', 'p-1');
    });
  });

  describe('handlePropertyRejected', () => {
    it('should call createPropertyRejectedNotification', async () => {
      await consumer.handlePropertyRejected({
        propertyId: 'p-1',
        ownerId: 'u-1',
        ownerEmail: 'o@test.com',
      });
      expect(
        mockService.createPropertyRejectedNotification,
      ).toHaveBeenCalledWith('u-1', 'p-1');
    });
  });

  describe('handleCommunityRequested', () => {
    it('should call createCommunityRequestedNotification', async () => {
      await consumer.handleCommunityRequested({
        requestedById: 'u-1',
        communityName: 'PCCOE',
      });
      expect(
        mockService.createCommunityRequestedNotification,
      ).toHaveBeenCalledWith('u-1', 'PCCOE');
    });
  });

  describe('handleCommunityApproved', () => {
    it('should call createCommunityApprovedNotification', async () => {
      await consumer.handleCommunityApproved({
        requestedById: 'u-1',
        communityName: 'PCCOE',
      });
      expect(
        mockService.createCommunityApprovedNotification,
      ).toHaveBeenCalledWith('u-1', 'PCCOE');
    });
  });

  describe('handleCommunityRejected', () => {
    it('should call createCommunityRejectedNotification', async () => {
      await consumer.handleCommunityRejected({
        requestedById: 'u-1',
        communityName: 'PCCOE',
      });
      expect(
        mockService.createCommunityRejectedNotification,
      ).toHaveBeenCalledWith('u-1', 'PCCOE');
    });
  });
});
