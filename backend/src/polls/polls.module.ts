// backend/src/polls/polls.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { PollsEventsService } from './polls-events.service';
import { PollsGateway } from './polls.gateway';
import { Poll, PollSchema } from './schemas/poll.schema';
import { Vote, VoteSchema } from './schemas/vote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Poll.name, schema: PollSchema },
      { name: Vote.name, schema: VoteSchema },
    ]),
  ],
  controllers: [PollsController],
  providers: [PollsService, PollsEventsService, PollsGateway],
  exports: [PollsService, PollsEventsService, MongooseModule],
})
export class PollsModule {}