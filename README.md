# MaxMiles Lubricants — maxmiles.uz

MaxMiles motor moylari va moylash materiallari sayti: 9 yo'nalish, 39 mahsulot, uch til (O'zbekcha / Русский / English).
Next.js 16 (App Router), React 19, Tailwind CSS v4. Bazasiz — katalog kod ichida.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Katalogni o'zgartirish

| Nima | Qayerda |
|---|---|
| Mahsulotlar ro'yxati (nom, sinf, standart, qadoqlar, rasm) | `src/data/products.base.ts` |
| Mahsulot matnlari (tagline, tavsif, xususiyatlar) | `src/data/i18n/products.{uz,ru,en}.json` — kalit = mahsulot `slug`i |
| Yo'nalishlar (ULTRA, POWER, MOTA, GEARA, FREEZA, FORSA, HYDRA, SMOOTHE, ADDIT) | `src/data/catalog.ts` |
| Sayt matnlari (uch tilda) | `src/lib/translations.ts`, bosh sahifa bo'limlari — `src/lib/translations.home.ts` |
| Telefon, manzil, e-pochta, Telegram | `src/lib/site.ts` |
| «Moy tanlash» (transport turi → seriya) | `FINDER` — `src/data/catalog.ts` |
| Rasmlar | `public/products/v2/<slug>.webp` (760×760, yagona studiya foni), `public/lines/`, `public/featured/`, `public/hero.jpg` |

Yangi mahsulot qo'shish: `products.base.ts` ga qator, uch `products.*.json` ga shu `slug` bilan matn, rasmni `public/products/v2/` ga (kvadrat, qora studiya fonida).
Sahifalar (`/products/<slug>`, sitemap) avtomatik yaratiladi.

## Muhit o'zgaruvchilari (ixtiyoriy)

Qarang: `.env.example`. Hech biri majburiy emas.

- `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` — buyurtma boti (sukut: `maxmile_oil_bot`).
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — «Aloqa» formasi murojaatlarini Telegram'ga yuborish (faqat serverda).
  O'rnatilmasa, forma foydalanuvchining Telegram'ini tayyor matn bilan ochadi.

## Manba va mualliflik

Mahsulot ma'lumotlari MAX Oil and Lubricant FZ-LLC (BAA) rasmiy katalogidan olingan. Yangi qadoq rasmlari maxmilesoil.com dan:
5W-30 SN/CF, ATF DEX VI, DOT 4, LI EP2 — haqiqiy suratlar; qolganlari shu studiya suratidagi qadoq shablonida (yorliq matni va seriya rangi almashtirilgan) tayyorlangan.
Shriftlar (Inter, Exo 2) `public/fonts/` da o'z serverimizdan beriladi.
