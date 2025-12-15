'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { drinkVariants } from '@/app/data';
import Preloader from '@/components/preloader';
import Header from '@/components/layout/header';
import AboutSection from '@/components/sections/about-section';
import IngredientsSection from '@/components/sections/ingredients-section';
import NutritionSection from '@/components/sections/nutrition-section';
import ReviewsSection from '@/components/sections/reviews-section';
import FaqSection from '@/components/sections/faq-section';
import CtaSection from '@/components/sections/cta-section';
import Footer from '@/components/layout/footer';

const HeroSection = dynamic(() => import('@/components/sections/hero-section'), {
  ssr: false,
  loading: () => <div className="h-screen w-full" />,
});

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialLoadProgress, setInitialLoadProgress] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);

  const currentVariant = drinkVariants[currentVariantIndex];

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-accent', currentVariant.themeColor);
  }, [currentVariant]);

  const handleNextVariant = () => {
    setIsSwitching(true);
    setCurrentVariantIndex((prevIndex) => (prevIndex + 1) % drinkVariants.length);
  };

  const handlePrevVariant = () => {
    setIsSwitching(true);
    setCurrentVariantIndex((prevIndex) => (prevIndex - 1 + drinkVariants.length) % drinkVariants.length);
  };

  useEffect(() => {
    if (isInitialLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInitialLoading]);

  return (
    <>
      <Preloader isLoading={isInitialLoading} progress={initialLoadProgress} />
      <div className={`transition-opacity duration-500 ${isInitialLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <main>
          <HeroSection
            variant={currentVariant}
            variantIndex={currentVariantIndex}
            onNext={handleNextVariant}
            onPrev={handlePrevVariant}
            isSwitching={isSwitching}
            onSwitchComplete={() => setIsSwitching(false)}
            onInitialLoadComplete={() => setIsInitialLoading(false)}
            onInitialLoadProgress={setInitialLoadProgress}
          />
          <div className="bg-background relative z-10">
            <AboutSection />
            <IngredientsSection />
            <NutritionSection />
            <ReviewsSection />
            <FaqSection />
            <CtaSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
