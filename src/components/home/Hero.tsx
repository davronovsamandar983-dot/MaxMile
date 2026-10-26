'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FINDER, PRODUCTS, type FinderKey } from '@/data/catalog';

const selectCls =
  'w-full cursor-pointer appearance-none bg-transparent pr-8 font-display text-base font-bold text-white outline-none [&>option]:bg-graphite [&>option]:text-white';

/** Dribbble avtomobil saytlaridagi kabi: hero ichida qidiruv paneli */
function HeroSearch() {
  const { t } = useLanguage();
  const h = t.home.hero;
  const router = useRouter();
  const [use, setUse] = useState<FinderKey>('car');
  const [grade, setGrade] = useState('');

  const grades = useMemo(() => {
    const lines = FINDER.find((f) => f.key === use)!.lines;
    return Array.from(new Set(PRODUCTS.filter((p) => lines.includes(p.line) && p.grade && !/ml$/.test(p.grade)).map((p) => p.grade!)));
  }, [use]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = grade ? `&q=${encodeURIComponent(grade)}` : '';
    router.push(`/products?use=${use}${q}`);
  };

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 backdrop-blur-xl sm:grid-cols-[1fr_1fr_auto] sm:rounded-full"
      role="search"
    >
      <label className="relative block bg-black/45 px-6 py-3.5 sm:py-3">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{h.searchVehicle}</span>
        <select
          value={use}
          onChange={(e) => {
            setUse(e.target.value as FinderKey);
            setGrade('');
          }}
          className={selectCls}
        >
          {FINDER.map((f) => (
            <option key={f.key} value={f.key}>
              {t.home.finder.tabs[f.key]}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute bottom-4 right-6 h-4 w-4 text-gold" />
      </label>
      <label className="relative block bg-black/45 px-6 py-3.5 sm:py-3">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{h.searchGrade}</span>
        <select value={grade} onChange={(e) => setGrade(e.target.value)} className={selectCls}>
          <option value="">{h.searchAny}</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute bottom-4 right-6 h-4 w-4 text-gold" />
      </label>
      <div className="flex items-center bg-black/45 p-2">
        <button type="submit" className="btn btn-gold w-full !py-4 sm:w-auto sm:!px-8">
          <Search className="h-4 w-4" /> {h.searchCta}
        </button>
      </div>
    </form>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const h = t.home.hero;

  return (
    <section className="bg-ink px-2 pt-[68px] sm:px-3 lg:px-4 lg:pt-[84px]">
      <div className="frame relative bg-carbon lg:min-h-[calc(100svh-100px)]">
        {/* Surat: mobil — yuqorida, desktop — o'ng tomonda */}
        <div className="relative h-[48vh] min-h-[320px] overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[66%]">
          <Image src="/hero.jpg" alt="MaxMiles SAE 0W-30 API SN" fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="animate-kenburns object-cover object-[50%_42%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,#0b0c0e_100%)] lg:bg-[linear-gradient(90deg,#0b0c0e_0%,rgba(11,12,14,.6)_22%,transparent_50%),linear-gradient(180deg,transparent_60%,rgba(11,12,14,.9)_100%)]" />

          {/* Suzuvchi karta */}
          <div className="absolute right-4 top-4 hidden animate-pop rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-xl [animation-delay:900ms] sm:block lg:right-8 lg:top-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">{h.madeIn}</p>
            <div className="mt-3 flex gap-5">
              {h.stats.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <p className="grade text-2xl text-white">{s.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col px-5 pb-5 sm:px-8 lg:min-h-[calc(100svh-100px)] lg:justify-between lg:px-14 lg:pb-10 lg:pt-16">
          <div className="-mt-16 max-w-[38rem] lg:mt-0">
            <span className="kicker animate-rise">{h.kicker}</span>
            <h1 className="display mt-5 text-[3.2rem] italic leading-[0.92] sm:text-7xl xl:text-[6.2rem]">
              <span className="block animate-rise text-white [animation-delay:120ms]">{h.line1}</span>
              <span className="text-chrome block animate-rise [animation-delay:240ms]">{h.line2}</span>
              <span className="text-gold-grad block animate-rise [animation-delay:360ms]">{h.line3}</span>
            </h1>
            <p className="mt-6 max-w-md animate-rise text-pretty text-base leading-relaxed text-white/70 [animation-delay:480ms] sm:text-lg">{h.subtitle}</p>
            <div className="mt-8 flex animate-rise flex-wrap gap-3 [animation-delay:600ms]">
              <Link href="/products" className="btn btn-chrome">
                {h.ctaCatalog}
                <span className="btn-orb">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/#finder" className="btn btn-line">
                {h.ctaFinder}
              </Link>
            </div>
          </div>

          <div className="mt-10 animate-rise [animation-delay:750ms] lg:mt-12 lg:max-w-4xl">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
