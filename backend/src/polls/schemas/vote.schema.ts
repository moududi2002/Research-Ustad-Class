// backend/src/polls/schemas/vote.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema({ timestamps: true, collection: 'votes' })
export class Vote {
  @Prop({ type: Types.ObjectId, ref: 'Poll', required: true, index: true })
  pollId!: Types.ObjectId;

  @Prop({ required: true })
  optionId!: string;

  /** SHA256(IP + UA + salt) — identifies a device without storing PII */
  @Prop({ required: true, index: true })
  deviceHash!: string;

  /** Optional client-generated UUID stored in localStorage (extra safety) */
  @Prop({ default: null })
  clientToken!: string | null;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);

/**
 * Unique on (pollId, deviceHash) — one vote per device per poll.
 */
VoteSchema.index(
  { pollId: 1, deviceHash: 1 },
  { unique: true, name: 'uniq_poll_device' },
);