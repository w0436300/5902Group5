import { NavLink, useNavigate } from "react-router-dom";
import { logoutDemo } from "../auth";

const navItems = [
  {
    to: "/resume-learning",
    label: "Resume Learning",
    badge: "24",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: "/dashboard",
    label: "Learning Path",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    to: "#",
    label: "My Profile",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    to: "/data-example",
    label: "Analytics Dashboard",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutDemo();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* ── Brand ── */}
      <div className="px-5 pt-6 pb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Mail
        </span>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, badge, icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {icon}
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-indigo-100 px-1.5 text-xs font-semibold text-indigo-700">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Divider ── */}
      <hr className="mx-4 border-gray-200" />

      {/* ── Account card ── */}
      <div className="px-4 py-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <p className="text-xs text-gray-500">Logged in as</p>
          <p className="mt-0.5 truncate text-sm font-medium text-gray-800">
            demo@genmentor.ai
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <button
              onClick={handleLogout}
              className="font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer"
            >
              Logout
            </button>
            <button className="font-medium text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Switch Account
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
