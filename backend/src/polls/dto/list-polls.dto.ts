// backend/src/polls/dto/list-polls.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class ListPollsDto {
  @IsOptional()
  @IsString()
  workshopId?: string;
}