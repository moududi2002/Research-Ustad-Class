//src/attendance/schemas/attendance.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({
  timestamps: true,
})
export class Attendance {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  registrationId: string;

  @Prop({
    required: true,
  })
  fullName: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  whatsapp: string;

  @Prop({
    required: true,
    trim: true,
  })
  feedback: string;

  @Prop({
    default: true,
  })
  attended: boolean;
}

export const AttendanceSchema =
  SchemaFactory.createForClass(Attendance);