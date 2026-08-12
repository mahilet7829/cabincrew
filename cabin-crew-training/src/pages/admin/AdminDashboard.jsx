import { Link } from "react-router-dom";
import Card from "../../components/common/Card";

export default function AdminDashboard() {
  return (
    <div>
      <span className="font-mono-label text-xs text-signal-dark bg-signal/15 px-2.5 py-1 rounded-full inline-block mb-4">
        ADMIN CONSOLE
      </span>
      <h1 className="font-display font-bold text-2xl mb-6">Admin</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/payments">
          <Card className="hover:shadow-md transition">
            <p className="font-display font-semibold text-lg mb-1">💳 Pending Payments</p>
            <p className="text-sm text-slate-custom">Review and approve receipts</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}