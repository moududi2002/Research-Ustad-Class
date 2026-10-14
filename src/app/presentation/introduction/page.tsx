// src/app/presentation/introduction/page.tsx

import type { Metadata } from 'next';
import PresentationViewer from '@/components/viewer/PresentationViewer';
import {
  introductionMeta,
  introductionSlides,
} from '@/data/introduction';

export const metadata: Metadata = {
  title: introductionMeta.title,
  description: introductionMeta.subtitle,
};

export default function IntroductionPage() {
  return (
    <PresentationViewer
      slides={introductionSlides}
      initialIndex={0}
      exitHref="/"
    />
  );
}
