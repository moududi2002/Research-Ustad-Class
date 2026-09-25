// backend/src/polls/polls.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { SubmitVoteDto } from './dto/submit-vote.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { StartPollDto } from './dto/start-poll.dto';
import { ListPollsDto } from './dto/list-polls.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Public } from '@/common/decorators/public.decorator';
import { computeDeviceHash } from '@/common/utils/device-hash.util';

@Controller('polls')
export class PollsController {
  constructor(
    private readonly polls: PollsService,
    private readonly config: ConfigService,
  ) {}

  /* --------------------------------------------------------------- */
  /* Admin (JWT protected)                                           */
  /* --------------------------------------------------------------- */

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() query: ListPollsDto) {
    const polls = await this.polls.listPolls({
      workshopId: query.workshopId,
    });
    return { success: true, polls };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePollDto) {
    const view = await this.polls.createPoll(dto);
    return { success: true, poll: view };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':slug')
  async update(@Param('slug') slug: string, @Body() dto: UpdatePollDto) {
    const view = await this.polls.updatePoll(slug, dto);
    return { success: true, poll: view };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slug/start')
  async start(@Param('slug') slug: string, @Body() dto: StartPollDto) {
    const view = await this.polls.startPoll(slug, dto.durationSec);
    return { success: true, poll: view };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slug/end')
  async end(@Param('slug') slug: string) {
    const view = await this.polls.endPoll(slug);
    return { success: true, poll: view };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slug/reset')
  async reset(@Param('slug') slug: string) {
    const view = await this.polls.resetPoll(slug);
    return { success: true, poll: view };
  }

  /* --------------------------------------------------------------- */
  /* Public                                                          */
  /* --------------------------------------------------------------- */

  @Public()
  @Get(':slug')
  async get(@Param('slug') slug: string) {
    const view = await this.polls.getPublicPoll(slug);
    return { success: true, poll: view };
  }

  @Public()
  @Post(':slug/vote')
  async vote(
    @Param('slug') slug: string,
    @Body() dto: SubmitVoteDto,
    @Req() req: Request,
  ) {
    const salt = this.config.get<string>('deviceHashSalt') ?? '';
    const deviceHash = computeDeviceHash(req, salt);
    const result = await this.polls.submitVote(slug, dto, deviceHash);
    return result;
  }
}