import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutDemo } from "../auth";

const navLinks = [
  { to: "/resume-learning", label: "Resume Learning" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/data-example", label: "Data Example" },
];

export default function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutDemo();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* ── Top navigation bar ── */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* App name */}
          <span className="text-lg font-semibold tracking-tight text-indigo-600">
            GenMentor
          </span>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="ml-4 rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
