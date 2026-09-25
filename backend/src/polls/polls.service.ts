// backend/src/polls/polls.service.ts

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Poll, PollDocument } from './schemas/poll.schema';
import { Vote, VoteDocument } from './schemas/vote.schema';
import type { CreatePollDto } from './dto/create-poll.dto';
import type { SubmitVoteDto } from './dto/submit-vote.dto';
import type { UpdatePollDto } from './dto/update-poll.dto';
import type { PollPublicView } from './dto/poll-response.dto';
import { PollsEventsService } from './polls-events.service';

@Injectable()
export class PollsService {
  constructor(
    @InjectModel(Poll.name) private readonly pollModel: Model<PollDocument>,
    @InjectModel(Vote.name) private readonly voteModel: Model<VoteDocument>,
    private readonly config: ConfigService,
    private readonly events: PollsEventsService,
  ) {}

  /* --------------------------------------------------------------- */
  /* Admin: list                                                     */
  /* --------------------------------------------------------------- */

  async listPolls(options: { workshopId?: string }): Promise<PollPublicView[]> {
    const filter = options.workshopId
      ? { workshopId: options.workshopId }
      : {};

    const polls = await this.pollModel
      .find(filter)
      .sort({ createdAt: -1 })
      .exec();

    // Compute votes for each poll efficiently
    const views = await Promise.all(
      polls.map((p) => this.toPublicView(p)),
    );
    return views;
  }

  /* --------------------------------------------------------------- */
  /* Admin: create / update / start / end / reset                    */
  /* --------------------------------------------------------------- */

  async createPoll(dto: CreatePollDto): Promise<PollPublicView> {
    const existing = await this.pollModel.findOne({ slug: dto.slug }).lean();
    if (existing) {
      throw new ConflictException(`Poll slug "${dto.slug}" already exists`);
    }

    const ids = new Set(dto.options.map((o) => o.id));
    if (ids.size !== dto.options.length) {
      throw new BadRequestException('Option ids must be unique');
    }

    const poll = await this.pollModel.create({
      slug: dto.slug,
      workshopId: dto.workshopId,
      question: dto.question,
      options: dto.options,
      durationSec: dto.durationSec,
      status: 'idle',
    });

    const view = await this.toPublicView(poll);
    this.events.emitReset({ slug: view.slug, view });
    return view;
  }

  async updatePoll(
    slug: string,
    dto: UpdatePollDto,
  ): Promise<PollPublicView> {
    const poll = await this.pollModel.findOne({ slug });
    if (!poll) throw new NotFoundException('Poll not found');

    if (poll.status === 'active') {
      throw new BadRequestException(
        'Cannot update a poll while it is active — end or reset it first',
      );
    }

    if (dto.question !== undefined) poll.question = dto.question;
    if (dto.durationSec !== undefined) poll.durationSec = dto.durationSec;

    await poll.save();

    const view = await this.toPublicView(poll);
    this.events.emitReset({ slug: view.slug, view });
    return view;
  }

  async startPoll(
    slug: string,
    overrideSec?: number,
  ): Promise<PollPublicView> {
    const poll = await this.pollModel.findOne({ slug });
    if (!poll) throw new NotFoundException('Poll not found');

    if (poll.status === 'active') {
      // Already active — extend or leave. We'll extend if override provided.
      if (overrideSec) {
        const now = new Date();
        poll.durationSec = overrideSec;
        poll.startedAt = now;
        poll.endsAt = new Date(now.getTime() + overrideSec * 1000);
        await poll.save();
        const view = await this.toPublicView(poll);
        this.events.emitStarted({ slug: view.slug, view });
        this.events.emitUpdated({ slug: view.slug, view });
        return view;
      }
      return this.toPublicView(poll);
    }

    const duration = overrideSec ?? poll.durationSec;
    const now = new Date();

    poll.status = 'active';
    poll.startedAt = now;
    poll.endsAt = new Date(now.getTime() + duration * 1000);
    if (overrideSec) poll.durationSec = overrideSec;

    await poll.save();

    const view = await this.toPublicView(poll);
    this.events.emitStarted({ slug: view.slug, view });
    this.events.emitUpdated({ slug: view.slug, view });
    return view;
  }

  async endPoll(slug: string): Promise<PollPublicView> {
    const poll = await this.pollModel.findOne({ slug });
    if (!poll) throw new NotFoundException('Poll not found');

    poll.status = 'closed';
    poll.endsAt = new Date();
    await poll.save();

    const view = await this.toPublicView(poll);
    this.events.emitClosed({ slug: view.slug, view });
    return view;
  }

  async resetPoll(slug: string): Promise<PollPublicView> {
    const poll = await this.pollModel.findOne({ slug });
    if (!poll) throw new NotFoundException('Poll not found');

    await this.voteModel.deleteMany({ pollId: poll._id });

    poll.status = 'idle';
    poll.startedAt = null;
    poll.endsAt = null;
    await poll.save();

    const view = await this.toPublicView(poll);
    this.events.emitReset({ slug: view.slug, view });
    return view;
  }

  /* --------------------------------------------------------------- */
  /* Public: read / vote                                             */
  /* --------------------------------------------------------------- */

  async getPublicPoll(slug: string): Promise<PollPublicView> {
    const poll = await this.pollModel.findOne({ slug });
    if (!poll) throw new NotFoundException('Poll not found');

    await this.autoCloseIfExpired(poll);
    return this.toPublicView(poll);
  }

  async submitVote(
    slug: string,
    dto: SubmitVoteDto,
    deviceHash: string,
  ): Promise<{ success: true; view: PollPublicView }> {
    const poll = await this.pollModel.findOne({ slug });
    if (!poll) throw new NotFoundException('Poll not found');

    await this.autoCloseIfExpired(poll);

    if (poll.status !== 'active') {
      throw new ForbiddenException('Poll is not active');
    }

    const validOption = poll.options.some((o) => o.id === dto.optionId);
    if (!validOption) {
      throw new BadRequestException('Invalid optionId');
    }

    try {
      await this.voteModel.create({
        pollId: poll._id,
        optionId: dto.optionId,
        deviceHash,
        clientToken: dto.clientToken ?? null,
      });
    } catch (err: any) {
      if (err?.code === 11000) {
        throw new ConflictException('You have already voted in this poll');
      }
      throw err;
    }

    const view = await this.toPublicView(poll);
    this.events.emitUpdated({ slug: view.slug, view });
    return { success: true, view };
  }

  /* --------------------------------------------------------------- */
  /* Helpers                                                         */
  /* --------------------------------------------------------------- */

  private async autoCloseIfExpired(poll: PollDocument): Promise<boolean> {
    if (
      poll.status === 'active' &&
      poll.endsAt &&
      poll.endsAt.getTime() <= Date.now()
    ) {
      poll.status = 'closed';
      await poll.save();

      const view = await this.toPublicView(poll);
      this.events.emitClosed({ slug: view.slug, view });
      return true;
    }
    return false;
  }

  async toPublicView(poll: PollDocument): Promise<PollPublicView> {
    const voteAgg = await this.voteModel.aggregate<{
      _id: string;
      count: number;
    }>([
      { $match: { pollId: poll._id } },
      { $group: { _id: '$optionId', count: { $sum: 1 } } },
    ]);

    const counts: Record<string, number> = {};
    for (const opt of poll.options) counts[opt.id] = 0;
    for (const row of voteAgg) counts[row._id] = row.count;

    const totalVotes = Object.values(counts).reduce((a, b) => a + b, 0);

    return {
      id: poll._id.toString(),
      slug: poll.slug,
      workshopId: poll.workshopId,
      question: poll.question,
      options: poll.options.map((o) => ({ id: o.id, label: o.label })),
      status: poll.status,
      durationSec: poll.durationSec,
      startedAt: poll.startedAt ? poll.startedAt.toISOString() : null,
      endsAt: poll.endsAt ? poll.endsAt.toISOString() : null,
      totalVotes,
      counts,
    };
  }

  async findRawBySlug(slug: string): Promise<PollDocument | null> {
    return this.pollModel.findOne({ slug });
  }

  async closeAllExpiredPolls(): Promise<number> {
    const now = new Date();
    const expired = await this.pollModel.find({
      status: 'active',
      endsAt: { $lte: now },
    });

    let closedCount = 0;
    for (const poll of expired) {
      poll.status = 'closed';
      await poll.save();

      const view = await this.toPublicView(poll);
      this.events.emitClosed({ slug: view.slug, view });
      closedCount++;
    }
    return closedCount;
  }
}