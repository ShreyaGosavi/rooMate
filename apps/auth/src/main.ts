import { AllExceptionsFilter } from '@roomate/shared-types';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3001);
  console.log(`Auth service running on port ${process.env.PORT ?? 3001}`);
}

bootstrap().catch(console.error);
