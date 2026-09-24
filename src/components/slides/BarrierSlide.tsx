// src/components/slides/BarrierSlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import type { BarrierSlide as BarrierSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: BarrierSlideType;
}

export default function BarrierSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Reality Check" subtitle={slide.intro}>
          {slide.title}
        </SlideHeading>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {slide.barriers.map((barrier, i) => (
            <motion.div
              key={barrier}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="flex items-center gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/5 px-5 py-4 text-foreground-muted shadow-sm transition-all hover:border-amber-500/50 hover:bg-amber-500/10"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <FiAlertCircle className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-foreground sm:text-base">
                {barrier}
              </span>
            </motion.div>
          ))}
        </div>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + slide.barriers.length * 0.07 + 0.2,
            }}
            className="mt-10 max-w-2xl border-l-2 border-amber-500/60 pl-4 text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.footnote}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}