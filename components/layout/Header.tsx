'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useState, useEffect } from 'react';
import type { Locale } from '@/lib/types';

const localeLabels: Record<string, string> = {
  en: 'EN',
  ru: 'RU',
  uz: 'UZ',
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    // next-intl's useRouter allows changing locale while preserving pathname
    router.replace(pathname, { locale: newLocale });
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/products', label: t('products') },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        scrolled 
          ? 'bg-[#05050A]/80 backdrop-blur-xl border-b border-white/5 py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-xl font-bold tracking-tight text-white font-[var(--font-display)]">
              Max<span className="text-gradient-gold font-black">M</span>iles
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 justify-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-[11px] uppercase tracking-[0.1em] font-medium text-foreground-muted hover:text-white transition-colors py-2"
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right side: Locale + CTA */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Locale Switcher (Minimal) */}
            <div className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-widest text-foreground-muted">
              {Object.entries(localeLabels).map(([loc, label], i) => (
                <div key={loc} className="flex items-center gap-2">
                  <button
                    onClick={() => switchLocale(loc)}
                    className={`hover:text-white transition-colors ${
                      locale === loc ? 'text-gold' : ''
                    }`}
                  >
                    {label}
                  </button>
                  {i < 2 && <span className="opacity-30">/</span>}
                </div>
              ))}
            </div>

            <Link 
              href={`https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'maxmile_oil_bot'}`}
              target="_blank"
              className="hidden md:flex px-4 py-1.5 rounded-full border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-black transition-all duration-400 hover:shadow-[0_0_15px_rgba(200,169,81,0.2)] hover:scale-105 active:scale-95"
            >
              Order Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground-muted hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col gap-4 pb-4 border-t border-white/5 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xs uppercase tracking-widest font-medium ${
                  pathname === link.href ? 'text-gold' : 'text-foreground-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Locale */}
            <div className="flex items-center gap-3 pt-2">
              {Object.entries(localeLabels).map(([loc, label]) => (
                <button
                  key={loc}
                  onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                  className={`text-xs font-medium tracking-widest ${
                    locale === loc ? 'text-gold' : 'text-foreground-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
