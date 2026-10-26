'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Send, Phone, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LOCALES } from '@/lib/translations';
import { TELEGRAM_URL, PHONE, PHONE_DISPLAY } from '@/lib/site';
import { LINES } from '@/data/catalog';

export const Header: React.FC = () => {
  const { locale, t, setLocale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Menyu holati sahifa manziliga bog'langan: sahifa almashganda o'zi yopiladi
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const setOpen = (v: boolean) => setMenuPath(v ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const nav = [
    { name: t.nav.products, href: '/products' },
    { name: t.home.finder.kicker, href: '/#finder' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href);
  const solid = scrolled || open || pathname !== '/';

  const langSwitch = (
    <div className="flex items-center" role="group" aria-label={t.nav.language}>
      {LOCALES.map((l, i) => (
        <React.Fragment key={l.key}>
          {i > 0 && <span className="h-3 w-px bg-white/15" aria-hidden />}
          <button
            onClick={() => setLocale(l.key)}
            aria-pressed={locale === l.key}
            title={l.label}
            className={`px-2 py-1 font-display text-xs font-bold italic tracking-wider transition-colors ${locale === l.key ? 'text-gold' : 'text-white/55 hover:text-white'}`}
          >
            {l.short}
          </button>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${solid ? 'border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}>
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[76px]">
        <Link href="/" className="flex shrink-0 items-center" aria-label="MaxMiles Lubricants">
          <Image src="/logo-wordmark.png" alt="MaxMiles" width={635} height={131} priority className="h-[22px] w-auto sm:h-7" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative px-4 py-2 font-display text-[13px] font-bold uppercase italic tracking-[0.12em] transition-colors ${isActive(item.href) ? 'text-white' : 'text-white/65 hover:text-white'}`}
            >
              {item.name}
              <span className={`absolute inset-x-4 -bottom-0.5 h-[3px] origin-left -skew-x-[24deg] bg-gold transition-transform duration-300 ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a href={`tel:${PHONE}`} className="hidden items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white xl:flex">
            <Phone className="h-4 w-4 text-gold" /> {PHONE_DISPLAY}
          </a>
          <div className="hidden sm:block">{langSwitch}</div>
          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn btn-gold btn-sm hidden lg:inline-flex">
            <Send className="h-3.5 w-3.5" /> {t.nav.order}
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
            aria-label={open ? t.common.close : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink transition-[opacity,visibility] duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="slashes pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-x relative flex min-h-full flex-col gap-10 py-8">
          <nav className="flex flex-col" aria-label="Mobile">
            {[{ name: t.nav.home, href: '/' }, ...nav].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-white/[0.08] py-4"
              >
                <span className="display text-[2rem] italic text-white">{item.name}</span>
                <span className="font-display text-xs font-bold italic text-gold">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap gap-2">
            {LINES.map((l) => (
              <Link key={l.key} href={`/products?line=${l.key}`} onClick={() => setOpen(false)} className="chip">
                <span className="h-2.5 w-1 -skew-x-[24deg]" style={{ background: l.color }} />
                {l.key}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between border-y border-white/[0.08] py-3">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">{t.nav.language}</span>
              {langSwitch}
            </div>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn btn-gold w-full">
              <Send className="h-4 w-4" /> {t.nav.order}
            </a>
            <a href={`tel:${PHONE}`} className="btn btn-line w-full">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY} <ArrowUpRight className="h-4 w-4 opacity-50" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
