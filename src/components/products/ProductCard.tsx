'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Droplet, Package, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINE_MAP, productHeadline, type Product } from '@/data/catalog';
import { telegramOrderUrl } from '@/lib/site';
import { LineBadge } from '@/components/ui/LineBadge';

/** Avtosalon kartalari uslubi: ichki yumaloq rasm, belgi qatori, pastda tugmalar */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { t, locale } = useLanguage();
  const line = LINE_MAP[product.line];
  const big = productHeadline(product);
  const long = big.length > 12;
  const packs = product.packs.length > 2 ? `${product.packs[0]} – ${product.packs[product.packs.length - 1]}` : product.packs.join(' · ');

  return (
    <article className="group relative flex h-full flex-col rounded-[1.6rem] bg-graphite p-1.5 transition-colors hover:bg-steel sm:p-2">
      <Link href={`/products/${product.slug}`} className="studio relative block aspect-square overflow-hidden rounded-[1.25rem]" aria-label={`${product.line} ${product.name}`}>
        <Image
          src={product.image}
          alt={`MaxMiles ${product.line} ${product.name}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/45 px-2.5 py-1.5 backdrop-blur-md sm:left-3 sm:top-3">
          <LineBadge line={product.line} />
        </span>
        <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: line.color }} />
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3.5 sm:px-3 sm:pt-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className={`grade text-white ${long ? 'text-lg leading-tight sm:text-xl' : 'text-[1.55rem] sm:text-[1.9rem]'}`}>{big}</h3>
          {big !== product.name && <p className="mt-1 truncate text-xs font-medium text-white/55 sm:text-sm">{product.name}</p>}
        </Link>
        <p className="mt-3 line-clamp-2 hidden min-h-[2.75rem] text-sm leading-relaxed text-white/45 sm:[display:-webkit-box]">{product.text[locale].tagline}</p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/[0.07] pt-3 text-[11px] text-white/55 sm:text-xs">
          {product.spec && (
            <span className="flex min-w-0 items-center gap-1.5">
              <Droplet className="h-3.5 w-3.5 shrink-0 text-gold" />
              <span className="truncate">{product.spec}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 shrink-0 text-gold" />
            {packs}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link href={`/products/${product.slug}`} className="btn btn-line btn-sm flex-1 !px-3 !text-[10px] sm:!text-[11px]">
            {t.products.details} <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={telegramOrderUrl(product.slug)}
            target="_blank"
            rel="noreferrer"
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gold text-black transition-colors hover:bg-gold-light"
            aria-label={`${t.products.order}: ${product.name}`}
            title={t.products.order}
          >
            <Send className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
