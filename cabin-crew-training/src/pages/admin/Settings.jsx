import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

const FIELDS = [
  { key: "payment_amount", label: "Enrollment Price (ETB)", type: "number" },
  { key: "telebirr_number", label: "Telebirr Number", type: "text" },
  { key: "telebirr_name", label: "Telebirr Account Name", type: "text" },
  { key: "cbe_account", label: "CBE Account Number", type: "text" },
  { key: "cbe_name", label: "CBE Account Name", type: "text" },
];

export default function Settings() {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      FIELDS.map((f) =>
        api.get(`/admin/settings/${f.key}`).then(({ data }) => [f.key, data.value || ""])
      )
    ).then((entries) => {
      setValues(Object.fromEntries(entries));
      setLoading(false);
    });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setStatus("Saving...");
    await Promise.all(
      FIELDS.map((f) => api.put(`/admin/settings/${f.key}`, { value: values[f.key] || "" }))
    );
    setStatus("✅ Settings updated");
  }

  if (loading) return <p className="text-slate-custom">Loading...</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-6">Settings</h1>
      <Card className="max-w-sm">
        <h2 className="font-display font-semibold text-lg mb-4">Payment Details</h2>
        <form onSubmit={handleSave} className="space-y-3">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
                {f.label.toUpperCase()}
              </label>
              <input
                type={f.type}
                value={values[f.key] || ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="w-full border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-signal"
              />
            </div>
          ))}
          <button className="bg-signal text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-signal-dark transition">
            Save
          </button>
        </form>
        {status && <p className="text-sm text-signal-dark mt-3">{status}</p>}
      </Card>
    </div>
  );
}