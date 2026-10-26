import React from 'react';
import Image from 'next/image';

type Props = {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  imagePosition?: string;
  accent?: string;
  children?: React.ReactNode;
};

/** Ichki sahifalar sarlavhasi: qora fon, o'ngda surat, pastda diagonal chiziq */
export function PageHero({ kicker, title, subtitle, image, imagePosition = 'object-center', accent = '#c8a951', children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-16 lg:pt-[76px]">
      {image && (
        <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[58%]">
          <Image src={image} alt="" fill priority sizes="(min-width: 1024px) 58vw, 100vw" className={`object-cover opacity-45 lg:opacity-80 ${imagePosition}`} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,.7)_35%,rgba(5,5,6,.15)_100%),linear-gradient(0deg,#050506_0%,transparent_45%)]" />
        </div>
      )}
      <div className="container-x relative pb-12 pt-14 lg:pb-16 lg:pt-20">
        <span className="kicker" style={{ color: accent }}>
          {kicker}
        </span>
        <h1 className="display mt-5 max-w-4xl text-balance text-[2.6rem] italic sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">{subtitle}</p>}
        {children}
      </div>
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${accent} 0 30%, transparent 30% 31%, ${accent} 31% 33%, transparent 33%)` }} />
    </section>
  );
}
