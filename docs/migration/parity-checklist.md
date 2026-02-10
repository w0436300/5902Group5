# Streamlit → React Feature Parity Checklist

> Track migration progress page-by-page.
> Check each box when the React equivalent is implemented **and** passes acceptance criteria.

---

## Authentication & Session

- [ ] **Login / Register** — Users can register and log in with username + password.
  - _Acceptance:_ JWT token stored, auto-refresh on expiry, redirect to `/login` on 401.
- [ ] **Logout** — Clear session and redirect to login.
  - _Acceptance:_ Token removed, protected routes inaccessible.
- [ ] **Persistent State** — User state (goals, profile, caches) loads on login and saves automatically.
  - _Acceptance:_ Closing browser and reopening restores last state.

## Onboarding

- [ ] **Persona Selection** — Dropdown of 5 FSLSM personas with descriptions.
  - _Acceptance:_ Selected persona populates `learner_persona` and FSLSM dimensions.
- [ ] **PDF Upload** — Optional PDF for learner information.
  - _Acceptance:_ Extracted text appended to `learner_information`.
- [ ] **Learning Goal Entry** — Free-text learning goal input.
  - _Acceptance:_ Goal stored in `to_add_goal.learning_goal`.
- [ ] **AI Goal Refinement** — Button to refine goal via backend.
  - _Acceptance:_ Refined text displayed; user can accept or edit.

## Skill Gap Identification

- [ ] **Auto-Identify Gaps** — AI identifies skill gaps from goal + learner info.
  - _Acceptance:_ Skill cards rendered with gap/no-gap colour coding.
- [ ] **Edit Gaps** — Adjust required/current levels and gap toggles.
  - _Acceptance:_ Changes persisted and reflected in profile.
- [ ] **Schedule Learning Path** — Confirm gaps and trigger path scheduling.
  - _Acceptance:_ Learning path generated, navigation to Learning Path page.

## Goal Management

- [ ] **Add New Goal** — Create a new learning goal with optional AI refinement.
  - _Acceptance:_ Goal added to list with skill-gap identification dialog.
- [ ] **Edit Goal** — Modify learning goal text.
  - _Acceptance:_ Changes saved and reflected immediately.
- [ ] **Delete Goal** — Soft-delete a goal.
  - _Acceptance:_ Goal hidden from list (not destroyed).
- [ ] **Set Active Goal** — Switch between multiple goals.
  - _Acceptance:_ Learning path / profile update to reflect active goal.

## Learning Path

- [ ] **Session List** — Display ordered sessions with completion status.
  - _Acceptance:_ Completed sessions show green indicator, pending yellow.
- [ ] **Session Detail** — Expand to view abstract, associated skills, knowledge points.
  - _Acceptance:_ All fields from API rendered.
- [ ] **Mark Session Complete** — Toggle session completion.
  - _Acceptance:_ Overall progress recalculated.
- [ ] **Re-schedule Path** — Change session count and regenerate path.
  - _Acceptance:_ New path replaces old; progress reset for new sessions.
- [ ] **AI Path Evaluation** — Simulate feedback and refine path.
  - _Acceptance:_ Feedback metrics displayed; refined path replaces current.
- [ ] **Iterative Refinement** — Auto-refine N iterations.
  - _Acceptance:_ Progress indicator during iteration; final path displayed.

## Knowledge Document

- [ ] **4-Stage Generation** — Explore → Draft → Integrate → Generate Quizzes.
  - _Acceptance:_ Progress indicator for each stage; cached result reused on revisit.
- [ ] **Paginated Reader** — Section-based pagination with sidebar TOC.
  - _Acceptance:_ Clicking TOC item scrolls to section; page nav works.
- [ ] **Quizzes** — Single-choice, multi-choice, true/false, short answer.
  - _Acceptance:_ Answers collected; quiz section appears after content.
- [ ] **Content Feedback** — Star ratings (clarity, relevance, depth) + engagement face.
  - _Acceptance:_ Feedback submitted to backend on session completion.
- [ ] **Session Completion** — Complete session and update learner profile.
  - _Acceptance:_ Session marked learned; profile updated; redirect to Learning Path.

## Learner Profile

- [ ] **Profile View** — Display learner info, goal, cognitive status, preferences, patterns.
  - _Acceptance:_ All sections from Streamlit version present.
- [ ] **FSLSM Sliders** — Display (read-only) FSLSM dimension values.
  - _Acceptance:_ Values match backend data.
- [ ] **Profile Update** — Submit agreement, suggestions, additional info + PDF.
  - _Acceptance:_ Updated profile reflected immediately.
- [ ] **Restart Onboarding** — Reset and re-enter onboarding flow.
  - _Acceptance:_ Confirmation dialog; state reset; redirect to onboarding.

## Dashboard

- [ ] **Overall Progress** — Progress bar with percentage.
  - _Acceptance:_ Matches calculated value from active goal's sessions.
- [ ] **Proficiency Radar Chart** — Current vs required skill levels.
  - _Acceptance:_ Chart renders with correct axes and values.
- [ ] **Session Time Bar Chart** — Time spent per session.
  - _Acceptance:_ Bars correspond to tracked session durations.
- [ ] **Mastery Rate Line Chart** — Mastery rate over time.
  - _Acceptance:_ Line chart with 10-minute interval data points.

## Chatbot

- [ ] **Floating Button** — Bottom-right chat toggle.
  - _Acceptance:_ Visible on all protected pages; toggles chat panel.
- [ ] **Chat Interface** — Message history + input.
  - _Acceptance:_ Messages sent to `chat-with-tutor`; responses streamed/displayed.
- [ ] **Context Awareness** — Chatbot uses learner profile as context.
  - _Acceptance:_ Responses reference learner's goal and skill status.

## Cross-Cutting Concerns

- [ ] **Responsive Design** — Works on desktop and tablet viewports.
  - _Acceptance:_ No horizontal scroll on 768px+ screens.
- [ ] **Loading States** — Spinners / skeletons during API calls.
  - _Acceptance:_ Every API call shows loading indicator.
- [ ] **Error Handling** — Toast / banner for failed requests.
  - _Acceptance:_ User sees actionable error message; app does not crash.
- [ ] **Accessibility** — Keyboard navigation + ARIA labels.
  - _Acceptance:_ All interactive elements reachable via Tab; screen reader friendly.
- [ ] **E2E Tests** — Critical user flows covered.
  - _Acceptance:_ Login → Onboarding → Skill Gap → Learning Path happy path passes.
