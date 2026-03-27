import { logger } from "./logger";

const TELEGRAM_BOT_TOKEN = "8528525952:AAG45Nb3_95Le8e4l1C6vf6XIO_EdqMKw-I";
const TELEGRAM_CHAT_ID = "8706227549";

export async function sendTelegramMessage(message: string): Promise<void> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      logger.warn({ status: response.status, text }, "Telegram API returned non-OK status");
    }
  } catch (err) {
    logger.error({ err }, "Failed to send Telegram notification");
  }
}
