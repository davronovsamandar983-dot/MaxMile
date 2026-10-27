import { FINDER, LINES, getProduct, type Product } from '@/data/catalog';
import type { Locale } from '@/lib/translations';
import { HOME } from '@/lib/translations.home';
import { ADDRESS, EMAIL, MAP_URL, PHONE_DISPLAY, SITE_URL } from '@/lib/site';
import { adminChatId, botId, escapeHtml, tg, TgError, type TgButton, type TgCallbackQuery, type TgMessage, type TgUpdate, type TgUser } from '@/lib/telegram';

// @maxmile_oil_bot — mijozlar bilan aloqa.
// Mijoz yozgan har xabar menejer chatiga (TELEGRAM_CHAT_ID) boradi; menejer shu xabarga Reply qilsa,
// javob bot nomidan mijozga qaytadi. Baza kerak emas: mijoz ID'si xabar ichida (#id123) yuradi.

const UI = {
  uz: {
    welcome: (name: string) =>
      `Assalomu alaykum, ${name}! 👋\n\n<b>MaxMiles Lubricants</b> — BAAda ishlab chiqarilgan motor va transmissiya moylari, antifriz va texnik suyuqliklar.\n\nShu chatda:\n• savolingizni yozing yoki ovozli xabar yuboring — menejer shu yerda javob beradi;\n• buyurtma bering — mahsulot nomi va hajmini yozing;\n• «📱 Raqamni yuborish» tugmasi bilan raqamingizni qoldiring — o'zimiz qo'ng'iroq qilamiz.`,
    kb: { catalog: '🛢 Katalog', finder: '🔎 Moy tanlash', phone: '📱 Raqamni yuborish', contacts: '📍 Aloqa' },
    placeholder: 'Savolingizni yozing…',
    catalog: '🛢 <b>MaxMiles mahsulotlari</b>\nSeriyani tanlang — saytda tavsif, xususiyatlar va qadoqlar:',
    allProducts: '📋 Barcha mahsulotlar',
    finder: "🔎 <b>Moy tanlash</b>\nTexnikangizni tanlang — saytda mos moylar chiqadi. Ikkilansangiz, shu yerga mashina rusumi va yilini yozing — maslahat beramiz.",
    contactsTitle: 'MaxMiles Lubricants',
    map: '🗺 Xaritada ochish',
    site: '🌐 Sayt',
    pack: '📦 Qadoq',
    choosePack: '📦 Qadoqni tanlang:',
    orderSent: "✅ So'rovingiz menejerga yuborildi — tez orada shu chatda javob beramiz.",
    leavePhone: "Tezroq bog'lanishimiz uchun «📱 Raqamni yuborish» tugmasini bosing yoki savolingizni shu yerga yozing.",
    viewOnSite: "🌐 Saytda ko'rish",
    phoneThanks: "Rahmat! ✅ Raqamingiz menejerga yetkazildi — tez orada qo'ng'iroq qilamiz.",
    offline: (phone: string) => `Rahmat, xabaringiz qabul qilindi. Tezkor savollar uchun: ${phone}`,
    help: "Savolingizni shu yerga yozing — menejer javob beradi.\n\n/catalog — mahsulotlar\n/finder — moy tanlash\n/contact — manzil va telefon",
  },
  ru: {
    welcome: (name: string) =>
      `Здравствуйте, ${name}! 👋\n\n<b>MaxMiles Lubricants</b> — моторные и трансмиссионные масла, антифризы и технические жидкости производства ОАЭ.\n\nВ этом чате можно:\n• задать вопрос текстом или голосом — менеджер ответит здесь же;\n• оформить заказ — напишите название и объём;\n• оставить номер кнопкой «📱 Отправить номер» — мы перезвоним.`,
    kb: { catalog: '🛢 Каталог', finder: '🔎 Подбор масла', phone: '📱 Отправить номер', contacts: '📍 Контакты' },
    placeholder: 'Напишите ваш вопрос…',
    catalog: '🛢 <b>Продукция MaxMiles</b>\nВыберите серию — на сайте описание, свойства и фасовки:',
    allProducts: '📋 Вся продукция',
    finder: '🔎 <b>Подбор масла</b>\nВыберите технику — на сайте появятся подходящие масла. Сомневаетесь — напишите сюда марку и год автомобиля, подскажем.',
    contactsTitle: 'MaxMiles Lubricants',
    map: '🗺 Открыть на карте',
    site: '🌐 Сайт',
    pack: '📦 Объём',
    choosePack: '📦 Выберите объём:',
    orderSent: '✅ Заявка передана менеджеру — скоро ответим в этом чате.',
    leavePhone: 'Чтобы связаться быстрее, нажмите «📱 Отправить номер» или напишите вопрос сюда.',
    viewOnSite: '🌐 Смотреть на сайте',
    phoneThanks: 'Спасибо! ✅ Номер передан менеджеру — скоро перезвоним.',
    offline: (phone: string) => `Спасибо, сообщение получено. Для срочных вопросов: ${phone}`,
    help: 'Напишите вопрос сюда — менеджер ответит.\n\n/catalog — продукция\n/finder — подбор масла\n/contact — адрес и телефон',
  },
  en: {
    welcome: (name: string) =>
      `Hello, ${name}! 👋\n\n<b>MaxMiles Lubricants</b> — engine and gear oils, coolants and technical fluids made in the UAE.\n\nIn this chat you can:\n• ask a question by text or voice — a manager will reply right here;\n• place an order — write the product and pack size;\n• leave your number with «📱 Share my number» — we'll call you back.`,
    kb: { catalog: '🛢 Catalog', finder: '🔎 Oil finder', phone: '📱 Share my number', contacts: '📍 Contacts' },
    placeholder: 'Type your question…',
    catalog: '🛢 <b>MaxMiles products</b>\nPick a range — description, properties and pack sizes on the website:',
    allProducts: '📋 All products',
    finder: "🔎 <b>Oil finder</b>\nPick your vehicle — matching oils open on the website. Not sure? Write your car's make and year here and we'll advise.",
    contactsTitle: 'MaxMiles Lubricants',
    map: '🗺 Open in maps',
    site: '🌐 Website',
    pack: '📦 Pack',
    choosePack: '📦 Choose a pack size:',
    orderSent: "✅ Your request has been sent to a manager — we'll reply in this chat soon.",
    leavePhone: 'For a faster call back, tap «📱 Share my number» or write your question here.',
    viewOnSite: '🌐 View on website',
    phoneThanks: "Thank you! ✅ Your number has been passed to a manager — we'll call you soon.",
    offline: (phone: string) => `Thank you, your message has been received. For urgent questions: ${phone}`,
    help: 'Write your question here — a manager will reply.\n\n/catalog — products\n/finder — oil finder\n/contact — address and phone',
  },
} satisfies Record<Locale, unknown>;

type KbAction = keyof (typeof UI)['uz']['kb'];

/** Pastki tugma matni → amal va til (tugma qaysi tilda bo'lsa, javob ham o'sha tilda) */
const KB_TEXT = new Map<string, { action: KbAction; lang: Locale }>(
  (Object.keys(UI) as Locale[]).flatMap((lang) =>
    (Object.entries(UI[lang].kb) as [KbAction, string][]).map(([action, text]) => [text, { action, lang }] as const),
  ),
);

const ADMIN_HELP =
  "ℹ️ <b>Menejer rejimi</b>\n\nMijozlar botga yozgan hamma narsa (matn, rasm, ovozli xabar, fayl) shu chatga keladi.\n\n<b>Javob berish:</b> mijoz xabariga <b>Reply</b> (Ответить) qiling — javobingiz bot nomidan mijozga boradi. Yetib borgani 👍 bilan belgilanadi.\n\n#id… belgisini bossangiz, shu mijozning barcha xabarlari chiqadi.";

const langOf = (u?: TgUser): Locale => {
  const code = (u?.language_code || '').slice(0, 2);
  if (code === 'uz') return 'uz';
  if (['ru', 'uk', 'be', 'kk', 'ky', 'tg'].includes(code)) return 'ru';
  if (code === 'en') return 'en';
  return 'uz';
};
const isLocale = (v?: string): v is Locale => v === 'uz' || v === 'ru' || v === 'en';

const fullName = (u: TgUser) => [u.first_name, u.last_name].filter(Boolean).join(' ') || 'Mijoz';

/** Menejer xabaridagi mijoz satri; #id… — javobni kimga qaytarishni shu belgidan bilamiz */
const who = (u: TgUser, lang: Locale) =>
  `👤 <a href="tg://user?id=${u.id}">${escapeHtml(fullName(u))}</a>${u.username ? ` · @${escapeHtml(u.username)}` : ''} · ${lang.toUpperCase()}\n#id${u.id}`;

const productUrl = (p: Product) => `${SITE_URL}/products/${p.slug}`;
const packCode = (pack: string) => pack.replace(/\s+/g, '').toLowerCase();

/** `start` parametri: `<slug>__<qadoq>__<til>`, `site__<til>` yoki eski ko'rinishda faqat `<slug>` */
function parseStart(payload: string) {
  const [head = '', packPart = '', loc] = payload.split('__');
  const product = head && head !== 'site' ? getProduct(head) : undefined;
  const pack = product && packPart ? product.packs.find((p) => packCode(p) === packPart.toLowerCase()) : undefined;
  return { product, pack, locale: isLocale(loc) ? loc : undefined, fromSite: head === 'site' || !!product };
}

const mainKeyboard = (lang: Locale) => {
  const k = UI[lang].kb;
  return {
    keyboard: [[{ text: k.catalog }, { text: k.finder }], [{ text: k.phone, request_contact: true }, { text: k.contacts }]],
    resize_keyboard: true,
    is_persistent: true,
    input_field_placeholder: UI[lang].placeholder,
  };
};

const send = (chatId: number | string, text: string, extra: Record<string, unknown> = {}) =>
  tg('sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...extra });

async function notifyAdmin(text: string, extra: Record<string, unknown> = {}) {
  const admin = adminChatId();
  if (!admin) return false;
  try {
    await send(admin, text, extra);
    return true;
  } catch (e) {
    console.error('[bot] notify admin failed', e);
    return false;
  }
}

const react = (chatId: number | string, messageId: number, emoji: string) =>
  tg('setMessageReaction', { chat_id: chatId, message_id: messageId, reaction: [{ type: 'emoji', emoji }] });

// ───────── Mijoz tomoni

function productCaption(p: Product, pack: string | undefined, lang: Locale) {
  const L = UI[lang];
  const tagline = p.text[lang]?.tagline;
  const head = [`<b>MaxMiles ${p.line} · ${escapeHtml(p.name)}</b>`, p.spec && escapeHtml(p.spec), tagline && `<i>${escapeHtml(tagline)}</i>`];
  // Qadoq tanlanmagan bo'lsa, «tanlang» oxirgi qatorda — tugmalar aynan uning ostida chiqadi
  return `${head.filter(Boolean).join('\n')}\n\n${L.orderSent}\n${pack ? `${L.pack}: <b>${escapeHtml(pack)}</b>` : L.choosePack}`;
}

const productKeyboard = (p: Product, pack: string | undefined, lang: Locale) => {
  const rows: TgButton[][] = [];
  if (!pack) rows.push(p.packs.map((pk, i) => ({ text: pk, callback_data: `k|${p.slug}|${i}|${lang}` })));
  rows.push([{ text: UI[lang].viewOnSite, url: productUrl(p) }]);
  return { inline_keyboard: rows };
};

async function sendProductCard(chatId: number, p: Product, pack: string | undefined, lang: Locale) {
  const caption = productCaption(p, pack, lang);
  const reply_markup = productKeyboard(p, pack, lang);
  try {
    await tg('sendPhoto', { chat_id: chatId, photo: `${SITE_URL}${p.image}`, caption, parse_mode: 'HTML', reply_markup });
  } catch (e) {
    console.warn('[bot] sendPhoto failed, sending text', e);
    await send(chatId, caption, { reply_markup });
  }
  await send(chatId, UI[lang].leavePhone, { reply_markup: mainKeyboard(lang) });
}

async function onStart(msg: TgMessage, u: TgUser, payload: string, isAdmin: boolean) {
  const start = parseStart(payload);
  const lang = start.locale ?? langOf(u);
  if (start.product) {
    const p = start.product;
    await sendProductCard(msg.chat.id, p, start.pack, lang);
    await notifyAdmin(
      `🛒 <b>Buyurtma so'rovi</b> (saytdan)\n🛢 ${p.line} · ${escapeHtml(p.name)}\n📦 ${start.pack ? `<b>${escapeHtml(start.pack)}</b>` : 'qadoq hali tanlanmagan'}\n${who(u, lang)}`,
      { reply_markup: { inline_keyboard: [[{ text: '🌐 Mahsulot sahifasi', url: productUrl(p) }]] } },
    );
    return;
  }
  await send(msg.chat.id, UI[lang].welcome(escapeHtml(u.first_name || '')), { reply_markup: mainKeyboard(lang) });
  if (isAdmin) await send(msg.chat.id, ADMIN_HELP);
  else await notifyAdmin(`👋 <b>Botga yangi mijoz kirdi</b>${start.fromSite ? ' (saytdan)' : ''}\n${who(u, lang)}`);
}

async function sendCatalog(chatId: number, lang: Locale) {
  const rows: TgButton[][] = LINES.map((l) => [{ text: `${l.key} · ${l.name[lang]}`, url: `${SITE_URL}/products?line=${l.key}` }]);
  rows.push([{ text: UI[lang].allProducts, url: `${SITE_URL}/products` }]);
  await send(chatId, UI[lang].catalog, { reply_markup: { inline_keyboard: rows } });
}

async function sendFinder(chatId: number, lang: Locale) {
  const tabs = HOME[lang].finder.tabs;
  const buttons: TgButton[] = FINDER.map((f) => ({ text: tabs[f.key], url: `${SITE_URL}/products?use=${f.key}` }));
  const rows: TgButton[][] = [];
  for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
  await send(chatId, UI[lang].finder, { reply_markup: { inline_keyboard: rows } });
}

async function sendContacts(chatId: number, lang: Locale) {
  const L = UI[lang];
  const text = `📍 <b>${L.contactsTitle}</b>\n${escapeHtml(ADDRESS[lang])}\n\n📞 ${PHONE_DISPLAY}\n✉️ ${EMAIL}\n🌐 ${SITE_URL.replace(/^https?:\/\//, '')}`;
  await send(chatId, text, { reply_markup: { inline_keyboard: [[{ text: L.map, url: MAP_URL }, { text: L.site, url: SITE_URL }]] } });
}

async function onContact(msg: TgMessage, u: TgUser, lang: Locale) {
  const c = msg.contact!;
  const phone = /^\d/.test(c.phone_number) ? `+${c.phone_number}` : c.phone_number;
  const other = c.user_id && c.user_id !== u.id ? `\n(boshqa kontakt: ${escapeHtml([c.first_name, c.last_name].filter(Boolean).join(' '))})` : '';
  const ok = await notifyAdmin(`📞 <b>Telefon raqam:</b> ${escapeHtml(phone)}${other}\n${who(u, lang)}`);
  await send(msg.chat.id, ok ? UI[lang].phoneThanks : UI[lang].offline(PHONE_DISPLAY), { reply_markup: mainKeyboard(lang) });
}

/** Mijoz xabarini menejer chatiga nusxalaydi. Matn va izohli fayllarda #id belgisi matnning o'zida,
 *  stikerga o'xshash izohsiz xabarlarda esa «↩️ Javob» tugmasida yuradi. */
async function relayToAdmin(msg: TgMessage, u: TgUser, lang: Locale) {
  const admin = adminChatId();
  if (!admin) return false;
  const head = `💬 ${who(u, lang)}`;
  try {
    if (msg.text) {
      await send(admin, `${head}\n\n${escapeHtml(msg.text.slice(0, 3500))}`);
    } else if (msg.photo || msg.video || msg.animation || msg.document || msg.audio || msg.voice) {
      const caption = msg.caption ? `\n\n${escapeHtml(msg.caption.slice(0, 700))}` : '';
      await tg('copyMessage', { chat_id: admin, from_chat_id: msg.chat.id, message_id: msg.message_id, caption: head + caption, parse_mode: 'HTML' });
    } else {
      await tg('copyMessage', {
        chat_id: admin,
        from_chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: { inline_keyboard: [[{ text: `↩️ ${fullName(u)} — javob yozish`, callback_data: `r|${u.id}` }]] },
      });
    }
    return true;
  } catch (e) {
    console.error('[bot] relay failed', e);
    return false;
  }
}

async function onCustomerMessage(msg: TgMessage, u: TgUser) {
  const lang = langOf(u);
  if (msg.contact) return onContact(msg, u, lang);
  const ok = await relayToAdmin(msg, u, lang);
  if (ok) await react(msg.chat.id, msg.message_id, '👌').catch(() => undefined);
  else await send(msg.chat.id, UI[lang].offline(PHONE_DISPLAY));
}

// ───────── Menejer tomoni

/** Javob qaytariladigan mijoz: xabardagi #id… yoki «↩️ Javob» tugmasidan */
function targetOf(m: TgMessage): number | null {
  const tag = (m.text || m.caption || '').match(/#id(\d+)/);
  if (tag) return Number(tag[1]);
  for (const row of m.reply_markup?.inline_keyboard ?? [])
    for (const b of row) {
      const r = b.callback_data?.match(/^r\|(\d+)$/);
      if (r) return Number(r[1]);
    }
  return null;
}

async function onAdminReply(msg: TgMessage) {
  const reply = msg.reply_to_message!;
  const isPrivate = msg.chat.type === 'private';
  if (reply.from?.id !== botId()) return; // guruhda hamkasbga yozilgan javob
  const target = targetOf(reply);
  if (!target) {
    if (isPrivate) await send(msg.chat.id, "Bu xabarda mijoz belgisi (#id…) yo'q. Mijozning o'z xabariga Reply qiling.");
    return;
  }
  try {
    await tg('copyMessage', { chat_id: target, from_chat_id: msg.chat.id, message_id: msg.message_id });
    await react(msg.chat.id, msg.message_id, '👍').catch(() => send(msg.chat.id, '✅ Yuborildi', { reply_parameters: { message_id: msg.message_id } }));
  } catch (e) {
    const blocked = e instanceof TgError && e.code === 403;
    await send(msg.chat.id, blocked ? '❌ Yetib bormadi: mijoz botni to\'xtatgan (bloklagan).' : `❌ Yuborilmadi: ${escapeHtml(e instanceof TgError ? e.description : String(e))}`, {
      reply_parameters: { message_id: msg.message_id },
    });
  }
}

// ───────── Tugmalar (callback)

async function onCallback(q: TgCallbackQuery) {
  const [kind, a, b, c] = (q.data || '').split('|');
  if (kind === 'k') {
    // Mijoz mahsulot kartasida qadoq tanladi
    const p = getProduct(a);
    const pack = p?.packs[Number(b)];
    const lang = isLocale(c) ? c : langOf(q.from);
    if (!p || !pack || !q.message) return tg('answerCallbackQuery', { callback_query_id: q.id });
    const caption = productCaption(p, pack, lang);
    const reply_markup = productKeyboard(p, pack, lang);
    const edit = q.message.photo
      ? tg('editMessageCaption', { chat_id: q.message.chat.id, message_id: q.message.message_id, caption, parse_mode: 'HTML', reply_markup })
      : tg('editMessageText', { chat_id: q.message.chat.id, message_id: q.message.message_id, text: caption, parse_mode: 'HTML', reply_markup, link_preview_options: { is_disabled: true } });
    await Promise.all([
      edit.catch(() => undefined),
      tg('answerCallbackQuery', { callback_query_id: q.id, text: `✅ ${pack}` }),
      notifyAdmin(`📦 <b>Qadoq tanlandi: ${escapeHtml(pack)}</b>\n🛢 ${p.line} · ${escapeHtml(p.name)}\n${who(q.from, lang)}`),
    ]);
    return;
  }
  if (kind === 'r' && q.message && String(q.message.chat.id) === adminChatId()) {
    // Menejer izohsiz xabar (stiker, dumaloq video...) ostidagi «↩️ Javob yozish» ni bosdi
    await Promise.all([
      send(q.message.chat.id, `✍️ Javobingizni yozing → #id${a}`, { reply_markup: { force_reply: true, input_field_placeholder: 'Mijozga javob…' } }),
      tg('answerCallbackQuery', { callback_query_id: q.id }),
    ]);
    return;
  }
  await tg('answerCallbackQuery', { callback_query_id: q.id });
}

// ───────── Kirish nuqtasi

export async function handleUpdate(update: TgUpdate) {
  if (update.callback_query) return onCallback(update.callback_query);

  const msg = update.message;
  const u = msg?.from;
  if (!msg || !u || u.is_bot) return;

  const isAdmin = String(msg.chat.id) === adminChatId();
  if (msg.chat.type !== 'private' && !isAdmin) return; // begona guruhlar

  const text = msg.text?.trim() ?? '';
  const command = text.startsWith('/') ? text.split(/\s+/)[0].split('@')[0].toLowerCase() : '';
  const kb = KB_TEXT.get(text);
  const lang = kb?.lang ?? langOf(u);

  if (command === '/id') return send(msg.chat.id, `Chat ID: <code>${msg.chat.id}</code>`);
  if (command === '/start') return onStart(msg, u, text.split(/\s+/)[1] ?? '', isAdmin);
  if (command === '/catalog' || kb?.action === 'catalog') return sendCatalog(msg.chat.id, lang);
  if (command === '/finder' || kb?.action === 'finder') return sendFinder(msg.chat.id, lang);
  if (command === '/contact' || kb?.action === 'contacts') return sendContacts(msg.chat.id, lang);
  if (command === '/help') return send(msg.chat.id, isAdmin ? ADMIN_HELP : UI[lang].help);

  if (isAdmin) {
    if (msg.reply_to_message) return onAdminReply(msg);
    if (msg.contact) return onContact(msg, u, lang); // menejer o'zini sinab ko'rmoqda
    if (msg.chat.type === 'private') return send(msg.chat.id, `Bu xabar hech kimga yuborilmadi.\n\n${ADMIN_HELP}`);
    return;
  }

  return onCustomerMessage(msg, u);
}
