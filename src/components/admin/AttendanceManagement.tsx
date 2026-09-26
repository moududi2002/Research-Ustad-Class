//src/components/admin/AttendanceManagement.tsx
'use client';

import {
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiRefreshCw,
  FiUsers,
  FiXCircle,
} from 'react-icons/fi';
import { useState } from 'react';
import { useAdminAttendance } from '@/hooks/useAdminAttendance';

import Link from 'next/link';

const ATTENDANCE_URL =
  'https://class.researchustad.org/atendence';

export default function AttendanceManagement() {
  const {
    stats,
    loading,
    error,
    pending,
    refresh,
    open,
    close,
  } = useAdminAttendance();

  const [copied, setCopied] = useState(false);

  const isOpen = stats?.enabled ?? false;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(ATTENDANCE_URL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="mb-8 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-medium text-foreground">
            Attendance & Feedback
          </h2>

          <p className="mt-1 text-sm text-foreground-muted">
            Control participant attendance and feedback submissions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        >
          <FiRefreshCw
            className={`h-3.5 w-3.5 ${
              loading ? 'animate-spin' : ''
            }`}
          />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Status */}
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
            Attendance Status
          </p>

          <div className="mt-2 flex items-center gap-2">
            {isOpen ? (
              <>
                <FiCheckCircle className="h-5 w-5 text-success" />
                <span className="font-medium text-success">
                  Open
                </span>
              </>
            ) : (
              <>
                <FiXCircle className="h-5 w-5 text-foreground-muted" />
                <span className="font-medium text-foreground-muted">
                  Closed
                </span>
              </>
            )}
          </div>
        </div>

        {/* Count */}
        <div className="rounded-xl border border-border bg-surface-muted p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
            Total Attendance
          </p>

          <div className="mt-2 flex items-center gap-2">
            <FiUsers className="h-5 w-5 text-accent" />

            <span className="text-xl font-semibold text-foreground">
              {loading && !stats
                ? '—'
                : stats?.totalAttendance ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* Attendance URL */}
      <div className="mt-4 rounded-xl border border-border bg-surface-muted p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
          Attendance & Feedback URL
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="min-w-0 flex-1 truncate rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground">
            {ATTENDANCE_URL}
          </code>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => void copyLink()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <FiCopy className="h-3.5 w-3.5" />
              {copied ? 'Copied' : 'Copy Link'}
            </button>

            <a
              href="/atendence"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <FiExternalLink className="h-3.5 w-3.5" />
              Open
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-wrap gap-3">
        {!isOpen ? (
          <button
            type="button"
            onClick={() => void open()}
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiCheckCircle className="h-4 w-4" />
            {pending ? 'Opening...' : 'Open Attendance'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void close()}
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-danger/30 bg-danger/5 px-5 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiXCircle className="h-4 w-4" />
            {pending ? 'Closing...' : 'Close Attendance'}
          </button>
        )}
      </div>

      {/* Attendance Actions */}
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href="/admin/attendance"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          View Attendance
        </Link>

        <a
          href="/atendence"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Open Page
          <FiExternalLink className="h-3.5 w-3.5" />
        </a>
        </div>
    </section>
  );
}