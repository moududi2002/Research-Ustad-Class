// src/components/home/HeroSection.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* soft background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft/60 via-background to-background"
      />

      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-foreground-subtle"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Research Ustad Classes
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Modern educational presentations,
          <span className="block text-accent">built for the web.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground-muted sm:text-lg"
        >
          Fast, elegant, shareable slide decks — replacing traditional
          PowerPoint with the open web. Designed for researchers, teachers,
          and students who care about clarity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/presentation/workshop-one"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FiPlayCircle className="h-4 w-4" />
            Start Workshop One
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a
            href="#workshops"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
          >
            Browse all workshops
          </a>
        </motion.div>
      </div>
    </section>
  );
}