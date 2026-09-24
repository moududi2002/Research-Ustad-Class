// src/components/viewer/ProgressBar.tsx
'use client';

import { motion } from 'framer-motion';

interface Props {
  current: number; // 1-based
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const percent = (current / total) * 100;

  return (
    <div className="absolute inset-x-0 top-0 z-30 h-0.5 bg-border/60">
      <motion.div
        className="h-full bg-accent"
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </div>
  );
}