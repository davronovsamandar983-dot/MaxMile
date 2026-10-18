'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe, Send, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LOCALES } from '@/lib/translations';
import { TELEGRAM_URL, PHONE, PHONE_DISPLAY } from '@/lib/site';

export const Header: React.FC = () => {
  const { locale, t, setLocale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Menyu holati sahifa manziliga bog'langan: sahifa almashganda o'zi yopiladi
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [langPath, setLangPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const langOpen = langPath === pathname;
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) => setMenuPath((cur) => ((typeof v === 'function' ? v(cur === pathname) : v) ? pathname : null));
  const setLangOpen = (v: boolean | ((prev: boolean) => boolean)) => setLangPath((cur) => ((typeof v === 'function' ? v(cur === pathname) : v) ? pathname : null));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    { name: t.nav.home, href: '/' },
    { name: t.nav.products, href: '/products' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
  ];

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const solid = scrolled || open || pathname !== '/';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-white/5 bg-ink/85 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="MaxMiles Lubricants">
          <Image src="/logo-wordmark.png" alt="MaxMiles" width={635} height={131} priority className="h-6 w-auto shrink-0 sm:h-8" />
          <span className="hidden rounded border border-gold/25 bg-gold/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-gold sm:inline-block">
            LUBRICANTS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:text-gold ${isActive(item.href) ? 'text-gold' : 'text-white/80'}`}
            >
              {item.name}
              {isActive(item.href) && <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" />}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 transition-colors hover:border-gold/40 hover:text-gold"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t.nav.language}
            >
              <Globe className="h-4 w-4 text-gold" />
              <span className="uppercase">{locale}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <ul role="listbox" className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-ink-3 py-1.5 shadow-2xl animate-fade-in">
                  {LOCALES.map((l) => (
                    <li key={l.key}>
                      <button
                        role="option"
                        aria-selected={locale === l.key}
                        onClick={() => {
                          setLocale(l.key);
                          setLangOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-white/5 ${locale === l.key ? 'font-semibold text-gold' : 'text-white/80'}`}
                      >
                        {l.label}
                        <span className="text-[10px] tracking-widest text-white/40">{l.short}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn btn-gold hidden !py-2.5 text-xs lg:inline-flex">
            <Send className="h-4 w-4" />
            {t.nav.order}
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label={open ? t.common.close : t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} fixed inset-x-0 top-[64px] bottom-0 z-40 bg-ink/95 backdrop-blur-xl transition-opacity duration-300`}
      >
        <div className="container-x flex h-full flex-col justify-between py-8">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between border-b border-white/5 py-4 font-display text-2xl font-semibold transition-colors ${isActive(item.href) ? 'text-gold' : 'text-white'}`}
              >
                {item.name}
                <span className="text-xs tracking-[0.3em] text-white/30">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <div className="space-y-3">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="btn btn-gold w-full">
              <Send className="h-4 w-4" /> {t.nav.order}
            </a>
            <a href={`tel:${PHONE}`} className="btn btn-outline w-full">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
