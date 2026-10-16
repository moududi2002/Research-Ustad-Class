// src/components/slides/DepartmentPollSlide.tsx
'use client';

import { motion } from 'framer-motion';
import type { DepartmentPollSlide as DepartmentPollSlideType } from '@/types/slide';
import { usePresentPollLive } from '@/hooks/usePresentPollLive';
import { resolveVoteUrl } from '@/lib/config';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';
import PollLiveQr from './_shared/PollLiveQr';

interface Props {
  slide: DepartmentPollSlideType;
}

const bubbleColors = [
  '#DCEAFE',
  '#FCE7F3',
  '#D1FAE5',
  '#FEF3C7',
  '#EDE9FE',
  '#FFEDD5',
  '#CFFAFE',
  '#F3E8FF',
  '#FEE2E2',
  '#E0F2FE',
  '#ECFCCB',
  '#FAE8FF',
];

export default function DepartmentPollSlide({ slide }: Props) {
  const { poll, loading, connection } = usePresentPollLive(
    slide.pollSlug,
    slide.liveEnabled,
  );

  const totalVotes = poll?.totalVotes ?? 0;
  const options = (poll?.options ?? []).filter(
  (option) => option.id !== 'other',
  );
  const counts = poll?.counts ?? {};
  const voteUrl = resolveVoteUrl(slide.pollSlug);

  const hasVotes = totalVotes > 0;

  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Live Audience Poll">
          {slide.title}
        </SlideHeading>

        <h2 className="mx-auto mt-4 max-w-4xl text-center font-serif text-2xl font-semibold text-foreground sm:text-4xl">
          {poll?.question ?? slide.question}
        </h2>

        <div className="mt-5 flex items-center justify-center gap-3 text-xs text-foreground-muted">
          <span className="rounded-full border border-border px-3 py-1">
            {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
          </span>
          <span className="rounded-full border border-border px-3 py-1">
            {connection === 'live'
              ? 'Live updates connected'
              : connection === 'offline'
                ? 'Reconnecting…'
                : loading
                  ? 'Connecting…'
                  : 'Waiting for poll'}
          </span>
        </div>

        {!hasVotes ? (
          <div className="mt-8 flex flex-col items-center justify-center">
            <PollLiveQr url={voteUrl} size={220} />
            <p className="mt-4 text-center text-sm text-foreground-muted">
              Scan the QR code and select your department.
            </p>
            {loading && (
              <p className="mt-2 text-xs text-foreground-subtle">
                Loading poll…
              </p>
            )}
          </div>
        ) : (
          <div className="mt-8 flex min-h-[300px] flex-wrap items-center justify-center gap-4 overflow-visible">
            {options.map((option, index) => {
              const count = counts[option.id] ?? 0;
              const percentage = Math.round((count / totalVotes) * 100);
              const size = Math.min(190, 92 + percentage * 2.2);

              return (
                <motion.div
                  key={option.id}
                  drag
                  dragMomentum={false}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 16,
                  }}
                  title={`${option.label}: ${count} votes`}
                  className="flex shrink-0 cursor-grab select-none flex-col items-center justify-center rounded-full p-3 text-center shadow-md active:cursor-grabbing"
                  style={{
                    width: size,
                    height: size,
                    backgroundColor:
                      bubbleColors[index % bubbleColors.length],
                    color: '#243047',
                  }}
                >
                  <span className="max-w-full break-words text-sm font-semibold sm:text-base">
                    {option.label}
                  </span>
                  <span className="mt-1 text-xl font-bold sm:text-2xl">
                    {percentage}%
                  </span>
                  <span className="text-xs">
                    {count} {count === 1 ? 'vote' : 'votes'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </SlideShell>
  );
}