const prisma = require("../config/db");

async function getQuiz(req, res) {
  const quiz = await prisma.quiz.findUnique({
    where: { moduleId: req.params.moduleId },
    include: { questions: true },
  });
  if (!quiz) return res.status(404).json({ error: "No quiz for this module" });

  // Never send correct answers to the client
  const safe = {
    id: quiz.id,
    questions: quiz.questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    })),
  };
  res.json(safe);
}

async function submitQuiz(req, res) {
  const { moduleId } = req.params;
  const { answers } = req.body; // { questionId: selectedOptionIndex }

  const quiz = await prisma.quiz.findUnique({
    where: { moduleId },
    include: { questions: true },
  });
  if (!quiz) return res.status(404).json({ error: "No quiz for this module" });

  let score = 0;
  quiz.questions.forEach((q) => {
    if (answers[q.id] === q.answer) score++;
  });

  res.json({ score, total: quiz.questions.length });
}

module.exports = { getQuiz, submitQuiz };