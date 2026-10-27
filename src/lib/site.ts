import type { Locale } from './translations';

/** Sayt manzili (metadata, sitemap, Telegram ulashish uchun) */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maxmiles.uz';

/** Telegram bot — buyurtma va murojaatlar. Vercel'da NEXT_PUBLIC_TELEGRAM_BOT_USERNAME bo'sh bo'lsa, sukut bo'yicha bot. */
export const TELEGRAM_BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'maxmile_oil_bot';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_BOT_USERNAME}`;
// Bot `start` parametri (faqat A-Z a-z 0-9 _ -, 64 belgigacha) — src/lib/bot.ts dagi parseStart o'qiydi:
//   site__<til>                 — umumiy «Buyurtma / Telegram» tugmalari
//   <slug>__<qadoq>__<til>      — mahsulot kartasi va sahifasi (qadoq bo'sh bo'lishi mumkin)
/** Saytdan botga umumiy havola: bot mijozga sayt tilida javob beradi */
export const telegramStartUrl = (locale: Locale) => `${TELEGRAM_URL}?start=site__${locale}`;
/** Mahsulot bilan bog'langan buyurtma havolasi: bot mahsulot kartasini ko'rsatadi va menejerga so'rov yuboradi */
export const telegramOrderUrl = (slug: string, locale: Locale, pack?: string) =>
  `${TELEGRAM_URL}?start=${slug}__${pack ? pack.replace(/\s+/g, '').toLowerCase() : ''}__${locale}`;

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
