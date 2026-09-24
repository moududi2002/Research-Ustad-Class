// src/components/slides/ImageCardsSlide.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ImageCardsSlide as ImageCardsSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: ImageCardsSlideType;
}

export default function ImageCardsSlide({ slide }: Props) {
  const count = slide.cards.length;

  /* Choose a grid that looks balanced for 3–6 cards */
  const gridClass =
    count === 4
      ? 'grid-cols-2 lg:grid-cols-4'
      : count === 5
        ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
        : 'grid-cols-2 sm:grid-cols-3';

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="In Our World" subtitle={slide.subtitle}>
          {slide.title}
        </SlideHeading>

        <div className={`mt-10 grid gap-4 ${gridClass}`}>
          {slide.cards.map((card, i) => (
            <motion.figure
              key={card.alt + i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-muted">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {card.caption && (
                <figcaption className="flex-1 px-3 py-3 text-xs leading-snug text-foreground-muted sm:text-sm">
                  {card.caption}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}