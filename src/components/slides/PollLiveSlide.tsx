// src/components/slides/PollLiveSlide.tsx
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiUsers, FiWifi, FiWifiOff } from 'react-icons/fi';
import type { PollLiveSlide as PollLiveSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';
import PollLiveQr from './_shared/PollLiveQr';
import PollLiveResults from './_shared/PollLiveResults';
import { usePresentPollLive } from '@/hooks/usePresentPollLive';
import { resolveVoteUrl } from '@/lib/config';

interface Props {
  slide: PollLiveSlideType;
}

export default function PollLiveSlide({ slide }: Props) {
  const enabled = slide.liveEnabled;
  const { poll, loading, error, notFound, connection, secondsLeft } =
    usePresentPollLive(slide.pollSlug, enabled);

  /* Decide what data to render — live if available, else fallback */
  const view = useMemo(() => {
    if (poll) return poll;
    // fallback view built from slide data
    const counts: Record<string, number> = {};
    for (const o of slide.fallbackOptions) counts[o.id] = 0;
    return {
      id: '',
      slug: slide.pollSlug,
      workshopId: '',
      question: slide.fallbackQuestion,
      options: slide.fallbackOptions.map((o) => ({
        id: o.id,
        label: o.label,
      })),
      status: 'idle' as const,
      durationSec: 60,
      startedAt: null,
      endsAt: null,
      totalVotes: 0,
      counts,
    };
  }, [poll, slide]);

  const voteUrl = useMemo(
    () => resolveVoteUrl(slide.pollSlug, slide.voteBaseUrl),
    [slide.pollSlug, slide.voteBaseUrl],
  );

  const isLive = connection === 'live';
  const isOffline = connection === 'offline';
  const isActive = view.status === 'active';
  const isClosed = view.status === 'closed';

  /* --------------------------------------------------------------- */

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Live Poll">{slide.title}</SlideHeading>

        <div className="mt-6 grid gap-6 lg:grid-cols-[auto,1fr] lg:items-start lg:gap-10">
          {/* Left column — QR */}
          <div className="flex flex-col items-center">
            <PollLiveQr url={voteUrl} size={190} />

            <p className="mt-4 max-w-[16rem] text-center text-xs leading-relaxed text-foreground-subtle">
              Scan with your phone to vote. One vote per device.
            </p>

            {/* Connection pill */}
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium">
              {isLive && (
                <>
                  <FiWifi className="h-3 w-3 text-accent" />
                  <span className="text-accent">Live</span>
                </>
              )}
              {isOffline && (
                <>
                  <FiWifiOff className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                  <span className="text-amber-700 dark:text-amber-300">
                    Reconnecting…
                  </span>
                </>
              )}
              {connection === 'connecting' && (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground-subtle" />
                  <span className="text-foreground-subtle">Connecting…</span>
                </>
              )}
              {connection === 'disabled' && (
                <span className="text-foreground-subtle">
                  Offline demo mode
                </span>
              )}
            </div>

            {notFound && (
              <p className="mt-2 max-w-[16rem] text-center text-[11px] text-danger">
                Poll not found on server. Showing static preview.
              </p>
            )}
            {error && !notFound && (
              <p className="mt-2 max-w-[16rem] text-center text-[11px] text-danger">
                {error}
              </p>
            )}
          </div>

          {/* Right column — question + live results */}
          <div className="min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-serif text-lg italic leading-snug text-foreground sm:text-xl"
            >
              “{view.question}”
            </motion.p>

            {/* Meta row: timer + total votes + status */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              {isActive && secondsLeft !== null && (
                <TimerPill seconds={secondsLeft} />
              )}

              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-foreground-muted">
                <FiUsers className="h-3.5 w-3.5" />
                <span className="font-mono tabular-nums">
                  {view.totalVotes}
                </span>
                <span className="text-foreground-subtle">
                  {view.totalVotes === 1 ? 'vote' : 'votes'}
                </span>
              </span>

              {view.status === 'idle' && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-foreground-subtle">
                  <FiClock className="h-3.5 w-3.5" />
                  Waiting to start
                </span>
              )}
              {isClosed && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-medium text-accent">
                  Voting closed
                </span>
              )}
            </div>

            {/* Results bars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
            >
              <PollLiveResults
                options={view.options}
                counts={view.counts}
                totalVotes={view.totalVotes}
              />
            </motion.div>

            {slide.footnote && (
              <p className="mt-5 text-xs italic leading-relaxed text-foreground-subtle">
                {slide.footnote}
              </p>
            )}

            {loading && !poll && (
              <p className="mt-3 text-[11px] text-foreground-subtle">
                Loading live poll…
              </p>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/* ------------------------------------------------------------------ */

function TimerPill({ seconds }: { seconds: number }) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  const danger = seconds <= 10;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono tabular-nums ${
        danger
          ? 'border-danger/40 bg-danger/10 text-danger'
          : 'border-border bg-surface text-foreground-muted'
      }`}
    >
      <FiClock className="h-3.5 w-3.5" />
      {mm}:{ss}
    </span>
  );
}