import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("CommunityService");

  app.setGlobalPrefix("api");
  app.enableCors();

  const port = process.env.PORT ?? 3004;
  await app.listen(port);
  logger.log(`Community service running on port ${port}`);
}

bootstrap();
