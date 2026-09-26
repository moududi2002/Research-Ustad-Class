'use client';

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiSearch,
  FiShield,
  FiUser,
  FiXCircle,
} from 'react-icons/fi';

import { io } from 'socket.io-client';

interface Registration {
  registrationId: string;
  fullName: string;
  email: string;
  whatsapp: string;
}

interface AttendanceStatus {
  enabled: boolean;
}

type PageState =
  | 'loading'
  | 'closed'
  | 'open'
  | 'success';

function apiBase(): string {
  const env = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (env && env.length > 0) {
    return env.replace(/\/$/, '');
  }

  return '';
}

const BASE = apiBase();

async function publicFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      Array.isArray(body?.message)
        ? body.message.join(', ')
        : body?.message ||
          `Request failed (${res.status})`;

    throw new Error(String(message));
  }

  return body as T;
}

export default function AttendancePage() {
  const [pageState, setPageState] =
    useState<PageState>('loading');

  const [registrationId, setRegistrationId] =
    useState('');

  const [registration, setRegistration] =
    useState<Registration | null>(null);

  const [feedback, setFeedback] =
    useState('');

  const [lookupLoading, setLookupLoading] =
    useState(false);

  const [submitLoading, setSubmitLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState('');

  const checkStatus = useCallback(async () => {
    try {
      setError(null);

      const result =
        await publicFetch<AttendanceStatus>(
          '/api/attendance/status',
        );

      if (result.enabled) {
        setPageState('open');
      } else {
        setPageState('closed');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to check attendance status',
      );

      setPageState('closed');
    }
  }, []);

  
  useEffect(() => {
  void checkStatus();

  const socket = io(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/attendance`,
    {
      transports: ['websocket'],
    },
  );

   socket.on('attendance-status', ({ enabled }) => {
    setPageState(enabled ? 'open' : 'closed');
  });

  return () => {
    socket.disconnect();
  };
  }, [checkStatus]);

  async function findRegistration() {
    const id = registrationId.trim().toUpperCase();

    if (!id) {
      setError('Please enter your registration ID.');
      return;
    }

    setLookupLoading(true);
    setError(null);
    setRegistration(null);

    try {
      const result =
        await publicFetch<Registration>(
          `/api/attendance/registration/${encodeURIComponent(id)}`,
        );

      setRegistration(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration ID not found',
      );
    } finally {
      setLookupLoading(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!registration) {
      setError('Please verify your registration ID first.');
      return;
    }

    const cleanFeedback = feedback.trim();

    if (!cleanFeedback) {
      setError('Please write your feedback before submitting.');
      return;
    }

    if (cleanFeedback.length < 5) {
      setError('Please provide a little more feedback.');
      return;
    }

    setSubmitLoading(true);
    setError(null);

    try {
      const result =
        await publicFetch<{
          success: boolean;
          message: string;
        }>('/api/attendance/submit', {
          method: 'POST',
          body: JSON.stringify({
            registrationId:
              registration.registrationId,
            feedback: cleanFeedback,
          }),
        });

      setSuccessMessage(
        result.message ||
          'Attendance and feedback submitted successfully.',
      );

      setPageState('success');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to submit attendance',
      );
    } finally {
      setSubmitLoading(false);
    }
  }

  if (pageState === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />

          <p className="mt-4 text-sm text-foreground-muted">
            Checking attendance status...
          </p>
        </div>
      </main>
    );
  }

  if (pageState === 'closed') {
    return (
      <main className="min-h-screen bg-background px-4 py-12 sm:px-6">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-border bg-surface p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/5">
              <FiXCircle className="h-8 w-8 text-danger" />
            </div>

            <h1 className="mt-6 font-serif text-3xl font-medium text-foreground">
              Attendance is Closed
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-foreground-muted">
              Attendance and feedback submission is not
              currently available.
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-foreground-subtle">
              Please wait until the Research Ustad team
              opens the attendance session.
            </p>

            {error && (
              <div className="mt-6 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-left text-sm text-danger">
                <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (pageState === 'success') {
    return (
      <main className="min-h-screen bg-background px-4 py-12 sm:px-6">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-border bg-surface p-8 text-center shadow-sm sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <FiCheckCircle className="h-8 w-8 text-success" />
            </div>

            <h1 className="mt-6 font-serif text-3xl font-medium text-foreground">
              Submission Complete
            </h1>

            <p className="mt-3 text-sm leading-6 text-foreground-muted">
              {successMessage}
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-5 text-left">
              <p className="text-sm font-medium text-foreground">
                Certificate Information
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                Your certificate will be sent to the email
                address used during workshop registration.
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground-muted">
                Your attendance and feedback have also been
                recorded for the workshop.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Research Ustad
          </p>

          <h1 className="mt-3 font-serif text-3xl font-medium text-foreground sm:text-4xl">
            Attendance & Feedback
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-foreground-muted">
            Complete your workshop attendance and share
            your feedback with us.
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-8 rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
          {/* Registration ID */}
          <div>
            <label
              htmlFor="registrationId"
              className="text-sm font-medium text-foreground"
            >
              Registration ID
            </label>

            <p className="mt-1 text-xs text-foreground-muted">
              Enter the registration ID you received after
              registering for the workshop.
            </p>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                id="registrationId"
                type="text"
                value={registrationId}
                onChange={(event) => {
                  setRegistrationId(
                    event.target.value.toUpperCase(),
                  );
                  setRegistration(null);
                  setError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    void findRegistration();
                  }
                }}
                placeholder="e.g. RU-2026-0001"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent"
              />

              <button
                type="button"
                onClick={() => void findRegistration()}
                disabled={lookupLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSearch className="h-4 w-4" />

                {lookupLoading
                  ? 'Checking...'
                  : 'Find ID'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
              <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

              <span>{error}</span>
            </div>
          )}

          {/* Registration Details */}
          {registration && (
            <>
              <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-foreground-subtle">
                      Registration Verified
                    </p>

                    <p className="mt-1 text-xs text-foreground-muted">
                      {registration.registrationId}
                    </p>
                  </div>

                  <FiCheckCircle className="h-5 w-5 text-success" />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {/* Name */}
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface">
                      <FiUser className="h-4 w-4 text-accent" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-foreground-subtle">
                        Full Name
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-foreground">
                        {registration.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface">
                      <FiMail className="h-4 w-4 text-accent" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-foreground-subtle">
                        Email
                      </p>

                      <p className="mt-1 truncate text-sm font-medium text-foreground">
                        {registration.email}
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex gap-3 sm:col-span-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface">
                      <FiPhone className="h-4 w-4 text-accent" />
                    </div>

                    <div>
                      <p className="text-xs text-foreground-subtle">
                        WhatsApp / Phone
                      </p>

                      <p className="mt-1 text-sm font-medium text-foreground">
                        {registration.whatsapp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <form
                onSubmit={handleSubmit}
                className="mt-6"
              >
                <label
                  htmlFor="feedback"
                  className="text-sm font-medium text-foreground"
                >
                  Your Feedback
                </label>

                <p className="mt-1 text-xs text-foreground-muted">
                  Tell us about your workshop experience,
                  what you learned, or what we can improve.
                </p>

                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(event) => {
                    setFeedback(event.target.value);
                    setError(null);
                  }}
                  placeholder="Write your feedback here..."
                  rows={6}
                  maxLength={2000}
                  className="mt-3 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent"
                />

                <div className="mt-1 text-right text-xs text-foreground-subtle">
                  {feedback.length}/2000
                </div>

                {/* Notice */}
                <div className="mt-5 rounded-2xl border border-border bg-surface-muted p-4">
                  <div className="flex gap-3">
                    <FiShield className="mt-0.5 h-5 w-5 shrink-0 text-accent" />

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Important
                      </p>

                      <p className="mt-2 text-xs leading-5 text-foreground-muted">
                        Your certificate will be sent to
                        the email address used during your
                        workshop registration.
                      </p>

                      <p className="mt-2 text-xs leading-5 text-foreground-muted">
                        Your attendance and feedback are
                        recorded in the workshop attendance
                        sheet. If you do not submit your
                        attendance, you will not receive the
                        certificate and you will not be
                        eligible for future participant
                        discount benefits.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitLoading
                    ? 'Submitting...'
                    : 'Submit Attendance & Feedback'}

                  {!submitLoading && (
                    <FiArrowRight className="h-4 w-4" />
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-foreground-subtle">
          Research Ustad · Research to Higher Study
        </p>
      </div>
    </main>
  );
}