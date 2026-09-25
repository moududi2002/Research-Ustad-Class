// src/components/admin/AdminAuthGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminToken } from '@/lib/admin-api';

interface Props {
  children: React.ReactNode;
}

/**
 * Client-side guard. Redirects to /admin/login if no token is present.
 * Note: the server is the real source of truth (JWT verified on every call).
 */
export default function AdminAuthGuard({ children }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
      </div>
    );
  }

  return <>{children}</>;
}