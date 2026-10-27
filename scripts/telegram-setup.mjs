#!/usr/bin/env node
// @maxmile_oil_bot profilini sozlaydi: buyruqlar, tavsif (uz/ru/en), menyu tugmasi va webhook.
//
//   node --env-file=.env.local scripts/telegram-setup.mjs            — faqat profil
//   node --env-file=.env.local scripts/telegram-setup.mjs --webhook  — + webhook → https://www.maxmiles.uz/api/telegram
//   node --env-file=.env.local scripts/telegram-setup.mjs --polling  — webhook'ni o'chiradi (mahalliy sinov uchun)
//
// Kerak: TELEGRAM_BOT_TOKEN. Webhook siri src/lib/telegram.ts dagi formulaning aynan o'zi.
import { createHash } from 'node:crypto';

const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN yo\'q (.env.local)');
  process.exit(1);
}
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.maxmiles.uz').replace(/\/$/, '');
const secret =
  process.env.TELEGRAM_WEBHOOK_SECRET?.trim() || createHash('sha256').update(`maxmiles-webhook:${token}`).digest('hex').slice(0, 48);

async function tg(method, params = {}) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`${method}: ${data.description}`);
  return data.result;
}

const COMMANDS = {
  uz: [['start', 'Bosh menyu'], ['catalog', 'Mahsulotlar katalogi'], ['finder', 'Moy tanlash'], ['contact', 'Manzil va telefon'], ['help', 'Yordam']],
  ru: [['start', 'Главное меню'], ['catalog', 'Каталог продукции'], ['finder', 'Подбор масла'], ['contact', 'Адрес и телефон'], ['help', 'Помощь']],
  en: [['start', 'Main menu'], ['catalog', 'Product catalog'], ['finder', 'Oil finder'], ['contact', 'Address and phone'], ['help', 'Help']],
};

const DESCRIPTION = {
  uz: "MaxMiles Lubricants — BAAda ishlab chiqarilgan motor va transmissiya moylari, antifriz va texnik suyuqliklar.\n\nBu yerda savol berasiz, buyurtma qoldirasiz va mos moyni tanlaysiz — menejer shu chatda javob beradi.\n\n🌐 maxmiles.uz · 📞 +998 (95) 057-47-89",
  ru: 'MaxMiles Lubricants — моторные и трансмиссионные масла, антифризы и технические жидкости производства ОАЭ.\n\nЗдесь можно задать вопрос, оставить заказ и подобрать масло — менеджер ответит в этом чате.\n\n🌐 maxmiles.uz · 📞 +998 (95) 057-47-89',
  en: 'MaxMiles Lubricants — engine and gear oils, coolants and technical fluids made in the UAE.\n\nAsk a question, place an order or find the right oil — a manager replies in this chat.\n\n🌐 maxmiles.uz · 📞 +998 (95) 057-47-89',
};

const SHORT = {
  uz: 'MaxMiles motor moylari: savol, buyurtma va maslahat. maxmiles.uz',
  ru: 'Масла MaxMiles: вопросы, заказы и подбор. maxmiles.uz',
  en: 'MaxMiles oils: questions, orders and advice. maxmiles.uz',
};

for (const lang of ['uz', 'ru', 'en']) {
  // uz — sukut bo'yicha (til kodi ko'rsatilmagan) ham
  for (const language_code of lang === 'uz' ? [undefined, 'uz'] : [lang]) {
    const scope = language_code ? { language_code } : {};
    await tg('setMyCommands', { commands: COMMANDS[lang].map(([command, description]) => ({ command, description })), ...scope });
    await tg('setMyDescription', { description: DESCRIPTION[lang], ...scope });
    await tg('setMyShortDescription', { short_description: SHORT[lang], ...scope });
  }
}
// Eski «Do'kon» tugmasi xodimlar paneliga ochilardi — endi oddiy buyruqlar menyusi
await tg('setChatMenuButton', { menu_button: { type: 'commands' } });
console.log('Profil: buyruqlar, tavsif, menyu — ok');

if (process.argv.includes('--webhook')) {
  const url = `${SITE_URL}/api/telegram`;
  await tg('setWebhook', { url, secret_token: secret, allowed_updates: ['message', 'callback_query'], max_connections: 20 });
  console.log(`Webhook → ${url}`);
} else if (process.argv.includes('--polling')) {
  await tg('deleteWebhook', {});
  console.log("Webhook o'chirildi (mahalliy sinov: TELEGRAM_POLLING=1 npm run dev)");
}

const info = await tg('getWebhookInfo');
console.log('Holat:', JSON.stringify({ url: info.url || '(yo\'q)', pending: info.pending_update_count, last_error: info.last_error_message }));
