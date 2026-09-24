// src/components/slides/TimelineSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { TimelineSlide as TimelineSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: TimelineSlideType;
}

export default function TimelineSlide({ slide }: Props) {
  const total = slide.steps.length;

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading
          eyebrow="Roadmap"
          subtitle={slide.subtitle}
        >
          {slide.title}
        </SlideHeading>

        {/* Desktop / tablet horizontal timeline */}
        <div className="relative mt-14 hidden lg:block">
          {/* Connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            style={{ transformOrigin: 'left' }}
            className="absolute left-0 right-0 top-6 h-0.5 bg-border"
          />

          <ol className="relative grid gap-6" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
            {slide.steps.map((step, i) => (
              <motion.li
                key={step.label + i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-background font-serif text-base font-semibold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-serif text-base font-semibold text-foreground">
                  {step.label}
                </h3>
                {step.caption && (
                  <p className="mt-2 max-w-[16ch] text-xs leading-relaxed text-foreground-muted">
                    {step.caption}
                  </p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <ol className="relative mt-10 space-y-6 lg:hidden">
          {/* vertical connector */}
          <span
            aria-hidden
            className="absolute left-6 top-4 bottom-4 w-0.5 bg-border"
          />

          {slide.steps.map((step, i) => (
            <motion.li
              key={step.label + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.1 }}
              className="relative flex gap-5"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background font-serif text-base font-semibold text-accent">
                {i + 1}
              </span>
              <div className="pt-2">
                <h3 className="font-serif text-base font-semibold text-foreground sm:text-lg">
                  {step.label}
                </h3>
                {step.caption && (
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                    {step.caption}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </SlideShell>
  );
}