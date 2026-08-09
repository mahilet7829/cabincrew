const prisma = require("../config/db");
const { sendReceiptToTelegram } = require("../services/telegramService");

async function submitPayment(req, res) {
  const userId = req.user.id;
  const { method, amount } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "Receipt image is required" });

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const payment = await prisma.payment.create({
    data: { userId, method, amount: parseFloat(amount), status: "PENDING" },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { status: "PENDING_APPROVAL" },
  });

  await sendReceiptToTelegram({
    buffer: file.buffer,
    filename: file.originalname,
    caption:
      `💳 New payment submitted\n` +
      `Name: ${user.fullName}\n` +
      `Email: ${user.email}\n` +
      `Phone: ${user.phone}\n` +
      `Method: ${method}\n` +
      `Amount: ${amount}\n` +
      `Payment ID: ${payment.id}\n\n` +
      `Approve in the admin panel.`,
  });

  res.json({ message: "Receipt submitted. Await admin approval." });
}

module.exports = { submitPayment };