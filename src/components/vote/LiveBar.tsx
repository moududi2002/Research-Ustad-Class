// src/components/vote/LiveBar.tsx
'use client';

import { motion } from 'framer-motion';
import type { PollOptionView } from '@/types/poll';

interface Props {
  option: PollOptionView;
  count: number;
  totalVotes: number;
  /** disable hover/pointer when not active */
  interactive?: boolean;
  /** show checkmark on this option */
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const COLORS = [
  'bg-teal-600 dark:bg-teal-500',
  'bg-emerald-600 dark:bg-emerald-500',
  'bg-amber-600 dark:bg-amber-500',
  'bg-indigo-600 dark:bg-indigo-500',
  'bg-rose-600 dark:bg-rose-500',
  'bg-sky-600 dark:bg-sky-500',
];

export default function LiveBar({
  option,
  count,
  totalVotes,
  interactive = false,
  selected = false,
  onClick,
  disabled = false,
}: Props) {
  const percent = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
  const barColor = COLORS[colorIndexFromId(option.id) % COLORS.length];

  const content = (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface">
      {/* Fill */}
      <motion.div
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`absolute inset-y-0 left-0 ${barColor} opacity-15 dark:opacity-25`}
        aria-hidden
      />

      {/* Content */}
      <div className="relative flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          {interactive && (
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                selected
                  ? 'border-accent bg-accent'
                  : 'border-border bg-surface'
              }`}
              aria-hidden
            >
              {selected && (
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3 fill-white"
                  aria-hidden
                >
                  <path d="M10.5 3.5l-5.5 5.5-3-3 1-1 2 2 4.5-4.5z" />
                </svg>
              )}
            </span>
          )}
          <span className="text-sm font-medium text-foreground sm:text-base">
            {option.label}
          </span>
        </div>

        <div className="flex items-center gap-2 tabular-nums">
          <span className="text-xs text-foreground-subtle sm:text-sm">
            {Math.round(percent)}%
          </span>
          <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs font-semibold text-foreground-muted sm:text-sm">
            {count}
          </span>
        </div>
      </div>
    </div>
  );

  if (!interactive) return content;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className="w-full text-left transition-transform active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-80"
    >
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */

function colorIndexFromId(id: string): number {
  let n = 0;
  for (let i = 0; i < id.length; i++) n = (n + id.charCodeAt(i)) % 1000;
  return n;
}