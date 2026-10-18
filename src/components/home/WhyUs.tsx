'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';

export function WhyUs() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <span className="eyebrow">✽ {t.whyUs.eyebrow}</span>
            <h2 className="text-balance mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">{t.whyUs.title}</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">{t.whyUs.subtitle}</p>
          </div>
        </Reveal>

        <div>
          {t.whyUs.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="group grid grid-cols-[3.5rem_1fr] gap-5 border-t border-white/8 py-8 last:border-b sm:grid-cols-[5rem_1fr]">
                <span className="font-display text-3xl font-semibold text-gold/70 transition-colors group-hover:text-gold sm:text-4xl">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
