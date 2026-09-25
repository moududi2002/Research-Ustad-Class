//src/attendance/registration-lookup.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RegistrationLookupService } from './registration-lookup.service';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('attendance')
export class RegistrationLookupController {
  constructor(
    private readonly registrationLookupService: RegistrationLookupService,
    private readonly attendanceService: AttendanceService,
  ) {}

  @Get('registration/:registrationId')
  async findRegistration(
    @Param('registrationId') registrationId: string,
  ) {
    return this.registrationLookupService.findRegistration(
      registrationId,
    );
  }

  @Post('submit')
  async submitAttendance(
    @Body() dto: CreateAttendanceDto,
  ) {
    return this.attendanceService.submitAttendance(dto);
  }

  @UseGuards(JwtAuthGuard)
    @Post('admin/open')
    async openAttendance() {
    return this.attendanceService.openAttendance();
    }

    @UseGuards(JwtAuthGuard)
    @Post('admin/close')
    async closeAttendance() {
    return this.attendanceService.closeAttendance();
    }

    @UseGuards(JwtAuthGuard)
    @Get('admin/stats')
    async getStats() {
    return this.attendanceService.getStats();
    }
}