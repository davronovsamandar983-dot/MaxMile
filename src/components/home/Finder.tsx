'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Bike, Car, Cog, Droplets, Factory, MessageCircle, Truck, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FINDER, LINE_MAP, getProduct, productHeadline, productsByLine, type FinderKey, type Product } from '@/data/catalog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TELEGRAM_URL } from '@/lib/site';

const ICONS: Record<FinderKey, LucideIcon> = { car: Car, truck: Truck, moto: Bike, gear: Cog, industry: Factory, fluids: Droplets };
const PHOTOS: Record<FinderKey, string> = {
  car: '/lines/ultra.jpg',
  truck: '/lines/power.jpg',
  moto: '/lines/mota.jpg',
  gear: '/lines/geara.jpg',
  industry: '/lines/hydra.jpg',
  fluids: '/lines/freeza.jpg',
};

function MiniProduct({ p, className = '' }: { p: Product; className?: string }) {
  const line = LINE_MAP[p.line];
  return (
    <Link href={`/products/${p.slug}`} className={`group flex items-center gap-4 rounded-2xl bg-white p-2.5 pr-4 shadow-[0_1px_0_rgba(0,0,0,.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,.35)] ${className}`}>
      <span className="studio relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <Image src={p.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
          <span className="h-2.5 w-1 -skew-x-[24deg]" style={{ background: line.color }} />
          {p.line}
        </span>
        <span className="grade mt-1 block truncate text-xl text-coal">{productHeadline(p)}</span>
        <span className="block truncate text-xs text-black/50">{p.spec || p.name}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-black/30 transition-colors group-hover:text-black" />
    </Link>
  );
}

export function Finder() {
  const { t, locale } = useLanguage();
  const f = t.home.finder;
  const [active, setActive] = useState<FinderKey>('car');
  const entry = FINDER.find((e) => e.key === active)!;
  const primary = entry.lines.flatMap((k) => productsByLine(k)).slice(0, 6);
  const extras = entry.extras.map(getProduct).filter(Boolean) as Product[];
  const Icon = ICONS[active];

  return (
    <section id="finder" className="section relative overflow-hidden bg-paper text-coal">
      <div className="pointer-events-none absolute -right-24 top-0 h-full w-1/2 bg-[repeating-linear-gradient(115deg,rgba(0,0,0,.035)_0_2px,transparent_2px_16px)]" />
      <div className="container-x relative">
        <SectionHeading light kicker={f.kicker} title={f.title} subtitle={f.subtitle} />

        <div className="no-scrollbar -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label={f.kicker}>
          {FINDER.map(({ key }) => {
            const TabIcon = ICONS[key];
            const on = key === active;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(key)}
                className={`btn btn-sm shrink-0 !normal-case !tracking-wide ${on ? 'btn-ink' : 'bg-white text-coal hover:bg-white/70'}`}
              >
                <TabIcon className="h-4 w-4" /> {f.tabs[key]}
              </button>
            );
          })}
        </div>

        <div key={active} className="mt-8 grid animate-fade-in grid-cols-1 gap-3 lg:grid-cols-12" role="tabpanel">
          {/* Chap: surat + tavsif */}
          <div className="frame relative min-h-[300px] bg-coal text-white lg:col-span-5 lg:min-h-[520px]">
            <Image src={PHOTOS[active]} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,.85))]" />
            <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="display mt-5 text-3xl italic sm:text-4xl">{f.tabs[active]}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{f.descs[active]}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {entry.lines.map((k) => (
                  <Link key={k} href={`/products?line=${k}`} className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur transition-colors hover:border-white/60">
                    <span className="h-3.5 w-1.5 -skew-x-[24deg]" style={{ background: LINE_MAP[k].color }} />
                    <span className="font-display text-sm font-extrabold italic tracking-wider">{k}</span>
                    <span className="text-xs text-white/60">{LINE_MAP[k].name[locale]}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* O'ng: mahsulotlar */}
          <div className="frame flex flex-col bg-paper-2 p-3 sm:p-6 lg:col-span-7">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {primary.map((p, i) => (
                <MiniProduct key={p.slug} p={p} className={i >= 4 ? 'hidden sm:flex' : ''} />
              ))}
            </div>

            {extras.length > 0 && (
              <>
                <p className="mt-7 px-1 font-display text-xs font-bold uppercase italic tracking-[0.2em] text-black/50">{f.also}</p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {extras.map((p, i) => (
                    <MiniProduct key={p.slug} p={p} className={i >= 2 ? 'hidden sm:flex' : ''} />
                  ))}
                </div>
              </>
            )}

            <div className="mt-auto flex flex-col gap-4 px-1 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <Link href={`/products?line=${entry.lines[0]}`} className="link-arrow text-coal">
                {f.all} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn btn-ink btn-sm">
                <MessageCircle className="h-4 w-4" /> {f.ask}
              </a>
            </div>
            <p className="mt-4 px-1 text-xs leading-relaxed text-black/45">{f.hint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
