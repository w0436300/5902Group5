import { useNavigate } from "react-router-dom";
import { isDemoAuthed, loginDemo } from "../auth";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  // If already authed, jump straight to dashboard
  useEffect(() => {
    if (isDemoAuthed()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  function handleDemoLogin() {
    loginDemo();
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo / heading */}
        <h1 className="text-center text-2xl font-bold tracking-tight text-indigo-600">
          GenMentor
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          AI-Powered Learning Companion
        </p>

        <hr className="my-6 border-gray-200" />

        {/* Demo login */}
        <button
          onClick={handleDemoLogin}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors cursor-pointer"
        >
          Demo account
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Click above to explore the app with sample data.
          <br />
          No credentials required.
        </p>
      </div>
    </div>
  );
}
