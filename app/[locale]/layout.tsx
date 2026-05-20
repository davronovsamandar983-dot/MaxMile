import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MaxMiles Lubricants — Engineered to Endure',
    template: '%s | MaxMiles',
  },
  description:
    'Premium lubricants for passenger cars, trucks, motorcycles, and industrial equipment. Based in RAK, UAE.',
  keywords: ['lubricants', 'engine oil', 'motor oil', 'MaxMiles', 'UAE', 'Uzbekistan'],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
