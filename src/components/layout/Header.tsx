// src/components/layout/Header.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBookOpen } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Workshops', href: '/#workshops' },
  { label: 'About', href: '/#about' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* ----------------- Brand ----------------- */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            {/* Fallback icon — shows if RU_logo.png is missing */}
            <FiBookOpen className="h-5 w-5 text-accent" aria-hidden />
            <Image
              src="/RU_logo.png"
              alt="Research Ustad Classes logo"
              fill
              sizes="40px"
              className="object-contain p-1"
              priority
              onError={undefined}
            />
          </span>

          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Research Ustad Classes
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-foreground-subtle sm:block">
              Educational Presentations
            </span>
          </span>
        </Link>

        {/* ----------------- Nav + Toggle ----------------- */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href.split('#')[0]) &&
                    link.href !== '/';
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent-soft text-accent'
                        : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}