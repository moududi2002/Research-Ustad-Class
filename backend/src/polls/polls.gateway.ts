// backend/src/polls/polls.gateway.ts

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Server, Socket } from 'socket.io';
import { PollsService } from './polls.service';
import {
  POLL_EVENTS,
  type PollEventPayload,
} from './polls-events.service';

interface JoinPayload {
  slug: string;
}

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  // Namespace: all sockets connect to /polls
  namespace: '/polls',
})
export class PollsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  private readonly logger = new Logger(PollsGateway.name);

  @WebSocketServer()
  server!: Server;

  constructor(private readonly pollsService: PollsService) {}

  onModuleInit() {
    this.logger.log('🔌 Socket.IO gateway initialised at /polls');
  }

  /* --------------------------------------------------------------- */
  /* Connection lifecycle                                            */
  /* --------------------------------------------------------------- */

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /* --------------------------------------------------------------- */
  /* Client → Server events                                          */
  /* --------------------------------------------------------------- */

  /**
   * Presenter or audience joins a poll room and immediately receives
   * the current state (so late joiners catch up).
   */
  @SubscribeMessage('poll:join')
  async handleJoin(
    @MessageBody() body: JoinPayload,
    @ConnectedSocket() client: Socket,
  ) {
    const slug = body?.slug?.trim();
    if (!slug) throw new WsException('slug is required');

    const poll = await this.pollsService.findRawBySlug(slug);
    if (!poll) throw new WsException('Poll not found');

    // auto-close if expired before sending current state
    const view = await this.pollsService.getPublicPoll(slug);

    const room = roomName(slug);
    await client.join(room);

    // Send current snapshot to the joiner only
    client.emit('poll:snapshot', { slug, view });

    this.logger.log(`Client ${client.id} joined room ${room}`);
    return { joined: true, slug };
  }

  @SubscribeMessage('poll:leave')
  async handleLeave(
    @MessageBody() body: JoinPayload,
    @ConnectedSocket() client: Socket,
  ) {
    const slug = body?.slug?.trim();
    if (!slug) throw new WsException('slug is required');

    const room = roomName(slug);
    await client.leave(room);
    this.logger.log(`Client ${client.id} left room ${room}`);
    return { left: true, slug };
  }

  /* --------------------------------------------------------------- */
  /* Domain events → broadcast                                       */
  /* --------------------------------------------------------------- */

  @OnEvent(POLL_EVENTS.UPDATED)
  handleUpdated(payload: PollEventPayload) {
    this.broadcast(payload, 'poll:updated');
  }

  @OnEvent(POLL_EVENTS.STARTED)
  handleStarted(payload: PollEventPayload) {
    this.broadcast(payload, 'poll:started');
  }

  @OnEvent(POLL_EVENTS.CLOSED)
  handleClosed(payload: PollEventPayload) {
    this.broadcast(payload, 'poll:closed');
  }

  @OnEvent(POLL_EVENTS.RESET)
  handleReset(payload: PollEventPayload) {
    this.broadcast(payload, 'poll:reset');
  }

  private broadcast(payload: PollEventPayload, eventName: string) {
    const room = roomName(payload.slug);
    this.server.to(room).emit(eventName, payload);
    this.logger.debug(`Emitted ${eventName} → ${room}`);
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function roomName(slug: string): string {
  return `poll:${slug}`;
}