// src/app/error.tsx
'use client';

import { useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* send to your logging service in production */
    console.error('[Research Ustad]', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-danger">
        Something went wrong
      </p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-foreground sm:text-4xl">
        We could not render this page.
      </h1>
      <p className="mt-4 max-w-md text-sm text-foreground-muted">
        Please try again. If the problem persists, reload the page or return
        home.
      </p>

      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover"
      >
        <FiRefreshCw className="h-4 w-4" />
        Try again
      </button>
    </main>
  );
}