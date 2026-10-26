'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';

export function SeoText() {
  const { t } = useLanguage();
  return (
    <section className="relative border-t border-white/[0.06] bg-ink py-20 sm:py-24">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="display text-balance text-3xl sm:text-4xl">{t.seo.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-white/55">{t.seo.p1}</p>
        </Reveal>
        <Reveal delay={100}>
          <h3 className="font-display text-xl font-bold italic text-white">{t.seo.listTitle}</h3>
          <ul className="mt-6 grid grid-cols-1 gap-px bg-white/[0.07] sm:grid-cols-2">
            {t.seo.list.map((item) => (
              <li key={item.title} className="bg-ink p-5 text-sm leading-relaxed text-white/55">
                <span className="mb-2 block font-display font-bold italic text-white">{item.title}</span>
                {item.desc}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
