// backend/src/common/utils/device-hash.util.ts

import { createHash } from 'crypto';
import type { Request } from 'express';

/**
 * Combines IP + User-Agent + salt into a stable, non-reversible hash.
 * Used to deduplicate votes per device without storing any PII.
 */
export function computeDeviceHash(
  req: Request,
  salt: string,
): string {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const ua = req.headers['user-agent'] ?? 'unknown';

  const raw = `${ip}|${ua}|${salt}`;
  return createHash('sha256').update(raw).digest('hex');
}