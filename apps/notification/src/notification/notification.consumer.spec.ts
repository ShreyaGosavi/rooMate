import { Test, TestingModule } from '@nestjs/testing';
import { NotificationConsumer } from './notification.consumer';
import { NotificationService } from './notification.service';

describe('NotificationConsumer', () => {
  let consumer: NotificationConsumer;
  let mockService: { createWelcomeNotification: jest.Mock };

  beforeEach(async () => {
    mockService = {
      createWelcomeNotification: jest.fn().mockResolvedValue(undefined),
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
});
