'use client';

import React from 'react';
import { MapPin, Phone, Mail, Send, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ADDRESS, EMAIL, MAP_URL, PHONE, PHONE_DISPLAY, TELEGRAM_BOT_USERNAME, telegramStartUrl } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from './ContactForm';

export function ContactView() {
  const { t, locale } = useLanguage();
  const c = t.contact;

  const rows = [
    { icon: Phone, label: c.phone, value: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: Send, label: c.telegram, value: `@${TELEGRAM_BOT_USERNAME}`, href: telegramStartUrl(locale), external: true },
    { icon: Mail, label: c.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: c.address, value: ADDRESS[locale], href: MAP_URL, external: true, cta: c.map },
    { icon: Clock, label: c.hours, value: c.hoursValue },
  ];

  return (
    <>
      <PageHero kicker={c.eyebrow} title={c.title} subtitle={c.desc} image="/featured/ultra-5w-30-sn-cf.png" imagePosition="object-[75%_50%]" />
      <section className="bg-ink pb-28 pt-12 lg:pt-16">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {rows.map((r) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-gold transition-colors group-hover:bg-gold group-hover:text-black">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[11px] font-bold uppercase italic tracking-[0.2em] text-white/40">{r.label}</span>
                      <span className="mt-1 block text-base font-semibold leading-snug text-white sm:text-lg">{r.value}</span>
                      {r.cta && <span className="link-arrow mt-2 text-[11px] text-gold">{r.cta} <ArrowUpRight className="h-3.5 w-3.5" /></span>}
                    </span>
                  </>
                );
                return (
                  <li key={r.label}>
                    {r.href ? (
                      <a href={r.href} target={r.external ? '_blank' : undefined} rel={r.external ? 'noopener noreferrer' : undefined} className="group flex items-start gap-5 py-5">
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-5 py-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="panel cut-corner p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
