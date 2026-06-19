import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationQueryDto } from './dto/notification-query.dto';

describe('NotificationController', () => {
  let controller: NotificationController;
  let mockService: {
    getNotifications: jest.Mock;
    getUnreadCount: jest.Mock;
    markOneRead: jest.Mock;
    markAllRead: jest.Mock;
    deleteOne: jest.Mock;
  };

  beforeEach(async () => {
    mockService = {
      getNotifications: jest.fn(),
      getUnreadCount: jest.fn(),
      markOneRead: jest.fn(),
      markAllRead: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [{ provide: NotificationService, useValue: mockService }],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRequest = (userId: string) =>
    ({ user: { id: userId } }) as unknown as Request;

  describe('getNotifications', () => {
    it('should call service with userId and query and return result', async () => {
      const expected = { data: [], meta: { total: 0 } };
      mockService.getNotifications.mockResolvedValue(expected);

      const query: NotificationQueryDto = {
        page: 1,
        limit: 20,
        unreadOnly: false,
      };

      const result = await controller.getNotifications(
        mockRequest('user-1'),
        query,
      );

      expect(mockService.getNotifications).toHaveBeenCalledWith(
        'user-1',
        query,
      );
      expect(result).toEqual(expected);
    });
  });

  describe('getUnreadCount', () => {
    it('should call service with userId and return count', async () => {
      mockService.getUnreadCount.mockResolvedValue({ count: 3 });

      const result = await controller.getUnreadCount(mockRequest('user-1'));

      expect(mockService.getUnreadCount).toHaveBeenCalledWith('user-1');
      expect(result).toEqual({ count: 3 });
    });
  });

  describe('markAllRead', () => {
    it('should call service with userId and return message', async () => {
      mockService.markAllRead.mockResolvedValue({
        message: 'All notifications marked as read',
      });

      const result = await controller.markAllRead(mockRequest('user-1'));

      expect(mockService.markAllRead).toHaveBeenCalledWith('user-1');
      expect(result).toEqual({ message: 'All notifications marked as read' });
    });
  });

  describe('markOneRead', () => {
    it('should call service with id and userId and return notification', async () => {
      const mockNotification = { _id: 'notif-1', read: true };
      mockService.markOneRead.mockResolvedValue(mockNotification);

      const result = await controller.markOneRead(
        'notif-1',
        mockRequest('user-1'),
      );

      expect(mockService.markOneRead).toHaveBeenCalledWith('notif-1', 'user-1');
      expect(result).toEqual(mockNotification);
    });
  });

  describe('deleteOne', () => {
    it('should call service with id and userId and return message', async () => {
      mockService.deleteOne.mockResolvedValue({
        message: 'Notification deleted',
      });

      const result = await controller.deleteOne(
        'notif-1',
        mockRequest('user-1'),
      );

      expect(mockService.deleteOne).toHaveBeenCalledWith('notif-1', 'user-1');
      expect(result).toEqual({ message: 'Notification deleted' });
    });
  });
});
