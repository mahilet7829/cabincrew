import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/common/Card";

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const { progress } = useProgress();
  const [mod, setMod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${moduleId}`).then(({ data }) => {
      setMod(data);
      setLoading(false);
    });
  }, [moduleId]);

  if (loading) return <p className="text-slate-custom">Loading...</p>;
  if (!mod) return <p>Module not found.</p>;

  const completed = progress[moduleId]?.lessons || [];

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-slate-custom hover:text-ink transition mb-4"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="font-display font-bold text-2xl mb-1">{mod.title}</h1>
      <p className="text-slate-custom mb-6">{mod.description}</p>

      <div className="space-y-3 mb-8">
        {mod.lessons.map((lesson) => (
          <Link key={lesson.id} to={`/module/${mod.id}/lesson/${lesson.id}`}>
            <Card className="flex justify-between items-center hover:shadow-md transition">
              <span>{lesson.title}</span>
              {completed.includes(lesson.id) && (
                <span className="text-signal-dark text-sm font-medium">✓ Done</span>
              )}
            </Card>
          </Link>
        ))}
      </div>

      <Link
        to={`/module/${mod.id}/quiz`}
        className="inline-block bg-ink text-paper px-5 py-3 rounded-full font-medium hover:bg-ink/90 transition"
      >
        Take Module Quiz
      </Link>
    </div>
  );
}