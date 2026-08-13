const prisma = require("../config/db");

// Admin: create exam
async function createExam(req, res) {
  const { title, description, timeLimit } = req.body;
  const exam = await prisma.mockExam.create({
    data: { title, description, timeLimit: timeLimit ? Number(timeLimit) : 30 },
  });
  res.status(201).json(exam);
}

// Admin: add question to an exam
async function addExamQuestion(req, res) {
  const { examId } = req.params;
  const { question, options, answer } = req.body;
  const q = await prisma.mockExamQuestion.create({
    data: { examId, question, options, answer: Number(answer) },
  });
  res.status(201).json(q);
}

// Admin: delete exam
async function deleteExam(req, res) {
  const { examId } = req.params;
  await prisma.mockExamQuestion.deleteMany({ where: { examId } });
  await prisma.mockExam.delete({ where: { id: examId } });
  res.json({ message: "Exam deleted" });
}

// Admin: delete a single question
async function deleteExamQuestion(req, res) {
  const { questionId } = req.params;
  await prisma.mockExamQuestion.delete({ where: { id: questionId } });
  res.json({ message: "Question deleted" });
}

// Admin: full exam with answers (for management screen)
async function getExamAdmin(req, res) {
  const exam = await prisma.mockExam.findUnique({
    where: { id: req.params.examId },
    include: { questions: true },
  });
  if (!exam) return res.status(404).json({ error: "Not found" });
  res.json(exam);
}

// Everyone: list all exams (no questions, just metadata)
async function listExams(req, res) {
  const exams = await prisma.mockExam.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(exams);
}

// Trainee: get exam questions, no correct answers exposed
async function getExam(req, res) {
  const exam = await prisma.mockExam.findUnique({
    where: { id: req.params.examId },
    include: { questions: true },
  });
  if (!exam) return res.status(404).json({ error: "Not found" });

  res.json({
    id: exam.id,
    title: exam.title,
    timeLimit: exam.timeLimit,
    questions: exam.questions.map((q) => ({ id: q.id, question: q.question, options: q.options })),
  });
}

// Trainee: submit answers, get scored
async function submitExam(req, res) {
  const { examId } = req.params;
  const { answers } = req.body;

  const exam = await prisma.mockExam.findUnique({
    where: { id: examId },
    include: { questions: true },
  });
  if (!exam) return res.status(404).json({ error: "Not found" });

  let score = 0;
  exam.questions.forEach((q) => {
    if (answers[q.id] === q.answer) score++;
  });

  res.json({ score, total: exam.questions.length });
}

module.exports = {
  createExam,
  addExamQuestion,
  deleteExam,
  deleteExamQuestion,
  getExamAdmin,
  listExams,
  getExam,
  submitExam,
};