// src/components/slides/_shared/SlideHeading.tsx

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  /** small label above heading (like a section tag) */
  eyebrow?: string;
  children: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SlideHeading({
  eyebrow,
  children,
  subtitle,
  align = 'left',
  className,
}: Props) {
  return (
    <div
      className={cn(
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.2em] text-accent',
            align === 'center' && 'mx-auto',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-serif font-medium leading-tight tracking-tight text-foreground',
          'text-3xl sm:text-4xl lg:text-5xl',
          eyebrow && 'mt-3',
        )}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-3xl text-base leading-relaxed text-foreground-muted sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}