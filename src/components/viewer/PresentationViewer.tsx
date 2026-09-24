// src/components/viewer/PresentationViewer.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Slide } from '@/types/slide';
import SlideRenderer from './SlideRenderer';
import SlideNav from './SlideNav';
import ProgressBar from './ProgressBar';

interface Props {
  slides: Slide[];
  /** starting index (0-based) */
  initialIndex?: number;
  /** where to go when exiting (X button / Esc) */
  exitHref?: string;
}

export default function PresentationViewer({
  slides,
  initialIndex = 0,
  exitHref = '/',
}: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1); // 1=next, -1=prev
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

  const jumpTo = useCallback(
    (target: number) => {
      setIndex((i) => {
        if (target === i) return i;
        setDirection(target > i ? 1 : -1);
        return target;
      });
      setOverviewOpen(false);
    },
    [],
  );

  const exit = useCallback(() => {
    router.push(exitHref);
  }, [router, exitHref]);

  /* --------------------------------------------------------------- */
  /* Fullscreen                                                      */
  /* --------------------------------------------------------------- */

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;

    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore — some browsers reject silently */
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  /* --------------------------------------------------------------- */
  /* Keyboard                                                        */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      /* ignore if typing in an input */
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
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
          setOverviewOpen((v) => !v);
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            /* browser handles exiting fullscreen itself */
          } else if (overviewOpen) {
            setOverviewOpen(false);
          } else {
            exit();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, jumpTo, toggleFullscreen, total, overviewOpen, exit]);

  /* --------------------------------------------------------------- */
  /* Slide transition variants                                       */
  /* --------------------------------------------------------------- */

  const variants = {
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

      {/* ----------------- Slide area ----------------- */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 320, damping: 34 },
              opacity: { duration: 0.18 },
            }}
            className="slide-container absolute inset-0 overflow-y-auto"
          >
            <SlideRenderer slide={current} />
          </motion.div>
        </AnimatePresence>

        {/* ----------------- Left / Right click zones ----------------- */}
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
      </div>

      {/* ----------------- Bottom nav ----------------- */}
      <SlideNav
        current={index + 1}
        total={total}
        isFirst={isFirst}
        isLast={isLast}
        isFullscreen={isFullscreen}
        onPrev={goPrev}
        onNext={goNext}
        onToggleFullscreen={toggleFullscreen}
        onToggleOverview={() => setOverviewOpen((v) => !v)}
        onExit={exit}
      />

      {/* ----------------- Keyboard hint (only on first slide) ----------------- */}
      {index === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="pointer-events-none absolute inset-x-0 bottom-20 z-20 hidden text-center text-xs text-foreground-subtle sm:block"
        >
          Use <Kbd>←</Kbd> <Kbd>→</Kbd> to navigate · <Kbd>F</Kbd> fullscreen ·{' '}
          <Kbd>O</Kbd> overview · <Kbd>Esc</Kbd> exit
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Click zones                                                         */
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
      className={`group absolute top-0 bottom-20 z-10 w-[12%] cursor-pointer focus:outline-none ${
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
/* Small Kbd component                                                 */
/* ------------------------------------------------------------------ */

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-semibold text-foreground-muted">
      {children}
    </kbd>
  );
}