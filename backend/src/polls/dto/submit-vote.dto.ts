// backend/src/polls/dto/submit-vote.dto.ts
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SubmitVoteDto {
  @IsString()
  @MinLength(1)
  optionId!: string;

  @IsOptional()
  @IsString()
  clientToken?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  customLabel?: string;
}