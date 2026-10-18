'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Phone, Send, ShieldCheck, PackageCheck, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINE_MAP, type Product } from '@/data/catalog';
import { PHONE, telegramOrderUrl } from '@/lib/site';
import { LineBadge } from '@/components/ui/LineBadge';
import { ProductCard } from './ProductCard';

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useLanguage();
  const line = LINE_MAP[product.line];
  const text = product.text[locale];
  const cover = product.imageFit === 'cover';

  const specs = [
    { label: t.detail.specs.line, value: `${line.key} — ${line.name[locale]}` },
    product.grade ? { label: t.detail.specs.grade, value: product.grade } : null,
    product.spec ? { label: t.detail.specs.spec, value: product.spec } : null,
    product.base ? { label: t.detail.specs.base, value: t.products.base[product.base] } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="container-x">
      <Link href={`/products?line=${product.line}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:border-gold/40 hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> {t.detail.back}
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:aspect-square">
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 65%, ${line.color}33, transparent 60%), linear-gradient(180deg,#15151c,#08080b)` }} />
            <div className="grid-noise absolute inset-0" />
            <Image
              src={product.image}
              alt={`${product.line} ${product.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cover ? 'object-cover' : 'animate-float object-contain p-8 sm:p-12'}
            />
            <span className="absolute left-5 top-5">
              <LineBadge line={product.line} />
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="eyebrow">{line.name[locale]}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl">
            <span className="text-gold-gradient">{product.line}</span> {product.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{text.tagline}</p>

          <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {specs.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{s.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <Info className="h-4 w-4" /> {t.detail.description}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">{text.description}</p>
          </section>

          {text.properties.length > 0 && (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <ShieldCheck className="h-4 w-4" /> {t.detail.properties}
            </h2>
            <ul className="mt-4 space-y-3">
              {text.properties.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
          )}

          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <PackageCheck className="h-4 w-4" /> {t.detail.packs}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.packs.map((p) => (
                <span key={p} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white">
                  {p}
                </span>
              ))}
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-8 sm:flex-row">
            <a href={telegramOrderUrl(product.slug)} target="_blank" rel="noreferrer" className="btn btn-gold flex-1">
              <Send className="h-4 w-4" /> {t.detail.order}
            </a>
            <a href={`tel:${PHONE}`} className="btn btn-outline flex-1">
              <Phone className="h-4 w-4" /> {t.detail.call}
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-white/8 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{t.detail.related}</h2>
            <Link href={`/products?line=${product.line}`} className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">
              {product.line} — {t.detail.allInLine} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
