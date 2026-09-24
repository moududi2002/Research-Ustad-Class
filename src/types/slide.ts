// src/types/slide.ts

/**
 * Every slide in the presentation is represented by one of these
 * discriminated-union objects. The `type` field decides which
 * component renders it.
 */

export type Slide =
  | CoverSlide
  | PollSlide
  | PollLiveSlide     
  | FlowSlide
  | ChecklistSlide
  | ImageCardsSlide
  | ComparisonTableSlide
  | CycleSlide
  | MindmapSlide
  | ChartSlide
  | ComparisonSlide
  | MythRealitySlide
  | BarrierSlide
  | MinimalSetupSlide
  | LogoCardsSlide
  | TimelineSlide
  | NumberedListSlide
  | WarningCardsSlide
  | EcosystemSlide
  | AchievementCardsSlide
  | RoadmapSlide
  | ClosingSlide;

/* ------------------------------------------------------------------ */
/* Shared small types                                                  */
/* ------------------------------------------------------------------ */

export interface ImageRef {
  src: string;
  alt: string;
  /** optional caption shown under the image */
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* 1. Cover                                                            */
/* ------------------------------------------------------------------ */

export interface CoverSlide {
  id: number;
  type: 'cover';
  title: string;
  subtitle: string;
  speaker: string;
  date: string;
  background: string; // image URL
  logo?: string;      // e.g. /RU_logo.png
}

/* ------------------------------------------------------------------ */
/* 2. Poll / Ice-breaker                                               */
/* ------------------------------------------------------------------ */

export interface PollOption {
  label: string;
  /** rough visual weight 0–100, purely for the bar size */
  weight: number;
}

export interface PollSlide {
  id: number;
  type: 'poll';
  title: string;
  question: string;
  options: PollOption[];
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 3. Flow (linear chain of steps)                                     */
/* ------------------------------------------------------------------ */

export interface FlowSlide {
  id: number;
  type: 'flow';
  title: string;
  definition?: string;
  steps: string[];
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* 4. Checklist                                                        */
/* ------------------------------------------------------------------ */

export interface ChecklistSlide {
  id: number;
  type: 'checklist';
  title: string;
  intro?: string;
  items: string[];
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 5. Image Cards                                                      */
/* ------------------------------------------------------------------ */

export interface ImageCardsSlide {
  id: number;
  type: 'image-cards';
  title: string;
  subtitle?: string;
  cards: ImageRef[];
}

/* ------------------------------------------------------------------ */
/* 6. Comparison Table                                                 */
/* ------------------------------------------------------------------ */

export interface ComparisonTableSlide {
  id: number;
  type: 'comparison-table';
  title: string;
  columns: [string, string]; // [left, right]
  rows: { aspect: string; left: string; right: string }[];
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 7. Cycle / circular diagram                                         */
/* ------------------------------------------------------------------ */

export interface CycleSlide {
  id: number;
  type: 'cycle';
  title: string;
  subtitle?: string;
  steps: string[];
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* 8. Mindmap (centre + branches)                                      */
/* ------------------------------------------------------------------ */

export interface MindmapBranch {
  label: string;
  icon?: string;   // emoji or short label
}

export interface MindmapSlide {
  id: number;
  type: 'mindmap';
  title: string;
  centre: string;
  branches: MindmapBranch[];
}

/* ------------------------------------------------------------------ */
/* 9. Chart (bar / line / pie)                                         */
/* ------------------------------------------------------------------ */

export type ChartKind = 'bar' | 'line' | 'pie';

export interface ChartSlide {
  id: number;
  type: 'chart';
  chartType: ChartKind;
  title: string;
  subtitle?: string;
  data: { name: string; value: number }[];
  unit?: string;
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 10. Side-by-side comparison (Student A vs Student B)                */
/* ------------------------------------------------------------------ */

export interface ComparisonSide {
  heading: string;
  rows: { label: string; value: string }[];
  highlight?: boolean;
}

export interface ComparisonSlide {
  id: number;
  type: 'comparison';
  title: string;
  subtitle?: string;
  left: ComparisonSide;
  right: ComparisonSide;
  conclusion?: string;
}

/* ------------------------------------------------------------------ */
/* 11. Myth vs Reality                                                 */
/* ------------------------------------------------------------------ */

export interface MythRealitySlide {
  id: number;
  type: 'myth-reality';
  title: string;
  myths: string[];
  reality: string;
}

/* ------------------------------------------------------------------ */
/* 12. Barrier slide (list of excuses / obstacles)                     */
/* ------------------------------------------------------------------ */

export interface BarrierSlide {
  id: number;
  type: 'barrier';
  title: string;
  intro?: string;
  barriers: string[];
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 13. Minimal setup                                                   */
/* ------------------------------------------------------------------ */

export interface MinimalSetupSlide {
  id: number;
  type: 'minimal-setup';
  title: string;
  items: string[];
  image: ImageRef;
  closing?: string;
}

/* ------------------------------------------------------------------ */
/* 14. Logo / resource cards                                           */
/* ------------------------------------------------------------------ */

export interface LogoCardsSlide {
  id: number;
  type: 'logo-cards';
  title: string;
  subtitle?: string;
  cards: { name: string; description: string; url?: string }[];
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 15. Timeline (horizontal or vertical)                               */
/* ------------------------------------------------------------------ */

export interface TimelineSlide {
  id: number;
  type: 'timeline';
  title: string;
  subtitle?: string;
  steps: { label: string; caption?: string }[];
}

/* ------------------------------------------------------------------ */
/* 16. Numbered list (ordered)                                         */
/* ------------------------------------------------------------------ */

export interface NumberedListSlide {
  id: number;
  type: 'numbered-list';
  title: string;
  intro?: string;
  items: { title: string; description?: string }[];
}

/* ------------------------------------------------------------------ */
/* 17. Warning cards (mistakes)                                        */
/* ------------------------------------------------------------------ */

export interface WarningCardsSlide {
  id: number;
  type: 'warning-cards';
  title: string;
  cards: { title: string; description: string }[];
}

/* ------------------------------------------------------------------ */
/* 18. Ecosystem diagram (box with connected nodes)                    */
/* ------------------------------------------------------------------ */

export interface EcosystemSlide {
  id: number;
  type: 'ecosystem';
  title: string;
  subtitle?: string;
  centre: string;
  nodes: string[];
}

/* ------------------------------------------------------------------ */
/* 19. Achievement cards                                               */
/* ------------------------------------------------------------------ */

export interface AchievementCardsSlide {
  id: number;
  type: 'achievement-cards';
  title: string;
  subtitle?: string;
  cards: { name: string; achievement: string; detail?: string }[];
  footnote?: string;
}

/* ------------------------------------------------------------------ */
/* 20. Roadmap (Today / This Week / This Month)                        */
/* ------------------------------------------------------------------ */

export interface RoadmapSlide {
  id: number;
  type: 'roadmap';
  title: string;
  items: { when: string; action: string }[];
  closing?: string;
}

/* ------------------------------------------------------------------ */
/* 21. Closing / Thank you                                             */
/* ------------------------------------------------------------------ */

export interface ClosingSlide {
  id: number;
  type: 'closing';
  title: string;
  quote: string;
  quoteAuthor?: string;
  contact?: string;
  website?: string;
  logo?: string;
  qrImage?: string;
}

export interface PollLiveSlide {
  id: number;
  type: 'poll-live';

  /** Fallback title (used when backend is unreachable) */
  title: string;

  /** Fallback question — will be replaced by backend if live */
  fallbackQuestion: string;

  /** Fallback options — will be replaced by backend if live */
  fallbackOptions: { id: string; label: string; weight: number }[];

  /** Backend poll slug, e.g. "ice-breaker-1" */
  pollSlug: string;

  /**
   * Optional: vote page base URL.
   * If not set, uses NEXT_PUBLIC_VOTE_BASE_URL env or falls back to
   * `{window.location.origin}/vote`.
   */
  voteBaseUrl?: string;

  /** Optional fallback footnote */
  footnote?: string;

  /**
   * If false, this slide never tries to connect — always static.
   * Useful for offline talks.
   */
  liveEnabled: boolean;
}