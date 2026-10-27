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
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — Telegram bot (faqat serverda), pastga qarang.
  O'rnatilmasa, «Aloqa» formasi foydalanuvchining Telegram'ini tayyor matn bilan ochadi.

## Telegram bot (@maxmile_oil_bot)

Mijozlar bilan aloqa boti saytning o'zida ishlaydi: `src/app/api/telegram/route.ts` (webhook) → `src/lib/bot.ts`.

- Mijoz botga yozgan hamma narsa (matn, rasm, ovozli xabar, fayl, telefon raqami) `TELEGRAM_CHAT_ID` chatiga keladi.
  Menejer shu xabarga **Reply** qilsa, javob bot nomidan mijozga qaytadi. Baza yo'q: mijoz ID'si xabardagi `#id…` belgisida.
- Saytdagi «Buyurtma» tugmalari botni mahsulot, qadoq va sayt tili bilan ochadi (`telegramOrderUrl` → `start=<slug>__<qadoq>__<til>`):
  mijozga mahsulot kartasi, menejerga «Buyurtma so'rovi» boradi. «Aloqa» formasi ham shu chatga keladi.
- Mijoz menyusi: Katalog, Moy tanlash, Raqamni yuborish, Aloqa (uz/ru/en — Telegram tiliga yoki sayt tiliga qarab).
- `TELEGRAM_CHAT_ID` — menejerning shaxsiy chati yoki guruh (bir nechta menejer uchun). ID: botga `/id` yozing.

Ulash (token `.env.local` da): `node --env-file=.env.local scripts/telegram-setup.mjs --webhook` — buyruqlar, tavsif va
webhook'ni (`https://www.maxmiles.uz/api/telegram`) o'rnatadi. Mahalliy sinov: `--polling` bilan webhook'ni o'chiring,
`.env.local` ga `TELEGRAM_POLLING=1` yozing va `npm run dev` — bot kompyuterdan ishlaydi.

## Manba va mualliflik

Mahsulot ma'lumotlari MAX Oil and Lubricant FZ-LLC (BAA) rasmiy katalogidan olingan. Yangi qadoq rasmlari maxmilesoil.com dan:
5W-30 SN/CF, ATF DEX VI, DOT 4, LI EP2 — haqiqiy suratlar; qolganlari shu studiya suratidagi qadoq shablonida (yorliq matni va seriya rangi almashtirilgan) tayyorlangan.
Shriftlar (Inter, Exo 2) `public/fonts/` da o'z serverimizdan beriladi.
