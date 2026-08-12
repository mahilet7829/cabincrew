import { useEffect, useState } from "react";
import api from "../../api/axios";
import Card from "../../components/common/Card";

const STATUS_STYLES = {
  APPROVED: "bg-signal/15 text-signal-dark",
  PENDING_PAYMENT: "bg-amber-50 text-amber-600",
  PENDING_APPROVAL: "bg-amber-50 text-amber-600",
  REJECTED: "bg-red-50 text-red-600",
};

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    api.get("/admin/users").then(({ data }) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "ALL" ? users : users.filter((u) => u.status === filter);

  const filterOptions = ["ALL", "APPROVED", "PENDING_PAYMENT", "PENDING_APPROVAL", "REJECTED"];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl mb-2">All Users</h1>
      <p className="text-slate-custom mb-5">{users.length} total accounts</p>

      <div className="flex gap-2 flex-wrap mb-6">
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-mono-label text-xs px-3 py-1.5 rounded-full transition ${
              filter === f ? "bg-ink text-paper" : "bg-ink/5 text-slate-custom hover:bg-ink/10"
            }`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      {loading && <p className="text-slate-custom">Loading...</p>}

      <div className="space-y-2">
        {filtered.map((u) => (
          <Card key={u.id} className="flex justify-between items-center py-3.5">
            <div>
              <p className="font-medium text-sm">
                {u.fullName}
                {u.role === "ADMIN" && (
                  <span className="ml-2 font-mono-label text-[10px] text-signal-dark bg-signal/15 px-1.5 py-0.5 rounded">
                    ADMIN
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-custom">{u.email}</p>
            </div>
            <span
              className={`font-mono-label text-[10px] px-2.5 py-1 rounded-full ${
                STATUS_STYLES[u.status] || "bg-ink/5 text-slate-custom"
              }`}
            >
              {u.status.replace("_", " ")}
            </span>
          </Card>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="text-slate-custom text-sm">No users match this filter.</p>
        )}
      </div>
    </div>
  );
}