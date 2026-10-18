'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINE_MAP, type Product } from '@/data/catalog';
import { telegramOrderUrl } from '@/lib/site';
import { LineBadge } from '@/components/ui/LineBadge';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { t, locale } = useLanguage();
  const line = LINE_MAP[product.line];
  const text = product.text[locale];
  const cover = product.imageFit === 'cover';

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden rounded-2xl">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[5/4] overflow-hidden" aria-label={`${product.line} ${product.name}`}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 60%, ${line.color}26, transparent 62%), linear-gradient(180deg,#14141b,#0a0a0e)` }} />
        {cover ? (
          <Image
            src={product.image}
            alt={`${product.line} ${product.name}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-x-3 bottom-2 top-12">
            <Image
              src={product.image}
              alt={`${product.line} ${product.name}`}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,.55)] transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        )}
        <span className="absolute left-3 top-3">
          <LineBadge line={product.line} />
        </span>
        {product.base && (
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-ink/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur">
            {t.products.base[product.base]}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-display text-xl font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-white/55">{text.tagline}</p>

        {product.spec && (
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/80">{product.spec}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.packs.map((p) => (
            <span key={p} className="rounded-md border border-white/8 bg-white/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/60">
              {p}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-5">
          <Link href={`/products/${product.slug}`} className="btn btn-ghost flex-1 !px-4 !py-2.5 text-xs">
            {t.products.details} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a href={telegramOrderUrl(product.slug)} target="_blank" rel="noreferrer" className="btn btn-gold !px-4 !py-2.5 text-xs" aria-label={`${t.products.order}: ${product.name}`}>
            <Send className="h-3.5 w-3.5" /> {t.products.order}
          </a>
        </div>
      </div>
    </article>
  );
}
