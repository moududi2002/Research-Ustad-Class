// src/components/slides/SpeakerSlide.tsx
'use client';

import Image from 'next/image';
import {
  FiBookOpen,
  FiBriefcase,
  FiAward,
  FiExternalLink,
  FiUser,
} from 'react-icons/fi';

import type { SpeakerProfileSlide } from '@/types/slide';
import SlideShell from './_shared/SlideShell';

interface SpeakerSlideProps {
  slide: SpeakerProfileSlide;
}

export default function SpeakerSlide({
  slide,
}: SpeakerSlideProps) {
  const { speaker } = slide;

  return (
    <SlideShell>
      <div className="flex h-full flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-14 lg:py-10">
        {/* Header */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Speaker Introduction
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {slide.title}
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid min-h-0 flex-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Speaker Image */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 280px"
              />
            </div>

            {/* RU Designation */}
            <div className="mt-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Research Ustad
              </p>

              <p className="mt-1 text-sm font-semibold text-foreground">
                {speaker.designation}
              </p>
            </div>
          </div>

          {/* Speaker Details */}
          <div className="min-w-0">
            {/* Name */}
            <div className="mb-6 border-b border-border pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FiUser size={20} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {speaker.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {speaker.designation}
                  </p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              <InfoSection
                icon={<FiBookOpen />}
                title="Education"
                items={speaker.education}
              />

              <InfoSection
                icon={<FiBriefcase />}
                title="Profession"
                items={speaker.profession}
              />

              <InfoSection
                icon={<FiUser />}
                title="Experience"
                items={speaker.experience}
              />

              <InfoSection
                icon={<FiAward />}
                title="Research Impact"
                items={speaker.impact}
              />
            </div>

            {/* Profile Links */}
            {speaker.links.length > 0 && (
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-sm font-semibold text-foreground">
                  Profile & Research
                </p>

                <div className="flex flex-wrap gap-2">
                  {speaker.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
                    >
                      {link.label}
                      <FiExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

interface InfoSectionProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function InfoSection({
  icon,
  title,
  items,
}: InfoSectionProps) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-accent">
          {icon}
        </span>

        <h3 className="text-sm font-semibold text-foreground">
          {title}
        </h3>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="text-xs leading-relaxed text-muted-foreground sm:text-sm"
          >
            <span className="mr-2 text-accent">•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}