'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';

export function SeoText() {
  const { t } = useLanguage();
  return (
    <section className="relative border-t border-white/5 py-20 sm:py-24">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl">{t.seo.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-white/60">{t.seo.p1}</p>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="font-display text-2xl font-semibold text-white">{t.seo.listTitle}</h3>
          <ul className="mt-6 space-y-5">
            {t.seo.list.map((item) => (
              <li key={item.title} className="border-l-2 border-gold/50 pl-5 text-sm leading-relaxed text-white/60 sm:text-base">
                <span className="font-semibold text-white">{item.title}</span> — {item.desc}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
