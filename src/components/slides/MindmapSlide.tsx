// src/components/slides/MindmapSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { MindmapSlide as MindmapSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: MindmapSlideType;
}

export default function MindmapSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Disciplines">{slide.title}</SlideHeading>

        {/* Centre */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-center text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md sm:h-24 sm:w-24 sm:text-sm"
        >
          {slide.centre}
        </motion.div>

        {/* Connector line (vertical, decorative) */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          style={{ transformOrigin: 'top' }}
          className="mx-auto h-8 w-px bg-border"
        />

        {/* Branch grid */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {slide.branches.map((branch, i) => (
            <motion.div
              key={branch.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50"
            >
              {branch.icon && (
                <span className="text-xl" aria-hidden>
                  {branch.icon}
                </span>
              )}
              <span className="font-serif text-sm font-medium leading-tight text-foreground sm:text-base">
                {branch.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}