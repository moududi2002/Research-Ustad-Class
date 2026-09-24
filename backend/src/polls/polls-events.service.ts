// backend/src/polls/polls-events.service.ts

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { PollPublicView } from './dto/poll-response.dto';

/**
 * Domain events emitted by PollsService.
 * Socket gateway subscribes to these and broadcasts to clients.
 */
export const POLL_EVENTS = {
  UPDATED: 'poll.updated',
  STARTED: 'poll.started',
  CLOSED: 'poll.closed',
  RESET: 'poll.reset',
} as const;

export interface PollEventPayload {
  slug: string;
  view: PollPublicView;
}

@Injectable()
export class PollsEventsService {
  constructor(private readonly emitter: EventEmitter2) {}

  emitUpdated(payload: PollEventPayload) {
    this.emitter.emit(POLL_EVENTS.UPDATED, payload);
  }

  emitStarted(payload: PollEventPayload) {
    this.emitter.emit(POLL_EVENTS.STARTED, payload);
  }

  emitClosed(payload: PollEventPayload) {
    this.emitter.emit(POLL_EVENTS.CLOSED, payload);
  }

  emitReset(payload: PollEventPayload) {
    this.emitter.emit(POLL_EVENTS.RESET, payload);
  }
}