// src/components/admin/PollCard.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiSquare,
  FiRotateCcw,
  FiUsers,
  FiClock,
  FiExternalLink,
  FiCheck,
} from 'react-icons/fi';
import type { PollPublicView } from '@/types/poll';
import DurationSelect from './DurationSelect';

interface Props {
  poll: PollPublicView;
  pending: boolean;
  onStart: (slug: string, durationSec?: number) => void;
  onEnd: (slug: string) => void;
  onReset: (slug: string) => void;
}

export default function PollCard({
  poll,
  pending,
  onStart,
  onEnd,
  onReset,
}: Props) {
  const [duration, setDuration] = useState(poll.durationSec);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    setDuration(poll.durationSec);
  }, [poll.durationSec]);

  useEffect(() => {
    if (poll.status !== 'active' || !poll.endsAt) {
      setSecondsLeft(null);
      return;
    }
    const tick = () => {
      const end = new Date(poll.endsAt!).getTime();
      setSecondsLeft(Math.max(0, Math.floor((end - Date.now()) / 1000)));
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, [poll.status, poll.endsAt]);

  const isActive = poll.status === 'active';
  const isClosed = poll.status === 'closed';
  const isIdle = poll.status === 'idle';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-accent/40"
    >
      {/* Top row: slug + status */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground-subtle">
            {poll.slug}
          </p>
          <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-foreground">
            {poll.question}
          </h3>
          <p className="mt-1 text-xs text-foreground-subtle">
            {poll.options.length} options · Workshop: {poll.workshopId}
          </p>
        </div>

        <StatusBadge status={poll.status} />
      </div>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-foreground-muted">
          <FiUsers className="h-3.5 w-3.5" />
          <span className="font-mono tabular-nums">{poll.totalVotes}</span>
          <span className="text-foreground-subtle">
            {poll.totalVotes === 1 ? 'vote' : 'votes'}
          </span>
        </span>

        {isActive && secondsLeft !== null && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono tabular-nums ${
              secondsLeft <= 10
                ? 'border-danger/40 bg-danger/10 text-danger'
                : 'border-border bg-background text-foreground-muted'
            }`}
          >
            <FiClock className="h-3.5 w-3.5" />
            {String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:
            {String(secondsLeft % 60).padStart(2, '0')}
          </span>
        )}

        <Link
          href={`/vote/${poll.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-foreground-muted transition-colors hover:border-accent hover:text-accent"
        >
          <FiExternalLink className="h-3.5 w-3.5" />
          Vote page
        </Link>
      </div>

      {/* Mini results preview */}
      {poll.totalVotes > 0 && (
        <div className="mt-4 space-y-1.5">
          {poll.options.map((opt) => {
            const count = poll.counts[opt.id] ?? 0;
            const percent =
              poll.totalVotes > 0 ? (count / poll.totalVotes) * 100 : 0;
            return (
              <div key={opt.id} className="flex items-center gap-2 text-xs">
                <span className="w-24 truncate text-foreground-muted">
                  {opt.label}
                </span>
                <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-surface-muted">
                  <motion.div
                    initial={false}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-accent"
                  />
                </div>
                <span className="w-8 shrink-0 text-right font-mono tabular-nums text-foreground-subtle">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {isIdle || isClosed ? (
          <>
            <DurationSelect
              value={duration}
              onChange={setDuration}
              disabled={pending}
            />
            <button
              type="button"
              disabled={pending}
              onClick={() => onStart(poll.slug, duration)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              <FiPlay className="h-3.5 w-3.5" />
              {isClosed ? 'Restart' : 'Start'}
            </button>
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent">
            <FiCheck className="h-3.5 w-3.5" />
            Running · ends automatically
          </span>
        )}

        {isActive && (
          <button
            type="button"
            disabled={pending}
            onClick={() => onEnd(poll.slug)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:border-danger hover:text-danger disabled:opacity-60"
          >
            <FiSquare className="h-3.5 w-3.5" />
            End now
          </button>
        )}

        <button
          type="button"
          disabled={pending}
          onClick={() => onReset(poll.slug)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:border-amber-500 hover:text-amber-600 disabled:opacity-60"
          title="Deletes all votes and sets poll to idle"
        >
          <FiRotateCcw className="h-3.5 w-3.5" />
          Reset (delete votes)
        </button>

        {pending && (
          <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-border border-t-accent" />
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: PollPublicView['status'] }) {
  const config = {
    idle: {
      label: 'Idle',
      classes: 'border-border bg-surface-muted text-foreground-subtle',
    },
    active: {
      label: 'Active',
      classes: 'border-accent/40 bg-accent-soft text-accent',
    },
    closed: {
      label: 'Closed',
      classes: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    },
  }[status];

  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${config.classes}`}
    >
      {config.label}
    </span>
  );
}