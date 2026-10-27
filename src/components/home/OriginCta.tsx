'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Check, Download, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BROCHURE_URL, MANUFACTURER_SITE, PHONE, PHONE_DISPLAY, telegramStartUrl } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export function OriginCta() {
  const { t, locale } = useLanguage();
  const o = t.home.origin;
  const c = t.home.cta;

  return (
    <>
      <section className="section relative overflow-hidden bg-carbon">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="kicker">{o.kicker}</span>
            <h2 className="display mt-5 text-balance text-[2.15rem] sm:text-5xl">{o.title}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">{o.desc}</p>
            <ul className="mt-8 space-y-3">
              {o.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={MANUFACTURER_SITE} target="_blank" rel="noreferrer" className="link-arrow mt-9 text-gold">
              {o.site} <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <a href={BROCHURE_URL} target="_blank" rel="noreferrer" className="group panel cut-corner relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden p-8 sm:p-10">
              <div className="slashes pointer-events-none absolute inset-0 opacity-60" />
              <Image src="/badge-best-choice.png" alt="" width={1088} height={960} className="pointer-events-none absolute -right-10 -top-6 w-56 opacity-90 transition-transform duration-700 group-hover:rotate-12 sm:w-64" />
              <span className="relative font-display text-xs font-bold uppercase italic tracking-[0.2em] text-white/50">MaxMiles · 2025</span>
              <div className="relative">
                <h3 className="grade text-5xl text-white sm:text-6xl">{o.brochureTitle}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{o.brochureDesc}</p>
                <span className="btn btn-chrome mt-8">
                  <Download className="h-4 w-4" /> {o.brochureCta}
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-carbon px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
        <div className="frame relative bg-ink">
        <Image src="/featured/ultra-5w-30-sn-cf.png" alt="" fill sizes="100vw" className="-z-10 object-cover object-[70%_50%] opacity-70" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#050506_0%,rgba(5,5,6,.85)_40%,rgba(5,5,6,.15)_100%)]" />
        <div className="container-x py-20 lg:py-28">
          <span className="kicker">{c.kicker}</span>
          <h2 className="display mt-5 max-w-2xl text-balance text-5xl italic sm:text-6xl lg:text-7xl">
            <span className="text-chrome">{c.title}</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">{c.desc}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={telegramStartUrl(locale)} target="_blank" rel="noreferrer" className="btn btn-gold">
              <Send className="h-4 w-4" /> {c.telegram}
            </a>
            <a href={`tel:${PHONE}`} className="btn btn-line">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
