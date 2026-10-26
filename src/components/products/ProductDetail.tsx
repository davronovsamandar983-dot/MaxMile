'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Bike, Car, Check, ChevronRight, Cog, Droplets, Factory, Phone, Send, Share2, Truck, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { FINDER, GALLERY, LINE_MAP, productHeadline, type FinderKey, type Product } from '@/data/catalog';
import { PHONE, PHONE_DISPLAY, telegramOrderUrl } from '@/lib/site';
import { LineBadge } from '@/components/ui/LineBadge';
import { ProductCard } from './ProductCard';

const USE_ICONS: Record<FinderKey, LucideIcon> = { car: Car, truck: Truck, moto: Bike, gear: Cog, industry: Factory, fluids: Droplets };

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useLanguage();
  const d = t.home.detail;
  const line = LINE_MAP[product.line];
  const text = product.text[locale];
  const big = productHeadline(product);
  const images = [product.image, ...(GALLERY[product.slug] ?? [])];
  const [shown, setShown] = useState(0);
  const [pack, setPack] = useState(product.packs.includes('4 L') ? '4 L' : product.packs[0]);
  const [copied, setCopied] = useState(false);
  // Telefonda asosiy tugma ko'rinmay qolganda pastdagi buyurtma paneli chiqadi
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaHidden, setCtaHidden] = useState(false);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setCtaHidden(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Mahsulot qaysi texnika uchun: «Moy tanlash» jadvalidan
  const usedFor = FINDER.filter((f) => f.lines.includes(product.line) || f.extras.includes(product.slug)).map((f) => f.key);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `MaxMiles ${product.line} ${product.name}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* foydalanuvchi bekor qildi */
    }
  };

  const specs = [
    { label: t.detail.specs.line, value: `${line.key} — ${line.name[locale]}` },
    product.grade ? { label: t.detail.specs.grade, value: product.grade } : null,
    product.spec ? { label: t.detail.specs.spec, value: product.spec } : null,
    product.base ? { label: t.detail.specs.base, value: t.products.base[product.base] } : null,
    { label: t.detail.packs, value: product.packs.join(' · ') },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/45">
          <Link href="/" className="hover:text-white">{d.home}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-white">{t.nav.products}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products?line=${product.line}`} className="hover:text-white">{product.line}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white/75">{product.name}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          {/* Rasmlar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="studio frame relative aspect-square">
              <Image
                key={images[shown]}
                src={images[shown]}
                alt={`MaxMiles ${product.line} ${product.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="animate-fade-in object-cover"
              />
              <span className="absolute left-5 top-5">
                <LineBadge line={product.line} />
              </span>
              {shown > 0 && (
                <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur">{d.photoReal}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-3" role="tablist" aria-label={d.gallery}>
                {images.map((src, i) => (
                  <button
                    key={src}
                    role="tab"
                    aria-selected={shown === i}
                    onClick={() => setShown(i)}
                    className={`studio relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition-colors ${shown === i ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ma'lumot */}
          <div>
            <p className="flex items-center gap-3 text-sm text-white/55">
              <span className="h-1 w-8 -skew-x-[24deg]" style={{ background: line.color }} />
              {line.name[locale]}
            </p>
            <h1 className="mt-4">
              <span className="grade block text-[3.4rem] text-white sm:text-7xl">{big}</span>
              <span className="mt-3 block font-display text-xl font-bold italic text-white/80 sm:text-2xl">
                MaxMiles <span style={{ color: line.color }}>{product.line}</span> {big !== product.name ? product.name : ''}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{text.tagline}</p>

            {product.spec && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.spec.split(' · ').map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
                {product.base && <span className="chip !border-gold/40 !text-gold">{t.products.base[product.base]}</span>}
              </div>
            )}

            <div className="mt-9 border-t border-white/10 pt-7">
              <p className="font-display text-xs font-bold uppercase italic tracking-[0.2em] text-white/45">{d.choosePack}</p>
              <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={d.choosePack}>
                {product.packs.map((p) => (
                  <button
                    key={p}
                    role="radio"
                    aria-checked={pack === p}
                    onClick={() => setPack(p)}
                    className={`min-w-[4.5rem] rounded-full border px-5 py-3 font-display text-base font-extrabold italic transition-colors ${pack === p ? 'border-gold bg-gold text-black' : 'border-white/15 text-white hover:border-white/40'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div ref={ctaRef} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={telegramOrderUrl(product.slug)} target="_blank" rel="noreferrer" className="btn btn-gold flex-1">
                <Send className="h-4 w-4" /> {t.detail.order} · {pack}
              </a>
              <a href={`tel:${PHONE}`} className="btn btn-line sm:w-auto">
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-xs text-white/40">{d.orderNote}</p>
              <button onClick={share} className="link-arrow shrink-0 text-[11px] text-white/70 hover:text-white" aria-live="polite">
                <Share2 className="h-3.5 w-3.5" /> {copied ? d.copied : t.detail.share}
              </button>
            </div>

            {usedFor.length > 0 && (
              <div className="mt-9">
                <p className="font-display text-xs font-bold uppercase italic tracking-[0.2em] text-white/45">{d.usedFor}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {usedFor.map((k) => {
                    const Icon = USE_ICONS[k];
                    return (
                      <Link key={k} href={`/products?use=${k}`} className="chip !py-2 !normal-case !tracking-normal transition-colors hover:!border-white/40 hover:!text-white">
                        <Icon className="h-4 w-4 text-gold" /> {t.home.finder.tabs[k]}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-12 space-y-10">
              <section>
                <h2 className="kicker">{d.overview}</h2>
                <p className="mt-4 text-base leading-relaxed text-white/70">{text.description}</p>
                {text.properties.length > 0 && (
                  <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {text.properties.map((p) => (
                      <li key={p} className="flex items-start gap-3 rounded-2xl bg-graphite p-4 text-sm leading-relaxed text-white/75">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-black">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section>
                <h2 className="kicker">{d.specs}</h2>
                <dl className="mt-4 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  {specs.map((s) => (
                    <div key={s.label} className="grid grid-cols-[40%_1fr] gap-4 py-3.5 text-sm">
                      <dt className="text-white/45">{s.label}</dt>
                      <dd className="font-semibold text-white">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-white/[0.07] bg-carbon py-16 lg:py-20">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-3xl italic sm:text-4xl">{t.detail.related}</h2>
              <Link href={`/products?line=${product.line}`} className="link-arrow text-gold">
                {product.line} — {t.detail.allInLine} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Telefon: pastda doimiy buyurtma paneli */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur-xl transition-transform duration-300 lg:hidden ${ctaHidden ? 'translate-y-0' : 'translate-y-full'}`}
        aria-hidden={!ctaHidden}
      >
        <div className="flex items-center gap-3">
          <span className="studio relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
            <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="grade block truncate text-lg text-white">{big}</span>
            <span className="block truncate text-[11px] text-white/50">
              {product.line} · {pack}
            </span>
          </span>
          <a href={telegramOrderUrl(product.slug)} target="_blank" rel="noreferrer" tabIndex={ctaHidden ? 0 : -1} className="btn btn-gold btn-sm shrink-0">
            <Send className="h-4 w-4" /> {t.products.order}
          </a>
        </div>
      </div>
    </>
  );
}
