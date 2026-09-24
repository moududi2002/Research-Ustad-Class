// src/components/home/WorkshopCard.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiLock,
  FiTag,
} from 'react-icons/fi';
import type { WorkshopCard as WorkshopCardType } from '@/data/workshops';
import { cn } from '@/lib/utils';

interface Props {
  workshop: WorkshopCardType;
  index: number;
}

const accentRing: Record<WorkshopCardType['accent'], string> = {
  emerald: 'hover:border-emerald-400/60 focus-visible:ring-emerald-400',
  amber: 'hover:border-amber-400/60 focus-visible:ring-amber-400',
  indigo: 'hover:border-indigo-400/60 focus-visible:ring-indigo-400',
};

const accentBadge: Record<WorkshopCardType['accent'], string> = {
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  indigo: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
};

export default function WorkshopCard({ workshop, index }: Props) {
  const isActive = workshop.status === 'active';

  const CardWrapper = isActive ? Link : 'div';
  const wrapperProps = isActive
    ? { href: workshop.href! as string }
    : { 'aria-disabled': true };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* @ts-expect-error — polymorphic wrapper (Link or div) */}
      <CardWrapper
        {...wrapperProps}
        className={cn(
          'group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-200',
          isActive
            ? `cursor-pointer ${accentRing[workshop.accent]} hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2`
            : 'cursor-not-allowed opacity-70',
        )}
      >
        {/* Top row: badge */}
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
              accentBadge[workshop.accent],
            )}
          >
            {isActive ? (
              <FiTag className="h-3 w-3" aria-hidden />
            ) : (
              <FiLock className="h-3 w-3" aria-hidden />
            )}
            {workshop.badge}
          </span>

          {isActive && (
            <FiArrowUpRight
              className="h-5 w-5 text-foreground-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden
            />
          )}
        </div>

        {/* Middle: title + subtitle */}
        <div className="mt-6">
          <h3 className="font-serif text-2xl font-semibold leading-snug text-foreground">
            {workshop.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            {workshop.subtitle}
          </p>
        </div>

        {/* Bottom: meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground-subtle">
          <span className="inline-flex items-center gap-1.5">
            <FiCalendar className="h-3.5 w-3.5" aria-hidden />
            {workshop.date}
          </span>

          {workshop.duration && (
            <span className="inline-flex items-center gap-1.5">
              <FiClock className="h-3.5 w-3.5" aria-hidden />
              {workshop.duration}
            </span>
          )}

          {workshop.level && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {workshop.level}
            </span>
          )}
        </div>

        {/* subtle bottom accent line on hover */}
        {isActive && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
          />
        )}
      </CardWrapper>
    </motion.div>
  );
}