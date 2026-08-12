import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import QuestionCard from "../components/quiz/QuestionCard";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/common/Card";

export default function Quiz() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore } = useProgress();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/quizzes/${moduleId}`)
      .then(({ data }) => setQuestions(data.questions))
      .catch(() => setError("No quiz available for this module yet."))
      .finally(() => setLoading(false));
  }, [moduleId]);

  function handleSelect(qId, optionIndex) {
    setAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
  }

  async function handleSubmit() {
    const { data } = await api.post(`/quizzes/${moduleId}/submit`, { answers });
    saveQuizScore(moduleId, data.score, data.total);
    navigate(`/module/${moduleId}/quiz/results`, { state: data });
  }

  if (loading) return <p className="text-slate-custom">Loading quiz...</p>;
  if (error) return <p>{error}</p>;

return (
    <Card>
      <Link
        to={`/module/${moduleId}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-custom hover:text-ink transition mb-4"
      >
        ← Back to Module
      </Link>
      <h1 className="font-display font-bold text-xl mb-6">Module Quiz</h1>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          selected={answers[q.id]}
          onSelect={(i) => handleSelect(q.id, i)}
        />
      ))}
      <button
        onClick={handleSubmit}
        disabled={Object.keys(answers).length < questions.length}
        className="bg-ink text-paper px-5 py-3 rounded-full font-medium hover:bg-ink/90 transition disabled:opacity-40"
      >
        Submit Quiz
      </button>
    </Card>
  );
}