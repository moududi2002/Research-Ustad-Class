// src/components/slides/NumberedListSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { NumberedListSlide as NumberedListSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: NumberedListSlideType;
}

export default function NumberedListSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Process" subtitle={slide.intro}>
          {slide.title}
        </SlideHeading>

        <ol className="mt-10 max-w-3xl space-y-3">
          {slide.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.09 }}
              className="group flex gap-4 rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm transition-all hover:border-accent/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif text-sm font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                {i + 1}
              </span>

              <div className="pt-0.5">
                <h3 className="font-serif text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                    {item.description}
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