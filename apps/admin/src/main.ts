// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
import { createLoggerConfig } from '@roomate/shared-types';
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: createLoggerConfig('admin') });
  const logger = new Logger("AdminBFF");

  app.setGlobalPrefix("api");
  app.enableCors();

  const port = process.env.PORT ?? 3005;

  const config = new DocumentBuilder()
    .setTitle('Admin BFF')
    .setDescription('Admin panel backend for frontend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app as any, config);
  SwaggerModule.setup('docs', app as any, document);
  await app.listen(port);
  logger.log(`Admin BFF running on port ${port}`);
}

bootstrap();
