// src/attendance/schemas/attendance-settings.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendanceSettingsDocument =
  HydratedDocument<AttendanceSettings>;

@Schema({
  timestamps: true,
})
export class AttendanceSettings {
  @Prop({
    required: true,
    unique: true,
  })
  key: string;

  @Prop({
    default: false,
  })
  attendanceEnabled: boolean;
}

export const AttendanceSettingsSchema =
  SchemaFactory.createForClass(AttendanceSettings);