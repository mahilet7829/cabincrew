import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/common/Card";

export default function AllQuizzes() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { progress } = useProgress();

  useEffect(() => {
    api.get("/courses").then(({ data }) => {
      setModules(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-slate-custom">Loading...</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-6">All Quizzes</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((mod) => {
          const latest = progress[mod.id]?.quizScores?.latest;
          return (
            <Link key={mod.id} to={`/module/${mod.id}/quiz`}>
              <Card className="hover:shadow-md transition h-full">
                <div className="text-3xl mb-2">{mod.icon}</div>
                <h2 className="font-display font-semibold text-lg">{mod.title}</h2>
                <p className="text-sm text-slate-custom mb-3">Module quiz</p>
                {latest ? (
                  <p className="font-mono-label text-xs text-signal-dark">
                    LAST SCORE: {Math.round((latest.score / latest.total) * 100)}%
                  </p>
                ) : (
                  <p className="font-mono-label text-xs text-slate-custom">NOT ATTEMPTED YET</p>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}