// src/hooks/useAdminAuth.ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  adminLogin as apiLogin,
  adminMe,
  clearAdminSession,
  getAdminToken,
  getAdminUser,
  AdminApiError,
} from '@/lib/admin-api';
import type { AdminUser } from '@/types/admin';

interface UseAdminAuth {
  user: AdminUser | null;
  ready: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAdminAuth(requireAuth = false): UseAdminAuth {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Initial load */
  useEffect(() => {
    let alive = true;

    const token = getAdminToken();
    const cached = getAdminUser();

    if (!token) {
      setReady(true);
      if (requireAuth) router.replace('/admin/login');
      return;
    }

    if (cached) setUser(cached);
    setReady(true);

    // Verify with server (silent refresh of user info)
    adminMe()
      .then((u) => {
        if (!alive) return;
        setUser(u);
      })
      .catch((err: unknown) => {
        if (!alive) return;
        if (err instanceof AdminApiError && err.status === 401) {
          clearAdminSession();
          setUser(null);
          if (requireAuth) router.replace('/admin/login');
        }
      });

    return () => {
      alive = false;
    };
  }, [requireAuth, router]);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiLogin(username, password);
        setUser(res.user);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearAdminSession();
    setUser(null);
    router.replace('/admin/login');
  }, [router]);

  return { user, ready, loading, error, login, logout };
}