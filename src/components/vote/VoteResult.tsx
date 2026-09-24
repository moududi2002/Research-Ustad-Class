// src/components/vote/VoteResult.tsx
'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

interface Props {
  optionLabel: string | null;
  totalVotes: number;
}

export default function VoteResult({ optionLabel, totalVotes }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-5 rounded-2xl border border-accent/40 bg-accent-soft/40 px-5 py-4"
    >
      <div className="flex items-start gap-3">
        <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div>
          <p className="font-serif text-base font-semibold text-foreground">
            Thank you — your vote is counted.
          </p>
          {optionLabel && (
            <p className="mt-1 text-sm text-foreground-muted">
              You voted: <strong className="text-foreground">{optionLabel}</strong>
            </p>
          )}
          <p className="mt-1 text-xs text-foreground-subtle tabular-nums">
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} so far
          </p>
        </div>
      </div>
    </motion.div>
  );
}