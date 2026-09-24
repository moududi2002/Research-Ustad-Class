// backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_GUARD } from '@nestjs/core';

import configuration from '@/config/configuration';
import { envValidationSchema } from '@/config/env.validation';
import { AuthModule } from '@/auth/auth.module';
import { PollsModule } from '@/polls/polls.module';
import { SchedulerModule } from '@/scheduler/scheduler.module';

@Module({
  imports: [
    /* ---------------- Config ---------------- */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: envValidationSchema,
      validationOptions: {
        abortEarly: false,
      },
      envFilePath: ['.env'],
    }),

    /* ---------------- MongoDB ---------------- */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('mongodbUri'),
      }),
    }),

    /* ---------------- Rate limiting ---------------- */
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('throttle.ttl') ?? 60,
          limit: config.get<number>('throttle.limit') ?? 60,
        },
      ],
    }),

    /* ---------------- Scheduler + Events ---------------- */
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      maxListeners: 20,
      verboseMemoryLeak: true,
    }),

    /* ---------------- Feature modules ---------------- */
    AuthModule,
    PollsModule,
    SchedulerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}