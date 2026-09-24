// src/components/home/AboutSection.tsx

import { FiBookOpen, FiGlobe, FiUsers } from 'react-icons/fi';

const points = [
  {
    icon: FiBookOpen,
    title: 'Academic tone',
    body: 'Content written with clarity and rigor — suitable for classrooms, seminars, and self-study.',
  },
  {
    icon: FiGlobe,
    title: 'Runs in the browser',
    body: 'No installs, no PowerPoint files. Share a single link and it works everywhere.',
  },
  {
    icon: FiUsers,
    title: 'Built for learners',
    body: 'Designed with students and early-career researchers in mind — from first lesson to first publication.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="border-b border-border bg-surface-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            About
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            Education, presented the way it should be
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted">
            Research Ustad Classes builds modern, web-native presentations for
            researchers, teachers, and students. Simple, fast, and readable on
            any screen — because good teaching deserves good presentation.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}