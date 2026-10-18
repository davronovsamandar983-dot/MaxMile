'use client';

import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BROCHURE_URL } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export function BrochureCta() {
  const { t } = useLanguage();
  return (
    <section className="relative py-6">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-[linear-gradient(135deg,rgba(200,169,81,0.14),rgba(10,10,14,0.9)_45%,rgba(10,10,14,1))] p-8 sm:p-12 lg:p-16">
            <div className="glow-gold pointer-events-none absolute -right-20 -top-20 h-80 w-80" />
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr_auto]">
              <div className="relative mx-auto h-32 w-32 shrink-0 animate-float md:h-40 md:w-40">
                <Image src="/badge-best-choice.png" alt={t.brochure.badge} fill sizes="160px" className="object-contain drop-shadow-[0_20px_30px_rgba(200,169,81,.35)]" />
              </div>
              <div className="text-center md:text-left">
                <span className="eyebrow eyebrow--plain">{t.brochure.badge}</span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{t.brochure.title}</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">{t.brochure.desc}</p>
              </div>
              <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold mx-auto md:mx-0">
                <Download className="h-4 w-4" /> {t.brochure.cta}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
