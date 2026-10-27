import { NextResponse } from 'next/server';
import { handleUpdate } from '@/lib/bot';
import { webhookSecret, type TgUpdate } from '@/lib/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Telegram webhook (@maxmile_oil_bot). Ulash: `node --env-file=.env.local scripts/telegram-setup.mjs --webhook` */
export async function POST(req: Request) {
  const secret = await webhookSecret();
  if (!secret || req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Xato bo'lsa ham 200 qaytaramiz: aks holda Telegram shu yangilanishni qayta-qayta yuboradi
  try {
    await handleUpdate(update);
  } catch (e) {
    console.error('[bot] update', update.update_id, e);
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, bot: 'maxmile_oil_bot', configured: Boolean(await webhookSecret()) });
}
