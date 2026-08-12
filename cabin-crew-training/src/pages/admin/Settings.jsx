import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

export default function Settings() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/admin/settings/payment_amount").then(({ data }) => {
      setAmount(data.value || "1500");
    });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    await api.put("/admin/settings/payment_amount", { value: amount });
    setStatus("✅ Price updated");
  }

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-6">Settings</h1>
      <Card className="max-w-sm">
        <h2 className="font-display font-semibold text-lg mb-4">Enrollment Price</h2>
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
              AMOUNT (ETB)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-signal"
              required
            />
          </div>
          <button className="bg-signal text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-signal-dark transition">
            Save
          </button>
        </form>
        {status && <p className="text-sm text-signal-dark mt-3">{status}</p>}
      </Card>
    </div>
  );
}