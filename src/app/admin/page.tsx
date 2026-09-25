// src/app/admin/page.tsx
'use client';

import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import PollCard from '@/components/admin/PollCard';
import { useAdminPolls } from '@/hooks/useAdminPolls';
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi';

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <AdminHeader />
      <Dashboard />
    </AdminAuthGuard>
  );
}

function Dashboard() {
  const { polls, loading, error, refresh, start, end, reset, pending } =
    useAdminPolls();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
            Live Polls
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Start, monitor, and reset polls in real time.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refresh()}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent"
        >
          <FiRefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && polls.length === 0 && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-surface-muted"
            />
          ))}
        </div>
      )}

      {!loading && polls.length === 0 && !error && (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="font-serif text-lg text-foreground">
            No polls yet.
          </p>
          <p className="mt-2 text-sm text-foreground-muted">
            Create your first poll using the seed script or API.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={poll}
            pending={pending === poll.slug}
            onStart={start}
            onEnd={end}
            onReset={reset}
          />
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-foreground-subtle">
        Auto-refreshes every 5 seconds · Real-time updates on the
        presentation screen
      </p>
    </main>
  );
}