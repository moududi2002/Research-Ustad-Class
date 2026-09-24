// backend/src/polls/dto/create-poll.dto.ts

import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreatePollOptionDto {
  @IsString()
  @MinLength(1)
  id!: string;

  @IsString()
  @MinLength(1)
  label!: string;
}

export class CreatePollDto {
  @IsString()
  @MinLength(3)
  slug!: string;

  @IsString()
  @MinLength(1)
  workshopId!: string;

  @IsString()
  @MinLength(5)
  question!: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreatePollOptionDto)
  options!: CreatePollOptionDto[];

  @IsInt()
  @Min(10)
  @Max(600)
  durationSec!: number;
}