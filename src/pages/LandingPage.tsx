import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustSection } from '../components/landing/TrustSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { CategoriesSection } from '../components/landing/CategoriesSection';
import { FaqSection } from '../components/landing/FaqSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <CategoriesSection />
      <FaqSection />
    </div>
  );
};
