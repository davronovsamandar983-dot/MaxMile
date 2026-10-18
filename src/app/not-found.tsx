'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-24 text-center">
      <span className="text-gold-gradient font-display text-8xl font-semibold sm:text-9xl">404</span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-white">{t.common.notFoundTitle}</h1>
      <p className="mt-3 max-w-md text-white/55">{t.common.notFoundDesc}</p>
      <Link href="/" className="btn btn-gold mt-8">
        {t.common.goHome}
      </Link>
    </section>
  );
}
