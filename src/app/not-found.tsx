// src/app/not-found.tsx

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
        404 — Not Found
      </p>
      <h1 className="mt-4 font-serif text-4xl font-medium text-foreground sm:text-5xl">
        This page could not be found.
      </h1>
      <p className="mt-4 max-w-md text-base text-foreground-muted">
        The workshop, class, or presentation you are looking for may have been
        moved or does not exist yet.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </main>
  );
}