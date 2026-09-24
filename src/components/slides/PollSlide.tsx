// src/components/slides/PollSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { PollSlide as PollSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: PollSlideType;
}

const BAR_COLORS = [
  'bg-teal-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-indigo-500',
  'bg-rose-500',
  'bg-sky-500',
];

export default function PollSlide({ slide }: Props) {
  const maxWeight = Math.max(...slide.options.map((o) => o.weight), 1);

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Ice Breaker">{slide.title}</SlideHeading>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-foreground sm:text-xl"
        >
          “{slide.question}”
        </motion.p>

        {/* Poll bars */}
        <ul className="mt-10 space-y-4">
          {slide.options.map((option, i) => {
            const widthPercent = (option.weight / maxWeight) * 100;
            return (
              <li key={option.label} className="flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm font-medium text-foreground-muted sm:w-40 sm:text-base">
                  {option.label}
                </span>

                <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-surface-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPercent}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 + i * 0.1,
                      ease: 'easeOut',
                    }}
                    className={`h-full ${BAR_COLORS[i % BAR_COLORS.length]}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10 max-w-2xl text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.footnote}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}