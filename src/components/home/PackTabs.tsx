'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TAB_META = [
  { image: '/packs/grease-1kg.png', href: '/products?line=SMOOTHE', color: '#EAB308' },
  { image: '/packs/dot4.png', href: '/products?line=FORSA', color: '#A855F7' },
  { image: '/packs/drum-208l.png', href: '/products', color: '#C8A951' },
];

export function PackTabs() {
  const { t } = useLanguage();
  const [active, setActive] = useState(2);
  const tab = t.packs.tabs[active];
  const meta = TAB_META[active];

  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.packs.eyebrow} title={t.packs.title} subtitle={t.packs.subtitle} />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {t.packs.tabs.map((tb, i) => (
              <button
                key={tb.label}
                onClick={() => setActive(i)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  i === active ? 'border-gold bg-gold text-black shadow-[0_10px_30px_-12px_rgba(200,169,81,.8)]' : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-gold/40 hover:text-gold'
                }`}
                aria-pressed={i === active}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <div className="card mt-10 grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto md:min-h-[440px]">
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${meta.color}2e, transparent 60%)` }} />
              <div className="grid-noise absolute inset-0" />
              <Image key={meta.image} src={meta.image} alt={tab.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="animate-fade-in object-contain p-12 drop-shadow-[0_30px_40px_rgba(0,0,0,.6)]" />
            </div>
            <div key={tab.label} className="flex flex-col justify-center p-8 animate-fade-in sm:p-12">
              <span className="eyebrow">{tab.label}</span>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{tab.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/60">{tab.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tab.sizes.map((s) => (
                  <span key={s} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
                    {s}
                  </span>
                ))}
              </div>
              <Link href={meta.href} className="btn btn-outline mt-8 self-start">
                {t.common.viewAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
