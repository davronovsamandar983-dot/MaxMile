import type { Metadata } from 'next';
import { AboutView } from '@/components/about/AboutView';

export const metadata: Metadata = {
  title: 'Biz haqimizda',
  description:
    "MaxMiles — MAX Oil and Lubricant FZ-LLC (BAA) premium moylash materiallari brendi. Avtomobil egalari, servis markazlari va avtoparklar uchun to'liq katalog.",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return <AboutView />;
}
