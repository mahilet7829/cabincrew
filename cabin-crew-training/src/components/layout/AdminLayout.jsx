import { NavLink, Outlet } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/admin/payments", label: "Pending Payments", icon: "💳" },
  { to: "/admin/courses", label: "Modules & Lessons", icon: "📚" },
  { to: "/admin/users", label: "All Users", icon: "👥" },
  { to: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout() {
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-8 -mx-4 md:mx-0">
      <aside className="bg-ink rounded-2xl p-5 md:sticky md:top-8 md:self-start">
        <span className="font-mono-label text-xs text-signal bg-signal/10 px-2.5 py-1 rounded-full inline-block mb-6">
          ADMIN CONSOLE
        </span>
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-signal text-ink shadow-[0_4px_16px_rgba(200,255,77,0.25)]"
                    : "text-paper/60 hover:bg-paper/5 hover:text-paper"
                }`
              }
            >
              <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-base shrink-0">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
}