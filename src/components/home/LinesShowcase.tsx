'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINES, productsByLine, showcaseImage } from '@/data/catalog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function LinesShowcase() {
  const { t, locale } = useLanguage();
  const l = t.home.lines;

  return (
    <section className="section relative overflow-hidden bg-ink">
      <div className="container-x">
        <SectionHeading kicker={l.kicker} title={l.title} subtitle={l.subtitle}>
          <Link href="/products" className="link-arrow shrink-0 text-gold">
            {t.common.viewAll} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </SectionHeading>
      </div>

      <div className="mx-auto max-w-[84rem] lg:px-10">
      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0">
        {LINES.map((line, i) => {
          const count = productsByLine(line.key).length;
          return (
            <Reveal key={line.key} delay={(i % 3) * 90} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto">
              <Link href={`/products?line=${line.key}`} className="group cut-corner relative block h-full overflow-hidden bg-graphite">
                <div className="studio relative m-2 aspect-[16/12] overflow-hidden rounded-[1.4rem]">
                  <Image
                    src={showcaseImage(line.key)}
                    alt={`MaxMiles ${line.key}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, 78vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-graphite to-transparent" />
                  <span
                    className="absolute -bottom-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: line.color }}
                  />
                </div>
                <div className="relative p-6 pt-2">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="grade text-[2.6rem] text-white">{line.key}</h3>
                    <span className="mb-1 rounded-full bg-white/[0.06] px-3 py-1 font-display text-xs font-bold italic tracking-[0.12em] text-white/55">
                      {String(count).padStart(2, '0')} {l.products}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-1 w-10 -skew-x-[24deg]" style={{ background: line.color }} />
                    <p className="text-sm font-medium text-white/75">{line.name[locale]}</p>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-white/45">{line.desc[locale]}</p>
                  <span className="link-arrow mt-5 text-white/80 transition-colors group-hover:text-gold">
                    {l.open} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
      </div>
    </section>
  );
}
