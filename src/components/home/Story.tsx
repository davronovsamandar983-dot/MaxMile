'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Flame, ShieldCheck, Sparkles, Gauge, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const STEPS: { icon: LucideIcon; image: string; position: string }[] = [
  { icon: ShieldCheck, image: '/lines/gear-industrial.jpg', position: 'object-[50%_40%]' },
  { icon: Flame, image: '/hero.jpg', position: 'object-[50%_45%]' },
  { icon: Sparkles, image: '/lines/forsa.jpg', position: 'object-center' },
  { icon: Gauge, image: '/lines/power.jpg', position: 'object-center' },
];

/** Apple uslubi: chapda surat joyida qoladi va bosqichga qarab almashadi */
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

          <div className="studio frame relative mt-10 hidden aspect-[1088/760] w-full max-w-xl lg:block">
            {STEPS.map((step, i) => (
              <Image
                key={step.image}
                src={step.image}
                alt=""
                fill
                sizes="40vw"
                className={`object-cover transition-[opacity,transform] duration-700 ease-out ${step.position} ${i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,.65))]" />
            <div className="absolute bottom-10 left-6 right-6 flex items-end justify-between gap-4">
              <p key={active} className="display animate-fade-in text-2xl italic text-white">{s.items[active]?.title}</p>
              <span className="grade text-6xl text-white/25">0{active + 1}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-4">
              {s.items.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                  <span className={`block h-full rounded-full bg-gold transition-transform duration-700 ${i <= active ? 'translate-x-0' : '-translate-x-full'}`} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <ol className="lg:py-[28vh]">
          {s.items.map((item, i) => {
            const step = STEPS[i % STEPS.length];
            const Icon = step.icon;
            const on = i === active;
            return (
              <li
                key={item.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className={`border-t border-white/10 py-10 transition-opacity duration-500 lg:flex lg:min-h-[46vh] lg:flex-col lg:justify-center lg:py-0 ${on ? 'lg:opacity-100' : 'lg:opacity-35'}`}
              >
                {/* Mobil: har bosqichning o'z surati */}
                <div className="studio relative mb-7 aspect-[16/9] overflow-hidden rounded-[1.5rem] lg:hidden">
                  <Image src={step.image} alt="" fill sizes="100vw" className={`object-cover ${step.position}`} />
                </div>
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
