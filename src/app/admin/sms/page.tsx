'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiRefreshCw, FiSend, FiUsers } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminGuard from '@/components/AdminGuard';
import adminApi from '@/lib/adminApi';

type SmsHistoryRecord = {
  id: string;
  phone: string;
  recipientName: string | null;
  message: string;
  status: 'queued' | 'failed';
  providerMessageId: string | null;
  error: string | null;
  smsCount: number;
  recipientMode: string;
  createdAt: string;
  deliveryStatus?: string | null;
  dlrCheckedAt?: string | null;
};

type SendResult = {
  total: number;
  queued: number;
  failed: number;
  note: string;
  results: Array<{
    phone: string;
    name?: string;
    status: 'queued' | 'failed';
    messageId?: string;
    smsCount?: number;
    error?: string;
  }>;
};

export default function SmsManagementPage() {
  return <AdminGuard><SmsManagementContent /></AdminGuard>;
}

function SmsManagementContent() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [mode, setMode] = useState<'all' | 'selected' | 'manual'>('selected');
  const [search, setSearch] = useState('');
  const [manualNumbers, setManualNumbers] = useState('');
  const [message, setMessage] = useState('Dear {{name}}, your Research Ustad workshop update: ');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [history, setHistory] = useState<SmsHistoryRecord[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const loadParticipants = async () => {
    setLoading(true);
    try {
      const response = await adminApi.get('/admin/sms/participants');
      setParticipants(response.data);
    } catch {
      toast.error('Could not load participants.');
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    setHistoryLoading(true);

    try {
      const response = await adminApi.get('/admin/sms/history');
      setHistory(response.data.records || []);
    } catch {
      toast.error('Could not load SMS history.');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
  void loadParticipants();
  void loadHistory();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return participants.filter((p) =>
      !q ||
      p.fullName?.toLowerCase().includes(q) ||
      p.whatsapp?.toLowerCase().includes(q) ||
      p.universityName?.toLowerCase().includes(q) ||
      p.registrationId?.toLowerCase().includes(q),
    );
  }, [participants, search]);

  const eligibleCount = participants.filter((p) => p.consent && p.whatsapp).length;
  const toggle = (id: string) => setSelected((old) =>
    old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
  );

  const send = async () => {
    if (!message.trim()) return toast.error('Write a message first.');
    if (mode === 'selected' && selected.length === 0) return toast.error('Select participants first.');
    if (mode === 'manual' && !manualNumbers.trim()) return toast.error('Enter phone numbers first.');

    const recipientCount = mode === 'all'
      ? eligibleCount
      : mode === 'selected'
        ? selected.length
        : manualNumbers.split(/[\s,;]+/).filter(Boolean).length;

    if (!window.confirm(`Send this SMS to approximately ${recipientCount} recipient(s)?`)) return;

    setSending(true);
    setResult(null);
    try {
      const response = await adminApi.post('/admin/sms/send', {
        mode,
        registrationIds: mode === 'selected' ? selected : undefined,
        phoneNumbers: mode === 'manual' ? [manualNumbers] : undefined,
        message: message.trim(),
      });
      setResult(response.data);
        await loadHistory();

        toast.success(
          `Accepted: ${response.data.queued}; failed: ${response.data.failed}`,
        );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'SMS sending failed.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-50 pb-20 pt-28 sm:pt-32">
        <div className="container-custom">
          <Link href="/admin" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-primary-600">
            <FiArrowLeft /> Back to Dashboard
          </Link>

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="flex items-center gap-3 font-display text-3xl font-bold text-ink-950">
                <FiSend className="text-primary-600" /> SMS Management
              </h1>
              <p className="mt-2 text-sm text-ink-600">Send personalized SMS to registered workshop participants using ZendSMS.</p>
            </div>
            <button onClick={() => void loadParticipants()} disabled={loading} className="btn-secondary inline-flex items-center justify-center gap-2">
              <FiRefreshCw /> {loading ? 'Loading…' : 'Refresh participants'}
            </button>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <p className="text-sm text-ink-500">Registered participants</p>
              <p className="mt-1 text-3xl font-bold text-ink-950">{participants.length}</p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <p className="text-sm text-ink-500">Consent + phone available</p>
              <p className="mt-1 text-3xl font-bold text-ink-950">{eligibleCount}</p>
            </div>
            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <p className="text-sm text-ink-500">Selected</p>
              <p className="mt-1 text-3xl font-bold text-primary-700">{selected.length}</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-ink-200 bg-white p-5 sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-ink-950">1. Choose recipients</h2>
              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                {([
                  ['all', 'All eligible'],
                  ['selected', 'Selected people'],
                  ['manual', 'Manual numbers'],
                ] as const).map(([value, label]) => (
                  <button key={value} onClick={() => setMode(value)} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${mode === value ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-ink-200 text-ink-600'}`}>
                    {label}
                  </button>
                ))}
              </div>

              {mode === 'selected' && <>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, university, registration ID…" className="mb-3 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm outline-none focus:border-primary-500" />
                <div className="mb-3 flex gap-2">
                  <button onClick={() => setSelected(filtered.filter(p => p.consent && p.whatsapp).map(p => p.id))} className="text-sm font-semibold text-primary-700">Select visible eligible</button>
                  <button onClick={() => setSelected([])} className="text-sm font-semibold text-ink-500">Clear</button>
                </div>
                <div className="max-h-80 space-y-2 overflow-y-auto rounded-xl border border-ink-100 p-2">
                  {filtered.map((p) => (
                    <label key={p.id} className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-ink-50 ${!p.consent || !p.whatsapp ? 'opacity-50' : ''}`}>
                      <input type="checkbox" checked={selected.includes(p.id)} disabled={!p.consent || !p.whatsapp} onChange={() => toggle(p.id)} className="mt-1" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-ink-900">{p.fullName}</span>
                        <span className="block text-sm text-ink-600">{p.whatsapp || 'No phone'} · {p.universityName}</span>
                        <span className="block text-xs text-ink-400">{p.registrationId}{!p.consent ? ' · consent not recorded' : ''}</span>
                      </span>
                    </label>
                  ))}
                  {!filtered.length && <p className="p-4 text-sm text-ink-500">No participants found.</p>}
                </div>
              </>}

              {mode === 'all' && <div className="rounded-xl bg-primary-50 p-4 text-sm text-primary-900">
                <FiUsers className="mr-2 inline" /> The backend will send to participants with a recorded consent flag and a valid Bangladesh mobile number ({eligibleCount} currently eligible).
              </div>}

              {mode === 'manual' && <textarea value={manualNumbers} onChange={(e) => setManualNumbers(e.target.value)} rows={8} placeholder={'017XXXXXXXX\n88018XXXXXXXX\n+88019XXXXXXXX'} className="w-full rounded-xl border border-ink-200 p-4 text-sm outline-none focus:border-primary-500" />}
            </section>

            <section className="rounded-2xl border border-ink-200 bg-white p-5 sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-ink-950">2. Compose message</h2>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={8} maxLength={2000} placeholder="Type your SMS…" className="w-full rounded-xl border border-ink-200 p-4 text-sm outline-none focus:border-primary-500" />
              <div className="mt-2 flex justify-between text-xs text-ink-500">
                <span>Personalization tokens: {'{{name}}'}, {'{{university}}'}, {'{{registrationId}}'}</span>
                <span>{message.length}/2000</span>
              </div>
              <div className="mt-4 rounded-xl bg-ink-50 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Preview</p>
                <p className="whitespace-pre-wrap break-words text-sm text-ink-800">{message.replace(/\{\{\s*name\s*\}\}/gi, 'Participant Name').replace(/\{\{\s*university\s*\}\}/gi, 'University Name').replace(/\{\{\s*registrationId\s*\}\}/gi, 'RU-WS01-0001')}</p>
              </div>
              <button onClick={() => void send()} disabled={sending || loading} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50">
                <FiSend /> {sending ? 'Sending SMS…' : 'Review & Send SMS'}
              </button>
              <p className="mt-3 text-xs leading-5 text-ink-500">Please verify the recipient list and message before sending. Bangla text uses Unicode and may consume multiple SMS segments.</p>
            </section>
          </div>

          {result && <section className="mt-6 rounded-2xl border border-ink-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-ink-950">Send results</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-ink-50 p-4"><p className="text-sm text-ink-500">Processed</p><p className="text-2xl font-bold">{result.total}</p></div>
              <div className="rounded-xl bg-green-50 p-4"><p className="text-sm text-green-700">Accepted / queued</p><p className="text-2xl font-bold text-green-800">{result.queued}</p></div>
              <div className="rounded-xl bg-red-50 p-4"><p className="text-sm text-red-700">Failed</p><p className="text-2xl font-bold text-red-800">{result.failed}</p></div>
            </div>
            <p className="mt-3 text-xs text-ink-500">{result.note}</p>
            <div className="mt-4 max-h-96 overflow-auto rounded-xl border border-ink-100">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-ink-50"><tr><th className="p-3">Recipient</th><th className="p-3">Status</th><th className="p-3">Message ID / Error</th></tr></thead>
                <tbody>{result.results.map((r, i) => <tr key={`${r.phone}-${i}`} className="border-t border-ink-100">
                  <td className="p-3">{r.name ? `${r.name} · ` : ''}{r.phone}</td>
                  <td className="p-3"><span className={r.status === 'queued' ? 'font-semibold text-green-700' : 'font-semibold text-red-700'}>{r.status}</span></td>
                  <td className="break-all p-3 text-xs text-ink-600">{r.messageId || r.error || '—'}</td>
                </tr>)}</tbody>
              </table>
            </div>
          </section>}
            <section className="mt-6 rounded-2xl border border-ink-200 bg-white p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-lg font-bold text-ink-950">
                    SMS History & Per-Number Report
                  </h2>
                  <p className="mt-1 text-sm text-ink-500">
                    প্রতিটি নম্বরের সংরক্ষিত ফলাফল, ব্যর্থতার কারণ ও সময়।
                  </p>
                </div>

                <button
                  onClick={() => void loadHistory()}
                  disabled={historyLoading}
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <FiRefreshCw />
                  {historyLoading ? 'Loading…' : 'Refresh report'}
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-ink-50 p-4">
                  <p className="text-sm text-ink-500">Records loaded</p>
                  <p className="text-2xl font-bold">{history.length}</p>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-sm text-green-700">Accepted by provider</p>
                  <p className="text-2xl font-bold text-green-800">
                    {history.filter((r) => r.status === 'queued').length}
                  </p>
                </div>

                <div className="rounded-xl bg-red-50 p-4">
                  <p className="text-sm text-red-700">Failed</p>
                  <p className="text-2xl font-bold text-red-800">
                    {history.filter((r) => r.status === 'failed').length}
                  </p>
                </div>
              </div>

              <div className="mt-4 max-h-[600px] overflow-auto rounded-xl border border-ink-100">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="sticky top-0 bg-ink-50">
                    <tr>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Recipient</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Message ID</th>
                      <th className="p-3">SMS Count</th>
                      <th className="p-3">Failure Reason</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map((record) => (
                      <tr key={record.id} className="border-t border-ink-100 align-top">
                        <td className="whitespace-nowrap p-3 text-xs text-ink-600">
                          {new Date(record.createdAt).toLocaleString()}
                        </td>

                        <td className="p-3">
                          <p className="font-semibold text-ink-900">
                            {record.recipientName || 'Manual recipient'}
                          </p>
                          <p className="text-xs text-ink-500">{record.phone}</p>
                          <p className="mt-1 max-w-xs whitespace-pre-wrap break-words text-xs text-ink-500">
                            {record.message}
                          </p>
                        </td>

                        <td className="p-3">
                          <span
                            className={
                              record.status === 'queued'
                                ? 'font-semibold text-green-700'
                                : 'font-semibold text-red-700'
                            }
                          >
                            {record.status === 'queued' ? 'Accepted' : 'Failed'}
                          </span>
                        </td>

                        <td className="break-all p-3 text-xs">
                          {record.providerMessageId || '—'}
                        </td>

                        <td className="p-3">{record.smsCount}</td>

                        <td className="max-w-xs break-words p-3 text-xs text-red-700">
                          {record.error || '—'}
                        </td>
                      </tr>
                    ))}

                    {!historyLoading && history.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-ink-500">
                          No SMS records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-ink-500">
                সর্বশেষ ৫০০টি রেকর্ড দেখানো হচ্ছে। Accepted মানে ZendSMS অনুরোধ গ্রহণ করেছে;
                এটি ফোনে SMS পৌঁছানোর নিশ্চয়তা নয়।
              </p>
            </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
