// src/app/admin/page.tsx

'use client';

import { useEffect, useState } from 'react';
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AttendanceManagement from '@/components/admin/AttendanceManagement';
import AdminHeader from '@/components/admin/AdminHeader';
import PollCard from '@/components/admin/PollCard';
import { useAdminPolls } from '@/hooks/useAdminPolls';
import { getAdminToken } from '@/lib/admin-api';
import { getSocket } from '@/lib/socket';
import { FiRefreshCw, FiAlertCircle, FiPlus, FiX } from 'react-icons/fi';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

const DEFAULT_OPTIONS = [
  'Software Engineering',
  'Computer Science and Engineering',
  'Cyber Security Engineering',
  'Textile Engineering',
  'Economics',
  'Computing and Information System',
  'Journalism and Mass Communication',
  'Law',
  'Electrical / Electronics Engineering',
  'English',
  'Public Administration',
  'Veterinary and Animal Sciences',
  'Food and Nutrition',
  'Public Health',
  'Microbiology',
  'Pharmacy',
  'Biochemistry / Biotechnology',
  'Political Science',
  'Environmental Science',
  'Management',
  'Agricultural Economics',
  'Information Technology',
  'Other / Not Listed',
];

function makeOptionId(label: string, index: number) {
  if (label.trim().toLowerCase() === 'other / not listed') return 'other';

  const id = label
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return id || `option-${index + 1}`;
}

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

  const [showCreate, setShowCreate] = useState(false);
  const [question, setQuestion] = useState('Which department are you from?');
  const [workshopId, setWorkshopId] = useState('workshop-one');
  const [durationSec, setDurationSec] = useState(600);
  const [optionsText, setOptionsText] = useState(DEFAULT_OPTIONS.join('\n'));
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  // Refresh this dashboard immediately when poll events arrive via Socket.IO.
  useEffect(() => {
    const socket = getSocket();

    const onPollEvent = () => {
      void refresh();
    };

    socket.on('poll:snapshot', onPollEvent);
    socket.on('poll:updated', onPollEvent);
    socket.on('poll:started', onPollEvent);
    socket.on('poll:closed', onPollEvent);
    socket.on('poll:reset', onPollEvent);

    return () => {
      socket.off('poll:snapshot', onPollEvent);
      socket.off('poll:updated', onPollEvent);
      socket.off('poll:started', onPollEvent);
      socket.off('poll:closed', onPollEvent);
      socket.off('poll:reset', onPollEvent);
    };
  }, [refresh]);

  async function createPoll(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setCreateError(null);
    setCreateSuccess(null);

    const labels = optionsText
      .split('\n')
      .map((label) => label.trim())
      .filter(Boolean);

    if (labels.length < 2) {
      setCreateError('At least 2 options are required.');
      setCreating(false);
      return;
    }

    const options = labels.map((label, index) => ({
      id: makeOptionId(label, index),
      label,
    }));

    if (new Set(options.map((option) => option.id)).size !== options.length) {
      setCreateError('Duplicate option names found. Please make each option unique.');
      setCreating(false);
      return;
    }

    try {
      const token = getAdminToken();

      if (!token) {
        throw new Error('Admin session expired. Please log in again.');
      }

      const response = await fetch(`${API_BASE}/api/polls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug: 'department-poll-1',
          workshopId: workshopId.trim(),
          question: question.trim(),
          durationSec,
          options,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join(', ')
          : result?.message;

        throw new Error(message || `Failed to create poll (${response.status})`);
      }

      setCreateSuccess('Department poll created successfully.');
      setShowCreate(false);
      await refresh();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not create poll.');
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <AttendanceManagement />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
            Live Polls
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Create, start, monitor and reset polls in real time.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground-muted hover:border-accent hover:text-accent"
          >
            <FiRefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => {
              setCreateError(null);
              setCreateSuccess(null);
              setShowCreate((value) => !value);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
          >
            {showCreate ? <FiX /> : <FiPlus />}
            {showCreate ? 'Cancel' : 'Create Poll'}
          </button>
        </div>
      </div>

      {(error || createError) && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{createError || error}</span>
        </div>
      )}

      {createSuccess && (
        <p className="mb-5 rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm text-green-700">
          {createSuccess}
        </p>
      )}

      {showCreate && (
        <form
          onSubmit={createPoll}
          className="mb-6 space-y-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
        >
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Create Department Poll
          </h2>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Poll question
            </label>
            <input
              required
              minLength={5}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Workshop ID
            </label>
            <input
              required
              value={workshopId}
              onChange={(event) => setWorkshopId(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Poll duration
            </label>
            <select
              value={durationSec}
              onChange={(event) => setDurationSec(Number(event.target.value))}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
            >
              <option value={60}>1 minute</option>
              <option value={120}>2 minutes</option>
              <option value={300}>5 minutes</option>
              <option value={600}>10 minutes</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Options — one per line
            </label>
            <textarea
              required
              rows={10}
              value={optionsText}
              onChange={(event) => setOptionsText(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-3 font-mono text-sm text-foreground"
            />
            <p className="mt-1 text-xs text-foreground-muted">
              Each line becomes one option. “Other / Not Listed” is included.
            </p>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {creating ? 'Creating poll…' : 'Create Poll'}
          </button>
        </form>
      )}

      {loading && polls.length === 0 && (
        <div className="h-32 animate-pulse rounded-2xl bg-surface-muted" />
      )}

      {!loading && polls.length === 0 && !error && (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="font-serif text-lg text-foreground">No polls yet.</p>
          <p className="mt-2 text-sm text-foreground-muted">
            Select Create Poll to add your first poll.
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
        Poll controls · Socket.IO events · Automatic fallback refresh
      </p>
    </main>
  );
}
