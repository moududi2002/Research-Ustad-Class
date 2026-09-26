import {
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  namespace: '/attendance',
})
export class AttendanceGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  private readonly logger = new Logger(AttendanceGateway.name);

  @WebSocketServer()
  server!: Server;

  onModuleInit() {
    this.logger.log('Attendance WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.debug(
      `Attendance client connected: ${client.id}`,
    );
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(
      `Attendance client disconnected: ${client.id}`,
    );
  }

  emitStatus(enabled: boolean) {
    this.server.emit('attendance-status', {
      enabled,
    });

    this.logger.log(
      `Attendance status broadcast: ${
        enabled ? 'OPEN' : 'CLOSED'
      }`,
    );
  }
}