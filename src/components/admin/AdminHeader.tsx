// src/components/admin/AdminHeader.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiLogOut, FiHome } from 'react-icons/fi';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function AdminHeader() {
  const { user, logout } = useAdminAuth(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
            <Image
              src="/RU_logo.png"
              alt="Research Ustad Classes"
              width={28}
              height={28}
              className="object-contain"
            />
          </span>
          <div className="leading-tight">
            <p className="font-serif text-base font-semibold text-foreground">
              Research Ustad
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent">
              Admin Panel
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden text-sm text-foreground-muted sm:block">
              {user.username}
            </span>
          )}

          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            title="Back to site"
          >
            <FiHome className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={logout}
            title="Sign out"
            className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm text-foreground-muted transition-colors hover:border-danger hover:text-danger"
          >
            <FiLogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}