// src/data/workshops.ts

export interface WorkshopCard {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  duration?: string;
  level?: string;
  status: 'active' | 'disabled';
  badge?: string;   // e.g. "New" or "Coming Soon"
  href?: string;    // only present for active items
  accent: 'emerald' | 'amber' | 'indigo';
}

export const workshops: WorkshopCard[] = [
  {
    slug: 'workshop-one',
    title: 'Workshop One',
    subtitle:
      'Research: What, Why and Its Importance in Higher Study',
    date: '2025',
    duration: '60 Minutes',
    level: 'Beginner',
    status: 'active',
    badge: 'Available',
    href: '/presentation/workshop-one',
    accent: 'emerald',
  },
  {
    slug: 'workshop-two',
    title: 'Workshop Two',
    subtitle: 'Advanced Methodology and Publication Strategy',
    date: 'Coming Soon',
    status: 'disabled',
    badge: 'Coming Soon',
    accent: 'amber',
  },
  {
    slug: 'class-one',
    title: 'Class One',
    subtitle: 'Foundations of Scientific Writing',
    date: 'Coming Soon',
    status: 'disabled',
    badge: 'Coming Soon',
    accent: 'indigo',
  },
];