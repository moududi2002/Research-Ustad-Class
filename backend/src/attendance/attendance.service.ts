// src/attendance/attendance.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Attendance } from './schemas/attendance.schema';
import { AttendanceSettings } from './schemas/attendance-settings.schema';
import { RegistrationLookupService } from './registration-lookup.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly attendanceModel: Model<Attendance>,

    @InjectModel(AttendanceSettings.name)
    private readonly settingsModel: Model<AttendanceSettings>,

    private readonly registrationLookupService: RegistrationLookupService,
  ) {}

    async submitAttendance(
  dto: CreateAttendanceDto,
) {
  const settings = await this.getSettings();

  if (!settings.attendanceEnabled) {
    throw new ForbiddenException(
      'Attendance is currently closed',
    );
  }

  const registrationId =
    dto.registrationId.trim().toUpperCase();

  const feedback = dto.feedback.trim();

  if (!feedback) {
    throw new BadRequestException(
      'Feedback is required',
    );
  }

  const existing =
    await this.attendanceModel.findOne({
      registrationId,
    });

  if (existing) {
    throw new BadRequestException(
      'Attendance already submitted for this registration ID',
    );
  }

  /**
   * Always verify against MySQL again.
   * Never trust participant-supplied name/email/phone.
   */
  const registration =
    await this.registrationLookupService.findRegistration(
      registrationId,
    );

  try {
    const attendance =
      await this.attendanceModel.create({
        registrationId: registration.registrationId,
        fullName: registration.fullName,
        email: registration.email,
        whatsapp: registration.whatsapp,
        feedback,
        attended: true,
      });

    return {
      success: true,
      message:
        'Attendance and feedback submitted successfully',
      id: attendance._id,
    };
  } catch (error: any) {
    /**
     * MongoDB duplicate-key protection.
     * This also handles two simultaneous submissions.
     */
    if (error?.code === 11000) {
      throw new BadRequestException(
        'Attendance already submitted for this registration ID',
      );
    }

    throw error;
   }
 }

    async getAttendanceStatus() {
    const settings = await this.getSettings();

    return {
        enabled: settings.attendanceEnabled,
    };
    }

  private async getSettings() {
    let settings = await this.settingsModel.findOne({
      key: 'attendance',
    });

    if (!settings) {
      settings = await this.settingsModel.create({
        key: 'attendance',
        attendanceEnabled: false,
      });
    }

    return settings;
  }

  async openAttendance() {
  const settings = await this.getSettings();

  settings.attendanceEnabled = true;

  await settings.save();

  return {
    success: true,
    enabled: true,
  };
}

async closeAttendance() {
  const settings = await this.getSettings();

  settings.attendanceEnabled = false;

  await settings.save();

  return {
    success: true,
    enabled: false,
  };
}

async getStats() {
  const settings = await this.getSettings();

  const totalAttendance =
    await this.attendanceModel.countDocuments();

  return {
    enabled: settings.attendanceEnabled,
    totalAttendance,
  };
}

}
