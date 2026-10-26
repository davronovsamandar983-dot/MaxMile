'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINE_MAP, type LineKey } from '@/data/catalog';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

type Tile = {
  key: 'dexvi' | 'sncf' | 'dot4' | 'ep2';
  slug: string;
  line: LineKey;
  image: string;
  cutout?: boolean;
  className: string;
  imgClass?: string;
};

// Ishlab chiqaruvchining haqiqiy suratlari (maxmilesoil.com)
const TILES: Tile[] = [
  { key: 'dexvi', slug: 'geara-atf-dex-vi', line: 'GEARA', image: '/featured/geara-atf-dex-vi.png', className: 'lg:col-span-2 lg:row-span-2 min-h-[380px] lg:min-h-[640px]', imgClass: 'object-cover object-[68%_50%]' },
  { key: 'sncf', slug: 'ultra-5w-30-sn-cf', line: 'ULTRA', image: '/about-bottles.png', className: 'lg:col-span-2 min-h-[300px]', imgClass: 'object-cover object-[50%_60%]' },
  { key: 'dot4', slug: 'forsa-dot-4', line: 'FORSA', image: '/packs/dot4.png', cutout: true, className: 'min-h-[420px] lg:min-h-0' },
  { key: 'ep2', slug: 'smoothe-li-ep2', line: 'SMOOTHE', image: '/packs/grease-1kg.png', cutout: true, className: 'min-h-[420px] lg:min-h-0' },
];

export function NewPack() {
  const { t } = useLanguage();
  const b = t.home.bento;

  return (
    <section className="section bg-ink">
      <div className="container-x">
        <SectionHeading kicker={b.kicker} title={b.title} subtitle={b.subtitle} />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {TILES.map((tile, i) => {
            const text = b[tile.key];
            return (
              <Reveal key={tile.key} delay={i * 80} className={`${tile.className} ${i < 2 ? 'sm:col-span-2' : ''}`}>
                <Link href={`/products/${tile.slug}`} className="group frame relative flex h-full flex-col justify-end bg-graphite">
                  {tile.cutout ? (
                    // Kesilgan qadoq: rasm yuqorida, matn pastda (ustma-ust tushmaydi)
                    <div className="studio relative min-h-[240px] flex-1">
                      <Image
                        src={tile.image}
                        alt={text.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-contain p-8 drop-shadow-[0_30px_30px_rgba(0,0,0,.6)] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    // Keng plitka: surat o'ng yarmida, matn chapda — ustma-ust tushmaydi
                    <div className={`overflow-hidden ${i === 0 ? 'absolute inset-0' : 'relative h-60 w-full sm:absolute sm:inset-y-0 sm:left-[38%] sm:right-0 sm:h-auto sm:w-auto'}`}>
                      <Image
                        src={tile.image}
                        alt={text.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${tile.imgClass}`}
                      />
                      <div className={`absolute inset-0 ${i === 0 ? 'bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,.85))]' : 'bg-[linear-gradient(0deg,#131418_0%,transparent_45%)] sm:bg-[linear-gradient(90deg,#131418_0%,transparent_35%)]'}`} />
                    </div>
                  )}
                  <div className={`relative p-6 sm:p-8 ${tile.cutout ? 'pt-2 sm:pt-3' : ''} ${i === 1 ? 'sm:max-w-[48%]' : ''}`}>
                    <span className="flex items-center gap-2 font-display text-[11px] font-extrabold italic uppercase tracking-[0.2em] text-white/70">
                      <span className="h-3 w-1.5 -skew-x-[24deg]" style={{ background: LINE_MAP[tile.line].color }} />
                      {tile.line}
                    </span>
                    <h3 className={`grade mt-3 text-white ${i === 0 ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>
                      {/* «5W-30» kabi belgilar defisdan bo'linmasin */}
                      {text.title.split(' ').map((w, k) => (
                        <React.Fragment key={k}>
                          {k > 0 && ' '}
                          <span className="whitespace-nowrap">{w}</span>
                        </React.Fragment>
                      ))}
                    </h3>
                    <p className={`mt-3 max-w-md text-sm leading-relaxed text-white/65 ${i > 1 ? 'line-clamp-2' : ''}`}>{text.desc}</p>
                    <span className="link-arrow mt-5 text-gold">
                      {b.cta} <ArrowUpRight className="h-4 w-4" />
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
