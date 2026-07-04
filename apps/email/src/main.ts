import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createLoggerConfig } from '@roomate/shared-types';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createLoggerConfig('email'),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
        retry: {
          retries: 10,
          initialRetryTime: 3000,
        },
      },
      consumer: {
        groupId: 'email-service',
      },
    },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Email Service')
    .setDescription('Email delivery')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3002);
  console.log(`Email service running on port ${process.env.PORT ?? 3002}`);
}

bootstrap().catch(console.error);
