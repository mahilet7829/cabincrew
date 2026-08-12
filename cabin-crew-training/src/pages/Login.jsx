import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/common/Card";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh] items-center gap-8">
      {/* Left: airplane image, hidden on small screens */}
      <div className="hidden lg:block h-full">
        <div className="relative h-[70vh] rounded-3xl overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/76/b5/85/76b585fe32448eab9ff1ba6770756d6d.jpg"
            alt="Airplane in clear sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-paper">
            <p className="font-mono-label text-xs text-signal mb-1">CLEARED FOR TAKEOFF</p>
            <p className="font-display font-bold text-2xl">Your training starts here.</p>
          </div>
        </div>
      </div>

      {/* Right: form, pushed further right */}
      <div className="max-w-md w-full lg:ml-auto lg:mr-6">
        <span className="font-mono-label text-xs text-signal-dark bg-signal/15 px-2.5 py-1 rounded-full inline-block mb-4">
          WELCOME BACK
        </span>
        <Card>
          <h1 className="font-display font-bold text-2xl mb-6">Log In</h1>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-signal focus:border-transparent transition"
                required
              />
            </div>
            <div>
              <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
                PASSWORD
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-signal focus:border-transparent transition"
                required
              />
            </div>
            <button className="w-full bg-ink text-paper py-3 rounded-full font-medium hover:bg-ink/90 transition mt-2">
              Log In
            </button>
          </form>

          <p className="text-sm text-slate-custom mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-signal-dark font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}