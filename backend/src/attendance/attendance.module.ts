// src/attendance/attendance.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegistrationLookupController } from './registration-lookup.controller';
import { RegistrationLookupService } from './registration-lookup.service';
import { AttendanceService } from './attendance.service';

import {
  AttendanceSettings,
  AttendanceSettingsSchema,
} from './schemas/attendance-settings.schema';


import {
  Attendance,
  AttendanceSchema,
} from './schemas/attendance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attendance.name,
        schema: AttendanceSchema,
      },
      {
        name: AttendanceSettings.name,
        schema: AttendanceSettingsSchema,
        },
    ]),
  ],
  controllers: [RegistrationLookupController],
  providers: [ 
    RegistrationLookupService,
     AttendanceService,
    ],
})
export class AttendanceModule {}