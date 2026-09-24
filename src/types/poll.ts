// src/types/poll.ts
// Mirrors backend's PollPublicView (kept in sync manually).

export type PollStatus = 'idle' | 'active' | 'closed';

export interface PollOptionView {
  id: string;
  label: string;
}

export interface PollPublicView {
  id: string;
  slug: string;
  workshopId: string;
  question: string;
  options: PollOptionView[];
  status: PollStatus;
  durationSec: number;
  startedAt: string | null;
  endsAt: string | null;
  totalVotes: number;
  counts: Record<string, number>;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string | string[];
  errorCode?: string;
  path?: string;
  timestamp?: string;
  /** success payload varies by endpoint */
  poll?: T;
  view?: T;
}

export type VoteResponse = {
  success: true;
  view: PollPublicView;
};