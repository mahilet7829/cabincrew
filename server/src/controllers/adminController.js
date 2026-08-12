const prisma = require("../config/db");
const { uploadVideoBuffer } = require("../services/cloudinaryService");

// --- Payment approval ---
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

// --- Course/content management ---
async function createModule(req, res) {
  const { title, description, icon, order } = req.body;
  const mod = await prisma.module.create({
    data: { title, description, icon: icon || "📘", order: order || 0 },
  });
  res.status(201).json(mod);
}

async function addLesson(req, res) {
  const { moduleId } = req.params;
  const { title, content, order } = req.body;

  try {
    let videoUrl = null;
    if (req.file) {
      const result = await uploadVideoBuffer(req.file.buffer);
      videoUrl = result.secure_url;
    }

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        content,
        order: order ? Number(order) : 0,
        videoUrl,
      },
    });
    res.status(201).json(lesson);
  } catch (err) {
    console.error("addLesson failed:", err);
    res.status(500).json({ error: err.message });
  }
}

async function addQuizQuestion(req, res) {
  const { moduleId } = req.params;
  const { question, options, answer } = req.body;

  let quiz = await prisma.quiz.findUnique({ where: { moduleId } });
  if (!quiz) quiz = await prisma.quiz.create({ data: { moduleId } });

  const q = await prisma.question.create({
    data: { quizId: quiz.id, question, options, answer },
  });
  res.status(201).json(q);
}
async function deleteModule(req, res) {
  const { moduleId } = req.params;
  // Delete dependent records first (lessons, quiz+questions) to avoid FK errors
  await prisma.lesson.deleteMany({ where: { moduleId } });
  const quiz = await prisma.quiz.findUnique({ where: { moduleId } });
  if (quiz) {
    await prisma.question.deleteMany({ where: { quizId: quiz.id } });
    await prisma.quiz.delete({ where: { id: quiz.id } });
  }
  await prisma.module.delete({ where: { id: moduleId } });
  res.json({ message: "Module deleted" });
}

async function updateModule(req, res) {
  const { moduleId } = req.params;
  const { title, description, icon } = req.body;
  const mod = await prisma.module.update({
    where: { id: moduleId },
    data: { title, description, icon },
  });
  res.json(mod);
}

async function deleteLesson(req, res) {
  const { lessonId } = req.params;
  await prisma.lesson.delete({ where: { id: lessonId } });
  res.json({ message: "Lesson deleted" });
}

async function updateLesson(req, res) {
  const { lessonId } = req.params;
  const { title, content } = req.body;
  const data = { title, content };

  if (req.file) {
    const result = await uploadVideoBuffer(req.file.buffer);
    data.videoUrl = result.secure_url;
  }

  const lesson = await prisma.lesson.update({ where: { id: lessonId }, data });
  res.json(lesson);
}
async function deleteQuestion(req, res) {
  const { questionId } = req.params;
  await prisma.question.delete({ where: { id: questionId } });
  res.json({ message: "Question deleted" });
}

async function getSetting(req, res) {
  const { key } = req.params;
  const setting = await prisma.setting.findUnique({ where: { key } });
  res.json({ key, value: setting?.value ?? null });
}

async function updateSetting(req, res) {
  const { key } = req.params;
  const { value } = req.body;
  const setting = await prisma.setting.upsert({
    where: { key },
    update: { value: String(value) },
    create: { key, value: String(value) },
  });
  res.json(setting);
}

module.exports = {
  getPendingPayments,
  approvePayment,
  rejectPayment,
  getAllUsers,
  createModule,
  addLesson,
  addQuizQuestion,
  deleteModule,
  updateModule,
  deleteLesson,
  updateLesson,
  deleteQuestion,
  getSetting,
  updateSetting,
};