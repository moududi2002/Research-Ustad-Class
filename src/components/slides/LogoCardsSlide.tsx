// src/components/slides/LogoCardsSlide.tsx
'use client';

import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import type { LogoCardsSlide as LogoCardsSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: LogoCardsSlideType;
}

export default function LogoCardsSlide({ slide }: Props) {
  const count = slide.cards.length;

  /* Balance the grid based on count */
  const gridClass =
    count <= 4
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Resources" subtitle={slide.subtitle}>
          {slide.title}
        </SlideHeading>

        <div className={`mt-10 grid gap-4 ${gridClass}`}>
          {slide.cards.map((card, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold leading-tight text-foreground sm:text-xl">
                    {card.name}
                  </h3>
                  {card.url && (
                    <FiExternalLink
                      className="mt-1 h-4 w-4 shrink-0 text-foreground-subtle transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {card.description}
                </p>
              </>
            );

            const className =
              'group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-md';

            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              >
                {card.url ? (
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={className}>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2 + slide.cards.length * 0.07 + 0.2,
            }}
            className="mt-8 max-w-2xl text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.footnote}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}