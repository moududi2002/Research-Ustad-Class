//src/attendance/dto/create-attendance.dto.ts
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  registrationId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  feedback: string;
}