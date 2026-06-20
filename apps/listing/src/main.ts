import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("ListingService");

  app.setGlobalPrefix("api");
  app.enableCors();

  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  logger.log(`Listing service running on port ${port}`);
}

bootstrap();
