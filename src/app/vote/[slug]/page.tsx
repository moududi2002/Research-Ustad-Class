// src/app/vote/[slug]/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import VoteClient from '@/components/vote/VoteClient';
import { fetchPoll, PollNotFoundError } from '@/lib/api';
import type { PollPublicView } from '@/types/poll';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Vote — ${slug} | Research Ustad Classes`,
    description: 'Cast your vote — live results update instantly.',
    robots: { index: false, follow: false },
  };
}

export default async function VotePage({ params }: Props) {
  const { slug } = await params;

  let initialPoll: PollPublicView | null = null;
  let notFound = false;

  try {
    initialPoll = await fetchPoll(slug, { cache: 'no-store' });
  } catch (err) {
    if (err instanceof PollNotFoundError) notFound = true;
    // Any other error is handled by the client hook (which will retry via socket).
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-center gap-2 px-4">
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface">
            <Image
              src="/RU_logo.png"
              alt="Research Ustad Classes"
              width={24}
              height={24}
              className="object-contain"
            />
          </span>
          <span className="font-serif text-sm font-semibold text-foreground sm:text-base">
            Research Ustad Classes
          </span>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-10 sm:py-14">
        {notFound ? (
          <div className="text-center">
            <h1 className="font-serif text-2xl font-medium text-foreground">
              Poll not found
            </h1>
            <p className="mt-3 text-sm text-foreground-muted">
              Please scan the QR code again or ask the presenter for a fresh
              link.
            </p>
          </div>
        ) : (
          <VoteClient slug={slug} initialPoll={initialPoll} />
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-xl px-4 py-4 text-center text-xs text-foreground-subtle">
          Anonymous · One vote per device
        </div>
      </footer>
    </main>
  );
}