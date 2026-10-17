
import Image from 'next/image';
import {
  FiAward,
  FiBookOpen,
  FiTrendingUp,
  FiCpu,
} from 'react-icons/fi';

import type { CEOProfileSlide as CEOProfileSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';

interface Props {
  slide: CEOProfileSlideType;
}

export default function CEOProfileSlide({ slide }: Props) {
  return (
    <SlideShell>
      <section className="flex h-full w-full flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8">
        {/* Heading */}
        <header className="mb-6 shrink-0">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-accent">
            Leadership & Research
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {slide.subtitle}
            </p>
          )}
        </header>

        {/* Main layout */}
        <div className="grid min-h-0 flex-1 items-center gap-7 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* CEO information */}
          <div className="order-2 min-w-0 lg:order-1">
            <div className="mb-5 border-l-4 border-accent pl-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Founder & Chief Executive Officer
              </p>

              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                Anichur Rahman
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                PhD Student in Applied Computing
                <br />
                Georgia Southern University
              </p>
            </div>

            {/* Achievement cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {slide.cards.map((card, index) => {
                const icons = [
                  FiBookOpen,
                  FiTrendingUp,
                  FiAward,
                  FiAward,
                  FiAward,
                  FiCpu,
                ];
                const Icon = icons[index % icons.length];

                return (
                  <article
                    key={card.name}
                    className="rounded-xl border border-border bg-surface p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon size={18} />
                      </span>

                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {card.name.replace(/^[^\w]+/, '')}
                      </p>
                    </div>

                    <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
                      {card.achievement}
                    </h3>

                    {card.detail && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {card.detail}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>

            {slide.footnote && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                {slide.footnote}
              </p>
            )}
          </div>

          {/* CEO portrait */}
          <aside className="order-1 mx-auto w-full max-w-[210px] sm:max-w-[240px] lg:order-2 lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-xl">
              <Image
                src={slide.image}
                alt="Anichur Rahman, Founder and CEO of Research Ustad"
                fill
                priority
                sizes="(max-width: 1024px) 240px, 320px"
                className="object-cover object-center"
              />
            </div>

            <div className="mt-3 rounded-xl border border-border bg-surface px-4 py-3 text-center">
              <p className="text-sm font-bold text-foreground">
                Anichur Rahman
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Founder & CEO, Research Ustad
              </p>
              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-accent" />
            </div>
          </aside>
        </div>
      </section>
    </SlideShell>
  );
}
