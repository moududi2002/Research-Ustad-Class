// src/lib/device.ts
'use client';

const TOKEN_KEY = 'ru.device.token';
const VOTED_PREFIX = 'ru.voted.';

/**
 * Persistent anonymous device token, stored in localStorage.
 * Used as an additional dedupe signal alongside the server's deviceHash.
 */
export function getOrCreateClientToken(): string {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.localStorage.getItem(TOKEN_KEY);
    if (existing) return existing;

    const token = generateUuid();
    window.localStorage.setItem(TOKEN_KEY, token);
    return token;
  } catch {
    // localStorage unavailable (private mode, etc.)
    return generateUuid();
  }
}

export function hasVotedLocally(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(VOTED_PREFIX + slug) === '1';
  } catch {
    return false;
  }
}

export function markVotedLocally(slug: string, optionId: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(VOTED_PREFIX + slug, '1');
    window.localStorage.setItem(`${VOTED_PREFIX}${slug}.option`, optionId);
  } catch {
    /* noop */
  }
}

export function getLocalVote(slug: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(`${VOTED_PREFIX}${slug}.option`);
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */

function generateUuid(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }
  // Fallback (older browsers)
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}