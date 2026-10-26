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

  const contacts = [
    { icon: Phone, label: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: Send, label: `@${TELEGRAM_BOT_USERNAME}`, href: TELEGRAM_URL, external: true },
    { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: ADDRESS[locale], href: MAP_URL, external: true },
    { icon: Clock, label: t.contact.hoursValue },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#030304] text-white/60">
      <div className="h-1 w-full bg-[linear-gradient(90deg,#c8a951_0_22%,transparent_22%_24%,#c8a951_24%_26%,transparent_26%_28%,#c8a951_28%_29%,transparent_29%)]" />
      <div className="container-x pb-10 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.4fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-block" aria-label="MaxMiles">
              <Image src="/logo-wordmark.png" alt="MaxMiles" width={635} height={131} className="h-8 w-auto" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">{t.footer.desc}</p>
            <div className="panel cut-corner-sm max-w-sm p-5 text-xs">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">{t.footer.manufacturer}</span>
              <span className="mt-1.5 block font-display text-sm font-bold italic text-white">{MANUFACTURER}</span>
              <span className="block text-white/45">{MANUFACTURER_LOCATION[locale]}</span>
              <a href={MANUFACTURER_SITE} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-gold hover:underline">
                maxmilesoil.com <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase italic tracking-[0.2em] text-white">{t.footer.quickLinks}</h4>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { name: t.nav.home, href: '/' },
                { name: t.nav.products, href: '/products' },
                { name: t.home.finder.kicker, href: '/#finder' },
                { name: t.nav.about, href: '/about' },
                { name: t.nav.contact, href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase italic tracking-[0.2em] text-white">{t.footer.lines}</h4>
            <ul className="mt-6 grid grid-cols-1 gap-2.5 text-sm">
              {LINES.map((line) => (
                <li key={line.key}>
                  <Link href={`/products?line=${line.key}`} className="group flex items-center gap-3 transition-colors hover:text-white">
                    <span className="h-3 w-1 -skew-x-[24deg]" style={{ background: line.color }} />
                    <span className="font-display font-bold italic tracking-wider text-white/80 group-hover:text-white">{line.key}</span>
                    <span className="truncate text-xs text-white/35">{line.name[locale]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-bold uppercase italic tracking-[0.2em] text-white">{t.footer.contacts}</h4>
            <ul className="mt-6 space-y-4 text-sm">
              {contacts.map(({ icon: Icon, label, href, external }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {href ? (
                    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className="leading-relaxed transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <span className="leading-relaxed">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden" aria-hidden>
          <span className="display block select-none whitespace-nowrap text-center text-[19vw] italic leading-none text-white/[0.035] lg:text-[13.5rem]">MAXMILES</span>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-6 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>
            © {year} MaxMiles Lubricants. {t.footer.rights}
          </p>
          <p className="font-display font-bold italic tracking-[0.2em] text-white/45">EVERY DROP FOR EVERY MILE</p>
        </div>
      </div>
    </footer>
  );
};
