import { AllExceptionsFilter } from "@roomate/shared-types";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
import { createLoggerConfig } from '@roomate/shared-types';
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: createLoggerConfig('community') });
  const logger = new Logger("CommunityService");
  app.setGlobalPrefix("api");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3004;
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Community Service')
    .setDescription('Communities and notices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('docs', app as any, document);
  await app.listen(port);
  logger.log(`Community service running on port ${port}`);
}
bootstrap();
