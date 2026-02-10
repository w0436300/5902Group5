import Sidebar from "../components/Sidebar";

const featureCards = [
  {
    title: "Explore a Topic",
    description: "Learn about something new that interests you",
    icon: (
      <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    title: "Build a Practical Skill",
    description: "Develop concrete abilities you can apply",
    icon: (
      <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L3 12.38m3.32-2.31L9.64 6.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Solve a Specific Problem",
    description: "Get help with a particular challenge",
    icon: (
      <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Upload Your Resume (Optional)",
    description: "Upload Your Resume (Optional)",
    icon: (
      <svg className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
];

export default function ResumeLearning() {
  return (
    <div className="flex h-screen bg-cyan-50/40">
      {/* ── Sidebar ── */}
      <Sidebar />

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-16">
          {/* ── Hero ── */}
          <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900">
            Welcome to adaptive AI Tutor
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-gray-400">
            Your personal adaptive learning companion.
            <br />
            No setup required — we'll adapt to you as we go.
          </p>

          {/* ── Search / preference card ── */}
          <div className="mt-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60">
            <label
              htmlFor="learn-input"
              className="block text-sm font-medium text-gray-700"
            >
              What would you like to learn today?
            </label>
            <input
              id="learn-input"
              type="text"
              placeholder="eg : learn english, python, data ….."
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
            />

            {/* Status row */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {/* Lightbulb icon */}
                <svg
                  className="h-4 w-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zM10 18a3.001 3.001 0 01-2.83-2H7a1 1 0 110-2h6a1 1 0 110 2h-.17A3.001 3.001 0 0110 18zM7 8a3 3 0 116 0 3 3 0 01-6 0z" />
                </svg>
                <span>
                  Loaded Profile (auto): Engineering background – Getting started
                  – Prefers structured steps
                </span>
              </div>
              <button className="shrink-0 rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                Adjust Preference
              </button>
            </div>
          </div>

          {/* ── Feature cards ── */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {featureCards.map((card) => (
              <button
                key={card.title}
                className="flex items-start gap-4 rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-gray-200/60 transition hover:shadow-md hover:ring-gray-300 cursor-pointer"
              >
                <div className="mt-0.5 shrink-0">{card.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    {card.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="mt-10 flex justify-center">
            <button className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors cursor-pointer">
              Begin Learning
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
