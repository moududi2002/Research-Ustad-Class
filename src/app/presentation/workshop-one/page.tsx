// src/app/presentation/workshop-one/page.tsx

import type { Metadata } from 'next';
import PresentationViewer from '@/components/viewer/PresentationViewer';
import { allWorkshopOneSlides, workshopOneMeta } from '@/data';

export const metadata: Metadata = {
  title: workshopOneMeta.title,
  description: workshopOneMeta.subtitle,
};

export default function WorkshopOnePage() {
  return (
    <PresentationViewer
      slides={allWorkshopOneSlides}
      initialIndex={0}
      exitHref="/"
    />
  );
}