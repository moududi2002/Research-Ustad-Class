// backend/src/polls/dto/poll-response.dto.ts

/**
 * Shape returned to public consumers — hides internal fields.
 * Used by GET /polls/:slug and real-time gateway.
 */
export interface PollPublicView {
  id: string;
  slug: string;
  workshopId: string;
  question: string;
  options: { id: string; label: string }[];
  status: 'idle' | 'active' | 'closed';
  durationSec: number;
  startedAt: string | null;
  endsAt: string | null;
  totalVotes: number;
  counts: Record<string, number>; // { opt1: 5, opt2: 3, ... }
}