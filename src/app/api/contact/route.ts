import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Payload = { name?: unknown; phone?: unknown; message?: unknown; website?: unknown };

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '');
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Murojaatni Telegram'ga yuboradi. Sozlash (Vercel → Environment Variables, kodda saqlanmaydi):
 *   TELEGRAM_BOT_TOKEN — @BotFather bergan token
 *   TELEGRAM_CHAT_ID   — xabar boradigan chat/guruh ID
 * Ikkalasi bo'lmasa 501 + { fallback: true } qaytadi, brauzer Telegram'ni tayyor matn bilan ochadi.
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

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, fallback: true }, { status: 501 });
  }

  const text = `🛢 <b>MaxMiles — yangi murojaat</b>\n\n👤 ${escapeHtml(name)}\n📞 ${escapeHtml(phone)}\n\n${escapeHtml(message)}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
