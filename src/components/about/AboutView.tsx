'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Cog, Globe2, Leaf, Layers, Target, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINES, productsByLine, showcaseImage } from '@/data/catalog';
import { MANUFACTURER, MANUFACTURER_LOCATION, MANUFACTURER_SITE } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ICONS = [Cog, Globe2, Leaf, Layers];

export function AboutView() {
  const { t, locale } = useLanguage();
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.intro} image="/hero.jpg" imagePosition="object-[46%_52%]" imageShift />

      {/* Story */}
      <section className="relative pb-24">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[10/9] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image src="/about-bottles.png" alt="MaxMiles SAE 5W-30 SN-CF" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{a.story.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">{a.story.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-white/65">{a.story.p2}</p>
            <div className="mt-8 rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-sm">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{t.footer.manufacturer}</span>
              <span className="mt-1 block font-semibold text-white">{MANUFACTURER}</span>
              <span className="block text-white/50">{MANUFACTURER_LOCATION[locale]}</span>
              <a href={MANUFACTURER_SITE} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 font-semibold text-gold hover:underline">
                maxmilesoil.com <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quality */}
      <section className="relative border-y border-white/5 bg-ink-2 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={a.quality.title} />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {a.quality.items.map((item, i) => {
              const Icon = ICONS[i] ?? Cog;
              return (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="card h-full rounded-2xl p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="py-24">
        <div className="container-x grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { icon: Target, ...a.mission },
            { icon: Eye, ...a.vision },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <div className="card h-full rounded-3xl p-8 sm:p-10">
                <b.icon className="h-8 w-8 text-gold" />
                <h2 className="mt-6 font-display text-3xl font-semibold text-white">{b.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-white/65">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Range */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading title={a.range.title} subtitle={a.range.desc} />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINES.map((line, i) => (
              <Reveal key={line.key} delay={(i % 3) * 70}>
                <Link href={`/products?line=${line.key}`} className="group card flex h-full items-center gap-5 rounded-2xl p-5">
                  <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl" style={{ background: `radial-gradient(ellipse at 50% 70%, ${line.color}33, transparent 70%), #0e0e13` }}>
                    <Image src={showcaseImage(line.key)} alt="" fill sizes="96px" className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-display text-xl font-semibold text-white group-hover:text-gold">{line.key}</span>
                      <span className="text-xs text-white/40">
                        {productsByLine(line.key).length} {t.lines.products}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-white/55">{line.name[locale]}</span>
                    <span className="mt-2 block h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-14" style={{ background: line.color }} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-[linear-gradient(135deg,rgba(200,169,81,0.14),rgba(10,10,14,0.95)_50%)] p-10 text-center sm:p-16">
              <div className="glow-gold pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2" />
              <h2 className="relative font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">{a.cta.title}</h2>
              <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">{a.cta.desc}</p>
              <Link href="/contact" className="btn btn-gold relative mt-8">
                {a.cta.button} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
