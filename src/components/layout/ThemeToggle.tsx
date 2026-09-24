// src/components/layout/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Avoid hydration mismatch — render only after mount */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="h-9 w-9 rounded-full border border-border bg-surface"
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="
        group relative flex h-9 w-9 items-center justify-center rounded-full
        border border-border bg-surface text-foreground-muted
        transition-all duration-200 hover:border-accent hover:text-accent
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
      "
    >
      {isDark ? (
        <FiSun className="h-4 w-4 transition-transform group-hover:rotate-45" />
      ) : (
        <FiMoon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}