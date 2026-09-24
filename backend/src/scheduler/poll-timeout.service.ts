// backend/src/scheduler/poll-timeout.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PollsService } from '@/polls/polls.service';

@Injectable()
export class PollTimeoutService {
  private readonly logger = new Logger(PollTimeoutService.name);
  private running = false;

  constructor(private readonly pollsService: PollsService) {}

  /**
   * Runs every 5 seconds. Closes any active polls whose endsAt has passed.
   * Emits `poll.closed` via the service (which fans out via gateway).
   */
  @Cron('*/5 * * * * *', { name: 'poll-timeout' })
  async handleCron() {
    // Guard against overlapping runs (long DB ops on slow VPS)
    if (this.running) return;
    this.running = true;

    try {
      const closed = await this.pollsService.closeAllExpiredPolls();
      if (closed > 0) {
        this.logger.log(`Auto-closed ${closed} expired poll(s)`);
      }
    } catch (err) {
      this.logger.error('Poll timeout job failed', err as Error);
    } finally {
      this.running = false;
    }
  }

  /** Optional: run once at boot to clean up stale polls */
  @Cron(CronExpression.EVERY_HOUR, { name: 'poll-timeout-hourly' })
  async hourlySweep() {
    const closed = await this.pollsService.closeAllExpiredPolls();
    if (closed > 0) {
      this.logger.log(`Hourly sweep closed ${closed} stale poll(s)`);
    }
  }
}