'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getProduct, LINE_MAP } from '@/data/catalog';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LineBadge } from '@/components/ui/LineBadge';

const CARDS = [
  { slug: 'ultra-5w-30-sn-cf', image: '/featured/ultra-5w-30-sn-cf.png', kind: 'photo' as const },
  { slug: 'geara-atf-dex-vi', image: '/featured/geara-atf-dex-vi.png', kind: 'photo' as const },
  { slug: 'power-10w-40-ci-4-e4-e7', image: '/products/power-10w-40-ci-4-e4-e7.webp', kind: 'cutout' as const },
];

export function FeaturedSticky() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-ink-2 py-24 sm:py-28">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} />
        </Reveal>

        <div className="mt-14 space-y-8">
          {CARDS.map((card, i) => {
            const product = getProduct(card.slug);
            if (!product) return null;
            const copy = t.featured.items[i];
            const color = LINE_MAP[product.line].color;
            return (
              <div key={card.slug} className="md:sticky" style={{ top: `${92 + i * 20}px` }}>
                <article className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)] md:h-[72vh] md:max-h-[720px]">
                  {card.kind === 'photo' ? (
                    <Image
                      src={card.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1280px) 1200px, 100vw"
                      className="object-cover object-[70%_center]"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{ background: `radial-gradient(ellipse at 75% 55%, ${color}33, transparent 55%), linear-gradient(135deg, #0b0b0f, #050507)` }}
                      />
                      <div className="grid-noise absolute inset-0" />
                      <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
                        <Image src={card.image} alt={product.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="animate-float object-contain p-10 md:p-16" />
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent md:via-ink/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent md:hidden" />

                  <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 md:w-1/2 md:justify-center lg:p-16">
                    <LineBadge line={product.line} />
                    <span className="eyebrow mt-6">{copy.eyebrow}</span>
                    <h3 className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">{copy.title}</h3>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">{copy.desc}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link href={`/products/${product.slug}`} className="btn btn-gold">
                        {t.featured.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link href={`/products?line=${product.line}`} className="btn btn-outline">
                        {product.line}
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
