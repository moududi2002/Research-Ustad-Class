// src/components/viewer/SlideNav.tsx
'use client';

import { motion } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiMaximize,
  FiMinimize,
  FiX,
} from 'react-icons/fi';
import SlideCounter from './SlideCounter';

interface Props {
  current: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onToggleOverview: () => void;
  onExit: () => void;
}

export default function SlideNav({
  current,
  total,
  isFirst,
  isLast,
  isFullscreen,
  onPrev,
  onNext,
  onToggleFullscreen,
  onToggleOverview,
  onExit,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="pointer-events-auto absolute inset-x-0 bottom-4 z-30 flex justify-center px-3 sm:bottom-6"
    >
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface/90 px-2 py-1.5 shadow-lg backdrop-blur-md">
        {/* Exit */}
        <NavButton
          label="Exit presentation"
          onClick={onExit}
          subtle
          icon={<FiX className="h-4 w-4" />}
        />

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        {/* Prev */}
        <NavButton
          label="Previous slide"
          onClick={onPrev}
          disabled={isFirst}
          icon={<FiChevronLeft className="h-4 w-4" />}
        />

        {/* Counter */}
        <div className="px-3">
          <SlideCounter current={current} total={total} />
        </div>

        {/* Next */}
        <NavButton
          label="Next slide"
          onClick={onNext}
          disabled={isLast}
          icon={<FiChevronRight className="h-4 w-4" />}
        />

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        {/* Overview */}
        <NavButton
          label="Slide overview"
          onClick={onToggleOverview}
          icon={<FiGrid className="h-4 w-4" />}
        />

        {/* Fullscreen */}
        <NavButton
          label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          onClick={onToggleFullscreen}
          icon={
            isFullscreen ? (
              <FiMinimize className="h-4 w-4" />
            ) : (
              <FiMaximize className="h-4 w-4" />
            )
          }
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Small internal NavButton                                            */
/* ------------------------------------------------------------------ */

interface NavButtonProps {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  subtle?: boolean;
}

function NavButton({ label, onClick, icon, disabled, subtle }: NavButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        disabled
          ? 'cursor-not-allowed text-foreground-subtle/40'
          : subtle
            ? 'text-foreground-subtle hover:bg-surface-muted hover:text-foreground'
            : 'text-foreground-muted hover:bg-accent-soft hover:text-accent'
      }`}
    >
      {icon}
    </button>
  );
}