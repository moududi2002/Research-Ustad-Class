// src/components/layout/Footer.tsx

import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-surface-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        {/* ----------------- Brand blurb ----------------- */}
        <div className="max-w-md">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Research Ustad Classes
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            Modern, web-based educational presentations for researchers,
            students, and educators — fast, shareable, and easy to read on any
            device.
          </p>
        </div>

        {/* ----------------- Quick links ----------------- */}
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wide text-foreground-subtle">
            Navigate
          </h4>
          <Link
            href="/"
            className="text-foreground-muted transition-colors hover:text-accent"
          >
            Home
          </Link>
          <Link
            href="/presentation/workshop-one"
            className="text-foreground-muted transition-colors hover:text-accent"
          >
            Workshop One
          </Link>
        </div>

        {/* ----------------- Contact ----------------- */}
        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-serif text-sm font-semibold uppercase tracking-wide text-foreground-subtle">
            Contact
          </h4>
          <a
            href="mailto:researchustad@example.com"
            className="text-foreground-muted transition-colors hover:text-accent"
          >
            researchustad@example.com
          </a>
          <span className="text-foreground-subtle">www.researchustad.com</span>
        </div>
      </div>

      {/* ----------------- Bottom bar ----------------- */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-foreground-subtle sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} Research Ustad Classes. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with
            <FiHeart className="h-3 w-3 text-accent" aria-hidden />
            for learners
          </p>
        </div>
      </div>
    </footer>
  );
}