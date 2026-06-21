import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducer.name);
  private readonly kafka = new Kafka({
    clientId: "community-service",
    brokers: [process.env.KAFKA_BROKER ?? "localhost:9092"],
  });
  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
    this.logger.log("Kafka producer connected");
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async emit(topic: string, payload: object): Promise<void> {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
    this.logger.log(`Event emitted → topic: ${topic}`);
  }
}
