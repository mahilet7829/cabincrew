import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/common/Card";
import ProgressBar from "../components/common/ProgressBar";

export default function Dashboard() {
  const { progress } = useProgress();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses").then(({ data }) => {
      setModules(data);
      setLoading(false);
    });
  }, []);

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const doneLessons = modules.reduce((sum, m) => sum + (progress[m.id]?.lessons.length || 0), 0);

  if (loading) return <p className="text-slate-custom">Loading modules...</p>;

  return (
    <div>
      <span className="font-mono-label text-xs text-signal-dark bg-signal/15 px-2.5 py-1 rounded-full inline-block mb-4">
        {doneLessons}/{totalLessons} LESSONS COMPLETE OVERALL
      </span>
      <h1 className="font-display font-bold text-2xl mb-6">Your Training Modules</h1>

      {modules.length === 0 && (
        <Card>
          <p className="text-slate-custom">No modules yet — check back soon.</p>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((mod) => {
          const done = progress[mod.id]?.lessons.length || 0;
          return (
            <Link key={mod.id} to={`/module/${mod.id}`}>
              <Card className="hover:shadow-md transition h-full">
                <div className="text-3xl mb-2">{mod.icon}</div>
                <h2 className="font-display font-semibold text-lg">{mod.title}</h2>
                <p className="text-sm text-slate-custom mb-3">{mod.description}</p>
                <ProgressBar value={done} max={mod.lessons.length} />
                <p className="font-mono-label text-xs text-slate-custom mt-2">
                  {done}/{mod.lessons.length} LESSONS COMPLETE
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}