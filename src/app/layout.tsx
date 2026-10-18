import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/site';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07070A',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MaxMiles Lubricants — Premium motor moylari | O'zbekiston",
    template: '%s | MaxMiles Lubricants',
  },
  description:
    "MaxMiles premium motor moylari va moylash materiallari: ULTRA, POWER, MOTA, GEARA, FREEZA, FORSA, HYDRA, SMOOTHE, ADDIT. MAX Oil and Lubricant FZ-LLC (BAA) brendi.",
  keywords: [
    'MaxMiles', 'motor moyi', 'moylash materiallari', 'моторное масло', 'motor oil', 'lubricants',
    'sintetik moy', 'ATF', 'antifriz', 'tormoz suyuqligi', 'gidravlik moy', "O'zbekiston", 'Samarqand',
  ],
  authors: [{ name: 'MaxMiles Lubricants' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    alternateLocale: ['ru_RU', 'en_US'],
    url: SITE_URL,
    siteName: 'MaxMiles Lubricants',
    title: 'MaxMiles Lubricants — Premium motor moylari',
    description: 'Powering Every Journey, Protecting Every Engine.',
    images: [{ url: '/hero.jpg', width: 1920, height: 1072, alt: 'MaxMiles SAE 0W-30 API SN' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaxMiles Lubricants',
    description: 'Powering Every Journey, Protecting Every Engine.',
    images: ['/hero.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="flex min-h-screen flex-col bg-ink font-sans text-white">
        <LanguageProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
