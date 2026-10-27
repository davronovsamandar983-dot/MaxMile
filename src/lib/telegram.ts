// Telegram Bot API — faqat server tomonida (token brauzerga chiqmaydi).
// Sozlash (Vercel → Environment Variables, kodda saqlanmaydi):
//   TELEGRAM_BOT_TOKEN — @BotFather bergan token (@maxmile_oil_bot)
//   TELEGRAM_CHAT_ID   — mijoz xabarlari boradigan chat: menejerning shaxsiy chati yoki guruh ID
//   TELEGRAM_WEBHOOK_SECRET — ixtiyoriy; bo'lmasa tokendan hosil qilinadi

export type TgUser = { id: number; is_bot?: boolean; first_name: string; last_name?: string; username?: string; language_code?: string };
export type TgChat = { id: number; type: 'private' | 'group' | 'supergroup' | 'channel'; title?: string };
export type TgButton = { text: string; url?: string; callback_data?: string };

export type TgMessage = {
  message_id: number;
  date: number;
  chat: TgChat;
  from?: TgUser;
  text?: string;
  caption?: string;
  photo?: unknown[];
  video?: unknown;
  animation?: unknown;
  document?: unknown;
  audio?: unknown;
  voice?: unknown;
  contact?: { phone_number: string; first_name: string; last_name?: string; user_id?: number };
  reply_to_message?: TgMessage;
  reply_markup?: { inline_keyboard?: TgButton[][] };
};

export type TgCallbackQuery = { id: string; from: TgUser; message?: TgMessage; data?: string };
export type TgUpdate = { update_id: number; message?: TgMessage; callback_query?: TgCallbackQuery };

export const botToken = () => process.env.TELEGRAM_BOT_TOKEN?.trim() || '';
export const adminChatId = () => process.env.TELEGRAM_CHAT_ID?.trim() || '';
/** Bot ID — tokenning ikki nuqtagacha qismi */
export const botId = () => Number(botToken().split(':')[0]) || 0;

/** Telegram har webhook so'rovida shu sirni `X-Telegram-Bot-Api-Secret-Token` sarlavhasida yuboradi.
 *  scripts/telegram-setup.mjs ham xuddi shu formuladan foydalanadi. */
export async function webhookSecret() {
  const explicit = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  if (explicit) return explicit;
  const token = botToken();
  if (!token) return '';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`maxmiles-webhook:${token}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('').slice(0, 48);
}

export class TgError extends Error {
  constructor(
    public method: string,
    public code: number,
    public description: string,
  ) {
    super(`${method}: ${code} ${description}`);
  }
}

/** Ulanish o'rnatilmay turib uzilgan xatolar — so'rov Telegram'ga yetmagan, qayta yuborish xavfsiz */
const CONNECT_ERRORS = new Set(['ETIMEDOUT', 'ECONNREFUSED', 'ENETUNREACH', 'EHOSTUNREACH', 'EAI_AGAIN', 'UND_ERR_CONNECT_TIMEOUT']);
const isConnectError = (e: unknown) => {
  const cause = (e as { cause?: { code?: string } })?.cause;
  return !!cause?.code && CONNECT_ERRORS.has(cause.code);
};

async function post(url: string, body: string) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, cache: 'no-store' });
    } catch (e) {
      if (attempt >= 3 || !isConnectError(e)) throw e;
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }
}

export async function tg<T = unknown>(method: string, params: Record<string, unknown> = {}): Promise<T> {
  const token = botToken();
  if (!token) throw new TgError(method, 0, 'TELEGRAM_BOT_TOKEN is not set');
  const res = await post(`https://api.telegram.org/bot${token}/${method}`, JSON.stringify(params));
  const data = (await res.json().catch(() => null)) as { ok: boolean; result?: T; error_code?: number; description?: string } | null;
  if (!data?.ok) throw new TgError(method, data?.error_code ?? res.status, data?.description ?? res.statusText);
  return data.result as T;
}

export const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
