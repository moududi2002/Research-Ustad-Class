// src/components/home/WorkshopGrid.tsx

import { workshops } from '@/data/workshops';
import WorkshopCard from './WorkshopCard';

export default function WorkshopGrid() {
  return (
    <section id="workshops" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Presentations
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            Explore our workshops
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted">
            Each workshop is a fully prepared, web-based slide deck you can
            open in the browser — no downloads, no software, no friction.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop, index) => (
            <WorkshopCard
              key={workshop.slug}
              workshop={workshop}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}