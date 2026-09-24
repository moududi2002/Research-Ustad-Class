// src/components/slides/CoverSlide.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser } from 'react-icons/fi';
import type { CoverSlide as CoverSlideType } from '@/types/slide';

interface Props {
  slide: CoverSlideType;
}

export default function CoverSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-full w-full items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={slide.background}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient overlay for readability */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 text-center sm:px-10 sm:py-20">
        {slide.logo && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm"
          >
            <Image
              src={slide.logo}
              alt="Research Ustad Classes"
              width={48}
              height={48}
              className="object-contain"
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200"
        >
          Workshop
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70"
        >
          <span className="inline-flex items-center gap-2">
            <FiUser className="h-4 w-4" />
            {slide.speaker}
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span className="inline-flex items-center gap-2">
            <FiCalendar className="h-4 w-4" />
            {slide.date}
          </span>
        </motion.div>
      </div>
    </div>
  );
}