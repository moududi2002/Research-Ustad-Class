//src/hooks/useAdminAttendance.ts
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AdminApiError,
  adminCloseAttendance,
  adminGetAttendanceStats,
  adminOpenAttendance,
} from '@/lib/admin-api';

interface AttendanceStats {
  enabled: boolean;
  totalAttendance: number;
}

interface UseAdminAttendance {
  stats: AttendanceStats | null;
  loading: boolean;
  error: string | null;
  pending: boolean;
  refresh: () => Promise<void>;
  open: () => Promise<void>;
  close: () => Promise<void>;
}

export function useAdminAttendance(): UseAdminAttendance {
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const aliveRef = useRef(true);

  const refresh = useCallback(async () => {
    try {
      setError(null);

      const result = await adminGetAttendanceStats();

      if (aliveRef.current) {
        setStats(result);
      }
    } catch (err) {
      if (!aliveRef.current) return;

      if (err instanceof AdminApiError && err.status === 401) {
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load attendance status',
      );
    } finally {
      if (aliveRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    aliveRef.current = true;

    void refresh();

    const id = window.setInterval(() => {
      void refresh();
    }, 5000);

    return () => {
      aliveRef.current = false;
      window.clearInterval(id);
    };
  }, [refresh]);

  const open = useCallback(async () => {
    setPending(true);

    try {
      await adminOpenAttendance();
      await refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to open attendance',
      );
    } finally {
      setPending(false);
    }
  }, [refresh]);

  const close = useCallback(async () => {
    setPending(true);

    try {
      await adminCloseAttendance();
      await refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to close attendance',
      );
    } finally {
      setPending(false);
    }
  }, [refresh]);

  return {
    stats,
    loading,
    error,
    pending,
    refresh,
    open,
    close,
  };
}