// src/components/slides/ComparisonTableSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { ComparisonTableSlide as ComparisonTableSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: ComparisonTableSlideType;
}

export default function ComparisonTableSlide({ slide }: Props) {
  const [leftCol, rightCol] = slide.columns;

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Comparison">{slide.title}</SlideHeading>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm"
        >
          <table className="w-full border-collapse text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-border bg-surface-muted/60">
                <th className="w-1/4 px-4 py-4 font-serif text-xs font-semibold uppercase tracking-[0.14em] text-foreground-subtle sm:px-6">
                  Aspect
                </th>
                <th className="w-[37.5%] px-4 py-4 font-serif text-base font-semibold text-foreground-muted sm:px-6 sm:text-lg">
                  {leftCol}
                </th>
                <th className="w-[37.5%] px-4 py-4 font-serif text-base font-semibold text-accent sm:px-6 sm:text-lg">
                  {rightCol}
                </th>
              </tr>
            </thead>

            <tbody>
              {slide.rows.map((row, i) => (
                <motion.tr
                  key={row.aspect}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                  className="border-b border-border/60 last:border-b-0"
                >
                  <td className="px-4 py-4 align-top text-xs font-medium uppercase tracking-wider text-foreground-subtle sm:px-6">
                    {row.aspect}
                  </td>
                  <td className="px-4 py-4 align-top text-foreground-muted sm:px-6">
                    {row.left}
                  </td>
                  <td className="bg-accent-soft/30 px-4 py-4 align-top font-medium text-foreground sm:px-6">
                    {row.right}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {slide.footnote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + slide.rows.length * 0.08 + 0.2,
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