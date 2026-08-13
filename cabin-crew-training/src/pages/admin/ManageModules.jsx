import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

export default function ManageModules() {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", icon: "📘" });
  const [status, setStatus] = useState("");

  async function load() {
    const { data } = await api.get("/courses");
    setModules(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    await api.post("/admin/modules", form);
    setForm({ title: "", description: "", icon: "📘" });
    setStatus("✅ Module created");
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this module and everything in it?")) return;
    await api.delete(`/admin/modules/${id}`);
    setStatus("🗑️ Module deleted");
    load();
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-2">Modules</h1>
      <p className="text-slate-custom mb-6">Create and manage training modules.</p>
      {status && <p className="text-sm text-signal-dark mb-4">{status}</p>}

      <Card className="mb-8">
        <h2 className="font-display font-semibold text-lg mb-4">New Module</h2>
        <form onSubmit={handleCreate} className="grid sm:grid-cols-[1fr_1fr_80px_auto] gap-3">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-ink/10 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-signal"
            required
          />
          <input
            placeholder="🛟"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="border border-ink/10 rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-signal"
          />
          <button className="bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-medium hover:bg-ink/90 transition whitespace-nowrap">
            Add
          </button>
        </form>
      </Card>

      <div className="space-y-2">
        {modules.map((mod) => (
          <Card key={mod.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mod.icon}</span>
              <div>
                <p className="font-display font-semibold">{mod.title}</p>
                <p className="text-sm text-slate-custom">{mod.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(mod.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}