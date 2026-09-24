// src/components/slides/FlowSlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import type { FlowSlide as FlowSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: FlowSlideType;
}

export default function FlowSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Concept">{slide.title}</SlideHeading>

        {slide.definition && (
          <motion.blockquote
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 max-w-3xl border-l-4 border-accent bg-accent-soft/40 px-6 py-4 font-serif text-base italic leading-relaxed text-foreground sm:text-lg"
          >
            {slide.definition}
          </motion.blockquote>
        )}

        {/* Flow steps */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {slide.steps.map((step, i) => {
            const isLast = i === slide.steps.length - 1;
            return (
              <div key={step} className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  className="flex min-w-[120px] items-center justify-center rounded-2xl border border-border bg-surface px-5 py-4 text-center shadow-sm sm:min-w-[140px]"
                >
                  <span className="font-serif text-base font-medium text-foreground sm:text-lg">
                    {step}
                  </span>
                </motion.div>

                {!isLast && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.12 }}
                    className="text-accent"
                  >
                    <FiArrowRight className="h-5 w-5" />
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>

        {slide.caption && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + slide.steps.length * 0.12 + 0.2,
            }}
            className="mt-12 max-w-2xl text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.caption}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}