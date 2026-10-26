'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Cog, Globe2, Leaf, Layers } from 'lucide-react';
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
      <PageHero kicker={a.eyebrow} title={a.title} subtitle={a.intro} image="/hero.jpg" imagePosition="object-[50%_45%]" />

      {/* Tarix */}
      <section className="section bg-ink">
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="studio frame relative aspect-[1088/900]">
              <Image src="/about-bottles.png" alt="MaxMiles ULTRA 5W-30 SN/CF" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[50%_60%]" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="kicker">{a.eyebrow}</span>
            <h2 className="display mt-5 text-4xl italic sm:text-5xl">{a.story.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-white/65">{a.story.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-white/65">{a.story.p2}</p>
            <div className="panel cut-corner-sm mt-8 p-5 text-sm">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{t.footer.manufacturer}</span>
              <span className="mt-1.5 block font-display text-base font-bold italic text-white">{MANUFACTURER}</span>
              <span className="block text-white/50">{MANUFACTURER_LOCATION[locale]}</span>
              <a href={MANUFACTURER_SITE} target="_blank" rel="noreferrer" className="link-arrow mt-4 text-gold">
                maxmilesoil.com <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sifat */}
      <section className="section bg-paper text-coal">
        <div className="container-x">
          <SectionHeading light kicker="MaxMiles" title={a.quality.title} />
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {a.quality.items.map((item, i) => {
              const Icon = ICONS[i] ?? Cog;
              return (
                <Reveal key={item.title} delay={i * 80} className="h-full">
                  <div className="h-full rounded-[1.75rem] bg-white/70 p-7 transition-colors hover:bg-white">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-coal text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="display mt-6 text-2xl italic">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/60">{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Missiya va maqsad */}
      <section className="bg-ink">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {[a.mission, a.vision].map((b, i) => (
            <div key={b.title} className={`relative overflow-hidden px-6 py-20 sm:px-12 lg:px-20 lg:py-28 ${i === 0 ? 'bg-carbon' : 'bg-graphite'}`}>
              <span className="grade pointer-events-none absolute -right-4 -top-6 text-[11rem] text-white/[0.04]">0{i + 1}</span>
              <Reveal>
                <span className="kicker">0{i + 1}</span>
                <h2 className="display mt-5 text-4xl italic sm:text-5xl">{b.title}</h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">{b.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Seriyalar */}
      <section className="section bg-ink">
        <div className="container-x">
          <SectionHeading kicker={t.home.lines.kicker} title={a.range.title} subtitle={a.range.desc} />
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINES.map((line, i) => (
              <Reveal key={line.key} delay={(i % 3) * 70} className="h-full">
                <Link href={`/products?line=${line.key}`} className="group flex h-full items-center gap-5 rounded-[1.5rem] bg-graphite p-3 pr-5 transition-colors hover:bg-steel">
                  <span className="studio relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={showcaseImage(line.key)} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="grade text-2xl text-white">{line.key}</span>
                      <span className="text-xs text-white/40">
                        {productsByLine(line.key).length} {t.lines.products}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-white/55">{line.name[locale]}</span>
                    <span className="mt-3 block h-1 w-8 -skew-x-[24deg] transition-all duration-300 group-hover:w-16" style={{ background: line.color }} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden border-t border-white/[0.07] bg-carbon">
        <div className="slashes absolute inset-0 -z-10 opacity-50" />
        <div className="container-x flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
          <div>
            <h2 className="display text-4xl italic sm:text-5xl">{a.cta.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">{a.cta.desc}</p>
          </div>
          <Link href="/contact" className="btn btn-gold shrink-0">
            {a.cta.button} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
