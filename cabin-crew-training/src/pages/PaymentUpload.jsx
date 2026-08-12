import { useState, useEffect } from "react";
import api from "../api/axios";
import Card from "../components/common/Card";

export default function PaymentUpload() {
  const [method, setMethod] = useState("TELEBIRR");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    api.get("/settings/payment_amount").then(({ data }) => {
      setAmount(data.value || "1500"); // fallback if not set yet
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("method", method);
    formData.append("amount", amount);
    formData.append("receipt", file);

    try {
      await api.post("/payments/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("✅ Receipt submitted. Your account will be approved shortly.");
    } catch (err) {
      setStatus("❌ " + (err.response?.data?.error || "Upload failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16">
      <span className="font-mono-label text-xs text-signal-dark bg-signal/15 px-2.5 py-1 rounded-full inline-block mb-4">
        STEP 2 OF 2 — PAYMENT
      </span>
      <Card>
        <h1 className="font-display font-bold text-2xl mb-2">Complete Payment</h1>
        <p className="text-sm text-slate-custom mb-6">
          Pay via Telebirr or CBE, then upload your receipt screenshot below.
        </p>

        <div className="bg-ink rounded-2xl px-5 py-4 mb-6 flex justify-between items-center">
          <span className="font-mono-label text-xs text-paper/60">AMOUNT DUE</span>
          <span className="font-display font-bold text-2xl text-signal">
            {amount ? `${Number(amount).toLocaleString()} ETB` : "..."}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
              PAYMENT METHOD
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-signal focus:border-transparent transition"
            >
              <option value="TELEBIRR">Telebirr</option>
              <option value="CBE">CBE</option>
            </select>
          </div>

          <div>
            <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
              RECEIPT SCREENSHOT
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm"
              required
            />
          </div>

          <button
            disabled={submitting || !amount}
            className="w-full bg-ink text-paper py-3 rounded-full font-medium hover:bg-ink/90 transition mt-2 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Receipt"}
          </button>
        </form>

        {status && <p className="text-sm mt-4">{status}</p>}
      </Card>
    </div>
  );
}