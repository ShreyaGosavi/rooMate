import { AllExceptionsFilter } from '@roomate/shared-types';
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("ChatService");
  app.setGlobalPrefix("api");
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3006;
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
  logger.log(`Chat service running on port ${port}`);
}
bootstrap();
