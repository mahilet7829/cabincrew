import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/common/Card";

export default function AllLessons() {
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
      <h1 className="font-display font-bold text-2xl mb-6">All Lessons</h1>
      <div className="space-y-6">
        {modules.map((mod) => {
          const completed = progress[mod.id]?.lessons || [];
          if (mod.lessons.length === 0) return null;
          return (
            <div key={mod.id}>
              <p className="font-mono-label text-xs text-slate-custom mb-2 flex items-center gap-1.5">
                <span>{mod.icon}</span> {mod.title.toUpperCase()}
              </p>
              <div className="space-y-2">
                {mod.lessons.map((lesson) => (
                  <Link key={lesson.id} to={`/module/${mod.id}/lesson/${lesson.id}`}>
                    <Card className="flex justify-between items-center hover:shadow-md transition py-3.5">
                      <span className="text-sm">
                        {lesson.title} {lesson.videoUrl && <span className="text-xs">🎥</span>}
                      </span>
                      {completed.includes(lesson.id) && (
                        <span className="text-signal-dark text-sm font-medium">✓ Done</span>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        {modules.every((m) => m.lessons.length === 0) && (
          <Card><p className="text-slate-custom">No lessons available yet.</p></Card>
        )}
      </div>
    </div>
  );
}