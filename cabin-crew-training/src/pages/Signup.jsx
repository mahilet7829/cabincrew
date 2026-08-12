import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/common/Card";

const FIELDS = [
  { name: "fullName", label: "FULL NAME", type: "text" },
  { name: "email", label: "EMAIL", type: "email" },
  { name: "phone", label: "PHONE", type: "text" },
  { name: "password", label: "PASSWORD", type: "password" },
];

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await signup(form);
      navigate("/payment");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh] items-center gap-8">
      {/* Left: airplane image, hidden on small screens */}
      <div className="hidden lg:block h-full">
        <div className="relative h-[70vh] rounded-3xl overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/12/50/e0/1250e06b3d2118e4f806da13a71e16cb.jpg"
            alt="Airplane in clear sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-paper">
            <p className="font-mono-label text-xs text-signal mb-1">BOARDING NOW</p>
            <p className="font-display font-bold text-2xl">Join the next cabin crew intake.</p>
          </div>
        </div>
      </div>

      {/* Right: form, pushed further right */}
      <div className="max-w-md w-full lg:ml-auto lg:mr-6">
        <span className="font-mono-label text-xs text-signal-dark bg-signal/15 px-2.5 py-1 rounded-full inline-block mb-4">
          STEP 1 OF 2 — ACCOUNT
        </span>
        <Card>
          <h1 className="font-display font-bold text-2xl mb-6">Create Account</h1>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {FIELDS.map((field) => (
              <div key={field.name}>
                <label className="font-mono-label text-xs text-slate-custom block mb-1.5">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full border border-ink/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-signal focus:border-transparent transition"
                  required
                />
              </div>
            ))}
            <button className="w-full bg-ink text-paper py-3 rounded-full font-medium hover:bg-ink/90 transition mt-2">
              Continue to Payment
            </button>
          </form>

          <p className="text-sm text-slate-custom mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-signal-dark font-medium hover:underline">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}