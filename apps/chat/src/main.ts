import { AllExceptionsFilter } from "@roomate/shared-types";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DocumentBuilder, SwaggerModule } = require("@nestjs/swagger");
import { createLoggerConfig } from "@roomate/shared-types";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createLoggerConfig("chat"),
  });
  const logger = new Logger("ChatService");
  app.setGlobalPrefix("api");
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3006;
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle("Chat Service")
    .setDescription("Real-time messaging")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup("docs", app as any, document);
  await app.listen(port);
  logger.log(`Chat service running on port ${port}`);
}
bootstrap();
