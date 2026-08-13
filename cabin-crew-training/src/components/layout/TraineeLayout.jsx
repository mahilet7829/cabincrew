import { NavLink, Outlet } from "react-router-dom";

const TABS = [
  { to: "/dashboard", label: "Modules" },
  { to: "/lessons", label: "Lessons" },
  { to: "/quizzes", label: "Quizzes" },
];

export default function TraineeLayout() {
  return (
    <div>
      <div className="flex gap-2 mb-8 border-b border-ink/10">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `px-4 py-2.5 text-sm font-medium border-b-2 transition ${
                isActive
                  ? "border-signal text-ink"
                  : "border-transparent text-slate-custom hover:text-ink"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}