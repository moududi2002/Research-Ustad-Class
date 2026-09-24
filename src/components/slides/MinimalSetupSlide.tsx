// src/components/slides/MinimalSetupSlide.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import type { MinimalSetupSlide as MinimalSetupSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: MinimalSetupSlideType;
}

export default function MinimalSetupSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Truth">{slide.title}</SlideHeading>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Image side */}
          <motion.figure
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
          >
            <div className="relative aspect-[4/3] w-full bg-surface-muted">
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            {slide.image.caption && (
              <figcaption className="border-t border-border px-4 py-3 text-xs italic text-foreground-subtle">
                {slide.image.caption}
              </figcaption>
            )}
          </motion.figure>

          {/* Items side */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              What you actually need
            </p>

            <ul className="mt-5 space-y-3">
              {slide.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <FiCheck className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="font-serif text-base font-medium text-foreground sm:text-lg">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {slide.closing && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + slide.items.length * 0.1 + 0.25,
                }}
                className="mt-6 border-l-2 border-accent/60 pl-4 font-serif text-sm italic leading-relaxed text-foreground-subtle sm:text-base"
              >
                {slide.closing}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}