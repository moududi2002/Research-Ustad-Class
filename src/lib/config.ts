// src/lib/config.ts

/**
 * Centralised access to public runtime config so we can fall back gracefully.
 * All NEXT_PUBLIC_* values are inlined at build time.
 */

function clean(value: string | undefined): string | null {
  if (!value) return null;
  const v = value.trim();
  return v.length > 0 ? v.replace(/\/$/, '') : null;
}

export const PUBLIC_CONFIG = {
  apiBaseUrl: clean(process.env.NEXT_PUBLIC_API_BASE_URL),
  socketUrl: clean(process.env.NEXT_PUBLIC_SOCKET_URL),
  socketPath: process.env.NEXT_PUBLIC_SOCKET_PATH || '/socket.io',
  voteBaseUrl: clean(process.env.NEXT_PUBLIC_VOTE_BASE_URL),
};

/**
 * Returns the absolute URL of the vote page for a given slug.
 * Uses (in order): slide override → env → window.origin → localhost fallback.
 */
export function resolveVoteUrl(
  slug: string,
  slideOverride?: string,
): string {
  const base =
    clean(slideOverride) ||
    PUBLIC_CONFIG.voteBaseUrl ||
    (typeof window !== 'undefined' ? `${window.location.origin}/vote` : null) ||
    'http://localhost:3006/vote';

  return `${base}/${encodeURIComponent(slug)}`;
}