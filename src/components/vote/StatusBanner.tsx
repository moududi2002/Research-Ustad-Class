// src/components/vote/StatusBanner.tsx
'use client';

import { FiClock, FiLoader, FiWifiOff } from 'react-icons/fi';
import type { PollStatus } from '@/types/poll';
import { cn } from '@/lib/utils';

interface Props {
  status: PollStatus;
  connection: 'connecting' | 'live' | 'offline';
}

export default function StatusBanner({ status, connection }: Props) {
  if (connection === 'offline') {
    return (
      <Banner
        tone="warning"
        icon={<FiWifiOff className="h-4 w-4" />}
        label="Reconnecting…"
      />
    );
  }
  if (connection === 'connecting') {
    return (
      <Banner
        tone="muted"
        icon={<FiLoader className="h-4 w-4 animate-spin" />}
        label="Connecting…"
      />
    );
  }
  if (status === 'idle') {
    return (
      <Banner
        tone="muted"
        icon={<FiClock className="h-4 w-4" />}
        label="Waiting for the presenter to start"
      />
    );
  }
  if (status === 'closed') {
    return (
      <Banner tone="closed" label="Voting has ended — thank you" />
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */

function Banner({
  tone,
  icon,
  label,
}: {
  tone: 'muted' | 'warning' | 'closed';
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto mb-5 flex max-w-md items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium',
        tone === 'muted' &&
          'border-border bg-surface text-foreground-muted',
        tone === 'warning' &&
          'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300',
        tone === 'closed' &&
          'border-accent/40 bg-accent-soft text-accent',
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}