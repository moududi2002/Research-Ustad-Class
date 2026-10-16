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
  const branches = slide.branches;
  const midpoint = Math.ceil(branches.length / 2);

  const topBranches = branches.slice(0, midpoint);
  const bottomBranches = branches.slice(midpoint);

  const renderBranch = (
    branch: MindmapSlideType['branches'][number],
    index: number,
    position: 'top' | 'bottom',
  ) => (
    <motion.div
      key={`${position}-${branch.label}`}
      initial={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.35 + index * 0.07,
      }}
      className={`relative flex min-w-0 flex-col items-center ${
        position === 'top' ? 'pb-8' : 'pt-8'
      }`}
    >
      {/* Branch connector */}
      <div
        className={`absolute left-1/2 h-8 w-[2px] -translate-x-1/2 bg-border ${
          position === 'top' ? 'bottom-0' : 'top-0'
        }`}
      />

      {/* Branch circle */}
      <div className="flex aspect-square w-full max-w-[165px] flex-col items-center justify-center gap-2 rounded-full border border-border bg-surface p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 sm:max-w-[140px]">
        {branch.icon && (
          <span
            className="text-xl sm:text-2xl"
            aria-hidden="true"
          >
            {branch.icon}
          </span>
        )}

        <span className="font-serif text-xs font-medium leading-tight text-foreground sm:text-sm md:text-base">
          {branch.label}
        </span>
      </div>
    </motion.div>
  );

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Disciplines">
          {slide.title}
        </SlideHeading>

        {/* Center node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10 mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-accent px-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-md sm:h-34 sm:w-34 sm:text-sm"
        >
          {slide.centre}
        </motion.div>

        {/* Mindmap grid */}
        <div className="relative mx-auto mt-8 w-full">
          {/* Center vertical connector:
              Ends exactly at the horizontal connector */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="absolute left-1/2 top-[-32px] z-0 h-[calc(50%+32px)] w-[2px] origin-top -translate-x-1/2 bg-border"
          />

          {/* Top row */}
          <div className="relative grid grid-cols-2 items-end gap-x-3 sm:grid-cols-4 sm:gap-x-5">
            {topBranches.map((branch, index) =>
              renderBranch(branch, index, 'top'),
            )}
          </div>

          {/* Horizontal connector */}
          {branches.length > 0 && (
            <div className="relative z-10 h-[2px] w-full bg-border">
              {/* Center joint */}
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border" />
            </div>
          )}

          {/* Bottom row */}
          <div className="relative grid grid-cols-2 items-start gap-x-3 sm:grid-cols-4 sm:gap-x-5">
            {bottomBranches.map((branch, index) =>
              renderBranch(branch, index, 'bottom'),
            )}
          </div>
        </div>

        {/* Caption */}
        {slide.caption && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + branches.length * 0.07,
            }}
            className="mx-auto mt-8 max-w-2xl text-center text-sm font-semibold italic leading-relaxed text-foreground-subtle sm:text-base"
          >
            {slide.caption}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}
