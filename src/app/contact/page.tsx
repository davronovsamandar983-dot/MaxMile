import type { Metadata } from 'next';
import { ContactView } from '@/components/contact/ContactView';

export const metadata: Metadata = {
  title: 'Aloqa',
  description: "MaxMiles bilan bog'laning: telefon, Telegram, elektron pochta va manzil. Ulgurji narxlar, servis markazlari va avtoparklar uchun maxsus shartlar.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactView />;
}
