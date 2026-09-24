// src/components/vote/CountdownBadge.tsx
'use client';

import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

interface Props {
  seconds: number | null;
}

export default function CountdownBadge({ seconds }: Props) {
  if (seconds === null) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const danger = seconds <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium tabular-nums ${
        danger
          ? 'border-danger/40 bg-danger/10 text-danger'
          : 'border-border bg-surface text-foreground-muted'
      }`}
    >
      <FiClock className="h-4 w-4" />
      <span>
        {mm}:{ss}
      </span>
      {danger && <span className="text-xs uppercase tracking-wider">ending</span>}
    </motion.div>
  );
}