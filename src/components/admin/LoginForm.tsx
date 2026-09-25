// src/components/admin/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function LoginForm() {
  const router = useRouter();
  const { login, loading, error } = useAdminAuth(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username.trim(), password);
    if (ok) router.replace('/admin');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-sm space-y-5"
    >
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          Username
        </label>
        <div className="relative">
          <FiUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
            placeholder="researchustad"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
          Password
        </label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full rounded-xl border border-border bg-surface pl-10 pr-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 px-3 py-2.5 text-xs text-danger">
          <FiAlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !username || !password}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
        ) : (
          <FiLogIn className="h-4 w-4" />
        )}
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </motion.form>
  );
}