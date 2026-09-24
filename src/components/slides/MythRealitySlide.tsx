// src/components/slides/MythRealitySlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import type { MythRealitySlide as MythRealitySlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: MythRealitySlideType;
}

export default function MythRealitySlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Myth vs Reality">{slide.title}</SlideHeading>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Myths column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-danger/10 text-danger">
                <FiX className="h-4 w-4" strokeWidth={3} />
              </span>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Common Myths
              </h3>
            </div>

            <ul className="space-y-2">
              {slide.myths.map((myth, i) => (
                <motion.li
                  key={myth}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground-muted sm:text-base"
                >
                  <FiX className="mt-0.5 h-4 w-4 shrink-0 text-danger/70" />
                  <span className="line-through decoration-danger/40 decoration-1">
                    {myth}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Reality column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + slide.myths.length * 0.08,
            }}
            className="flex"
          >
            <div className="flex w-full flex-col justify-center rounded-2xl border border-accent/40 bg-accent-soft/50 p-6 shadow-sm sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
                  <FiCheck className="h-4 w-4" strokeWidth={3} />
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  The Reality
                </h3>
              </div>
              <p className="font-serif text-lg italic leading-relaxed text-foreground sm:text-xl">
                “{slide.reality}”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}