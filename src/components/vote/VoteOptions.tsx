// src/components/vote/VoteOptions.tsx
'use client';

import LiveBar from './LiveBar';
import type { PollOptionView } from '@/types/poll';

interface Props {
  options: PollOptionView[];
  counts: Record<string, number>;
  totalVotes: number;
  /** If the user has already voted, we show results (no tap). */
  voted: boolean;
  votedOptionId: string | null;
  /** If poll is closed, tap disabled. */
  disabled: boolean;
  submitting: boolean;
  onSelect: (optionId: string) => void;
}

export default function VoteOptions({
  options,
  counts,
  totalVotes,
  voted,
  votedOptionId,
  disabled,
  submitting,
  onSelect,
}: Props) {
  const interactive = !voted && !disabled && !submitting;

  return (
    <ul className="space-y-3">
      {options.map((opt) => (
        <li key={opt.id}>
          <LiveBar
            option={opt}
            count={counts[opt.id] ?? 0}
            totalVotes={totalVotes}
            interactive={interactive}
            selected={voted && votedOptionId === opt.id}
            onClick={() => onSelect(opt.id)}
            disabled={!interactive}
          />
        </li>
      ))}
    </ul>
  );
}