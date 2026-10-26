'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Flame, ShieldCheck, Sparkles, Gauge, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ICONS: LucideIcon[] = [ShieldCheck, Flame, Sparkles, Gauge];

/** Apple uslubi: rasm joyida qoladi, yonida bosqichlar aylanadi */
export function Story() {
  const { t } = useLanguage();
  const s = t.home.story;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="carbon relative">
      <div className="container-x grid grid-cols-1 gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-0">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center">
          <span className="kicker">{s.kicker}</span>
          <h2 className="display mt-5 text-balance text-[2.15rem] sm:text-5xl lg:text-[3.6rem]">{s.title}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">{s.subtitle}</p>

          <div className="studio frame relative mt-10 aspect-[1088/760] w-full max-w-xl">
            <Image src="/about-bottles.png" alt="MaxMiles ULTRA 5W-30 SN/CF 4L & 1L" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_58%]" />
            <span className="grade absolute bottom-4 right-5 text-7xl text-white/10">0{active + 1}</span>
            <div className="absolute inset-x-0 bottom-0 flex gap-1 p-4">
              {s.items.map((_, i) => (
                <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? 'bg-gold' : 'bg-white/15'}`} />
              ))}
            </div>
          </div>
        </div>

        <ol className="lg:py-[30vh]">
          {s.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const on = i === active;
            return (
              <li
                key={item.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className={`border-t border-white/10 py-10 transition-opacity duration-500 lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-0 ${on ? 'lg:opacity-100' : 'lg:opacity-30'}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-500 ${on ? 'bg-gold text-black' : 'bg-white/[0.06] text-gold'}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="grade text-xl text-white/40">0{i + 1}</span>
                </div>
                <h3 className="display mt-6 text-3xl italic sm:text-4xl">{item.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">{item.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
