import { Hero } from '@/components/home/Hero';
import { GradeTicker } from '@/components/home/GradeTicker';
import { Finder } from '@/components/home/Finder';
import { LinesShowcase } from '@/components/home/LinesShowcase';
import { Story } from '@/components/home/Story';
import { NewPack } from '@/components/home/NewPack';
import { Standards } from '@/components/home/Standards';
import { OriginCta } from '@/components/home/OriginCta';
import { SeoText } from '@/components/home/SeoText';

export default function HomePage() {
  return (
    <>
      <Hero />
      <GradeTicker />
      <Finder />
      <LinesShowcase />
      <Story />
      <NewPack />
      <Standards />
      <OriginCta />
      <SeoText />
    </>
  );
}
