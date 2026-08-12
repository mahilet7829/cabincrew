import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

export default function ManageCourses() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const [moduleForm, setModuleForm] = useState({ title: "", description: "", icon: "📘" });
  const [lessonForm, setLessonForm] = useState({ title: "", content: "" });
  const [lessonVideo, setLessonVideo] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: 0,
  });
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await api.get("/courses");
    setModules(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreateModule(e) {
    e.preventDefault();
    await api.post("/admin/modules", moduleForm);
    setModuleForm({ title: "", description: "", icon: "📘" });
    setStatus("✅ Module created");
    load();
  }

  async function handleDeleteModule(moduleId) {
    if (!confirm("Delete this module and everything in it? This can't be undone.")) return;
    await api.delete(`/admin/modules/${moduleId}`);
    setStatus("🗑️ Module deleted");
    load();
  }

  async function handleAddLesson(e, moduleId) {
    e.preventDefault();
    setStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("title", lessonForm.title);
      formData.append("content", lessonForm.content);
      if (lessonVideo) formData.append("video", lessonVideo);

      await api.post(`/admin/modules/${moduleId}/lessons`, formData, {
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

  async function handleAddQuestion(e, moduleId) {
    e.preventDefault();
    await api.post(`/admin/modules/${moduleId}/questions`, {
      question: questionForm.question,
      options: questionForm.options,
      answer: Number(questionForm.answer),
    });
    setQuestionForm({ question: "", options: ["", "", "", ""], answer: 0 });
    setStatus("✅ Quiz question added");
    load();
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-2">Modules & Lessons</h1>
      <p className="text-slate-custom mb-6">Add, edit, and remove training content.</p>
      {status && <p className="text-sm text-signal-dark mb-4">{status}</p>}

      <Card className="mb-8">
        <h2 className="font-display font-semibold text-lg mb-4">New Module</h2>
        <form onSubmit={handleCreateModule} className="grid sm:grid-cols-[1fr_1fr_80px_auto] gap-3">
          <input
            placeholder="Title"
            value={moduleForm.title}
            onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
            className="border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
            required
          />
          <input
            placeholder="Description"
            value={moduleForm.description}
            onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
            className="border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
            required
          />
          <input
            placeholder="🛟"
            value={moduleForm.icon}
            onChange={(e) => setModuleForm({ ...moduleForm, icon: e.target.value })}
            className="border border-ink/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-signal"
          />
          <button className="bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink/90 transition whitespace-nowrap">
            Add Module
          </button>
        </form>
      </Card>

      {loading && <p className="text-slate-custom">Loading...</p>}

      <div className="space-y-3">
        {modules.map((mod) => (
          <Card key={mod.id}>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <span className="text-2xl">{mod.icon}</span>
                <div>
                  <p className="font-display font-semibold">{mod.title}</p>
                  <p className="font-mono-label text-xs text-slate-custom">
                    {mod.lessons.length} LESSON{mod.lessons.length !== 1 ? "S" : ""}
                  </p>
                </div>
              </button>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleDeleteModule(mod.id)}
                  className="text-red-500 hover:text-red-700 text-sm transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
                  className="text-slate-custom text-sm"
                >
                  {expandedId === mod.id ? "▲ Collapse" : "▼ Manage"}
                </button>
              </div>
            </div>

            {expandedId === mod.id && (
              <div className="mt-5 pt-5 border-t border-ink/10 space-y-6">
                {mod.lessons.length > 0 && (
                  <div>
                    <p className="font-mono-label text-xs text-slate-custom mb-2">EXISTING LESSONS</p>
                    <ul className="space-y-1">
                      {mod.lessons.map((l) => (
                        <li
                          key={l.id}
                          className="text-sm bg-paper rounded-lg px-3 py-2 flex justify-between items-center"
                        >
                          <span>
                            {l.title} {l.videoUrl && <span className="text-xs text-slate-custom">🎥</span>}
                          </span>
                          <button
                            onClick={() => handleDeleteLesson(l.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={(e) => handleAddLesson(e, mod.id)} className="space-y-2">
                  <p className="font-mono-label text-xs text-slate-custom">ADD LESSON</p>
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
                    rows={3}
                    className="w-full border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                    required
                  />
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setLessonVideo(e.target.files[0])}
                    className="w-full text-sm"
                  />
                  <button className="bg-signal text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-signal-dark transition">
                    Add Lesson
                  </button>
                </form>

                <form onSubmit={(e) => handleAddQuestion(e, mod.id)} className="space-y-2">
                  <p className="font-mono-label text-xs text-slate-custom">ADD QUIZ QUESTION</p>
                  <input
                    placeholder="Question"
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    className="w-full border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                    required
                  />
                  {questionForm.options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${mod.id}`}
                        checked={Number(questionForm.answer) === i}
                        onChange={() => setQuestionForm({ ...questionForm, answer: i })}
                        title="Mark as correct answer"
                      />
                      <input
                        placeholder={`Option ${i + 1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...questionForm.options];
                          newOptions[i] = e.target.value;
                          setQuestionForm({ ...questionForm, options: newOptions });
                        }}
                        className="flex-1 border border-ink/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                        required
                      />
                    </div>
                  ))}
                  <p className="text-xs text-slate-custom">Select the radio button next to the correct answer.</p>
                  <button className="bg-signal text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-signal-dark transition">
                    Add Question
                  </button>
                </form>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}