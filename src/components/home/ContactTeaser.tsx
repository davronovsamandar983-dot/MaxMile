'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Send, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { EMAIL, PHONE, PHONE_DISPLAY, TELEGRAM_BOT_USERNAME, TELEGRAM_URL } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

export function ContactTeaser() {
  const { t } = useLanguage();
  const rows = [
    { icon: Phone, label: t.contactTeaser.phone, value: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: Send, label: t.contactTeaser.telegram, value: `@${TELEGRAM_BOT_USERNAME}`, href: TELEGRAM_URL },
    { icon: Mail, label: t.contactTeaser.email, value: EMAIL, href: `mailto:${EMAIL}` },
  ];
  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="card grid grid-cols-1 gap-10 overflow-hidden rounded-3xl p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:p-16">
            <div>
              <span className="eyebrow">{t.contactTeaser.eyebrow}</span>
              <h2 className="text-balance mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">{t.contactTeaser.title}</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">{t.contactTeaser.desc}</p>
              <Link href="/contact" className="btn btn-gold mt-8">
                {t.contactTeaser.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="space-y-3 self-center">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel={r.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:border-gold/40 hover:bg-gold/5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">{r.label}</span>
                      <span className="block truncate text-sm font-semibold text-white group-hover:text-gold">{r.value}</span>
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-gold" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
