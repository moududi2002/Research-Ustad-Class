// src/app/presentation/workshop-one/print/page.tsx

import { allWorkshopOneSlides } from '@/data';
import PrintSlideRenderer from '@/components/viewer/PrintSlideRenderer';

export default function WorkshopOnePrintPage() {
  const printableSlides = allWorkshopOneSlides.filter(
    (slide) => slide.type !== 'break',
  );

  return (
    <main className="pdf-document">
      {printableSlides.map((slide) => (
        <section key={slide.id} className="pdf-slide">
          <PrintSlideRenderer slide={slide} />
        </section>
      ))}
    </main>
  );
}

