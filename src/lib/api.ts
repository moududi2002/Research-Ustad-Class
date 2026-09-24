// src/lib/api.ts

import type { PollPublicView, VoteResponse } from '@/types/poll';

/**
 * Base URL — same origin as the frontend.
 * In dev (localhost:3006), set NEXT_PUBLIC_API_BASE_URL to point at the backend.
 * In prod, Nginx proxies /api/* to the NestJS backend on the same domain.
 */
function apiBase(): string {
  const env = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (env && env.length > 0) return env.replace(/\/$/, '');
  return ''; // same-origin in prod
}

const BASE = apiBase();

/* ------------------------------------------------------------------ */
/* Poll                                                                 */
/* ------------------------------------------------------------------ */

export async function fetchPoll(
  slug: string,
  opts?: { signal?: AbortSignal; cache?: RequestCache },
): Promise<PollPublicView> {
  const res = await fetch(`${BASE}/api/polls/${encodeURIComponent(slug)}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    signal: opts?.signal,
    cache: opts?.cache ?? 'no-store',
  });

  if (res.status === 404) {
    throw new PollNotFoundError(slug);
  }
  if (!res.ok) {
    throw new Error(`Failed to load poll (${res.status})`);
  }

  const data = (await res.json()) as { success: boolean; poll: PollPublicView };
  if (!data.success || !data.poll) {
    throw new Error('Malformed poll response');
  }
  return data.poll;
}

/* ------------------------------------------------------------------ */
/* Vote                                                                 */
/* ------------------------------------------------------------------ */

export async function submitVote(
  slug: string,
  optionId: string,
  clientToken: string,
): Promise<{ ok: true; view: PollPublicView } | { ok: false; error: string; alreadyVoted?: boolean }> {
  try {
    const res = await fetch(
      `${BASE}/api/polls/${encodeURIComponent(slug)}/vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ optionId, clientToken }),
      },
    );

    const body = await res.json().catch(() => null);

    if (res.status === 201 || res.status === 200) {
      const typed = body as VoteResponse;
      return { ok: true, view: typed.view };
    }

    if (res.status === 409) {
      return {
        ok: false,
        alreadyVoted: true,
        error: 'You have already voted in this poll.',
      };
    }

    if (res.status === 403) {
      return { ok: false, error: 'Voting is closed for this poll.' };
    }

    const msg =
      (Array.isArray(body?.message) ? body.message[0] : body?.message) ||
      `Vote failed (${res.status})`;
    return { ok: false, error: String(msg) };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : 'Network error — please check your connection.',
    };
  }
}

/* ------------------------------------------------------------------ */
/* Errors                                                               */
/* ------------------------------------------------------------------ */

export class PollNotFoundError extends Error {
  constructor(public readonly slug: string) {
    super(`Poll not found: ${slug}`);
    this.name = 'PollNotFoundError';
  }
}