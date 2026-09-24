// src/data/index.ts

export {
  workshopOneMeta,
  workshopOneSlides,
  workshopOneSlidesPart2,
} from './workshop-one';

export { workshops } from './workshops';
export type { WorkshopCard } from './workshops';

/* Combined slides — use this in the viewer */
import { workshopOneSlides, workshopOneSlidesPart2 } from './workshop-one';
export const allWorkshopOneSlides = [
  ...workshopOneSlides,
  ...workshopOneSlidesPart2,
];