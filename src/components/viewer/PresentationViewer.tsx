// src/components/viewer/PresentationViewer.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Slide } from '@/types/slide';
import SlideRenderer from './SlideRenderer';
import SlideNav from './SlideNav';
import ProgressBar from './ProgressBar';
import ThumbnailOverview from './ThumbnailOverview';

interface Props {
  slides: Slide[];
  initialIndex?: number;
  exitHref?: string;
}

export default function PresentationViewer({
  slides,
  initialIndex = 0,
  exitHref = '/',
}: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);

  const total = slides.length;
  const current = slides[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  /* --------------------------------------------------------------- */
  /* Navigation                                                      */
  /* --------------------------------------------------------------- */

  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i >= total - 1) return i;
      setDirection(1);
      return i + 1;
    });
  }, [total]);

  const goPrev = useCallback(() => {
    setIndex((i) => {
      if (i <= 0) return i;
      setDirection(-1);
      return i - 1;
    });
  }, []);

  const jumpTo = useCallback((target: number) => {
    setIndex((i) => {
      if (target === i) return i;
      setDirection(target > i ? 1 : -1);
      return target;
    });
  }, []);

  const exit = useCallback(() => {
    router.push(exitHref);
  }, [router, exitHref]);

  /* --------------------------------------------------------------- */
  /* Focus management for overview                                   */
  /* --------------------------------------------------------------- */

  const openOverview = useCallback(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setOverviewOpen(true);
  }, []);

  const closeOverview = useCallback(() => {
    setOverviewOpen(false);
    /* restore focus after the overlay unmounts */
    requestAnimationFrame(() => {
      lastFocusedRef.current?.focus?.();
    });
  }, []);

  /* --------------------------------------------------------------- */
  /* Fullscreen                                                      */
  /* --------------------------------------------------------------- */

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  /* --------------------------------------------------------------- */
  /* Keyboard                                                        */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'Escape') {
        if (document.fullscreenElement) return;
        if (overviewOpen) {
          closeOverview();
          return;
        }
        exit();
        return;
      }

      if (overviewOpen) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goNext();
          return;
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goPrev();
          return;
        }
        if (e.key === 'o' || e.key === 'O') {
          e.preventDefault();
          closeOverview();
          return;
        }
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          jumpTo(0);
          break;
        case 'End':
          e.preventDefault();
          jumpTo(total - 1);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          void toggleFullscreen();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          openOverview();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [
    goNext,
    goPrev,
    jumpTo,
    toggleFullscreen,
    total,
    overviewOpen,
    exit,
    openOverview,
    closeOverview,
  ]);

  /* --------------------------------------------------------------- */
  /* Slide transition variants (respect reduced motion)              */
  /* --------------------------------------------------------------- */

  const variants = reduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: 1 | -1) => ({
          x: dir > 0 ? '60%' : '-60%',
          opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (dir: 1 | -1) => ({
          x: dir > 0 ? '-60%' : '60%',
          opacity: 0,
        }),
      };

  /* --------------------------------------------------------------- */
  /* Render                                                          */
  /* --------------------------------------------------------------- */

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full flex-col overflow-hidden bg-background"
      aria-label="Presentation viewer"
    >
      <ProgressBar current={index + 1} total={total} />

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    x: { type: 'spring', stiffness: 320, damping: 34 },
                    opacity: { duration: 0.18 },
                  }
            }
            className="slide-container absolute inset-0 overflow-y-auto"
          >
            <SlideRenderer slide={current} />
          </motion.div>
        </AnimatePresence>

        {!overviewOpen && (
          <>
            <ClickZone
              side="left"
              disabled={isFirst}
              onClick={goPrev}
              label="Previous slide"
            />
            <ClickZone
              side="right"
              disabled={isLast}
              onClick={goNext}
              label="Next slide"
            />
          </>
        )}
      </div>

      <SlideNav
        current={index + 1}
        total={total}
        isFirst={isFirst}
        isLast={isLast}
        isFullscreen={isFullscreen}
        onPrev={goPrev}
        onNext={goNext}
        onToggleFullscreen={toggleFullscreen}
        onToggleOverview={() =>
          overviewOpen ? closeOverview() : openOverview()
        }
        onExit={exit}
      />

      {index === 0 && !overviewOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 1.2, duration: 0.6 }}
          className="pointer-events-none absolute inset-x-0 bottom-20 z-20 hidden text-center text-xs text-foreground-subtle sm:block"
        >
          Use <Kbd>←</Kbd> <Kbd>→</Kbd> to navigate · <Kbd>F</Kbd> fullscreen ·{' '}
          <Kbd>O</Kbd> overview · <Kbd>Esc</Kbd> exit
        </motion.p>
      )}

      <AnimatePresence>
        {overviewOpen && (
          <ThumbnailOverview
            slides={slides}
            currentIndex={index}
            onSelect={(target) => {
              jumpTo(target);
              closeOverview();
            }}
            onClose={closeOverview}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Click zones — larger mobile tap area                                */
/* ------------------------------------------------------------------ */

function ClickZone({
  side,
  disabled,
  onClick,
  label,
}: {
  side: 'left' | 'right';
  disabled?: boolean;
  onClick: () => void;
  label: string;
}) {
  if (disabled) return null;
  const isLeft = side === 'left';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`group absolute top-0 bottom-20 z-10 w-[14%] cursor-pointer focus:outline-none sm:w-[12%] ${
        isLeft ? 'left-0' : 'right-0'
      }`}
    >
      <span
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-surface/0 p-2 text-foreground-subtle opacity-0 transition-all group-hover:bg-surface/80 group-hover:opacity-100 ${
          isLeft ? 'left-3' : 'right-3'
        }`}
      >
        {isLeft ? (
          <FiChevronLeft className="h-5 w-5" />
        ) : (
          <FiChevronRight className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Small Kbd                                                           */
/* ------------------------------------------------------------------ */

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-semibold text-foreground-muted">
      {children}
    </kbd>
  );
}