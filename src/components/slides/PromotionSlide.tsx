// src/components/slides/PromotionSlide.tsx
'use client';

import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiPercent,
  FiUsers,
} from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';

import type { PromotionSlide as PromotionSlideType } from '@/types/slide';

interface Props {
  slide: PromotionSlideType;
}

export default function PromotionSlide({ slide }: Props) {
  return (
    <div className="relative min-h-full w-full overflow-hidden bg-background px-6 py-10 sm:px-10 lg:px-14">
      {/* Animated background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-full max-w-7xl flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-500">
            <FiCheckCircle className="h-3.5 w-3.5" />
            Workshop Complete
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {slide.title}
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground-muted sm:text-base">
            {slide.subtitle}
          </p>
        </motion.div>

        <div className="grid flex-1 gap-5 lg:grid-cols-[0.8fr_1.5fr]">
          {/* Attendance + Feedback */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col rounded-3xl border border-border bg-surface/80 p-6 shadow-card backdrop-blur"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-500">
                Before You Leave
              </p>

              <h2 className="mt-1 text-xl font-bold text-foreground">
                Attendance & Feedback
              </h2>

              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                Complete the attendance and feedback form using the same link.
              </p>
            </div>

            {/* QR */}
            <div className="mt-6 flex flex-1 flex-col items-center justify-center">
              <div className="rounded-3xl border border-border bg-white p-4 shadow-lg">
                <QRCodeSVG
                  value={slide.attendanceFeedbackUrl}
                  size={170}
                  level="H"
                  includeMargin
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-foreground">
                Scan to Complete
              </p>

              <p className="mt-1 text-center text-xs text-foreground-muted">
                Attendance + Feedback
              </p>

              <a
                href={slide.attendanceFeedbackUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-xs font-semibold text-teal-500 transition hover:bg-teal-500/15"
              >
                Open Form
                <FiExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-border bg-background/40 p-3 text-center">
              <p className="text-xs text-foreground-muted">
                Please complete the form before leaving the workshop.
              </p>
            </div>
          </motion.div>

          {/* Course */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 via-surface to-surface p-6 shadow-card sm:p-8"
          >
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-teal-500 px-3 py-1 text-xs font-bold text-white">
                  NEXT LEARNING JOURNEY
                </span>

                <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground-muted">
                  Research Ustad
                </span>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 sm:flex">
                  <FiBookOpen className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-teal-500">
                    Upcoming Paid Course
                  </p>

                  <h2 className="mt-1 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                    {slide.courseTitle}
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground-muted">
                    {slide.courseSubtitle}
                  </p>
                </div>
              </div>

              {/* Course stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-border bg-background/50 p-4">
                  <FiClock className="mb-2 h-4 w-4 text-teal-500" />
                  <p className="text-lg font-bold text-foreground">
                    {slide.courseDuration}
                  </p>
                  <p className="text-xs text-foreground-muted">Duration</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/50 p-4">
                  <FiBookOpen className="mb-2 h-4 w-4 text-teal-500" />
                  <p className="text-lg font-bold text-foreground">
                    {slide.courseModules}
                  </p>
                  <p className="text-xs text-foreground-muted">Modules</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/50 p-4">
                  <FiArrowRight className="mb-2 h-4 w-4 text-teal-500" />
                  <p className="text-lg font-bold text-foreground">
                    Zero → Advanced
                  </p>
                  <p className="text-xs text-foreground-muted">Research</p>
                </div>
              </div>

              {/* Modules */}
              <div className="mt-5 rounded-2xl border border-border bg-background/40 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                  What the journey covers
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {[
                    'Research Basics',
                    'Literature',
                    'Methodology',
                    'Analysis',
                    'Publication',
                  ].map((module, index) => (
                    <div
                      key={module}
                      className="rounded-xl border border-border bg-background/50 px-3 py-2 text-center"
                    >
                      <p className="text-[10px] font-bold text-teal-500">
                        MODULE {index + 1}
                      </p>
                      <p className="mt-1 text-xs font-medium text-foreground">
                        {module}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <motion.div
                animate={{
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mt-5 rounded-2xl border border-teal-500/30 bg-teal-500/10 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-500">
                      Workshop Exclusive
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <FiPercent className="h-5 w-5 text-teal-500" />

                      <span className="text-2xl font-black text-foreground">
                        {slide.discountPercent}% OFF
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-dashed border-teal-500/40 bg-background/70 px-5 py-2 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">
                      Use Code
                    </p>

                    <p className="mt-0.5 text-xl font-black tracking-widest text-teal-500">
                      {slide.discountCode}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 text-xs leading-5 text-foreground-muted">
                  <FiUsers className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                  <p>{slide.discountCondition}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-foreground-muted"
        >
          <span>Research Ustad Classes</span>
          <span>From curiosity to research.</span>
        </motion.div>
      </div>
    </div>
  );
}