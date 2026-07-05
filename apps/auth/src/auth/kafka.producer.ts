import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { UserCreatedEvent } from '@roomate/shared-types';

@Injectable()
export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducer.name);
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private connected = false;

  constructor() {
    this.kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
      retry: { retries: 3, initialRetryTime: 1000 },
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.connected = true;
      this.logger.log('Kafka producer connected');
    } catch {
      this.connected = false;
      this.logger.warn('Kafka unavailable on startup - auth will work without events');
    }
  }

  async onModuleDestroy() {
    if (this.connected) {
      await this.producer.disconnect();
    }
  }

  async emitUserCreated(payload: UserCreatedEvent): Promise<void> {
    if (!this.connected) {
      try {
        await this.producer.connect();
        this.connected = true;
      } catch {
        this.logger.warn(`Kafka unavailable - user.created event dropped for ${payload.userId}`);
        return;
      }
    }
    try {
      await this.producer.send({
        topic: 'user.created',
        messages: [{ value: JSON.stringify(payload) }],
      });
      this.logger.log(`Emitted user.created for userId: ${payload.userId}`);
    } catch {
      this.connected = false;
      this.logger.warn(`Failed to emit user.created for ${payload.userId} - Kafka unavailable`);
    }
  }
}
