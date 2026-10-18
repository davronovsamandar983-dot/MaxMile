'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TELEGRAM_URL } from '@/lib/site';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputCls =
  'w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold disabled:opacity-50';

export function ContactForm() {
  const { t } = useLanguage();
  const f = t.contact.form;
  const [data, setData] = useState({ name: '', phone: '', message: '', website: '' });
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        setData({ name: '', phone: '', message: '', website: '' });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { fallback?: boolean };
      if (body.fallback) {
        // Server tomonida xabar yuborish sozlanmagan — Telegram'da tayyor matn bilan ochamiz.
        const text = `MaxMiles\n${f.name}: ${data.name}\n${f.phone}: ${data.phone}\n${data.message}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(TELEGRAM_URL)}&text=${encodeURIComponent(text)}`, '_blank', 'noopener');
        setStatus('success');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">{f.successTitle}</h3>
        <p className="mt-2 text-sm text-white/60">{f.successDesc}</p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline mt-8">
          {f.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate={false}>
      <div>
        <h2 className="font-display text-2xl font-semibold text-white">{f.title}</h2>
        <p className="mt-2 text-sm text-white/55">{f.desc}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{f.name}</span>
          <input name="name" value={data.name} onChange={onChange} required maxLength={80} autoComplete="name" disabled={status === 'sending'} placeholder={f.namePlaceholder} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{f.phone}</span>
          <input name="phone" type="tel" value={data.phone} onChange={onChange} required minLength={7} maxLength={24} autoComplete="tel" inputMode="tel" disabled={status === 'sending'} placeholder={f.phonePlaceholder} className={inputCls} />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{f.message}</span>
        <textarea name="message" value={data.message} onChange={onChange} required rows={5} maxLength={1000} disabled={status === 'sending'} placeholder={f.messagePlaceholder} className={`${inputCls} resize-none`} />
      </label>

      {/* Spam tuzog'i: odam ko'rmaydi */}
      <input name="website" value={data.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />

      {status === 'error' && (
        <p className="flex items-start gap-2 text-sm text-red-300" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {f.error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn btn-gold w-full">
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {f.sending}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {f.submit}
          </>
        )}
      </button>
    </form>
  );
}
