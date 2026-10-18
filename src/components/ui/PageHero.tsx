import React from 'react';

type Props = { eyebrow: string; title: string; subtitle?: string; children?: React.ReactNode };

/** Ichki sahifalar uchun sarlavha bloki */
export function PageHero({ eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="glow-gold pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2" />
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-70" />
      <div className="container-x relative">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="text-balance mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
