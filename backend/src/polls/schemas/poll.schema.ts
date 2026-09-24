// backend/src/polls/schemas/poll.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PollStatus = 'idle' | 'active' | 'closed';
export type PollDocument = HydratedDocument<Poll>;

@Schema({ _id: false })
export class PollOption {
  @Prop({ required: true })
  id!: string;      // e.g. "opt1"

  @Prop({ required: true })
  label!: string;   // e.g. "Scholarship"
}
export const PollOptionSchema = SchemaFactory.createForClass(PollOption);

@Schema({ timestamps: true, collection: 'polls' })
export class Poll {
  @Prop({ required: true, unique: true, index: true })
  slug!: string;    // e.g. "ice-breaker-1"

  @Prop({ required: true })
  workshopId!: string; // e.g. "workshop-one"

  @Prop({ required: true })
  question!: string;

  @Prop({ type: [PollOptionSchema], required: true })
  options!: PollOption[];

  @Prop({
    required: true,
    enum: ['idle', 'active', 'closed'],
    default: 'idle',
  })
  status!: PollStatus;

  @Prop({ required: true, default: 60 })
  durationSec!: number;

  @Prop({ type: Date, default: null })
  startedAt!: Date | null;

  @Prop({ type: Date, default: null })
  endsAt!: Date | null;

  @Prop({ default: false })
  allowMultipleFromSameIp!: boolean; // for future
}

export const PollSchema = SchemaFactory.createForClass(Poll);

// Indexes
PollSchema.index({ workshopId: 1, createdAt: -1 });