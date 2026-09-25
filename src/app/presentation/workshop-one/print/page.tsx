// src/app/presentation/workshop-one/print/page.tsx
import { allWorkshopOneSlides } from '@/data';
import SlideRenderer from '@/components/viewer/SlideRenderer';

export default function WorkshopOnePrintPage() {
  return (
    <main className="pdf-document">
      {allWorkshopOneSlides.map((slide) => (
        <section
          key={slide.id}
          className="pdf-slide"
        >
          <SlideRenderer slide={slide} />
        </section>
      ))}
    </main>
  );
}