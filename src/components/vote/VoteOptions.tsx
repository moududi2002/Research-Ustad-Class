// src/components/vote/VoteOptions.tsx
'use client';

import { useState } from 'react';
import LiveBar from './LiveBar';
import type { PollOptionView } from '@/types/poll';

interface Props {
  options: PollOptionView[];
  counts: Record<string, number>;
  totalVotes: number;
  voted: boolean;
  votedOptionId: string | null;
  disabled: boolean;
  submitting: boolean;
  onSelect: (optionId: string, customLabel?: string) => void;
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
  const [customLabel, setCustomLabel] = useState('');

  const interactive = !voted && !disabled && !submitting;

  return (
    <ul className="space-y-3">
      {options.map((opt) => (
        <li key={opt.id}>
          {opt.id === 'other' && !voted ? (
            <div className="rounded-xl border border-border bg-surface p-4">
              <label
                htmlFor="custom-department"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Other / Not Listed
              </label>

              <input
                id="custom-department"
                type="text"
                value={customLabel}
                onChange={(event) => setCustomLabel(event.target.value)}
                maxLength={100}
                placeholder="Enter your department name"
                disabled={!interactive}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-accent disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => onSelect('other', customLabel.trim())}
                disabled={
                  !interactive || customLabel.trim().length < 2
                }
                className="mt-3 w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Submit department'}
              </button>
            </div>
          ) : (
            <LiveBar
              option={opt}
              count={counts[opt.id] ?? 0}
              totalVotes={totalVotes}
              interactive={interactive && opt.id !== 'other'}
              selected={voted && votedOptionId === opt.id}
              onClick={() => onSelect(opt.id)}
              disabled={!interactive || opt.id === 'other'}
            />
          )}
        </li>
      ))}
    </ul>
  );
}