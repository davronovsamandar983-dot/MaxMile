'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TELEGRAM_URL } from '@/lib/site';

/** Sahifa pastga aylantirilganda o'ng pastki burchakda chiqadigan Telegram tugmasi */
export function FloatingOrder() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mahsulot sahifasida telefonda o'zining pastki buyurtma paneli bor
  const onProduct = /^\/products\/[^/]+/.test(pathname);

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={t.home.misc.order}
      tabIndex={shown ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-40 items-center gap-0 rounded-full bg-gold p-4 text-black shadow-[0_18px_40px_-12px_rgba(200,169,81,.7)] transition-all duration-300 hover:gap-2.5 hover:pr-5 sm:bottom-7 sm:right-7 ${onProduct ? 'hidden lg:flex' : 'flex'} ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
    >
      <Send className="h-5 w-5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-xs font-bold uppercase tracking-[0.08em] transition-[max-width] duration-300 group-hover:max-w-[16rem]">
        {t.home.misc.order}
      </span>
    </a>
  );
}
