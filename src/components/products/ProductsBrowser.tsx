'use client';

import React, { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, PackageSearch } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINES, PRODUCTS, isLineKey, productsByLine, type LineKey } from '@/data/catalog';
import { ProductCard } from './ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProductsBrowser() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState('');

  // ?line=ULTRA (yangi) yoki ?cat=ULTRA (eski havolalar)
  const raw = (params.get('line') || params.get('cat') || '').toUpperCase();
  const active: LineKey | null = isLineKey(raw) ? raw : null;

  const setLine = (key: LineKey | null) => {
    router.replace(key ? `/products?line=${key}` : '/products', { scroll: false });
  };

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (active && p.line !== active) return false;
      if (!q) return true;
      const hay = [p.line, p.name, p.grade, p.spec, p.text[locale].tagline].filter(Boolean).join(' ').toLowerCase();
      return q.split(/\s+/).every((word) => hay.includes(word));
    });
  }, [active, query, locale]);

  const activeLine = LINES.find((l) => l.key === active);

  return (
    <div className="container-x">
      <SectionHeading
        as="h1"
        eyebrow={t.products.eyebrow}
        title={activeLine ? `${activeLine.key} — ${activeLine.name[locale]}` : t.products.title}
        subtitle={activeLine ? activeLine.desc[locale] : t.products.subtitle}
      />

      {/* Controls */}
      <div className="sticky top-[60px] z-30 -mx-4 mt-12 border-y border-white/5 bg-ink/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.products.searchPlaceholder}
              aria-label={t.products.searchPlaceholder}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3 pl-11 pr-10 text-sm text-white placeholder-white/35 outline-none transition-colors focus:border-gold"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/40 hover:text-white" aria-label={t.common.close}>
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-1 lg:px-0 lg:pb-0" role="tablist" aria-label={t.products.filterLabel}>
            <button
              role="tab"
              aria-selected={!active}
              onClick={() => setLine(null)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                !active ? 'border-gold bg-gold text-black' : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {t.products.all} <span className="ml-1 opacity-60">{PRODUCTS.length}</span>
            </button>
            {LINES.map((line) => {
              const on = active === line.key;
              return (
                <button
                  key={line.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setLine(line.key)}
                  title={line.name[locale]}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                    on ? 'text-black' : 'border-white/10 bg-white/[0.03] text-white/70 hover:text-white'
                  }`}
                  style={on ? { background: line.color, borderColor: line.color } : undefined}
                >
                  {line.key} <span className="ml-1 opacity-60">{productsByLine(line.key).length}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-white/45" aria-live="polite">
        {items.length} {t.products.count}
      </p>

      {items.length === 0 ? (
        <div className="card mt-6 flex flex-col items-center rounded-3xl px-6 py-20 text-center">
          <PackageSearch className="h-12 w-12 text-gold/70" />
          <h2 className="mt-5 font-display text-2xl font-semibold text-white">{t.products.notFound}</h2>
          <p className="mt-2 text-sm text-white/55">{t.products.notFoundDesc}</p>
          <button
            onClick={() => {
              setQuery('');
              setLine(null);
            }}
            className="btn btn-outline mt-7"
          >
            {t.products.reset}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
