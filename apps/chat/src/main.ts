import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("ChatService");

  app.setGlobalPrefix("api");
  app.enableCors({ origin: "*" });

  const port = process.env.PORT ?? 3006;
  await app.listen(port);
  logger.log(`Chat service running on port ${port}`);
}

bootstrap();
