// src/components/slides/RoadmapSlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import type { RoadmapSlide as RoadmapSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: RoadmapSlideType;
}

export default function RoadmapSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Your Next Steps">{slide.title}</SlideHeading>

        <ol className="mt-10 max-w-3xl space-y-3">
          {slide.items.map((item, i) => (
            <motion.li
              key={item.when}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm transition-all hover:border-accent/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <FiArrowRight className="h-4 w-4" />
              </span>

              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {item.when}
                </span>
                <span className="text-sm leading-relaxed text-foreground sm:text-base">
                  {item.action}
                </span>
              </div>
            </motion.li>
          ))}
        </ol>

        {slide.closing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + slide.items.length * 0.1 + 0.25,
            }}
            className="mt-8 rounded-2xl border-l-4 border-accent bg-accent-soft/40 px-6 py-5"
          >
            <p className="font-serif text-base italic leading-relaxed text-foreground sm:text-lg">
              {slide.closing}
            </p>
          </motion.div>
        )}
      </div>
    </SlideShell>
  );
}