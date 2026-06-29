import { AllExceptionsFilter } from "@roomate/shared-types";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("ListingService");
  app.setGlobalPrefix("api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3003;
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port);
  logger.log(`Listing service running on port ${port}`);
}
bootstrap();
