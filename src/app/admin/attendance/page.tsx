// src/app/admin/attendance/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiUsers,
} from 'react-icons/fi';
import Link from 'next/link';

import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  adminGetAttendanceList,
  type AttendanceRecord,
} from '@/lib/admin-api';

export default function AttendancePage() {
  return (
    <AdminAuthGuard>
      <AdminHeader />
      <AttendanceContent />
    </AdminAuthGuard>
  );
}

function AttendanceContent() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAttendance = useCallback(async () => {
    try {
      const data = await adminGetAttendanceList();
      setRecords(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadAttendance();
  }, [loadAttendance]);

  const refresh = async () => {
    setRefreshing(true);
    await loadAttendance();
  };

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/admin"
              className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <FiArrowLeft />
              Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight">
              Attendance
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Workshop attendance and participant feedback
            </p>
          </div>

          <button
            onClick={refresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-muted disabled:opacity-50"
          >
            <FiRefreshCw
              className={refreshing ? 'animate-spin' : ''}
            />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FiUsers size={21} />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Attendance
                </p>

                <p className="text-2xl font-bold">
                  {records.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <FiCheckCircle size={21} />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Feedback Submitted
                </p>

                <p className="text-2xl font-bold">
                  {records.filter((item) => item.feedback).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Participant
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Registration
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Feedback
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Submitted
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-16 text-center text-sm text-muted-foreground"
                    >
                      Loading attendance...
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-16 text-center"
                    >
                      <FiUsers
                        className="mx-auto mb-3 text-muted-foreground"
                        size={28}
                      />

                      <p className="font-medium">
                        No attendance yet
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Attendance submissions will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr
                      key={record._id}
                      className="transition hover:bg-muted/20"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold">
                          {record.fullName}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {record.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                          {record.registrationId}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {record.whatsapp}
                      </td>

                      <td className="max-w-md px-5 py-4">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {record.feedback}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FiClock size={14} />
                          {new Date(
                            record.createdAt,
                          ).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}