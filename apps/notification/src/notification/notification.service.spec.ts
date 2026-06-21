import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { NotFoundException } from '@nestjs/common';

const mockRepository = {
  create: jest.fn(),
  findByUserId: jest.fn(),
  findAdminNotifications: jest.fn(),
  countUnread: jest.fn(),
  countAdminUnread: jest.fn(),
  markOneRead: jest.fn(),
  markAdminNotificationRead: jest.fn(),
  markAllRead: jest.fn(),
  deleteOne: jest.fn(),
};

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: NotificationRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    jest.clearAllMocks();
  });

  describe('createWelcomeNotification', () => {
    it('should create a welcome notification with correct payload', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createWelcomeNotification('user-1', 'Shreya');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'WELCOME',
          link: '/',
        }),
      );
    });
  });

  describe('createPropertyCreatedNotification', () => {
    it('should create user and admin notifications', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createPropertyCreatedNotification('user-1', 'prop-1');
      expect(mockRepository.create).toHaveBeenCalledTimes(2);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'PROPERTY_CREATED',
          link: '/listings/prop-1',
        }),
      );
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          isAdminNotification: true,
          type: 'PROPERTY_CREATED',
        }),
      );
    });
  });

  describe('createPropertyApprovedNotification', () => {
    it('should create a property approved notification', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createPropertyApprovedNotification('user-1', 'prop-1');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'PROPERTY_APPROVED',
          link: '/listings/prop-1',
        }),
      );
    });
  });

  describe('createPropertyRejectedNotification', () => {
    it('should create a property rejected notification', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createPropertyRejectedNotification('user-1', 'prop-1');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'PROPERTY_REJECTED',
          link: '/listings/prop-1',
        }),
      );
    });
  });

  describe('createCommunityRequestedNotification', () => {
    it('should create user and admin notifications', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createCommunityRequestedNotification('user-1', 'COEP');
      expect(mockRepository.create).toHaveBeenCalledTimes(2);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'COMMUNITY_REQUESTED',
        }),
      );
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          isAdminNotification: true,
          type: 'COMMUNITY_REQUESTED',
        }),
      );
    });
  });

  describe('createCommunityApprovedNotification', () => {
    it('should create a community approved notification', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createCommunityApprovedNotification('user-1', 'COEP');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'COMMUNITY_APPROVED',
        }),
      );
    });
  });

  describe('createCommunityRejectedNotification', () => {
    it('should create a community rejected notification', async () => {
      mockRepository.create.mockResolvedValue({});
      await service.createCommunityRejectedNotification('user-1', 'COEP');
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          type: 'COMMUNITY_REJECTED',
        }),
      );
    });
  });

  describe('getNotifications', () => {
    it('should return paginated notifications with meta', async () => {
      mockRepository.findByUserId.mockResolvedValue({
        notifications: [],
        total: 0,
      });
      const result = await service.getNotifications('user-1', {
        page: 1,
        limit: 20,
        unreadOnly: false,
      });
      expect(result.meta.total).toBe(0);
      expect(result.data).toEqual([]);
    });

    it('should calculate totalPages correctly', async () => {
      mockRepository.findByUserId.mockResolvedValue({
        notifications: [],
        total: 45,
      });
      const result = await service.getNotifications('user-1', {
        page: 1,
        limit: 20,
        unreadOnly: false,
      });
      expect(result.meta.totalPages).toBe(3);
    });
  });

  describe('getUnreadCount', () => {
    it('should return unread count', async () => {
      mockRepository.countUnread.mockResolvedValue(5);
      const result = await service.getUnreadCount('user-1');
      expect(result.count).toBe(5);
    });
  });

  describe('markOneRead', () => {
    it('should throw NotFoundException if notification not found', async () => {
      mockRepository.markOneRead.mockResolvedValue(null);
      await expect(service.markOneRead('notif-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return updated notification on success', async () => {
      const mockNotif = { _id: 'notif-1', read: true };
      mockRepository.markOneRead.mockResolvedValue(mockNotif);
      const result = await service.markOneRead('notif-1', 'user-1');
      expect(result).toEqual(mockNotif);
    });
  });

  describe('markAllRead', () => {
    it('should mark all notifications as read and return message', async () => {
      mockRepository.markAllRead.mockResolvedValue(undefined);
      const result = await service.markAllRead('user-1');
      expect(result.message).toBe('All notifications marked as read');
    });
  });

  describe('deleteOne', () => {
    it('should throw NotFoundException if notification not found', async () => {
      mockRepository.deleteOne.mockResolvedValue(null);
      await expect(service.deleteOne('notif-1', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return success message on deletion', async () => {
      mockRepository.deleteOne.mockResolvedValue({ _id: 'notif-1' });
      const result = await service.deleteOne('notif-1', 'user-1');
      expect(result).toEqual({ message: 'Notification deleted' });
    });
  });

  describe('getAdminNotifications', () => {
    it('should return admin notifications', async () => {
      mockRepository.findAdminNotifications.mockResolvedValue({
        notifications: [],
        total: 0,
      });
      const result = await service.getAdminNotifications({
        page: 1,
        limit: 20,
        unreadOnly: false,
      });
      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe('getAdminUnreadCount', () => {
    it('should return admin unread count', async () => {
      mockRepository.countAdminUnread.mockResolvedValue(3);
      const result = await service.getAdminUnreadCount();
      expect(result.count).toBe(3);
    });
  });
});
