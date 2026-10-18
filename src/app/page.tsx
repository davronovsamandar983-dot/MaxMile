import { Hero } from '@/components/home/Hero';
import { FeatureStrip } from '@/components/home/FeatureStrip';
import { LinesGrid } from '@/components/home/LinesGrid';
import { FeaturedSticky } from '@/components/home/FeaturedSticky';
import { WhyUs } from '@/components/home/WhyUs';
import { BrochureCta } from '@/components/home/BrochureCta';
import { PackTabs } from '@/components/home/PackTabs';
import { Origins } from '@/components/home/Origins';
import { Stats } from '@/components/home/Stats';
import { SeoText } from '@/components/home/SeoText';
import { ContactTeaser } from '@/components/home/ContactTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <LinesGrid />
      <FeaturedSticky />
      <WhyUs />
      <BrochureCta />
      <PackTabs />
      <Origins />
      <Stats />
      <SeoText />
      <ContactTeaser />
    </>
  );
}
