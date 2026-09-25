// backend/src/polls/dto/start-poll.dto.ts

import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class StartPollDto {
  /**
   * Optional duration override in seconds.
   * If not provided, uses poll.durationSec.
   * Range: 10s … 600s (10 min).
   */
  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(600)
  durationSec?: number;
}