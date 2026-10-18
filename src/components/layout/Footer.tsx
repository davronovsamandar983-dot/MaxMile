'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Send, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LINES } from '@/data/catalog';
import { ADDRESS, EMAIL, MANUFACTURER, MANUFACTURER_LOCATION, MANUFACTURER_SITE, MAP_URL, PHONE, PHONE_DISPLAY, TELEGRAM_BOT_USERNAME, TELEGRAM_URL } from '@/lib/site';

export const Footer: React.FC = () => {
  const { t, locale } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-[#040406] text-white/60">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-x pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/logo-wordmark.png" alt="MaxMiles" width={635} height={131} className="h-8 w-auto" />
              <span className="rounded border border-gold/25 bg-gold/10 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-gold">LUBRICANTS</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">{t.footer.desc}</p>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-white/35">{t.footer.manufacturer}</span>
              <span className="mt-1 block font-semibold text-white/85">{MANUFACTURER}</span>
              <span className="block text-white/45">{MANUFACTURER_LOCATION[locale]}</span>
              <a href={MANUFACTURER_SITE} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-gold hover:underline">
                maxmilesoil.com <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: t.nav.home, href: '/' },
                { name: t.nav.products, href: '/products' },
                { name: t.nav.about, href: '/about' },
                { name: t.nav.contact, href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lines */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">{t.footer.lines}</h4>
            <ul className="space-y-2.5 text-sm">
              {LINES.map((line) => (
                <li key={line.key}>
                  <Link href={`/products?line=${line.key}`} className="group flex items-center gap-2 transition-colors hover:text-gold">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: line.color }} />
                    <span className="font-semibold text-white/80 group-hover:text-gold">{line.key}</span>
                    <span className="hidden text-white/40 sm:inline">· {line.name[locale]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white">{t.footer.contacts}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  {ADDRESS[locale]}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${PHONE}`} className="transition-colors hover:text-white">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-white">{EMAIL}</a>
              </li>
              <li className="flex items-center gap-3">
                <Send className="h-4 w-4 shrink-0 text-gold" />
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">@{TELEGRAM_BOT_USERNAME}</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                <span>{t.contact.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-white/35 sm:flex-row">
          <p>© {year} MaxMiles Lubricants. {t.footer.rights}</p>
          <p className="tracking-wide">Every Drop for Every Mile</p>
        </div>
      </div>
    </footer>
  );
};
