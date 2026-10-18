'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Stats() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.stats.eyebrow} title={t.stats.title} />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="card rounded-2xl p-7 text-center sm:p-9">
                <span className="text-gold-gradient font-display text-5xl font-semibold tracking-tight sm:text-6xl">{s.value}</span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
