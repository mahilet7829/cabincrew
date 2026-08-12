import { useLocation, useParams, Link } from "react-router-dom";
import Card from "../components/common/Card";

export default function QuizResults() {
  const { state } = useLocation();
  const { moduleId } = useParams();

  if (!state) return <p>No results to show. Take the quiz first.</p>;

  const { score, total } = state;
  const pct = Math.round((score / total) * 100);

  return (
    <Card className="text-center">
      <h1 className="text-2xl font-bold mb-2">Quiz Complete</h1>
      <p className="text-4xl font-bold text-brand-500 my-4">{pct}%</p>
      <p className="text-slate-600 mb-6">You scored {score} out of {total}</p>
      <Link to={`/module/${moduleId}`} className="bg-brand-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-600">
        Back to Module
      </Link>
    </Card>
  );
}