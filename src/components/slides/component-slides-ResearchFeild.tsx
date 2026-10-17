
'use client';

import { motion } from 'framer-motion';
import type { ResearchFieldsSlide as ResearchFieldsSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: ResearchFieldsSlideType;
}

const accentStyles = [
  {
    icon: 'bg-violet-500/10 text-violet-600',
    line: 'from-violet-500 to-purple-400',
    tag: 'text-violet-600 bg-violet-500/10',
  },
  {
    icon: 'bg-sky-500/10 text-sky-600',
    line: 'from-sky-500 to-cyan-400',
    tag: 'text-sky-600 bg-sky-500/10',
  },
  {
    icon: 'bg-emerald-500/10 text-emerald-600',
    line: 'from-emerald-500 to-teal-400',
    tag: 'text-emerald-600 bg-emerald-500/10',
  },
  {
    icon: 'bg-amber-500/10 text-amber-600',
    line: 'from-amber-500 to-orange-400',
    tag: 'text-amber-600 bg-amber-500/10',
  },
  {
    icon: 'bg-rose-500/10 text-rose-600',
    line: 'from-rose-500 to-pink-400',
    tag: 'text-rose-600 bg-rose-500/10',
  },
  {
    icon: 'bg-indigo-500/10 text-indigo-600',
    line: 'from-indigo-500 to-blue-400',
    tag: 'text-indigo-600 bg-indigo-500/10',
  },
];

export default function ResearchFeild({ slide }: Props) {
  return (
    <SlideShell>
      <section className="w-full">
        <div className="mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <SlideHeading
              eyebrow="Explore the possibilities"
              subtitle={slide.subtitle}
            >
              {slide.title}
            </SlideHeading>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-surface px-3 py-2 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-foreground-muted">
              {slide.fields.length} research areas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {slide.fields.map((field, index) => {
            const style = accentStyles[index % accentStyles.length];

            return (
              <motion.article
                key={field.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.045, 0.4),
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg sm:p-5"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.line}`}
                />

                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${style.icon}`}
                    aria-hidden="true"
                  >
                    {field.icon}
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <span
                      className={`mb-1.5 inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${style.tag}`}
                    >
                      {field.category}
                    </span>

                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {field.name}
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {field.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-foreground-subtle transition-colors group-hover:text-accent">
                  <span className={`h-1.5 w-1.5 rounded-full ${style.icon}`} />
                  <span>Explore this discipline</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {slide.caption && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-7 rounded-2xl border border-border bg-surface/70 px-5 py-4 text-center sm:mt-8"
          >
            <p className="text-sm font-medium leading-relaxed text-foreground-muted sm:text-base">
              <span className="mr-2 text-accent">✦</span>
              {slide.caption}
            </p>
          </motion.div>
        )}
      </section>
    </SlideShell>
  );
}
