// src/attendance/registration-lookup.service.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RegistrationLookupService } from '@/registration-lookup.service';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('attendance')
export class RegistrationLookupController {
  constructor(
    private readonly registrationLookupService: RegistrationLookupService,
    private readonly attendanceService: AttendanceService,
  ) {}

  /**
   * Public:
   * Participant registration ID lookup
   */
  @Public()
  @Get('registration/:registrationId')
  async findRegistration(
    @Param('registrationId') registrationId: string,
  ) {
    return this.registrationLookupService.findRegistration(
      registrationId,
    );
  }

  /**
   * Public:
   * Check whether attendance is currently open
   */
  @Public()
  @Get('status')
  async getAttendanceStatus() {
    return this.attendanceService.getAttendanceStatus();
  }

  /**
   * Public:
   * Submit attendance + feedback
   */
  @Public()
  @Post('submit')
  async submitAttendance(
    @Body() dto: CreateAttendanceDto,
  ) {
    return this.attendanceService.submitAttendance(dto);
  }

  /**
   * Admin only
   */
  @UseGuards(JwtAuthGuard)
  @Get('admin/stats')
  async getStats() {
    return this.attendanceService.getStats();
  }

  /**
   * Admin only
   */
  @UseGuards(JwtAuthGuard)
  @Post('admin/open')
  async openAttendance() {
    return this.attendanceService.openAttendance();
  }

  /**
   * Admin only
   */
  @UseGuards(JwtAuthGuard)
  @Post('admin/close')
  async closeAttendance() {
    return this.attendanceService.closeAttendance();
  }
}