'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINES, productsByLine } from '@/data/catalog';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function LinesGrid() {
  const { t, locale } = useLanguage();
  return (
    <section id="lines" className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.lines.eyebrow} title={t.lines.title} subtitle={t.lines.subtitle} />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LINES.map((line, i) => {
            const count = productsByLine(line.key).length;
            return (
              <Reveal key={line.key} delay={(i % 3) * 90}>
                <Link
                  href={`/products?line=${line.key}`}
                  className="group card relative block overflow-hidden rounded-2xl"
                  aria-label={`${line.key} — ${line.name[locale]}`}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={line.image}
                      alt={line.name[locale]}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <span
                      className="absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-[0.2em] backdrop-blur"
                      style={{ color: line.color, borderColor: `${line.color}66`, background: `${line.color}22` }}
                    >
                      {line.key}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-display text-xl font-semibold leading-tight text-white">{line.name[locale]}</h3>
                      <p className="mt-1 text-xs text-white/55">
                        {count} {t.lines.products}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
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
