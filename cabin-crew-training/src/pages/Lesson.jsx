import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useProgress } from "../hooks/useProgress";
import Card from "../components/common/Card";

export default function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson } = useProgress();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/courses/${moduleId}`).then(({ data }) => {
      const found = data.lessons.find((l) => l.id === lessonId);
      setLesson(found || null);
      setLoading(false);
    });
  }, [moduleId, lessonId]);

  if (loading) return <p className="text-slate-custom">Loading...</p>;
  if (!lesson) return <p>Lesson not found.</p>;

  function handleComplete() {
    completeLesson(moduleId, lessonId);
    navigate(`/module/${moduleId}`);
  }

  return (
    <Card>
      <Link
        to={`/module/${moduleId}`}
        className="inline-flex items-center gap-1.5 text-sm text-slate-custom hover:text-ink transition mb-4"
      >
        ← Back to Module
      </Link>
      {lesson.videoUrl && (
  <video
    controls
    className="w-full rounded-xl mb-6 bg-ink"
    src={lesson.videoUrl}>
    Your browser does not support video playback.
  </video>
)}
      <h1 className="font-display font-bold text-xl mb-4">{lesson.title}</h1>
      <div className="whitespace-pre-line text-ink/80 leading-relaxed mb-6">{lesson.content}</div>
      <button
        onClick={handleComplete}
        className="bg-ink text-paper px-5 py-3 rounded-full font-medium hover:bg-ink/90 transition"
      >
        Mark Complete
      </button>
    </Card>
  );
}