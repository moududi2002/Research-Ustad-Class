// backend/src/polls/dto/update-poll.dto.ts

import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdatePollDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  question?: string;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(600)
  durationSec?: number;
}