
'use client';

import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiUsers } from 'react-icons/fi';
import type { TeamOverviewSlide as TeamOverviewSlideType } from '@/types/slide';
import SlideShell from './_shared/SlideShell';
import SlideHeading from './_shared/SlideHeading';

interface Props {
  slide: TeamOverviewSlideType;
}

export default function TeamOverviewSlide({ slide }: Props) {


    function AnimatedCount({ value }: { value: string }) {
    const target = Number(value);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!Number.isFinite(target) || target < 0) return;

        setCount(0);

        const duration = 1400;
        const startTime = performance.now();
        let frameId = 0;

        const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(Math.round(target * eased));

        if (progress < 1) {
            frameId = requestAnimationFrame(animate);
        }
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [target]);

    if (!Number.isFinite(target)) return <>{value}</>;

    return <>{count}</>;
    }


  return (
    <SlideShell>
      <div className="w-full">
        <SlideHeading eyebrow="Our People" subtitle={slide.subtitle}>
          {slide.title}
        </SlideHeading>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {slide.roles.map((role) => (
            <div
              key={role.name}
              className="rounded-2xl border border-border bg-surface p-5 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                <FiUsers className="h-5 w-5" />
              </div>

              <p className="mt-4 text-3xl font-bold text-foreground">
                <AnimatedCount value={role.count} />
              </p>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {role.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="text-center text-sm leading-7 text-muted-foreground sm:text-base">
            {slide.message}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={slide.teamPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Meet Our Team
            <FiArrowUpRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </SlideShell>
  );
}
