// src/components/slides/EcosystemSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { EcosystemSlide as EcosystemSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: EcosystemSlideType;
}

export default function EcosystemSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading
          eyebrow="Ecosystem"
          subtitle={slide.subtitle}
          align="center"
        >
          {slide.title}
        </SlideHeading>

        {/* Centre badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-10 flex h-24 w-24 items-center justify-center rounded-full bg-accent p-3 text-center font-serif text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md sm:h-28 sm:w-28 sm:text-sm"
        >
          {slide.centre}
        </motion.div>

        {/* Connector line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{ transformOrigin: 'top' }}
          className="mx-auto h-8 w-px bg-border"
        />

        {/* Nodes */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {slide.nodes.map((node, i) => (
            <motion.div
              key={node}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
              className="flex items-center justify-center rounded-2xl border border-border bg-surface px-5 py-4 text-center font-serif text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/50 sm:text-base"
            >
              {node}
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}