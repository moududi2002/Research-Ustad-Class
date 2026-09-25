// src/components/viewer/ThumbnailOverview.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import type { Slide } from '@/types/slide';
import { cn } from '@/lib/utils';


interface Props {
  slides: Slide[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

/* Human-readable label for each slide type */
const typeLabel: Record<Slide['type'], string> = {
  cover: 'Cover',
  break: 'Break',
  poll: 'Poll',
  'poll-live': 'Live Poll',
  flow: 'Flow',
  checklist: 'Checklist',
  'image-cards': 'Images',
  'comparison-table': 'Comparison',
  cycle: 'Cycle',
  mindmap: 'Mindmap',
  chart: 'Chart',
  comparison: 'Case Study',
  'myth-reality': 'Myth vs Reality',
  barrier: 'Barriers',
  'minimal-setup': 'Minimal Setup',
  'logo-cards': 'Resources',
  timeline: 'Timeline',
  'numbered-list': 'Numbered List',
  'warning-cards': 'Warnings',
  ecosystem: 'Ecosystem',
  'achievement-cards': 'Milestones',
  roadmap: 'Roadmap',
  closing: 'Closing',
  promotion: 'Promotion',
};

export default function ThumbnailOverview({
  slides,
  currentIndex,
  onSelect,
  onClose,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Lock body scroll while overview is open */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  /* Scroll current thumbnail into view on open */
  useEffect(() => {
    const el = overlayRef.current?.querySelector<HTMLElement>(
      `[data-slide-index="${currentIndex}"]`,
    );
    el?.scrollIntoView({ block: 'center', behavior: 'auto' });
  }, [currentIndex]);

  return (
    <motion.div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Slide overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-40 overflow-y-auto bg-background/95 backdrop-blur-md"
      onClick={(e) => {
        /* close when clicking the backdrop (not a card) */
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Overview
            </p>
            <h2 className="mt-0.5 font-serif text-lg font-medium text-foreground sm:text-xl">
              {slides.length} slides in this workshop
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close overview"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-all hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {slides.map((slide, i) => {
            const isCurrent = i === currentIndex;
            const title = slide.title;

            return (
              <motion.li
                key={slide.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.012, 0.3) }}
              >
                <button
                  type="button"
                  data-slide-index={i}
                  onClick={() => onSelect(i)}
                  aria-label={`Go to slide ${slide.id}: ${title}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={cn(
                    'group flex h-full w-full flex-col rounded-xl border bg-surface p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isCurrent
                      ? 'border-accent shadow-md ring-1 ring-accent/30'
                      : 'border-border hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md',
                  )}
                >
                  {/* Mini preview frame */}
                  <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-surface-muted to-surface">
                    <span className="font-serif text-2xl font-semibold text-foreground-subtle/60">
                      {slide.id}
                    </span>

                    {isCurrent && (
                      <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                        Now
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="mt-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                      {typeLabel[slide.type]}
                    </p>
                    <p className="mt-1 line-clamp-2 font-serif text-xs font-medium leading-snug text-foreground sm:text-sm">
                      {title}
                    </p>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-xs text-foreground-subtle">
          Press <Kbd>O</Kbd> or <Kbd>Esc</Kbd> to close
        </p>
      </div>
    </motion.div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-semibold text-foreground-muted">
      {children}
    </kbd>
  );
}