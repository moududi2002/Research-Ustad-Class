// src/components/slides/AchievementCardsSlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import type { AchievementCardsSlide as AchievementCardsSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: AchievementCardsSlideType;
}

export default function AchievementCardsSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading
          eyebrow="Milestones"
          subtitle={slide.subtitle}
          align="center"
        >
          {slide.title}
        </SlideHeading>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slide.cards.map((card, i) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiAward className="h-6 w-6" />
              </span>

              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-subtle">
                {card.name}
              </p>

              <h3 className="mt-2 font-serif text-lg font-semibold text-foreground sm:text-xl">
                {card.achievement}
              </h3>

              {card.detail && (
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {card.detail}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + slide.cards.length * 0.1 + 0.25,
            }}
            className="mx-auto mt-10 max-w-2xl text-center text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.footnote}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}