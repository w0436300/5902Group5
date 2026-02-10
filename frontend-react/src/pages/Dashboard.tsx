export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500">
        This page will display learning analytics and progress visualizations
        once backend integration is complete.
      </p>

      {/* Placeholder cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Overall Progress",
            value: "—",
            note: "Requires backend",
          },
          {
            title: "Active Goal",
            value: "—",
            note: "Requires backend",
          },
          {
            title: "Sessions Completed",
            value: "—",
            note: "Requires backend",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-800">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-gray-400">{card.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
