import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

export default function PendingPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actingOn, setActingOn] = useState(null);

  async function load() {
    setLoading(true);
    const { data } = await api.get("/admin/payments/pending");
    setPayments(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleApprove(id) {
    setActingOn(id);
    await api.post(`/admin/payments/${id}/approve`);
    await load();
    setActingOn(null);
  }

  async function handleReject(id) {
    setActingOn(id);
    await api.post(`/admin/payments/${id}/reject`);
    await load();
    setActingOn(null);
  }

  return (
    <div>
      
      <h1 className="font-display font-bold text-2xl mb-6">Pending Payments</h1>

      {loading && <p className="text-slate-custom">Loading...</p>}

      {!loading && payments.length === 0 && (
        <Card>
          <p className="text-slate-custom">No pending payments right now.</p>
        </Card>
      )}

      <div className="space-y-3">
        {payments.map((p) => (
          <Card key={p.id} className="flex justify-between items-center">
            <div>
              <p className="font-display font-semibold">{p.user.fullName}</p>
              <p className="text-sm text-slate-custom">{p.user.email} · {p.user.phone}</p>
              <p className="font-mono-label text-xs text-slate-custom mt-1">
                {p.method} · {p.amount} ETB · {new Date(p.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-slate-custom mt-1 italic">
                Check the receipt photo sent to your Telegram to verify before approving.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <button
                onClick={() => handleApprove(p.id)}
                disabled={actingOn === p.id}
                className="bg-signal text-ink px-4 py-2 rounded-full text-sm font-medium hover:bg-signal-dark transition disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(p.id)}
                disabled={actingOn === p.id}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-100 transition disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}