import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '../context/LanguageContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'MaxMiles Lubricants | Premium Motor Oils & Lubricants',
  description: 'Premium MaxMiles motor oils and lubricants guarantee the ultimate protection for your vehicle. Formulated with state-of-the-art technologies.',
  keywords: 'motor oil, lubricants, premium oil, engine protection, car oil, transmission oil',
  authors: [{ name: 'MaxMiles' }],
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col bg-[#07070A] text-white">
        <LanguageProvider>
          <Header />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
