// src/app/admin/login/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';
import { getAdminToken } from '@/lib/admin-api';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (getAdminToken()) {
      router.replace('/admin');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Research Ustad Classes
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium text-foreground">
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Authorised personnel only.
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-[11px] text-foreground-subtle">
          Unauthorised access is prohibited.
        </p>
      </div>
    </div>
  );
}