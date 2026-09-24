// src/components/vote/VoteClient.tsx
'use client';

import { useState } from 'react';
import { usePollLive } from '@/hooks/usePollLive';
import StatusBanner from './StatusBanner';
import CountdownBadge from './CountdownBadge';
import VoteOptions from './VoteOptions';
import VoteResult from './VoteResult';

interface Props {
  slug: string;
  /** Server-fetched initial poll for instant paint (SSR) */
  initialPoll?: import('@/types/poll').PollPublicView | null;
}

export default function VoteClient({ slug, initialPoll = null }: Props) {
  const {
    poll,
    loading,
    error,
    notFound,
    connection,
    secondsLeft,
    voted,
    votedOptionId,
    submitting,
    submitError,
    vote,
    refresh,
  } = usePollLive(slug);

  const [pendingOptionId, setPendingOptionId] = useState<string | null>(null);

  /* Prefer live state, fallback to SSR-provided state */
  const view = poll ?? initialPoll ?? null;

  /* --------------------------------------------------------------- */
  /* Error / not-found                                                */
  /* --------------------------------------------------------------- */

  if (notFound) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-serif text-2xl font-medium text-foreground">
          Poll not found
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">
          The poll you tried to open does not exist or has been removed.
        </p>
      </div>
    );
  }

  if (loading && !view) {
    return (
      <div className="mx-auto max-w-md text-center text-sm text-foreground-subtle">
        Loading poll…
      </div>
    );
  }

  if (error && !view) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-serif text-2xl font-medium text-foreground">
          Could not load poll
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">{error}</p>
        <button
          type="button"
          onClick={() => void refresh()}
          className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!view) return null;

  /* --------------------------------------------------------------- */
  /* Render                                                           */
  /* --------------------------------------------------------------- */

  const votedLabel =
    voted && votedOptionId
      ? view.options.find((o) => o.id === votedOptionId)?.label ?? null
      : null;

  const disabled = view.status !== 'active';

  const handleSelect = (optionId: string) => {
    setPendingOptionId(optionId);
    void vote(optionId).finally(() => setPendingOptionId(null));
  };

  return (
    <div className="w-full">
      {/* Connection & status */}
      <StatusBanner status={view.status} connection={connection} />
      <CountdownBadge seconds={secondsLeft} />

      {/* Question */}
      <h1 className="mb-6 text-center font-serif text-2xl font-medium leading-snug text-foreground sm:text-3xl">
        {view.question}
      </h1>

      {/* Result message if voted */}
      {voted && (
        <VoteResult optionLabel={votedLabel} totalVotes={view.totalVotes} />
      )}

      {/* Options */}
      <VoteOptions
        options={view.options}
        counts={view.counts}
        totalVotes={view.totalVotes}
        voted={voted}
        votedOptionId={votedOptionId}
        disabled={disabled}
        submitting={submitting}
        onSelect={handleSelect}
      />

      {/* Submit error */}
      {submitError && (
        <p className="mt-4 text-center text-sm text-danger">{submitError}</p>
      )}

      {/* Submitting indicator */}
      {submitting && (
        <p className="mt-4 text-center text-xs text-foreground-subtle">
          Sending your vote…
        </p>
      )}

      {/* Footer note */}
      <p className="mt-8 text-center text-xs text-foreground-subtle">
        Live results update automatically — no need to refresh.
      </p>
    </div>
  );
}