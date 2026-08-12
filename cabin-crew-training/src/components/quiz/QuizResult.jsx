import { useLocation, useParams, Link } from "react-router-dom";
import Card from "../components/common/Card";

export default function QuizResults() {
  const { state } = useLocation();
  const { moduleId } = useParams();

  if (!state) return <p className="text-slate-custom">No results to show. Take the quiz first.</p>;

  const { score, total } = state;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  return (
    <div className="max-w-md mx-auto mt-10">
      <span
        className={`font-mono-label text-xs px-2.5 py-1 rounded-full inline-block mb-4 ${
          passed ? "text-signal-dark bg-signal/15" : "text-amber-600 bg-amber-50"
        }`}
      >
        {passed ? "QUIZ PASSED" : "KEEP PRACTICING"}
      </span>
      <Card className="text-center">
        <h1 className="font-display font-bold text-2xl mb-2">Quiz Complete</h1>
        <p className="font-display font-bold text-5xl text-signal-dark my-6">{pct}%</p>
        <p className="text-slate-custom mb-8">
          You scored {score} out of {total}
        </p>
        <Link
          to={`/module/${moduleId}`}
          className="inline-block bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-ink/90 transition"
        >
          Back to Module
        </Link>
      </Card>
    </div>
  );
}