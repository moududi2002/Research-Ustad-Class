//src/components/slides/BreakSlide.tsx
// src/components/slides/BreakSlide.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCoffee,
  FiEdit3,
  FiMessageCircle,
  FiPause,
  FiPlay,
  FiRefreshCw,
  FiRotateCcw,
  FiCheck,
} from 'react-icons/fi';
import type { BreakSlide as BreakSlideType } from '@/types/slide';

interface Props {
  slide: BreakSlideType;
  printMode?: boolean;
}

const activityIcons = [FiCoffee, FiMessageCircle, FiEdit3];

export default function BreakSlide({ slide, printMode = false }: Props) {
  const [remaining, setRemaining] = useState(slide.duration);
  const [running, setRunning] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  /* --------------------------------------------------------------- */
  /* Countdown                                                       */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    if (!running || remaining <= 0) return;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [running, remaining]);

  /* --------------------------------------------------------------- */
  /* Time formatting                                                  */
  /* --------------------------------------------------------------- */

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  }, [remaining]);

  /* --------------------------------------------------------------- */
  /* Progress                                                         */
  /* --------------------------------------------------------------- */

  const progress =
    slide.duration > 0
      ? ((slide.duration - remaining) / slide.duration) * 100
      : 0;

  /* --------------------------------------------------------------- */
  /* Controls                                                         */
  /* --------------------------------------------------------------- */

  const toggleTimer = () => {
    if (remaining <= 0) {
      setRemaining(slide.duration);
      setRunning(true);
      return;
    }

    setRunning((value) => !value);
  };

  const resetTimer = () => {
    setRunning(false);
    setRemaining(slide.duration);
  };

  return (
    <div className="relative min-h-full w-full overflow-hidden bg-background">
      {/* ----------------------------------------------------------- */}
      {/* Decorative background                                      */}
      {/* ----------------------------------------------------------- */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 35, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05),transparent_55%)]" />
      </div>

      {/* ----------------------------------------------------------- */}
      {/* Main content                                                 */}
      {/* ----------------------------------------------------------- */}

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-7xl flex-col px-6 py-10 sm:px-10 lg:px-14">
        {/* Header */}

        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Part 1 Complete
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-subtle"
          >
            Slide 16
          </motion.div>
        </div>

        {/* Title */}

        <div className="mt-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400"
          >
            {slide.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            {slide.title}
          </motion.h1>
        </div>

        {/* --------------------------------------------------------- */}
        {/* Timer + activities                                        */}
        {/* --------------------------------------------------------- */}

        <div className="mt-8 grid flex-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Timer */}

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
              {/* Outer progress ring */}

              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(
                    rgb(20 184 166) ${progress}%,
                    rgba(20, 184, 166, 0.08) ${progress}%
                  )`,
                }}
              />

              {/* Inner circle */}

              <div className="absolute inset-[7px] rounded-full bg-background" />

              {/* Glow */}

              <motion.div
                animate={
                  running
                    ? {
                        scale: [1, 1.08, 1],
                        opacity: [0.2, 0.35, 0.2],
                      }
                    : {
                        scale: 1,
                        opacity: 0.15,
                      }
                }
                transition={{
                  duration: 2,
                  repeat: running ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="absolute inset-10 rounded-full bg-teal-400 blur-2xl"
              />

              {/* Time */}

              <div className="relative z-10 text-center">
                <p className="font-mono text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  {formattedTime}
                </p>

                <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground-subtle">
                  {remaining === 0 ? 'Break Complete' : 'Minutes Remaining'}
                </p>
              </div>
            </div>

            {/* Controls */}

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTimer}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background shadow-sm transition hover:scale-[1.02]"
              >
                {running ? (
                  <>
                    <FiPause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <FiPlay className="h-4 w-4" />
                    {remaining === slide.duration ? 'Start Break' : 'Resume'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetTimer}
                aria-label="Reset timer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground-muted transition hover:bg-surface-hover hover:text-foreground"
              >
                <FiRotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Completion */}

            <AnimatePresence>
              {remaining === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-2 text-sm font-medium text-teal-700 dark:text-teal-300"
                >
                  <FiCheck className="h-4 w-4" />
                  Welcome back — Part 2 is next
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Activities */}

          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-subtle">
                While You Pause
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                Reset. Connect. Reflect.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground-muted">
                Use these ten minutes intentionally. A short reset can help you
                return to Part 2 with a clearer mind.
              </p>
            </motion.div>

            <div className="space-y-3">
              {slide.activities.map((activity, index) => {
                const Icon = activityIcons[index % activityIcons.length];
                const selected = selectedActivity === index;

                return (
                  <motion.button
                    key={activity.title}
                    type="button"
                    onClick={() =>
                      setSelectedActivity(selected ? null : index)
                    }
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.35 + index * 0.1,
                    }}
                    className={`group w-full rounded-2xl border p-4 text-left transition-all ${
                      selected
                        ? 'border-teal-500/40 bg-teal-500/5 shadow-sm'
                        : 'border-border bg-surface/70 hover:border-teal-500/25 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                          selected
                            ? 'bg-teal-500 text-white'
                            : 'bg-foreground/5 text-foreground-muted group-hover:bg-teal-500/10 group-hover:text-teal-600'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-foreground">
                            {activity.title}
                          </h3>

                          <motion.span
                            animate={{
                              rotate: selected ? 45 : 0,
                            }}
                            className="text-foreground-subtle"
                          >
                            <FiRefreshCw className="h-4 w-4" />
                          </motion.span>
                        </div>

                        <p className="mt-1 text-sm leading-relaxed text-foreground-muted">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom progress */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.15em] text-foreground-subtle">
            <span className="text-teal-600 dark:text-teal-400">
              Part 1 ✓
            </span>

            <span>10 Minute Break</span>

            <span>Part 2 →</span>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-teal-500"
            />
          </div>
        </motion.div>

            {!printMode && (
            <div>
                {/* Start / Pause / Reset buttons */}
            </div>
            )}
        </div>
    </div>
  );
}