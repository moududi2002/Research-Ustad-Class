// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from '@/common/filters/http-exception.filter';

/**
 * Socket.IO adapter that reads ping config from .env.
 */
class ConfiguredIoAdapter extends IoAdapter {
  constructor(private readonly app: any, private readonly config: ConfigService) {
    super(app);
  }

  createIOServer(port: number, options?: any) {
    const pingTimeout = this.config.get<number>('socket.pingTimeout') ?? 20000;
    const pingInterval =
      this.config.get<number>('socket.pingInterval') ?? 25000;

    return super.createIOServer(port, {
      ...options,
      pingTimeout,
      pingInterval,
      cors: { origin: true, credentials: true },
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const config = app.get(ConfigService);

  /* ---------------- Security ---------------- */
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );
  app.use(cookieParser());

  /* ---------------- CORS ---------------- */
  const origins = config.get<string[]>('corsOrigins') ?? [];
  app.enableCors({
    origin: origins.length ? origins : true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  /* ---------------- Global prefix ---------------- */
  app.setGlobalPrefix('api');

  /* ---------------- Validation ---------------- */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  /* ---------------- Global exception filter ---------------- */
  app.useGlobalFilters(new AllExceptionsFilter());

  /* ---------------- Socket.IO adapter ---------------- */
  app.useWebSocketAdapter(new ConfiguredIoAdapter(app, config));

  /* ---------------- Shutdown hooks ---------------- */
  app.enableShutdownHooks();

  /* ---------------- Start ---------------- */
  const port = config.get<number>('port') ?? 4001;
  await app.listen(port, '0.0.0.0');

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 API running on http://0.0.0.0:${port}/api`);
  logger.log(`🔌 Socket.IO namespace: ws://0.0.0.0:${port}/polls`);
  logger.log(`🌍 CORS origins: ${origins.join(', ') || '*'}`);
}

bootstrap();