import { botToken, webhookSecret, type TgUpdate } from './telegram';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Faqat `next dev` uchun: Telegram'dan yangilanishlarni olib, mahalliy /api/telegram ga xuddi webhook kabi yuboradi.
 *  Shunday qilib route kodi o'zgarsa, server qayta ishga tushmasdan yangisi ishlaydi. */
export function startTelegramPolling() {
  const g = globalThis as { __maxmilesPolling?: boolean };
  if (g.__maxmilesPolling || !botToken()) return;
  g.__maxmilesPolling = true;

  const endpoint = `http://127.0.0.1:${process.env.PORT || 3000}/api/telegram`;
  console.log(`[telegram] dev polling → ${endpoint}`);

  void (async () => {
    const secret = await webhookSecret();
    let offset = 0;
    let failures = 0;
    for (;;) {
      try {
        const res = await fetch(`https://api.telegram.org/bot${botToken()}/getUpdates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ offset, timeout: 25, allowed_updates: ['message', 'callback_query'] }),
        });
        const data = (await res.json()) as { ok: boolean; result?: TgUpdate[]; error_code?: number; description?: string };
        if (!data.ok) {
          // 409 — webhook o'rnatilgan (production ishlayapti): mahalliy so'rovni to'xtatib turamiz
          console.warn(`[telegram] getUpdates: ${data.error_code} ${data.description}`);
          await sleep(data.error_code === 409 ? 60_000 : 5_000);
          continue;
        }
        for (const update of data.result ?? []) {
          offset = update.update_id + 1;
          const from = update.message?.from ?? update.callback_query?.from;
          console.log(`[telegram] update ${update.update_id} from ${from?.id} ${from?.first_name ?? ''} ${from?.username ? '@' + from.username : ''}`);
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': secret },
            body: JSON.stringify(update),
          }).catch((e) => console.warn('[telegram] local webhook failed', e));
        }
        failures = 0;
      } catch (e) {
        // Internet uzilsa log to'lib ketmasin: bitta qisqa qator, kutish 5 s → 60 s gacha o'sadi
        failures++;
        const code = (e as { cause?: { code?: string } })?.cause?.code ?? (e as Error)?.message;
        if (failures === 1 || failures % 10 === 0) console.warn(`[telegram] Telegram'ga ulanib bo'lmadi (${code}), qayta urinish… [${failures}]`);
        await sleep(Math.min(60_000, 5_000 * failures));
      }
    }
  })();
}
