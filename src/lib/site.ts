import type { Locale } from './translations';

/** Sayt manzili (metadata, sitemap, Telegram ulashish uchun) */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maxmiles.uz';

/** Telegram bot — buyurtma va murojaatlar. Vercel'da NEXT_PUBLIC_TELEGRAM_BOT_USERNAME bo'sh bo'lsa, sukut bo'yicha bot. */
export const TELEGRAM_BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'maxmile_oil_bot';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
/** Mahsulot bilan bog'langan buyurtma havolasi: bot `start` parametri orqali mahsulot slug'ini oladi */
export const telegramOrderUrl = (slug?: string) => (slug ? `${TELEGRAM_URL}?start=${slug}` : TELEGRAM_URL);

export const PHONE = '+998950574789';
export const PHONE_DISPLAY = '+998 (95) 057-47-89';
export const EMAIL = 'maxmiles.uzb@gmail.com';
export const MAP_URL = 'https://yandex.ru/navi/org/princessa/74265980408';

export const ADDRESS: Record<Locale, string> = {
  uz: "Samarqand shahri, Xamid Olimjon mahallasi, Xo'ja Axror Valiy ko'chasi, 80B",
  ru: 'г. Самарканд, махалля Хамид Олимжон, ул. Ходжа Ахрор Вали, 80B',
  en: '80B Khoja Akhror Vali street, Khamid Olimjon mahalla, Samarkand, Uzbekistan',
};

export const MANUFACTURER = 'MAX Oil and Lubricant FZ-LLC';
export const MANUFACTURER_LOCATION: Record<Locale, string> = {
  uz: 'Ras al-Xayma, Birlashgan Arab Amirliklari',
  ru: 'Рас-эль-Хайма, Объединённые Арабские Эмираты',
  en: 'Ras Al Khaimah, United Arab Emirates',
};
export const MANUFACTURER_SITE = 'https://www.maxmilesoil.com';

/** Rasmiy katalog (PDF) — ishlab chiqaruvchi saytidan */
export const BROCHURE_URL = 'https://maxoillubricant.com/wp-content/uploads/2025/02/Max-miles-2-2.pdf';
