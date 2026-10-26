'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

// Qadoq siluetining nisbiy balandligi (1 L … 208 L)
const HEIGHTS = [34, 52, 58, 78, 100];
// Kartani bosganda katalog shu belgi bo'yicha qidiradi
const QUERY: Record<string, string> = { 'DOT 3 · DOT 4': 'DOT', 'JASO MA-2': 'JASO', 'ISO VG': 'ISO VG' };

export function Standards() {
  const { t } = useLanguage();
  const s = t.home.standards;
  const p = t.home.packs;

  return (
    <section className="section bg-paper text-coal">
      <div className="container-x">
        <SectionHeading light kicker={s.kicker} title={s.title} subtitle={s.subtitle} />

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => (
            <Reveal key={item.code} delay={(i % 3) * 70} className="h-full">
              <Link
                href={`/products?q=${encodeURIComponent(QUERY[item.code] ?? item.code)}`}
                className="group relative block h-full rounded-[1.75rem] bg-white/70 p-7 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,.35)]"
              >
                <ArrowUpRight className="absolute right-6 top-7 h-5 w-5 text-black/25 transition-colors group-hover:text-black" />
                <span className="grade text-3xl text-coal">{item.code}</span>
                <span className="mt-4 block h-1 w-8 -skew-x-[24deg] bg-gold transition-all duration-300 group-hover:w-16" />
                <p className="mt-4 text-sm leading-relaxed text-black/60">{item.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Qadoqlar shkalasi */}
        <div className="mt-24 grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="kicker !text-[#8a6d22]">{p.kicker}</span>
            <h3 className="display mt-5 text-4xl italic sm:text-5xl">{p.title}</h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-black/60">{p.subtitle}</p>
            <p className="mt-6 border-l-4 border-gold pl-4 text-sm leading-relaxed text-black/55">{p.note}</p>
          </div>
          <div className="flex h-64 items-end justify-between gap-3 border-b-2 border-coal sm:h-80 sm:gap-5">
            {p.items.map((item, i) => (
              <Link key={item.size} href={`/products?pack=${encodeURIComponent(item.size)}`} className="group flex h-full flex-1 flex-col items-center justify-end">
                <span className="grade text-lg text-coal sm:text-2xl">{item.size}</span>
                <span className="mb-3 text-[10px] uppercase tracking-[0.16em] text-black/45">{item.label}</span>
                <span
                  className="w-full origin-bottom rounded-t-2xl bg-[linear-gradient(180deg,#2b2d33,#0e0f11)] shadow-[inset_0_1px_0_rgba(255,255,255,.12)] transition-transform duration-300 group-hover:scale-y-[1.04]"
                  style={{ height: `${HEIGHTS[i]}%` }}
                >
                  <span className="mx-auto mt-[22%] block h-[28%] w-[70%] rounded-md bg-[linear-gradient(135deg,#1d4d47,#0b1715)] opacity-90 transition-colors group-hover:bg-[linear-gradient(135deg,#c8a951,#6d5520)]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
