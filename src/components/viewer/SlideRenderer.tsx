// src/components/viewer/SlideRenderer.tsx

import type { Slide } from '@/types/slide';
import CoverSlide from '@/components/slides/CoverSlide';
import PollSlide from '@/components/slides/PollSlide';
import FlowSlide from '@/components/slides/FlowSlide';
import ChecklistSlide from '@/components/slides/ChecklistSlide';
import ImageCardsSlide from '@/components/slides/ImageCardsSlide';
import ComparisonTableSlide from '@/components/slides/ComparisonTableSlide';
import CycleSlide from '@/components/slides/CycleSlide';
import MindmapSlide from '@/components/slides/MindmapSlide';
import ChartSlide from '@/components/slides/ChartSlide';
import ComparisonSlide from '@/components/slides/ComparisonSlide';
import MythRealitySlide from '@/components/slides/MythRealitySlide';
import BarrierSlide from '@/components/slides/BarrierSlide';

interface Props {
  slide: Slide;
}

export default function SlideRenderer({ slide }: Props) {
  switch (slide.type) {
    case 'cover':
      return <CoverSlide slide={slide} />;
    case 'poll':
      return <PollSlide slide={slide} />;
    case 'flow':
      return <FlowSlide slide={slide} />;
    case 'checklist':
      return <ChecklistSlide slide={slide} />;
    case 'image-cards':
      return <ImageCardsSlide slide={slide} />;
    case 'comparison-table':
      return <ComparisonTableSlide slide={slide} />;
    case 'cycle':
      return <CycleSlide slide={slide} />;
    case 'mindmap':
      return <MindmapSlide slide={slide} />;
    case 'chart':
      return <ChartSlide slide={slide} />;
    case 'comparison':
      return <ComparisonSlide slide={slide} />;
    case 'myth-reality':
      return <MythRealitySlide slide={slide} />;
    case 'barrier':
      return <BarrierSlide slide={slide} />;

    /* ------- Not yet implemented ------- */
    default:
      return (
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Slide {slide.id} · {slide.type}
          </p>
          {'title' in slide && (
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {slide.title}
            </h2>
          )}
          <p className="mt-6 text-sm text-foreground-subtle">
            (Renderer coming in a later step)
          </p>
        </div>
      );
  }
}