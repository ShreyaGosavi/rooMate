import { AllExceptionsFilter } from "@roomate/shared-types";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("CommunityService");
  app.setGlobalPrefix("api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3004;
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
  logger.log(`Community service running on port ${port}`);
}
bootstrap();
