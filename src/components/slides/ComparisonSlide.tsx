// src/components/slides/ComparisonSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { ComparisonSlide as ComparisonSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';
import { cn } from '@/lib/utils';

interface Props {
  slide: ComparisonSlideType;
}

export default function ComparisonSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Case Study" subtitle={slide.subtitle}>
          {slide.title}
        </SlideHeading>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <SideCard side={slide.left} index={0} />
          <SideCard side={slide.right} index={1} />
        </div>

        {slide.conclusion && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 rounded-2xl border-l-4 border-accent bg-accent-soft/40 px-6 py-5"
          >
            <p className="font-serif text-sm italic leading-relaxed text-foreground sm:text-base">
              {slide.conclusion}
            </p>
          </motion.div>
        )}
      </div>
    </SlideShell>
  );
}

/* ------------------------------------------------------------------ */
/* Side card                                                           */
/* ------------------------------------------------------------------ */

interface SideCardProps {
  side: ComparisonSlideType['left'];
  index: number;
}

function SideCard({ side, index }: SideCardProps) {
  const isHighlight = Boolean(side.highlight);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 + index * 0.15 }}
      className={cn(
        'rounded-2xl border bg-surface p-6 shadow-sm',
        isHighlight
          ? 'border-accent shadow-md ring-1 ring-accent/20'
          : 'border-border',
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
          {side.heading}
        </h3>

        {isHighlight && (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
            Stronger
          </span>
        )}
      </div>

      <dl className="mt-5 space-y-3 text-sm sm:text-base">
        {side.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-b-0 last:pb-0"
          >
            <dt className="text-xs font-medium uppercase tracking-wider text-foreground-subtle">
              {row.label}
            </dt>
            <dd
              className={cn(
                'text-right font-medium',
                isHighlight ? 'text-foreground' : 'text-foreground-muted',
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}