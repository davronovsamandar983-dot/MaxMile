'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, PackageSearch, SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FINDER, LINES, LINE_MAP, PRODUCTS, isLineKey, productsByLine, type BaseOil, type FinderKey, type LineKey } from '@/data/catalog';
import { ProductCard } from './ProductCard';
import { PageHero } from '@/components/ui/PageHero';

const BASES: BaseOil[] = ['synthetic', 'semi', 'mineral'];
const PACKS = Array.from(new Set(PRODUCTS.flatMap((p) => p.packs)));

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function FilterChip({ label, color, onRemove }: { label: string; color?: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-3 pr-2 text-xs font-semibold text-white transition-colors hover:border-white/40"
    >
      {color && <span className="h-2.5 w-1 -skew-x-[24deg]" style={{ background: color }} />}
      {label}
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-white/60 group-hover:bg-white group-hover:text-black">
        <X className="h-3 w-3" />
      </span>
    </button>
  );
}

export function ProductsBrowser() {
  const { t, locale } = useLanguage();
  const c = t.home.catalog;
  const router = useRouter();
  const params = useSearchParams();
  // Bosh sahifadagi qidiruvdan: ?use=car&q=5W-30
  const [query, setQuery] = useState(() => params.get('q') ?? '');
  const [bases, setBases] = useState<BaseOil[]>([]);
  // Bosh sahifadagi qadoq shkalasidan: ?pack=20 L
  const [packs, setPacks] = useState<string[]>(() => {
    const p = params.get('pack');
    return p && PACKS.includes(p) ? [p] : [];
  });
  const [sheet, setSheet] = useState(false);

  // ?line=ULTRA (yangi) yoki ?cat=ULTRA (eski havolalar)
  const raw = (params.get('line') || params.get('cat') || '').toUpperCase();
  const active: LineKey | null = isLineKey(raw) ? raw : null;
  const use = active ? undefined : FINDER.find((f) => f.key === (params.get('use') as FinderKey));

  const setLine = (key: LineKey | null) => {
    router.replace(key ? `/products?line=${key}` : '/products', { scroll: false });
  };

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sheet]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (active && p.line !== active) return false;
      if (use && !use.lines.includes(p.line)) return false;
      if (bases.length && (!p.base || !bases.includes(p.base))) return false;
      if (packs.length && !packs.some((s) => p.packs.includes(s))) return false;
      if (!q) return true;
      const hay = [p.line, p.name, p.grade, p.spec, p.text[locale].tagline].filter(Boolean).join(' ').toLowerCase();
      return q.split(/\s+/).every((word) => hay.includes(word));
    });
  }, [active, use, bases, packs, query, locale]);

  const activeLine = active ? LINE_MAP[active] : null;
  const extraCount = bases.length + packs.length;
  const allOn = !active && !use;
  const reset = () => {
    setQuery('');
    setBases([]);
    setPacks([]);
    setLine(null);
  };

  const groupTitle = (label: string) => <p className="mb-3 font-display text-[11px] font-bold uppercase italic tracking-[0.2em] text-white/40">{label}</p>;

  const toggleBtn = (on: boolean, onClick: () => void, label: React.ReactNode, key: string) => (
    <button
      key={key}
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${on ? 'border-gold bg-gold text-black' : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white'}`}
    >
      {label}
    </button>
  );

  const extraFilters = (
    <>
      <div>
        {groupTitle(c.base)}
        <div className="flex flex-wrap gap-2">
          {BASES.map((b) => toggleBtn(bases.includes(b), () => setBases((v) => toggle(v, b)), t.products.base[b], b))}
        </div>
      </div>
      <div>
        {groupTitle(c.pack)}
        <div className="flex flex-wrap gap-2">
          {PACKS.map((s) => toggleBtn(packs.includes(s), () => setPacks((v) => toggle(v, s)), s, s))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <PageHero
        kicker={activeLine ? activeLine.name[locale] : use ? t.home.finder.kicker : t.products.eyebrow}
        title={activeLine ? activeLine.key : use ? t.home.finder.tabs[use.key] : t.products.title}
        subtitle={activeLine ? activeLine.desc[locale] : use ? t.home.finder.descs[use.key] : t.products.subtitle}
        image={activeLine ? activeLine.image : '/featured/geara-atf-dex-vi.png'}
        imagePosition={activeLine ? 'object-center' : 'object-[72%_50%]'}
        accent={activeLine?.color}
      />

      {/* Qidiruv paneli */}
      <div className="sticky top-16 z-30 border-b border-white/[0.07] bg-ink/90 backdrop-blur-xl lg:top-[76px]">
        <div className="container-x flex items-center gap-3 py-3">
          <div className="relative flex-1 lg:max-w-md">
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
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white" aria-label={t.common.close}>
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button onClick={() => setSheet(true)} className="relative flex h-[46px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white lg:hidden">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">{c.filters}</span>
            {extraCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-black">{extraCount}</span>}
          </button>
          <p className="ml-auto hidden text-sm text-white/45 lg:block" aria-live="polite">
            <span className="grade mr-1.5 text-xl text-white">{items.length}</span> {t.products.count}
          </p>
        </div>
        {/* Mobil: seriya tugmalari */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:hidden">
          <button
            onClick={() => setLine(null)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 font-display text-xs font-bold uppercase italic tracking-wider ${allOn ? 'border-gold bg-gold text-black' : 'border-white/10 text-white/70'}`}
          >
            {t.products.all}
          </button>
          {LINES.map((l) => (
            <button
              key={l.key}
              onClick={() => setLine(active === l.key ? null : l.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-xs font-bold uppercase italic tracking-wider ${active === l.key || use?.lines.includes(l.key) ? 'border-white bg-white text-black' : 'border-white/10 text-white/70'}`}
            >
              <span className="h-2.5 w-1 -skew-x-[24deg]" style={{ background: l.color }} />
              {l.key}
            </button>
          ))}
        </div>
      </div>

      <div className="container-x grid grid-cols-1 gap-10 pt-8 lg:grid-cols-[250px_1fr] lg:pt-12">
        {/* Desktop filtrlari */}
        <aside className="hidden lg:block">
          <div className="sticky top-[160px] space-y-8">
            <div>
              {groupTitle(c.line)}
              <ul className="space-y-0.5">
                <li>
                  <button onClick={() => setLine(null)} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${allOn ? 'bg-white/[0.07] font-semibold text-white' : 'text-white/60 hover:bg-white/[0.04] hover:text-white'}`}>
                    {t.products.all}
                    <span className="text-xs text-white/35">{PRODUCTS.length}</span>
                  </button>
                </li>
                {LINES.map((l) => {
                  const on = active === l.key || !!use?.lines.includes(l.key);
                  return (
                    <li key={l.key}>
                      <button
                        onClick={() => setLine(active === l.key ? null : l.key)}
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${on ? 'bg-white/[0.07]' : 'hover:bg-white/[0.04]'}`}
                      >
                        <span className={`h-4 -skew-x-[24deg] transition-all ${on ? 'w-2' : 'w-1'}`} style={{ background: l.color }} />
                        <span className="flex-1">
                          <span className={`block font-display text-sm font-extrabold italic tracking-wider ${on ? 'text-white' : 'text-white/75 group-hover:text-white'}`}>{l.key}</span>
                          <span className="block text-[11px] leading-tight text-white/35">{l.name[locale]}</span>
                        </span>
                        <span className="text-xs text-white/35">{productsByLine(l.key).length}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {extraFilters}
            {(extraCount > 0 || !allOn || query) && (
              <button onClick={reset} className="link-arrow text-gold">
                <X className="h-4 w-4" /> {c.clear}
              </button>
            )}
          </div>
        </aside>

        <div>
          <p className="mb-4 text-sm text-white/45 lg:hidden" aria-live="polite">
            {items.length} {t.products.count}
          </p>

          {/* Tanlangan filtrlar — bitta bosish bilan olib tashlanadi */}
          {(extraCount > 0 || query.trim() || !allOn) && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-display text-[11px] font-bold uppercase italic tracking-[0.2em] text-white/40">{c.active}:</span>
              {activeLine && <FilterChip label={activeLine.key} color={activeLine.color} onRemove={() => setLine(null)} />}
              {use && <FilterChip label={t.home.finder.tabs[use.key]} onRemove={() => setLine(null)} />}
              {query.trim() && <FilterChip label={`«${query.trim()}»`} onRemove={() => setQuery('')} />}
              {bases.map((b) => (
                <FilterChip key={b} label={t.products.base[b]} onRemove={() => setBases((v) => v.filter((x) => x !== b))} />
              ))}
              {packs.map((s) => (
                <FilterChip key={s} label={s} onRemove={() => setPacks((v) => v.filter((x) => x !== s))} />
              ))}
              <button onClick={reset} className="ml-1 text-xs font-semibold text-gold hover:underline">
                {c.clear}
              </button>
            </div>
          )}
          {items.length === 0 ? (
            <div className="panel flex flex-col items-center px-6 py-20 text-center">
              <PackageSearch className="h-12 w-12 text-gold/70" />
              <h2 className="display mt-5 text-2xl italic">{t.products.notFound}</h2>
              <p className="mt-2 text-sm text-white/55">{t.products.notFoundDesc}</p>
              <button onClick={reset} className="btn btn-line mt-7">
                {t.products.reset}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
              {items.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobil filtr oynasi */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${sheet ? 'visible' : 'invisible'}`} aria-hidden={!sheet}>
        <div className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${sheet ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSheet(false)} />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.filters}
          className={`absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] border-t border-white/10 bg-carbon p-6 transition-transform duration-300 ${sheet ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="display text-2xl italic">{c.filters}</h2>
            <button onClick={() => setSheet(false)} className="p-2 text-white/60" aria-label={t.common.close}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 space-y-7">{extraFilters}</div>
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                setBases([]);
                setPacks([]);
              }}
              className="btn btn-line flex-1"
            >
              {c.clear}
            </button>
            <button onClick={() => setSheet(false)} className="btn btn-gold flex-[2]">
              {c.show} · {items.length}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
