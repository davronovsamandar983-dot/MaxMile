'use client';

import React from 'react';
import Image from 'next/image';
import { Check, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { MANUFACTURER_SITE } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export function Origins() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 sm:py-28">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[10/9] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image src="/about-bottles.png" alt="MaxMiles SAE 5W-30 SN-CF" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden h-28 w-28 sm:block lg:-right-8 lg:h-36 lg:w-36">
              <Image src="/origin.png" alt="" fill sizes="144px" className="object-contain opacity-90 drop-shadow-[0_10px_30px_rgba(200,169,81,.5)]" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow">{t.origins.eyebrow}</span>
          <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">{t.origins.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">{t.origins.desc}</p>
          <ul className="mt-8 space-y-4">
            {t.origins.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/80 sm:text-base">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <a href={MANUFACTURER_SITE} target="_blank" rel="noreferrer" className="btn btn-outline mt-10">
            maxmilesoil.com <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
