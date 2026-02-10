import { useState } from "react";
import {
  skillGaps,
  learningSessions,
  learnerProfile,
  type SkillGap,
  type LearningSession,
} from "../data/dataExample";

type Tab = "skills" | "sessions" | "profile";

export default function DataExamplePreview() {
  const [activeTab, setActiveTab] = useState<Tab>("skills");
  const [selectedSkill, setSelectedSkill] = useState<SkillGap | null>(null);
  const [selectedSession, setSelectedSession] =
    useState<LearningSession | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: "skills", label: "Skill Gaps" },
    { id: "sessions", label: "Learning Path" },
    { id: "profile", label: "Learner Profile" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Data Example Preview
      </h1>
      <p className="text-gray-500 text-sm">
        Browse the mock data that will be replaced by real API responses in
        future PRs.
      </p>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTab(t.id);
              setSelectedSkill(null);
              setSelectedSession(null);
            }}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === t.id
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Skill Gaps tab ── */}
      {activeTab === "skills" && (
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* List */}
          <ul className="flex-1 space-y-3">
            {skillGaps.map((sg) => (
              <li
                key={sg.name}
                onClick={() => setSelectedSkill(sg)}
                className={`cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-md ${
                  selectedSkill?.name === sg.name
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{sg.name}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      sg.is_gap
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {sg.is_gap ? "Gap" : "No Gap"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {sg.current_level} → {sg.required_level}
                </p>
              </li>
            ))}
          </ul>

          {/* Detail panel */}
          {selectedSkill && (
            <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:w-80">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedSkill.name}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-500">Status</dt>
                  <dd
                    className={
                      selectedSkill.is_gap ? "text-red-600" : "text-green-600"
                    }
                  >
                    {selectedSkill.is_gap ? "Gap identified" : "No gap"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Current Level</dt>
                  <dd className="capitalize">{selectedSkill.current_level}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Required Level</dt>
                  <dd className="capitalize">
                    {selectedSkill.required_level}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Reason</dt>
                  <dd className="text-gray-700">{selectedSkill.reason}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      )}

      {/* ── Learning Path tab ── */}
      {activeTab === "sessions" && (
        <div className="flex flex-col gap-6 lg:flex-row">
          <ul className="flex-1 space-y-3">
            {learningSessions.map((s) => (
              <li
                key={s.id}
                onClick={() => setSelectedSession(s)}
                className={`cursor-pointer rounded-lg border p-4 transition-shadow hover:shadow-md ${
                  selectedSession?.id === s.id
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">
                    {s.id}: {s.title}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      s.if_learned
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {s.if_learned ? "Completed" : "Pending"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{s.abstract}</p>
              </li>
            ))}
          </ul>

          {selectedSession && (
            <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:w-96">
              <h2 className="text-lg font-semibold text-gray-800">
                {selectedSession.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {selectedSession.abstract}
              </p>

              <h3 className="mt-5 text-sm font-medium text-gray-500">
                Associated Skills
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {selectedSession.associated_skills.map((sk) => (
                  <span
                    key={sk}
                    className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
                  >
                    {sk}
                  </span>
                ))}
              </div>

              <h3 className="mt-5 text-sm font-medium text-gray-500">
                Knowledge Points
              </h3>
              <ul className="mt-1 space-y-1">
                {selectedSession.knowledge_points.map((kp) => (
                  <li
                    key={kp.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">{kp.name}</span>
                    <span className="text-xs capitalize text-gray-400">
                      {kp.complexity_level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Learner Profile tab ── */}
      {activeTab === "profile" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Info card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Learner Information
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {learnerProfile.learner_information}
            </p>
            <h3 className="mt-4 text-sm font-medium text-gray-500">
              Learning Goal
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              {learnerProfile.learning_goal}
            </p>
          </div>

          {/* Cognitive status */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Cognitive Status
            </h2>
            <div className="mt-3">
              <p className="text-sm text-gray-500">Overall Progress</p>
              <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-3 rounded-full bg-indigo-500 transition-all"
                  style={{
                    width: `${learnerProfile.cognitive_status.overall_progress}%`,
                  }}
                />
              </div>
              <p className="mt-0.5 text-right text-xs text-gray-400">
                {learnerProfile.cognitive_status.overall_progress}%
              </p>
            </div>

            <h3 className="mt-4 text-sm font-medium text-green-600">
              Mastered Skills
            </h3>
            <ul className="mt-1 space-y-1">
              {learnerProfile.cognitive_status.mastered_skills.map((ms) => (
                <li key={ms.name} className="text-sm text-gray-700">
                  {ms.name}{" "}
                  <span className="text-xs text-gray-400">
                    ({ms.proficiency_level})
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-4 text-sm font-medium text-amber-600">
              In-Progress Skills
            </h3>
            <ul className="mt-1 space-y-1">
              {learnerProfile.cognitive_status.in_progress_skills.map((ip) => (
                <li key={ip.name} className="text-sm text-gray-700">
                  {ip.name}{" "}
                  <span className="text-xs text-gray-400">
                    {ip.current_proficiency_level} →{" "}
                    {ip.required_proficiency_level}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning preferences */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Learning Preferences (FSLSM)
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(
                Object.entries(
                  learnerProfile.learning_preferences.fslsm_dimensions,
                ) as [string, number][]
              ).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs font-medium uppercase text-gray-500">
                    {key.replace("fslsm_", "")}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-indigo-400"
                        style={{
                          width: `${((value + 1) / 2) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {value.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              <strong>Content style:</strong>{" "}
              {learnerProfile.learning_preferences.content_style}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              <strong>Preferred activity:</strong>{" "}
              {learnerProfile.learning_preferences.preferred_activity}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
