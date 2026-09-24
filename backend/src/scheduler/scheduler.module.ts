// backend/src/scheduler/scheduler.module.ts

import { Module } from '@nestjs/common';
import { PollsModule } from '@/polls/polls.module';
import { PollTimeoutService } from './poll-timeout.service';

@Module({
  imports: [PollsModule],
  providers: [PollTimeoutService],
})
export class SchedulerModule {}