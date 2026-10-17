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
import MinimalSetupSlide from '@/components/slides/MinimalSetupSlide';
import LogoCardsSlide from '@/components/slides/LogoCardsSlide';
import TimelineSlide from '@/components/slides/TimelineSlide';
import NumberedListSlide from '@/components/slides/NumberedListSlide';
import WarningCardsSlide from '@/components/slides/WarningCardsSlide';
import EcosystemSlide from '@/components/slides/EcosystemSlide';
import AchievementCardsSlide from '@/components/slides/AchievementCardsSlide';
import RoadmapSlide from '@/components/slides/RoadmapSlide';
import ClosingSlide from '@/components/slides/ClosingSlide';
import PollLiveSlide from '@/components/slides/PollLiveSlide';
import DepartmentPollSlide from '@/components/slides/DepartmentPollSlide';

import BreakSlide from '@/components/slides/BreakSlide';

import PromotionSlide from '@/components/slides/PromotionSlide';
import SpeakerSlide from '@/components/slides/SpeakerSlide';
import ResearchFeild from '@/components/slides/component-slides-ResearchFeild';
import CEOProfileSlide from '@/components/slides/CEOProfileSlide';
import SuccessStoryImageSlide from '@/components/slides/SuccessStoryImageSlide';
import TeamOverviewSlide from '@/components/slides/TeamOverviewSlide';


interface Props {
  slide: Slide;
}

export default function SlideRenderer({ slide }: Props) {
  switch (slide.type) {
    case 'cover':
      return <CoverSlide slide={slide} />;
    case 'speaker-profile':
      return <SpeakerSlide slide={slide} />; 
    case 'break':
    return <BreakSlide slide={slide} />;
    case 'poll':
      return <PollSlide slide={slide} />;
    case 'poll-live':
    return <PollLiveSlide slide={slide} />; 
    case 'department-poll':
      return <DepartmentPollSlide slide={slide} />;
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
    case 'minimal-setup':
      return <MinimalSetupSlide slide={slide} />;
    case 'logo-cards':
      return <LogoCardsSlide slide={slide} />;
    case 'timeline':
      return <TimelineSlide slide={slide} />;
    case 'numbered-list':
      return <NumberedListSlide slide={slide} />;
    case 'warning-cards':
      return <WarningCardsSlide slide={slide} />;
    case 'ecosystem':
      return <EcosystemSlide slide={slide} />;
    case 'achievement-cards':
      return <AchievementCardsSlide slide={slide} />;
    case 'roadmap':
      return <RoadmapSlide slide={slide} />;
    case 'closing':
      return <ClosingSlide slide={slide} />;

    case 'promotion':
       return <PromotionSlide slide={slide} />;

    
    case 'research-fields':
      return <ResearchFeild slide={slide} />;

    case 'ceo-profile':
      return <CEOProfileSlide slide={slide} />;
    case 'success-story-image':
    return <SuccessStoryImageSlide slide={slide} />;

    case 'team-overview':
      return <TeamOverviewSlide slide={slide} />;

    /* ------- Safety fallback (should never happen with typed slides) ------- */
    default: {
      const _exhaustive: never = slide;
      void _exhaustive;
      return null;
    }
  }
}