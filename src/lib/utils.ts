// src/lib/utils.ts

/**
 * Tiny className combiner — filters falsy values and joins with spaces.
 * Avoids adding clsx / tailwind-merge as extra dependencies for now.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}