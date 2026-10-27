import { LINES, getProduct, type Product } from '@/data/catalog';
import type { Locale } from '@/lib/translations';
import { ADDRESS, EMAIL, MAP_URL, PHONE_DISPLAY, SITE_URL } from '@/lib/site';
import { adminChatId, botId, escapeHtml, tg, TgError, type TgButton, type TgCallbackQuery, type TgMessage, type TgUpdate, type TgUser } from '@/lib/telegram';

// @maxmile_oil_bot — faqat mijozlar bilan aloqa (savdo boshqa ilovada).
// Mijoz yozgan hamma narsa menejer chatiga (TELEGRAM_CHAT_ID) keladi. Menejer javobni ikki yo'l bilan yuboradi:
//   1) mijoz xabariga Reply qiladi;
//   2) «💬 Javob yozish» ni bosadi — bot «Suhbat: …» xabarini qadaydi (pin), shundan keyin menejer oddiy yozaveradi.
// Baza kerak emas: mijoz ID'si xabar ichida (#id123) yoki tugmada, faol suhbat esa qadalgan xabarda turadi.

const UI = {
  uz: {
    welcome: (name: string) =>
      `Assalomu alaykum, ${name}! 👋\n\n<b>MaxMiles Lubricants</b> — BAAda ishlab chiqarilgan motor va transmissiya moylari, antifriz va texnik suyuqliklar.\n\nSavolingizni shu yerga yozing yoki ovozli xabar yuboring — menejer shu chatda javob beradi.\nQo'ng'iroq qilishimizni xohlasangiz, «📱 Raqamni qoldirish» tugmasini bosing.`,
    kb: { phone: '📱 Raqamni qoldirish', products: '🛢 Mahsulotlar', contacts: '📍 Aloqa' },
    placeholder: 'Savolingizni yozing…',
    products: '🛢 <b>MaxMiles mahsulotlari</b>\nSeriyani tanlang — saytda tavsif va qadoqlar. Savolingiz bo\'lsa, shu yerga yozing.',
    allProducts: '📋 Barcha mahsulotlar',
    map: '🗺 Xaritada ochish',
    site: '🌐 Sayt',
    pack: '📦 Qadoq',
    askAbout: "💬 Shu mahsulot bo'yicha savolingizni yozing — menejer shu yerda javob beradi.",
    leavePhone: "Qo'ng'iroq qilishimizni xohlasangiz, «📱 Raqamni qoldirish» tugmasini bosing.",
    viewOnSite: "🌐 Saytda ko'rish",
    phoneThanks: "Rahmat! ✅ Raqamingiz menejerga yetkazildi — tez orada qo'ng'iroq qilamiz.",
    offline: (phone: string) => `Rahmat, xabaringiz qabul qilindi. Tezkor savollar uchun: ${phone}`,
    help: "Savolingizni shu yerga yozing — menejer javob beradi.\n\n/contact — manzil va telefon\n/catalog — mahsulotlar",
  },
  ru: {
    welcome: (name: string) =>
      `Здравствуйте, ${name}! 👋\n\n<b>MaxMiles Lubricants</b> — моторные и трансмиссионные масла, антифризы и технические жидкости производства ОАЭ.\n\nНапишите вопрос сюда или отправьте голосовое — менеджер ответит в этом чате.\nХотите, чтобы мы позвонили? Нажмите «📱 Оставить номер».`,
    kb: { phone: '📱 Оставить номер', products: '🛢 Продукция', contacts: '📍 Контакты' },
    placeholder: 'Напишите ваш вопрос…',
    products: '🛢 <b>Продукция MaxMiles</b>\nВыберите серию — на сайте описание и фасовки. Есть вопрос — пишите сюда.',
    allProducts: '📋 Вся продукция',
    map: '🗺 Открыть на карте',
    site: '🌐 Сайт',
    pack: '📦 Объём',
    askAbout: '💬 Напишите вопрос по этому продукту — менеджер ответит здесь же.',
    leavePhone: 'Хотите, чтобы мы позвонили? Нажмите «📱 Оставить номер».',
    viewOnSite: '🌐 Смотреть на сайте',
    phoneThanks: 'Спасибо! ✅ Номер передан менеджеру — скоро перезвоним.',
    offline: (phone: string) => `Спасибо, сообщение получено. Для срочных вопросов: ${phone}`,
    help: 'Напишите вопрос сюда — менеджер ответит.\n\n/contact — адрес и телефон\n/catalog — продукция',
  },
  en: {
    welcome: (name: string) =>
      `Hello, ${name}! 👋\n\n<b>MaxMiles Lubricants</b> — engine and gear oils, coolants and technical fluids made in the UAE.\n\nWrite your question here or send a voice message — a manager will reply in this chat.\nWant us to call you? Tap «📱 Leave my number».`,
    kb: { phone: '📱 Leave my number', products: '🛢 Products', contacts: '📍 Contacts' },
    placeholder: 'Type your question…',
    products: '🛢 <b>MaxMiles products</b>\nPick a range — description and pack sizes on the website. Any questions — write here.',
    allProducts: '📋 All products',
    map: '🗺 Open in maps',
    site: '🌐 Website',
    pack: '📦 Pack',
    askAbout: '💬 Write your question about this product — a manager will reply right here.',
    leavePhone: 'Want us to call you? Tap «📱 Leave my number».',
    viewOnSite: '🌐 View on website',
    phoneThanks: "Thank you! ✅ Your number has been passed to a manager — we'll call you soon.",
    offline: (phone: string) => `Thank you, your message has been received. For urgent questions: ${phone}`,
    help: 'Write your question here — a manager will reply.\n\n/contact — address and phone\n/catalog — products',
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
  "ℹ️ <b>Menejer rejimi</b>\n\nMijozlar botga yozgan hamma narsa (matn, rasm, ovozli xabar, fayl, telefon raqami) shu chatga keladi.\n\n<b>Javob berishning ikki yo'li:</b>\n1. Mijoz xabari ostidagi <b>«💬 Javob yozish»</b> ni bosing — suhbat ochiladi va tepada qadalib turadi. Endi oddiy yozavering: matn, rasm, ovozli xabar — hammasi shu mijozga boradi. Tugatish: «⏹ Suhbatni tugatish» yoki /stop.\n2. Yoki istalgan mijoz xabariga <b>Reply</b> qiling — javob aynan o'sha mijozga boradi.\n\nYetib borgan xabaringizga 👍 qo'yiladi. #id… belgisini bossangiz, shu mijozning barcha xabarlari chiqadi.";

const langOf = (u?: TgUser): Locale => {
  const code = (u?.language_code || '').slice(0, 2);
  if (code === 'uz') return 'uz';
  if (['ru', 'uk', 'be', 'kk', 'ky', 'tg'].includes(code)) return 'ru';
  if (code === 'en') return 'en';
  return 'uz';
};
const isLocale = (v?: string): v is Locale => v === 'uz' || v === 'ru' || v === 'en';

const fullName = (u: Pick<TgUser, 'first_name' | 'last_name'>) => [u.first_name, u.last_name].filter(Boolean).join(' ') || 'Mijoz';

/** Menejer xabaridagi mijoz satri; #id… — javobni kimga qaytarishni shu belgidan bilamiz */
const who = (u: TgUser, lang: Locale) =>
  `👤 <a href="tg://user?id=${u.id}">${escapeHtml(fullName(u))}</a>${u.username ? ` · @${escapeHtml(u.username)}` : ''} · ${lang.toUpperCase()}\n#id${u.id}`;

/** Har mijoz xabari ostidagi tugma: bosilsa, shu mijoz bilan suhbat ochiladi */
const chatButton = (id: number): TgButton => ({ text: '💬 Javob yozish', callback_data: `c|${id}` });

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
    keyboard: [[{ text: k.phone, request_contact: true }], [{ text: k.products }, { text: k.contacts }]],
    resize_keyboard: true,
    is_persistent: true,
    input_field_placeholder: UI[lang].placeholder,
  };
};

const send = (chatId: number | string, text: string, extra: Record<string, unknown> = {}) =>
  tg<TgMessage>('sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...extra });

async function notifyAdmin(text: string, buttons: TgButton[] = []) {
  const admin = adminChatId();
  if (!admin) return false;
  try {
    await send(admin, text, buttons.length ? { reply_markup: { inline_keyboard: [buttons] } } : {});
    return true;
  } catch (e) {
    console.error('[bot] notify admin failed', e);
    return false;
  }
}

const react = (chatId: number | string, messageId: number, emoji: string) =>
  tg('setMessageReaction', { chat_id: chatId, message_id: messageId, reaction: [{ type: 'emoji', emoji }] });

// ───────── Mijoz tomoni

async function sendProductCard(chatId: number, p: Product, pack: string | undefined, lang: Locale) {
  const L = UI[lang];
  const tagline = p.text[lang]?.tagline;
  const head = [`<b>MaxMiles ${p.line} · ${escapeHtml(p.name)}</b>`, p.spec && escapeHtml(p.spec), tagline && `<i>${escapeHtml(tagline)}</i>`];
  const caption = `${head.filter(Boolean).join('\n')}${pack ? `\n${L.pack}: <b>${escapeHtml(pack)}</b>` : ''}\n\n${L.askAbout}`;
  const reply_markup = { inline_keyboard: [[{ text: L.viewOnSite, url: productUrl(p) }]] };
  try {
    await tg('sendPhoto', { chat_id: chatId, photo: `${SITE_URL}${p.image}`, caption, parse_mode: 'HTML', reply_markup });
  } catch (e) {
    console.warn('[bot] sendPhoto failed, sending text', e);
    await send(chatId, caption, { reply_markup });
  }
  // Pastki menyu (raqam qoldirish) shu xabar bilan o'rnatiladi
  await send(chatId, L.leavePhone, { reply_markup: mainKeyboard(lang) });
}

async function onStart(msg: TgMessage, u: TgUser, payload: string, isAdmin: boolean) {
  const start = parseStart(payload);
  const lang = start.locale ?? langOf(u);
  if (start.product) {
    // Saytdagi mahsulot tugmasidan kelgan mijoz (menejer bossa — mijoz ko'radigan kartani ko'radi)
    const p = start.product;
    await sendProductCard(msg.chat.id, p, start.pack, lang);
    await notifyAdmin(
      `🛢 <b>Saytdan, mahsulot bo'yicha</b>\n${p.line} · ${escapeHtml(p.name)}${start.pack ? ` · ${escapeHtml(start.pack)}` : ''}\n${who(u, lang)}`,
      [chatButton(u.id), { text: '🌐 Mahsulot', url: productUrl(p) }],
    );
    return;
  }
  if (isAdmin) return send(msg.chat.id, ADMIN_HELP, { reply_markup: { remove_keyboard: true } });
  await send(msg.chat.id, UI[lang].welcome(escapeHtml(u.first_name || '')), { reply_markup: mainKeyboard(lang) });
  await notifyAdmin(`👋 <b>Botga yangi mijoz kirdi</b>${start.fromSite ? ' (saytdan)' : ''}\n${who(u, lang)}`, [chatButton(u.id)]);
}

async function sendProducts(chatId: number, lang: Locale) {
  const rows: TgButton[][] = LINES.map((l) => [{ text: `${l.key} · ${l.name[lang]}`, url: `${SITE_URL}/products?line=${l.key}` }]);
  rows.push([{ text: UI[lang].allProducts, url: `${SITE_URL}/products` }]);
  await send(chatId, UI[lang].products, { reply_markup: { inline_keyboard: rows } });
}

async function sendContacts(chatId: number, lang: Locale) {
  const L = UI[lang];
  const text = `📍 <b>MaxMiles Lubricants</b>\n${escapeHtml(ADDRESS[lang])}\n\n📞 ${PHONE_DISPLAY}\n✉️ ${EMAIL}\n🌐 ${SITE_URL.replace(/^https?:\/\//, '')}`;
  await send(chatId, text, { reply_markup: { inline_keyboard: [[{ text: L.map, url: MAP_URL }, { text: L.site, url: SITE_URL }]] } });
}

async function onContact(msg: TgMessage, u: TgUser, lang: Locale, isAdmin = false) {
  const c = msg.contact!;
  const phone = /^\d/.test(c.phone_number) ? `+${c.phone_number}` : c.phone_number;
  const other = c.user_id && c.user_id !== u.id ? `\n(boshqa kontakt: ${escapeHtml(fullName(c))})` : '';
  const ok = await notifyAdmin(`📞 <b>Qo'ng'iroq so'raldi:</b> ${escapeHtml(phone)}${other}\n${who(u, lang)}`, [chatButton(u.id)]);
  await send(msg.chat.id, ok ? UI[lang].phoneThanks : UI[lang].offline(PHONE_DISPLAY), { reply_markup: isAdmin ? { remove_keyboard: true } : mainKeyboard(lang) });
}

/** Mijoz xabarini menejer chatiga nusxalaydi: matn va izohli fayllarda #id matnda, qolganlarida tugmada */
async function relayToAdmin(msg: TgMessage, u: TgUser, lang: Locale) {
  const admin = adminChatId();
  if (!admin) return false;
  const head = `💬 ${who(u, lang)}`;
  const reply_markup = { inline_keyboard: [[chatButton(u.id)]] };
  try {
    if (msg.text) {
      await send(admin, `${head}\n\n${escapeHtml(msg.text.slice(0, 3500))}`, { reply_markup });
    } else if (msg.photo || msg.video || msg.animation || msg.document || msg.audio || msg.voice) {
      const caption = msg.caption ? `\n\n${escapeHtml(msg.caption.slice(0, 700))}` : '';
      await tg('copyMessage', { chat_id: admin, from_chat_id: msg.chat.id, message_id: msg.message_id, caption: head + caption, parse_mode: 'HTML', reply_markup });
    } else {
      // Stiker, dumaloq video, joylashuv... — izoh qo'yib bo'lmaydi, mijoz kimligi tugmada
      await tg('copyMessage', {
        chat_id: admin,
        from_chat_id: msg.chat.id,
        message_id: msg.message_id,
        reply_markup: { inline_keyboard: [[{ ...chatButton(u.id), text: `💬 ${fullName(u)} — javob yozish` }]] },
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

/** Javob qaytariladigan mijoz: xabardagi #id… yoki «💬 Javob yozish» tugmasidan */
function targetOf(m: TgMessage): number | null {
  const tag = (m.text || m.caption || '').match(/#id(\d+)/);
  if (tag) return Number(tag[1]);
  for (const row of m.reply_markup?.inline_keyboard ?? [])
    for (const b of row) {
      const r = b.callback_data?.match(/^[cr]\|(\d+)$/);
      if (r) return Number(r[1]);
    }
  return null;
}

const SESSION_MARK = '🟢 Suhbat:';

/** Faol suhbat — menejer chatida bot qadagan «🟢 Suhbat: …» xabari */
async function activeSession(chatId: number) {
  const chat = await tg<{ pinned_message?: TgMessage }>('getChat', { chat_id: chatId });
  const pin = chat.pinned_message;
  if (!pin || pin.from?.id !== botId() || !pin.text?.startsWith(SESSION_MARK)) return null;
  const target = targetOf(pin);
  return target ? { target, pin } : null;
}

async function openSession(chatId: number, customerId: number) {
  const prev = await activeSession(chatId).catch(() => null);
  if (prev) await closeSession(chatId, prev.pin);
  const customer = await tg<{ first_name?: string; last_name?: string; username?: string }>('getChat', { chat_id: customerId }).catch(() => null);
  const name = customer ? fullName({ first_name: customer.first_name ?? '', last_name: customer.last_name }) : `#id${customerId}`;
  const pin = await send(
    chatId,
    `${SESSION_MARK} <b>${escapeHtml(name)}</b>${customer?.username ? ` · @${escapeHtml(customer.username)}` : ''}\nEndi shu chatga yozgan hamma xabaringiz (matn, rasm, ovozli xabar) shu mijozga boradi.\n#id${customerId}`,
    { reply_markup: { inline_keyboard: [[{ text: '⏹ Suhbatni tugatish', callback_data: `x|${customerId}` }]] } },
  );
  await tg('pinChatMessage', { chat_id: chatId, message_id: pin.message_id, disable_notification: true });
  return name;
}

async function closeSession(chatId: number, pin: TgMessage) {
  await tg('unpinChatMessage', { chat_id: chatId, message_id: pin.message_id }).catch(() => undefined);
  const name = (pin.text ?? '').split('\n')[0].replace(SESSION_MARK, '').trim();
  await tg('editMessageText', {
    chat_id: chatId,
    message_id: pin.message_id,
    text: `⚪️ Suhbat tugadi: ${escapeHtml(name)}`,
    parse_mode: 'HTML',
  }).catch(() => undefined);
}

/** Menejer xabarini mijozga nusxalaydi va natijani belgilaydi */
async function deliver(msg: TgMessage, target: number) {
  try {
    await tg('copyMessage', { chat_id: target, from_chat_id: msg.chat.id, message_id: msg.message_id });
    await react(msg.chat.id, msg.message_id, '👍').catch(() => send(msg.chat.id, '✅ Yuborildi', { reply_parameters: { message_id: msg.message_id } }));
  } catch (e) {
    const blocked = e instanceof TgError && e.code === 403;
    await send(msg.chat.id, blocked ? "❌ Yetib bormadi: mijoz botni to'xtatgan (bloklagan)." : `❌ Yuborilmadi: ${escapeHtml(e instanceof TgError ? e.description : String(e))}`, {
      reply_parameters: { message_id: msg.message_id },
    });
  }
}

async function onAdminMessage(msg: TgMessage, u: TgUser, command: string) {
  const isPrivate = msg.chat.type === 'private';

  if (command === '/stop') {
    const s = await activeSession(msg.chat.id);
    return s ? closeSession(msg.chat.id, s.pin) : send(msg.chat.id, "Faol suhbat yo'q.");
  }
  if (msg.contact) return onContact(msg, u, langOf(u), true); // menejer o'zini sinab ko'rmoqda

  const reply = msg.reply_to_message;
  if (reply && reply.from?.id === botId()) {
    const target = targetOf(reply);
    if (target) return deliver(msg, target);
  }
  if (command) return; // noma'lum buyruq mijozga ketmaydi

  // Guruhda oddiy gaplar hamkasblar orasida — u yerda faqat Reply ishlaydi
  if (!isPrivate) return;
  const session = await activeSession(msg.chat.id);
  if (session) return deliver(msg, session.target);
  if (!reply) return send(msg.chat.id, `Bu xabar hech kimga yuborilmadi — hozir ochiq suhbat yo'q.\n\n${ADMIN_HELP}`);
}

// ───────── Tugmalar (callback)

async function onCallback(q: TgCallbackQuery) {
  const [kind, id] = (q.data || '').split('|');
  const chatId = q.message?.chat.id;
  const isAdminChat = chatId !== undefined && String(chatId) === adminChatId();

  if (kind === 'c' && isAdminChat && id) {
    const name = await openSession(chatId, Number(id));
    await tg('answerCallbackQuery', { callback_query_id: q.id, text: `Suhbat ochildi: ${name}` });
    return;
  }
  if (kind === 'x' && isAdminChat && q.message) {
    await closeSession(chatId, q.message);
    await tg('answerCallbackQuery', { callback_query_id: q.id, text: 'Suhbat tugadi' });
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
  const kb = isAdmin ? undefined : KB_TEXT.get(text);
  const lang = kb?.lang ?? langOf(u);

  if (command === '/id') return send(msg.chat.id, `Chat ID: <code>${msg.chat.id}</code>`);
  if (command === '/start') return onStart(msg, u, text.split(/\s+/)[1] ?? '', isAdmin);
  if (command === '/help') return send(msg.chat.id, isAdmin ? ADMIN_HELP : UI[lang].help);
  if (isAdmin) return onAdminMessage(msg, u, command);

  if (command === '/catalog' || kb?.action === 'products') return sendProducts(msg.chat.id, lang);
  if (command === '/contact' || kb?.action === 'contacts') return sendContacts(msg.chat.id, lang);
  return onCustomerMessage(msg, u);
}
