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

  constructor() {
    this.kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.logger.log('Kafka producer connected');
    } catch {
      this.logger.warn(
        'Kafka producer failed to connect on startup, will retry on first message',
      );
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected');
  }

  async emitUserCreated(payload: UserCreatedEvent): Promise<void> {
    await this.producer.send({
      topic: 'user.created',
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
    this.logger.log(`Emitted user.created for userId: ${payload.userId}`);
  }
}
