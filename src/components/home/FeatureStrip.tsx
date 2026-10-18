'use client';

import React from 'react';
import { BadgeCheck, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';

const ICONS = [BadgeCheck, ShieldCheck, Truck, MessageCircle];

export function FeatureStrip() {
  const { t } = useLanguage();
  return (
    <section id="features" className="relative border-y border-white/5 bg-ink-2">
      <div className="container-x py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {t.features.map((f, i) => {
            const Icon = ICONS[i] ?? BadgeCheck;
            return (
              <Reveal key={f.title} delay={i * 80}>
                <div className="flex gap-4 lg:flex-col lg:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
