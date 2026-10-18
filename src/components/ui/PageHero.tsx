import React from 'react';
import Image from 'next/image';

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Fon rasmi (qorong'i studiya surati, mahsulot o'ng tomonda) */
  image?: string;
  /** object-position (Tailwind klassi), masalan `object-[70%_50%]` */
  imagePosition?: string;
  /** Rasmni o'ngga siljitish (mahsulot matn bilan ustma-ust tushmasligi uchun) */
  imageShift?: boolean;
  /** Past sarlavha bloki (katalog sahifasi uchun) */
  compact?: boolean;
  children?: React.ReactNode;
};

/** Ichki sahifalar uchun sarlavha bloki */
export function PageHero({ eyebrow, title, subtitle, image, imagePosition = 'object-[70%_50%]', imageShift = false, compact = false, children }: Props) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-black ${compact ? 'min-h-[360px] pb-12 pt-32 sm:min-h-[420px] sm:pt-40' : 'min-h-[460px] pb-16 pt-36 sm:min-h-[520px] sm:pb-20 sm:pt-44'}`}>
      {image ? (
        <>
          <div
            className={`absolute inset-y-0 right-0 ${imageShift ? 'left-0 md:left-[22%]' : 'left-0'}`}
            style={imageShift ? { maskImage: 'linear-gradient(to right, transparent 0%, #000 38%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 38%)' } : undefined}
          >
            <Image src={image} alt="" fill priority sizes="100vw" className={`object-cover ${imagePosition}`} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/0 md:via-ink/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/50" />
        </>
      ) : (
        <>
          <div className="glow-gold pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2" />
          <div className="grid-noise pointer-events-none absolute inset-0 opacity-70" />
        </>
      )}
      <div className="container-x relative">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="text-balance mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
