// src/components/slides/ChecklistSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { ChecklistSlide as ChecklistSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';
import SlideBullet from './_shared/SlideBullet';

interface Props {
  slide: ChecklistSlideType;
}

export default function ChecklistSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading
          eyebrow="Checklist"
          subtitle={slide.intro}
        >
          {slide.title}
        </SlideHeading>

        <ul className="mt-10 max-w-3xl space-y-4">
          {slide.items.map((item, i) => (
            <SlideBullet key={item} delay={0.15 + i * 0.08}>
              {item}
            </SlideBullet>
          ))}
        </ul>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.15 + slide.items.length * 0.08 + 0.2,
            }}
            className="mt-12 max-w-2xl border-l-2 border-accent/60 pl-4 text-sm italic leading-relaxed text-foreground-subtle"
          >
            {slide.footnote}
          </motion.p>
        )}
      </div>
    </SlideShell>
  );
}