// src/hooks/usePollLive.ts
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchPoll, submitVote, PollNotFoundError } from '@/lib/api';
import { getSocket } from '@/lib/socket';
import {
  getOrCreateClientToken,
  getLocalVote,
  hasVotedLocally,
  markVotedLocally,
} from '@/lib/device';
import type { PollPublicView } from '@/types/poll';

type Connection = 'connecting' | 'live' | 'offline';

interface UsePollLiveResult {
  poll: PollPublicView | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;

  /** Real-time status of Socket.IO connection */
  connection: Connection;

  /** Seconds left until poll closes (null when not active) */
  secondsLeft: number | null;

  /** Local vote state */
  voted: boolean;
  votedOptionId: string | null;

  /** Voting UI state */
  submitting: boolean;
  submitError: string | null;

  /** Actions */
  vote: (optionId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function usePollLive(slug: string): UsePollLiveResult {
  const [poll, setPoll] = useState<PollPublicView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [connection, setConnection] = useState<Connection>('connecting');
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [voted, setVoted] = useState(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clientTokenRef = useRef<string>('');
  const pollRef = useRef<PollPublicView | null>(null);

  /* --------------------------------------------------------------- */
  /* Initial load                                                     */
  /* --------------------------------------------------------------- */

  const load = useCallback(async () => {
    try {
      setError(null);
      setNotFound(false);
      setLoading(true);
      const data = await fetchPoll(slug);
      setPoll(data);
      pollRef.current = data;
    } catch (err) {
      if (err instanceof PollNotFoundError) {
        setNotFound(true);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load poll');
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    void load();
  }, [load]);

  /* --------------------------------------------------------------- */
  /* Local voted state                                                */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    clientTokenRef.current = getOrCreateClientToken();
    setVoted(hasVotedLocally(slug));
    setVotedOptionId(getLocalVote(slug));
  }, [slug]);

  /* --------------------------------------------------------------- */
  /* Socket subscription                                              */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    const socket = getSocket();

    const onConnect = () => {
      setConnection('live');
      socket.emit('poll:join', { slug });
    };
    const onDisconnect = () => setConnection('offline');
    const onError = () => setConnection('offline');

    const onSnapshot = (payload: { slug: string; view: PollPublicView }) => {
      if (payload.slug !== slug) return;
      setPoll(payload.view);
      pollRef.current = payload.view;
    };

    const onUpdated = (payload: { slug: string; view: PollPublicView }) => {
      if (payload.slug !== slug) return;
      setPoll(payload.view);
      pollRef.current = payload.view;
    };

    const onStarted = (payload: { slug: string; view: PollPublicView }) => {
      if (payload.slug !== slug) return;
      setPoll(payload.view);
      pollRef.current = payload.view;
    };

    const onClosed = (payload: { slug: string; view: PollPublicView }) => {
      if (payload.slug !== slug) return;
      setPoll(payload.view);
      pollRef.current = payload.view;
    };

    const onReset = (payload: { slug: string; view: PollPublicView }) => {
      if (payload.slug !== slug) return;
      setPoll(payload.view);
      pollRef.current = payload.view;
    };

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
  }, [slug]);

  /* --------------------------------------------------------------- */
  /* Countdown                                                        */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    if (!poll || poll.status !== 'active' || !poll.endsAt) {
      setSecondsLeft(null);
      return;
    }

    const compute = () => {
      const end = new Date(poll.endsAt!).getTime();
      const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setSecondsLeft(diff);
    };

    compute();
    const id = window.setInterval(compute, 500);
    return () => window.clearInterval(id);
  }, [poll]);

  /* --------------------------------------------------------------- */
  /* Voting                                                           */
  /* --------------------------------------------------------------- */

  const vote = useCallback(
    async (optionId: string) => {
      if (submitting) return;
      if (voted) {
        setSubmitError('You have already voted.');
        return;
      }

      setSubmitting(true);
      setSubmitError(null);

      try {
        const result = await submitVote(
          slug,
          optionId,
          clientTokenRef.current,
        );

        if (result.ok) {
          markVotedLocally(slug, optionId);
          setVoted(true);
          setVotedOptionId(optionId);
          setPoll(result.view);
          pollRef.current = result.view;
          return;
        }

        if (result.alreadyVoted) {
          markVotedLocally(slug, optionId);
          setVoted(true);
          setSubmitError('You have already voted in this poll.');
          return;
        }

        setSubmitError(result.error);
      } finally {
        setSubmitting(false);
      }
    },
    [slug, submitting, voted],
  );

  /* --------------------------------------------------------------- */
  /* Public API                                                       */
  /* --------------------------------------------------------------- */

  return useMemo(
    () => ({
      poll,
      loading,
      error,
      notFound,
      connection,
      secondsLeft,
      voted,
      votedOptionId,
      submitting,
      submitError,
      vote,
      refresh: load,
    }),
    [
      poll,
      loading,
      error,
      notFound,
      connection,
      secondsLeft,
      voted,
      votedOptionId,
      submitting,
      submitError,
      vote,
      load,
    ],
  );
}