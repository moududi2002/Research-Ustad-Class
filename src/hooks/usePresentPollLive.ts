// src/hooks/usePresentPollLive.ts
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchPoll, PollNotFoundError } from '@/lib/api';
import { getSocket } from '@/lib/socket';
import type { PollPublicView } from '@/types/poll';

type Connection = 'connecting' | 'live' | 'offline' | 'disabled';

interface Result {
  poll: PollPublicView | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  connection: Connection;
  /** seconds until poll closes, updated every 500ms */
  secondsLeft: number | null;
}

/**
 * Presenter-side listener for a live poll.
 * - Joins the poll room
 * - Listens to all lifecycle events
 * - Never votes
 * - Falls back to `disabled` state if `enabled` is false
 */
export function usePresentPollLive(
  slug: string,
  enabled: boolean,
): Result {
  const [poll, setPoll] = useState<PollPublicView | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [connection, setConnection] = useState<Connection>(
    enabled ? 'connecting' : 'disabled',
  );
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const aliveRef = useRef(true);

  /* --------------------------------------------------------------- */
  /* Initial fetch                                                     */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setConnection('disabled');
      return;
    }

    aliveRef.current = true;
    setLoading(true);
    setError(null);
    setNotFound(false);

    fetchPoll(slug)
      .then((data) => {
        if (!aliveRef.current) return;
        setPoll(data);
      })
      .catch((err) => {
        if (!aliveRef.current) return;
        if (err instanceof PollNotFoundError) setNotFound(true);
        else setError(err instanceof Error ? err.message : 'Failed');
      })
      .finally(() => {
        if (aliveRef.current) setLoading(false);
      });

    return () => {
      aliveRef.current = false;
    };
  }, [slug, enabled]);

  /* --------------------------------------------------------------- */
  /* Socket subscription                                              */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    if (!enabled) return;

    const socket = getSocket();

    const onConnect = () => {
      setConnection('live');
      socket.emit('poll:join', { slug });
    };
    const onDisconnect = () => setConnection('offline');
    const onError = () => setConnection('offline');

    const apply = (payload: { slug: string; view: PollPublicView }) => {
      if (payload.slug !== slug) return;
      setPoll(payload.view);
    };

    const onSnapshot = apply;
    const onUpdated = apply;
    const onStarted = apply;
    const onClosed = apply;
    const onReset = apply;

    if (socket.connected) onConnect();
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError);
    socket.on('poll:snapshot', onSnapshot);
    socket.on('poll:updated', onUpdated);
    socket.on('poll:started', onStarted);
    socket.on('poll:closed', onClosed);
    socket.on('poll:reset', onReset);

    return () => {
      socket.emit('poll:leave', { slug });
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError);
      socket.off('poll:snapshot', onSnapshot);
      socket.off('poll:updated', onUpdated);
      socket.off('poll:started', onStarted);
      socket.off('poll:closed', onClosed);
      socket.off('poll:reset', onReset);
    };
  }, [slug, enabled]);

  /* --------------------------------------------------------------- */
  /* Countdown                                                         */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    if (!poll || poll.status !== 'active' || !poll.endsAt) {
      setSecondsLeft(null);
      return;
    }
    const compute = () => {
      const end = new Date(poll.endsAt!).getTime();
      setSecondsLeft(Math.max(0, Math.floor((end - Date.now()) / 1000)));
    };
    compute();
    const id = window.setInterval(compute, 500);
    return () => window.clearInterval(id);
  }, [poll]);

  return useMemo(
    () => ({ poll, loading, error, notFound, connection, secondsLeft }),
    [poll, loading, error, notFound, connection, secondsLeft],
  );
}