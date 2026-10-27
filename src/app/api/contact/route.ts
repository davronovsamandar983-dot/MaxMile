import { NextResponse } from 'next/server';
import { adminChatId, botToken, escapeHtml, tg } from '@/lib/telegram';

export const runtime = 'nodejs';

type Payload = { name?: unknown; phone?: unknown; message?: unknown; website?: unknown };

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '');

/**
 * «Aloqa» formasidagi murojaatni @maxmile_oil_bot orqali menejer chatiga yuboradi (sozlash: src/lib/telegram.ts).
 * TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID bo'lmasa 501 + { fallback: true } qaytadi, brauzer Telegram'ni tayyor matn bilan ochadi.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Spam tuzog'i: yashirin maydon to'ldirilgan bo'lsa, jimgina "muvaffaqiyat" qaytaramiz
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 24);
  const message = clean(body.message, 1000);
  if (!name || phone.replace(/\D/g, '').length < 7 || !message) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const chatId = adminChatId();
  if (!botToken() || !chatId) {
    return NextResponse.json({ ok: false, fallback: true }, { status: 501 });
  }

  const text = `📝 <b>Saytdagi forma — yangi murojaat</b>\n\n👤 ${escapeHtml(name)}\n📞 ${escapeHtml(phone)}\n\n${escapeHtml(message)}`;
  try {
    await tg('sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] telegram', e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
