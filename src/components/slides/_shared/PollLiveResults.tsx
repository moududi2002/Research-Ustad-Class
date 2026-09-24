// src/components/slides/_shared/PollLiveResults.tsx
'use client';

import { motion } from 'framer-motion';

interface Option {
  id: string;
  label: string;
}

interface Props {
  options: Option[];
  counts: Record<string, number>;
  totalVotes: number;
  /** When true, bars are compact (for slide layout). */
  compact?: boolean;
}

const COLORS = [
  'bg-teal-600 dark:bg-teal-500',
  'bg-emerald-600 dark:bg-emerald-500',
  'bg-amber-600 dark:bg-amber-500',
  'bg-indigo-600 dark:bg-indigo-500',
  'bg-rose-600 dark:bg-rose-500',
  'bg-sky-600 dark:bg-sky-500',
];

export default function PollLiveResults({
  options,
  counts,
  totalVotes,
  compact = false,
}: Props) {
  const maxCount = Math.max(1, ...options.map((o) => counts[o.id] ?? 0));

  return (
    <ul className={compact ? 'space-y-2' : 'space-y-3'}>
      {options.map((opt, i) => {
        const count = counts[opt.id] ?? 0;
        const percent = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
        const widthPercent = (count / maxCount) * 100;

        return (
          <li key={opt.id} className="flex items-center gap-3">
            <span
              className={`w-28 shrink-0 truncate text-xs font-medium text-foreground-muted sm:w-40 sm:text-sm ${
                compact ? 'sm:w-32' : ''
              }`}
            >
              {opt.label}
            </span>

            <div
              className={`relative flex-1 overflow-hidden rounded-full bg-surface-muted ${
                compact ? 'h-6' : 'h-7'
              }`}
            >
              <motion.div
                initial={false}
                animate={{ width: `${widthPercent}%` }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className={`h-full ${COLORS[i % COLORS.length]}`}
              />
              {/* count overlay */}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[11px] font-semibold tabular-nums text-foreground-muted">
                {count}
              </span>
            </div>

            <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-foreground-subtle">
              {Math.round(percent)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}