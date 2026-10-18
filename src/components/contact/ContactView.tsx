'use client';

import React from 'react';
import { MapPin, Phone, Mail, Send, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ADDRESS, EMAIL, MAP_URL, PHONE, PHONE_DISPLAY, TELEGRAM_BOT_USERNAME, TELEGRAM_URL } from '@/lib/site';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from './ContactForm';

export function ContactView() {
  const { t, locale } = useLanguage();
  const c = t.contact;

  const rows = [
    { icon: MapPin, label: c.address, value: ADDRESS[locale], href: MAP_URL, external: true, cta: c.map },
    { icon: Phone, label: c.phone, value: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: Send, label: c.telegram, value: `@${TELEGRAM_BOT_USERNAME}`, href: TELEGRAM_URL, external: true },
    { icon: Mail, label: c.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Clock, label: c.hours, value: c.hoursValue },
  ];

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.desc} image="/featured/ultra-5w-30-sn-cf.png" imagePosition="object-[75%_50%]" />
      <section className="pb-28">
        <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <ul className="space-y-3">
              {rows.map((r) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{r.label}</span>
                      <span className="mt-0.5 block text-sm font-semibold leading-snug text-white sm:text-base">{r.value}</span>
                      {r.cta && <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold">{r.cta} <ArrowUpRight className="h-3 w-3" /></span>}
                    </span>
                  </>
                );
                return (
                  <li key={r.label}>
                    {r.href ? (
                      <a
                        href={r.href}
                        target={r.external ? '_blank' : undefined}
                        rel={r.external ? 'noopener noreferrer' : undefined}
                        className="card flex items-start gap-4 rounded-2xl p-5"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="card flex items-start gap-4 rounded-2xl p-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="card rounded-3xl p-7 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
