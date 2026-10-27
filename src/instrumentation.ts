/** Mahalliy sinov: `.env.local` da TELEGRAM_POLLING=1 bo'lsa, `next dev` botni webhook'siz (getUpdates orqali) ishlatadi.
 *  Productionda hech narsa qilmaydi — u yerda Telegram /api/telegram webhook'iga yuboradi. */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.NODE_ENV !== 'development') return;
  if (process.env.TELEGRAM_POLLING !== '1') return;
  const { startTelegramPolling } = await import('./lib/telegram-polling');
  startTelegramPolling();
}
