const prisma = require("../config/db");

async function getPendingPayments(req, res) {
  const payments = await prisma.payment.findMany({
    where: { status: "PENDING" },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(payments);
}

async function approvePayment(req, res) {
  const { paymentId } = req.params;
  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "APPROVED" },
  });
  await prisma.user.update({
    where: { id: payment.userId },
    data: { status: "APPROVED" },
  });
  res.json({ message: "User approved" });
}

async function rejectPayment(req, res) {
  const { paymentId } = req.params;
  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "REJECTED" },
  });
  await prisma.user.update({
    where: { id: payment.userId },
    data: { status: "REJECTED" },
  });
  res.json({ message: "User rejected" });
}

async function getAllUsers(req, res) {
  const users = await prisma.user.findMany({
    select: { id: true, fullName: true, email: true, status: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(users);
}

module.exports = { getPendingPayments, approvePayment, rejectPayment, getAllUsers };