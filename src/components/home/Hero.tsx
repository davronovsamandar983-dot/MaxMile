'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, BadgeCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black">
      <div className="absolute inset-x-0 top-0 h-[66%] md:inset-0 md:h-full">
        <Image
          src="/hero.jpg"
          alt="MaxMiles SAE 0W-30 API SN"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[45%_center] md:object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink from-35% via-ink/60 via-60% to-transparent md:hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/10 to-transparent" />

      <div className="container-x relative pt-44 pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex flex-col items-start gap-3">
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold">
              <BadgeCheck className="h-3.5 w-3.5" /> {t.hero.badge}
            </span>
          </div>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            {t.hero.title1}
            <br />
            <span className="text-gold-gradient">{t.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80 sm:text-xl">{t.hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-gold">
              {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#features"
        className="absolute bottom-8 right-6 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-gold md:flex"
        aria-label={t.hero.scroll}
      >
        <span>{t.hero.scroll}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
