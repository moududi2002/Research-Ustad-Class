// backend/src/polls/dto/submit-vote.dto.ts

import { IsOptional, IsString, MinLength } from 'class-validator';

export class SubmitVoteDto {
  @IsString()
  @MinLength(1)
  optionId!: string;

  /** Optional client-generated UUID for extra dedupe safety */
  @IsOptional()
  @IsString()
  clientToken?: string;
}