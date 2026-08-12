async function sendReceiptToTelegram({ buffer, filename, caption }) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`;

  const form = new FormData();
  form.append("chat_id", process.env.TELEGRAM_CHAT_ID);
  form.append("caption", caption);
  form.append("photo", new Blob([buffer]), filename);

  const res = await fetch(url, { method: "POST", body: form });
  const data = await res.json();
  if (!data.ok) throw new Error("Failed to send to Telegram: " + JSON.stringify(data));
  return data;
}

module.exports = { sendReceiptToTelegram };