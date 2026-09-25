// src/hooks/useAdminPolls.ts
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  adminListPolls,
  adminStartPoll,
  adminEndPoll,
  adminResetPoll,
  adminUpdatePoll,
  AdminApiError,
} from '@/lib/admin-api';
import type { PollPublicView } from '@/types/poll';

interface UseAdminPolls {
  polls: PollPublicView[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  start: (slug: string, durationSec?: number) => Promise<void>;
  end: (slug: string) => Promise<void>;
  reset: (slug: string) => Promise<void>;
  update: (slug: string, dto: { question?: string; durationSec?: number }) => Promise<void>;
  /** which poll has an in-flight action */
  pending: string | null;
}

export function useAdminPolls(workshopId?: string): UseAdminPolls {
  const [polls, setPolls] = useState<PollPublicView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const aliveRef = useRef(true);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const list = await adminListPolls(workshopId);
      if (aliveRef.current) setPolls(list);
    } catch (err) {
      if (!aliveRef.current) return;
      if (err instanceof AdminApiError && err.status === 401) return;
      setError(err instanceof Error ? err.message : 'Failed to load polls');
    } finally {
      if (aliveRef.current) setLoading(false);
    }
  }, [workshopId]);

  /* Initial + auto-refresh every 5s (simple, socket-less admin) */
  useEffect(() => {
    aliveRef.current = true;
    void refresh();

    const id = window.setInterval(() => void refresh(), 5000);
    return () => {
      aliveRef.current = false;
      window.clearInterval(id);
    };
  }, [refresh]);

  /* ---------------------------------------------------------------- */

  const withPending = useCallback(
    async (slug: string, fn: () => Promise<void>) => {
      setPending(slug);
      try {
        await fn();
        await refresh();
      } finally {
        setPending(null);
      }
    },
    [refresh],
  );

  const start = useCallback(
    (slug: string, durationSec?: number) =>
      withPending(slug, async () => {
        await adminStartPoll(slug, durationSec);
      }),
    [withPending],
  );

  const end = useCallback(
    (slug: string) =>
      withPending(slug, async () => {
        await adminEndPoll(slug);
      }),
    [withPending],
  );

  const reset = useCallback(
    (slug: string) =>
      withPending(slug, async () => {
        await adminResetPoll(slug);
      }),
    [withPending],
  );

  const update = useCallback(
    (slug: string, dto: { question?: string; durationSec?: number }) =>
      withPending(slug, async () => {
        await adminUpdatePoll(slug, dto);
      }),
    [withPending],
  );

  return {
    polls,
    loading,
    error,
    refresh,
    start,
    end,
    reset,
    update,
    pending,
  };
}