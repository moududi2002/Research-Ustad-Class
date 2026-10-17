
import Image from 'next/image';
import SlideShell from './_shared/SlideShell';
import type { SuccessStoryImageSlide as SuccessStoryImageSlideType } from '@/types/slide';

interface Props {
  slide: SuccessStoryImageSlideType;
}

export default function SuccessStoryImageSlide({ slide }: Props) {
  return (
    <SlideShell>
      <div className="w-full">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Milestones
        </p>

        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {slide.title}
        </h1>

        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          {slide.subtitle}
        </p>

        <div className="relative mt-7 aspect-video w-full overflow-hidden rounded-xl bg-surface">
          <Image
            src={slide.image}
            alt="Student success story"
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>
    </SlideShell>
  );
}
