import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { NotificationType } from './schemas/notification.schema';
import { NotificationQueryDto } from './dto/notification-query.dto';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockRepository: {
    create: jest.Mock;
    findByUserId: jest.Mock;
    countUnread: jest.Mock;
    markOneRead: jest.Mock;
    markAllRead: jest.Mock;
    deleteOne: jest.Mock;
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockResolvedValue(undefined),
      findByUserId: jest.fn(),
      countUnread: jest.fn(),
      markOneRead: jest.fn(),
      markAllRead: jest.fn().mockResolvedValue(undefined),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        { provide: NotificationRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWelcomeNotification', () => {
    it('should create a welcome notification with correct payload', async () => {
      await service.createWelcomeNotification('user-1', 'Alice');

      expect(mockRepository.create).toHaveBeenCalledWith({
        userId: 'user-1',
        type: NotificationType.WELCOME,
        title: 'Welcome to RooMate!',
        message:
          'Hi Alice, welcome to RooMate! Start exploring listings and find your perfect place.',
        link: '/',
      });
    });
  });

  describe('getNotifications', () => {
    it('should return paginated notifications with meta', async () => {
      const mockNotifications = [{ _id: 'notif-1', read: false }];
      mockRepository.findByUserId.mockResolvedValue({
        notifications: mockNotifications,
        total: 1,
      });

      const query: NotificationQueryDto = {
        page: 1,
        limit: 20,
        unreadOnly: false,
      };

      const result = await service.getNotifications('user-1', query);

      expect(mockRepository.findByUserId).toHaveBeenCalledWith(
        'user-1',
        1,
        20,
        false,
      );
      expect(result.data).toEqual(mockNotifications);
      expect(result.meta).toEqual({
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
    });

    it('should calculate totalPages correctly', async () => {
      mockRepository.findByUserId.mockResolvedValue({
        notifications: [],
        total: 45,
      });

      const query: NotificationQueryDto = {
        page: 1,
        limit: 20,
        unreadOnly: false,
      };

      const result = await service.getNotifications('user-1', query);

      expect(result.meta.totalPages).toBe(3);
    });
  });

  describe('getUnreadCount', () => {
    it('should return unread count', async () => {
      mockRepository.countUnread.mockResolvedValue(5);

      const result = await service.getUnreadCount('user-1');

      expect(result).toEqual({ count: 5 });
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
      const mockNotification = { _id: 'notif-1', read: true };
      mockRepository.markOneRead.mockResolvedValue(mockNotification);

      const result = await service.markOneRead('notif-1', 'user-1');

      expect(mockRepository.markOneRead).toHaveBeenCalledWith(
        'notif-1',
        'user-1',
      );
      expect(result).toEqual(mockNotification);
    });
  });

  describe('markAllRead', () => {
    it('should mark all notifications as read and return message', async () => {
      const result = await service.markAllRead('user-1');

      expect(mockRepository.markAllRead).toHaveBeenCalledWith('user-1');
      expect(result).toEqual({ message: 'All notifications marked as read' });
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

      expect(mockRepository.deleteOne).toHaveBeenCalledWith(
        'notif-1',
        'user-1',
      );
      expect(result).toEqual({ message: 'Notification deleted' });
    });
  });
});
