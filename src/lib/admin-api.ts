// src/lib/admin-api.ts
'use client';

import type {
  AdminUser,
  LoginResponse,
} from '@/types/admin';
import type { PollPublicView } from '@/types/poll';

/* ------------------------------------------------------------------ */
/* Token storage                                                       */
/* ------------------------------------------------------------------ */

const TOKEN_KEY = 'ru.admin.token';
const USER_KEY = 'ru.admin.user';

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminSession(token: string, user: AdminUser): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    /* noop */
  }
}

export function getAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function clearAdminSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  } catch {
    /* noop */
  }
}

/* ------------------------------------------------------------------ */
/* Base URL                                                            */
/* ------------------------------------------------------------------ */

function apiBase(): string {
  const env = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (env && env.length > 0) return env.replace(/\/$/, '');
  return '';
}

const BASE = apiBase();

/* ------------------------------------------------------------------ */
/* Low-level fetch with auth                                           */
/* ------------------------------------------------------------------ */

interface ApiError {
  status: number;
  message: string;
  alreadyVoted?: boolean;
}

export class AdminApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'AdminApiError';
  }
}

async function authFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  const body = await res.json().catch(() => null);

  if (res.status === 401) {
    clearAdminSession();
    throw new AdminApiError(401, 'Session expired — please log in again');
  }

  if (!res.ok) {
    const msg =
      (Array.isArray(body?.message) ? body.message.join(', ') : body?.message) ||
      `Request failed (${res.status})`;
    throw new AdminApiError(res.status, String(msg));
  }

  return body as T;
}

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

export async function adminLogin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const msg =
      (Array.isArray(body?.message) ? body.message[0] : body?.message) ||
      'Login failed';
    throw new AdminApiError(res.status, String(msg));
  }

  const typed = body as LoginResponse;
  setAdminSession(typed.accessToken, typed.user);
  return typed;
}

export async function adminMe(): Promise<AdminUser> {
  const res = await authFetch<{ success: boolean; user: AdminUser }>(
    '/api/auth/me',
  );
  return res.user;
}

/* ------------------------------------------------------------------ */
/* Polls (admin)                                                       */
/* ------------------------------------------------------------------ */

export async function adminListPolls(workshopId?: string): Promise<PollPublicView[]> {
  const qs = workshopId ? `?workshopId=${encodeURIComponent(workshopId)}` : '';
  const res = await authFetch<{ success: boolean; polls: PollPublicView[] }>(
    `/api/polls${qs}`,
  );
  return res.polls;
}

export async function adminStartPoll(
  slug: string,
  durationSec?: number,
): Promise<PollPublicView> {
  const res = await authFetch<{ success: boolean; poll: PollPublicView }>(
    `/api/polls/${encodeURIComponent(slug)}/start`,
    {
      method: 'POST',
      body: JSON.stringify(durationSec ? { durationSec } : {}),
    },
  );
  return res.poll;
}

export async function adminEndPoll(slug: string): Promise<PollPublicView> {
  const res = await authFetch<{ success: boolean; poll: PollPublicView }>(
    `/api/polls/${encodeURIComponent(slug)}/end`,
    { method: 'POST' },
  );
  return res.poll;
}

export async function adminResetPoll(slug: string): Promise<PollPublicView> {
  const res = await authFetch<{ success: boolean; poll: PollPublicView }>(
    `/api/polls/${encodeURIComponent(slug)}/reset`,
    { method: 'POST' },
  );
  return res.poll;
}

export async function adminUpdatePoll(
  slug: string,
  dto: { question?: string; durationSec?: number },
): Promise<PollPublicView> {
  const res = await authFetch<{ success: boolean; poll: PollPublicView }>(
    `/api/polls/${encodeURIComponent(slug)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(dto),
    },
  );
  return res.poll;
}

export async function adminGetPoll(slug: string): Promise<PollPublicView> {
  const res = await authFetch<{ success: boolean; poll: PollPublicView }>(
    `/api/polls/${encodeURIComponent(slug)}`,
  );
  return res.poll;
}

export type { ApiError };

/* ------------------------------------------------------------------ */
/* Attendance (admin)                                                 */
/* ------------------------------------------------------------------ */

export interface AttendanceStats {
  enabled: boolean;
  totalAttendance: number;
}

export async function adminGetAttendanceStats(): Promise<AttendanceStats> {
  return authFetch<AttendanceStats>('/api/attendance/admin/stats');
}

export async function adminOpenAttendance(): Promise<{
  success: boolean;
  enabled: boolean;
}> {
  return authFetch('/api/attendance/admin/open', {
    method: 'POST',
  });
}

export async function adminCloseAttendance(): Promise<{
  success: boolean;
  enabled: boolean;
}> {
  return authFetch('/api/attendance/admin/close', {
    method: 'POST',
  });
}