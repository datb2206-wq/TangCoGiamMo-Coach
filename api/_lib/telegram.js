/**
 * Gửi tin Telegram cho admin (không bắt buộc).
 * Biến môi trường: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 */

export const hasTelegram = () => Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

// Escape ký tự đặc biệt cho parse_mode HTML của Telegram
export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Gửi 1–3 ảnh dáng người (multipart, ảnh JPEG dạng base64 từ trang web): 1 ảnh -> sendPhoto, 2–3 ảnh -> album
export async function sendPhotos(photos, caption) {
  const form = new FormData();
  form.append("chat_id", process.env.TELEGRAM_CHAT_ID);
  if (photos.length === 1) {
    form.append("caption", caption);
    form.append("parse_mode", "HTML");
    form.append("photo", new Blob([Buffer.from(photos[0].data.split(",")[1], "base64")], { type: "image/jpeg" }), `${photos[0].angle}.jpg`);
    const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`, { method: "POST", body: form });
    const data = await res.json();
    if (!data.ok) throw new Error(`Telegram ảnh: ${data.description}`);
    return;
  }
  const media = photos.map((p, i) => ({ type: "photo", media: `attach://p${i}`, ...(i === 0 ? { caption, parse_mode: "HTML" } : {}) }));
  form.append("media", JSON.stringify(media));
  photos.forEach((p, i) => {
    const buf = Buffer.from(p.data.split(",")[1], "base64");
    form.append(`p${i}`, new Blob([buf], { type: "image/jpeg" }), `${p.angle}.jpg`);
  });
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMediaGroup`, { method: "POST", body: form });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram ảnh: ${data.description}`);
}

export async function notifyAdmin(html) {
  const res = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: html,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`Telegram: ${data.description}`);
}
