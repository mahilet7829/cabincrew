import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

export default function ManageQuizzes() {
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], answer: 0 });
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

  async function handleAddQuestion(e) {
    e.preventDefault();
    await api.post(`/admin/modules/${selectedModuleId}/questions`, {
      question: form.question,
      options: form.options,
      answer: Number(form.answer),
    });
    setForm({ question: "", options: ["", "", "", ""], answer: 0 });
    setStatus("✅ Question added");
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-2">Quizzes</h1>
      <p className="text-slate-custom mb-6">Add quiz questions to a module.</p>
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
        <Card>
          <h2 className="font-display font-semibold text-lg mb-4">Add Question</h2>
          <form onSubmit={handleAddQuestion} className="space-y-3">
            <input
              placeholder="Question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
              required
            />
            {form.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={form.answer === i}
                  onChange={() => setForm({ ...form, answer: i })}
                />
                <input
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...form.options];
                    newOptions[i] = e.target.value;
                    setForm({ ...form, options: newOptions });
                  }}
                  className="flex-1 border border-ink/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
                  required
                />
              </div>
            ))}
            <p className="text-xs text-slate-custom">Select the radio button next to the correct answer.</p>
            <button className="bg-signal text-ink px-5 py-2.5 rounded-full text-sm font-medium hover:bg-signal-dark transition">
              Add Question
            </button>
          </form>
        </Card>
      )}
    </div>
  );
}