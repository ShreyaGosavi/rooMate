import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const createLoggerConfig = (serviceName: string) =>
  WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
          winston.format.printf(({ timestamp, level, message, context, stack }) => {
            return JSON.stringify({
              timestamp,
              level,
              service: serviceName,
              context,
              message,
              ...(stack ? { stack } : {}),
            });
          }),
        ),
      }),
    ],
  });
