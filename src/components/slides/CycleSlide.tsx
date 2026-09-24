// src/components/slides/CycleSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { CycleSlide as CycleSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: CycleSlideType;
}

export default function CycleSlide({ slide }: Props) {
  const count = slide.steps.length;

  /* Trigonometry — place steps evenly around a circle */
  const radius = 38; // percent of container radius
  const center = 50;

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading
          eyebrow="Cycle"
          subtitle={slide.subtitle}
        >
          {slide.title}
        </SlideHeading>

        {/* Cycle diagram */}
        <div className="mx-auto mt-10 flex aspect-square w-full max-w-[520px] items-center justify-center">
          <div className="relative h-full w-full">
            {/* Outer circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-border"
            />

            {/* Centre */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-center text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md sm:h-28 sm:w-28 sm:text-sm"
            >
              Research
            </motion.div>

            {/* Steps around the circle */}
            {slide.steps.map((step, i) => {
              const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
              const x = center + radius * Math.cos(angle);
              const y = center + radius * Math.sin(angle);

              return (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35 + i * 0.08,
                  }}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                  }}
                  className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface px-2 text-center text-[11px] font-medium leading-tight text-foreground shadow-sm sm:h-20 sm:w-20 sm:text-xs"
                >
                  <span className="line-clamp-2">{step}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {slide.caption && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.35 + count * 0.08 + 0.2,
            }}
            className="mx-auto mt-10 max-w-2xl text-center text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.caption}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}