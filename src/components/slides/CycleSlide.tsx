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
  const radius = 46; // percent of container radius
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
              animate={{ opacity: 5, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -inset-11 rounded-full border-2 border-dashed border-border"
            />

            {/* Connection lines */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Straight lines: Center to each step */}
              {slide.steps.map((step, i) => {
                const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);

                return (
                  <line
                    key={`line-${i}`}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.5"
                    strokeWidth="0.56"
                  />
                );
              })}

              {/* Curved lines: Each step to the next step */}
              {slide.steps.map((step, i) => {
                const angle1 = (i / count) * 2 * Math.PI - Math.PI / 2;
                const angle2 =
                  ((i + 1) / count) * 2 * Math.PI - Math.PI / 2;

                const x1 = center + radius * Math.cos(angle1);
                const y1 = center + radius * Math.sin(angle1);

                const x2 = center + radius * Math.cos(angle2);
                const y2 = center + radius * Math.sin(angle2);

                // Control point: inward curve
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;

                const controlX = center + (midX - center) * 1;
                const controlY = center + (midY - center) * 1;

                return (
                  <path
                    key={`curve-${i}`}
                    d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`}
                    fill="none"
                    stroke="#12866d"
                    strokeWidth="0.6"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {/* Centre */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute z-10 left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-center text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md sm:h-28 sm:w-28 sm:text-sm"
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
                  className="absolute z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface px-2 text-center text-xs font-medium leading-tight text-foreground shadow-sm sm:h-28 sm:w-28 sm:text-sm"
                >
                  <span className="line-clamp-2 whitespace-pre-line">{step}</span>
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
            className="mx-auto mt-15 max-w-2xl text-center text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.caption}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}