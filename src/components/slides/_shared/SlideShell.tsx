// src/components/slides/_shared/SlideShell.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  /** full-bleed = no max-width, no padding (used by CoverSlide) */
  variant?: 'padded' | 'full-bleed';
  className?: string;
}

export default function SlideShell({
  children,
  variant = 'padded',
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={cn(
        'flex min-h-full w-full',
        variant === 'padded' && 'items-center justify-center',
        className,
      )}
    >
      {variant === 'padded' ? (
        <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
}