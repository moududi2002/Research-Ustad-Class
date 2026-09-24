// src/lib/socket.ts
'use client';

import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Returns a shared Socket.IO client connected to /polls namespace.
 * In prod, Nginx proxies /socket.io/* to the NestJS backend.
 * In dev, NEXT_PUBLIC_SOCKET_URL should point at http://localhost:4001.
 */
export function getSocket(): Socket {
  if (socket && socket.connected) return socket;

  const url = process.env.NEXT_PUBLIC_SOCKET_URL || undefined;
  const path = process.env.NEXT_PUBLIC_SOCKET_PATH || '/socket.io';

  socket = io(url ? `${url}/polls` : '/polls', {
    path,
    transports: ['websocket', 'polling'],
    withCredentials: false,
    reconnection: true,
    reconnectionDelay: 800,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    autoConnect: true,
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}