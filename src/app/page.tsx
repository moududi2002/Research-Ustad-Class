// src/app/page.tsx

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import WorkshopGrid from '@/components/home/WorkshopGrid';
import AboutSection from '@/components/home/AboutSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <WorkshopGrid />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}