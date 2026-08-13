import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

export default function ManageLessons() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [lessonForm, setLessonForm] = useState({ title: "", content: "" });
  const [lessonVideo, setLessonVideo] = useState(null);
  const [status, setStatus] = useState("");

  async function load() {
    const { data } = await api.get("/courses");
    setModules(data);
    if (!selectedModuleId && data.length > 0) setSelectedModuleId(data[0].id);
  }

  useEffect(() => {
    load();
  }, []);

  const selectedModule = modules.find((m) => m.id === selectedModuleId);

  async function handleAddLesson(e) {
    e.preventDefault();
    setStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("title", lessonForm.title);
      formData.append("content", lessonForm.content);
      if (lessonVideo) formData.append("video", lessonVideo);

      await api.post(`/admin/modules/${selectedModuleId}/lessons`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLessonForm({ title: "", content: "" });
      setLessonVideo(null);
      setStatus("✅ Lesson added");
      load();
    } catch (err) {
      setStatus("❌ " + (err.response?.data?.error || "Failed to add lesson"));
    }
  }

  async function handleDeleteLesson(lessonId) {
    if (!confirm("Delete this lesson?")) return;
    await api.delete(`/admin/lessons/${lessonId}`);
    setStatus("🗑️ Lesson deleted");
    load();
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-2">Lessons</h1>
      <p className="text-slate-custom mb-6">Pick a module, then add or remove its lessons.</p>
      {status && <p className="text-sm text-signal-dark mb-4">{status}</p>}

      <select
        value={selectedModuleId}
        onChange={(e) => setSelectedModuleId(e.target.value)}
        className="border border-ink/10 rounded-xl px-4 py-2.5 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-signal"
      >
        {modules.map((m) => (
          <option key={m.id} value={m.id}>
            {m.icon} {m.title}
          </option>
        ))}
      </select>

      {selectedModule && (
        <>
          {selectedModule.lessons.length > 0 && (
            <div className="space-y-2 mb-6">
              {selectedModule.lessons.map((l) => (
                <Card key={l.id} className="flex justify-between items-center py-3">
                  <span className="text-sm">
                    {l.title} {l.videoUrl && <span className="text-xs text-slate-custom">🎥</span>}
                  </span>
                  <button
                    onClick={() => handleDeleteLesson(l.id)}
                    className="text-red-500 hover:text-red-700 text-xs"
                  >
                    Delete
                  </button>
                </Card>
              ))}
            </div>
          )}

          <Card>
            <h2 className="font-display font-semibold text-lg mb-4">Add Lesson</h2>
            <form onSubmit={handleAddLesson} className="space-y-3">
              <input
                placeholder="Lesson title"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                className="w-full border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                required
              />
              <textarea
                placeholder="Lesson content"
                value={lessonForm.content}
                onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                rows={4}
                className="w-full border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                required
              />
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setLessonVideo(e.target.files[0])}
                className="w-full text-sm"
              />
              <button className="bg-signal text-ink px-5 py-2.5 rounded-full text-sm font-medium hover:bg-signal-dark transition">
                Add Lesson
              </button>
            </form>
          </Card>
        </>
      )}
    </div>
  );
}