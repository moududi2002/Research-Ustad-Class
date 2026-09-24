// src/components/slides/_shared/SlideBullet.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FiCheck } from 'react-icons/fi';

interface Props {
  children: ReactNode;
  /** delay in seconds for staggered entrance */
  delay?: number;
  /** icon override; default = check */
  icon?: ReactNode;
}

export default function SlideBullet({ children, delay = 0, icon }: Props) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay }}
      className="flex items-start gap-3 text-base leading-relaxed text-foreground-muted sm:text-lg"
    >
      <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
        {icon ?? <FiCheck className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span>{children}</span>
    </motion.li>
  );
}