// src/components/slides/WarningCardsSlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';
import type { WarningCardsSlide as WarningCardsSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: WarningCardsSlideType;
}

export default function WarningCardsSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Avoid These">{slide.title}</SlideHeading>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {slide.cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="flex gap-4 rounded-2xl border border-red-500/25 bg-red-500/5 p-5 shadow-sm transition-all hover:border-red-500/50 hover:bg-red-500/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
                <FiAlertTriangle className="h-4 w-4" />
              </span>

              <div>
                <h3 className="font-serif text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}