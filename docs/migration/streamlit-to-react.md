# Streamlit → React Migration Roadmap

> **Auto-generated** by scanning the existing Streamlit frontend at `frontend/`.
> This document is read-only analysis — no Streamlit code was modified.

---

## 1. Streamlit Inventory

### 1.1 Entry Point

| File | Purpose |
|------|---------|
| `frontend/main.py` | App entry point. Initialises session state, manages authentication, configures sidebar navigation, renders the chatbot overlay, and tracks learning progress (mastery history, session timing). |

### 1.2 Pages

| Streamlit File | User Goal | Key UI Sections | Inputs | Outputs |
|----------------|-----------|-----------------|--------|---------|
| `pages/onboarding.py` | Collect learner info & set initial learning goal | Persona selector, PDF uploader, learning-goal text area, AI refinement button | Persona dropdown, PDF file, text fields, goal text | `to_add_goal` session state, navigation to Skill Gap |
| `pages/skill_gap.py` | Review and confirm AI-identified skill gaps | Skill cards (colour-coded), required/current level pills, gap toggles, analysis expander | Proficiency level adjustments, gap toggles | Updated `skill_gaps`, new `learner_profile`, navigation to Learning Path |
| `pages/learning_path.py` | View learning path, track progress, reschedule/refine sessions | Overall progress bar, skill details, session cards, re-schedule expander, AI evaluation panel | Session completion toggles, re-schedule count, feedback simulation trigger | Updated `learning_path`, navigation to Knowledge Document |
| `pages/knowledge_document.py` | Read learning content, take quizzes, complete sessions | 4-stage content preparation, paginated markdown viewer, sidebar TOC, quiz forms, feedback form | Page navigation, quiz answers, content feedback (star ratings) | Cached learning document, updated learner profile, session completion |
| `pages/learner_profile.py` | View and update learner profile | Learner info display, cognitive status, FSLSM sliders, behavioural patterns, additional info form | Agreement rating, suggestions, additional info text/PDF, update button | Updated `learner_profile` |
| `pages/goal_management.py` | Add/edit/delete learning goals, set active goal | New goal form with AI refinement, existing goal cards with progress sliders, skill gap dialog | Goal text, AI refine trigger, edit/delete/set-active actions | Modified `goals` list |
| `pages/dashboard.py` | View learning analytics | Overall progress bar, proficiency radar chart (Plotly), session time bar chart, mastery line chart | None (read-only) | Visualisations only |

### 1.3 Components

| Component File | Purpose | Session State Keys |
|----------------|---------|-------------------|
| `components/topbar.py` | Top bar with settings dialog and login/logout | `logged_in`, `userId`, `backend_endpoint`, `available_models`, `checked_backend` |
| `components/chatbot.py` | Floating chatbot button + dialog | `tutor_messages`, `llm_type`, `show_chatbot` |
| `components/gap_identification.py` | Skill gap identification spinner + result cards | Modifies `goal["skill_gaps"]` |
| `components/goal_refinement.py` | AI-powered goal refinement button | `if_refining_learning_goal`, `refined_learning_goal` |
| `components/skill_info.py` | Mastered/in-progress skill cards (pure display) | None |
| `components/navigation.py` | Sidebar navigation menu (legacy, unused in main.py) | `selected_page` |
| `components/session_completion.py` | Session completion button (legacy, unused) | `selected_page`, `session_learning_times` |
| `components/time_tracking.py` | Track session learning start time | `session_learning_times` |

### 1.4 Utilities

| Utility File | Purpose |
|-------------|---------|
| `utils/state.py` | Session state init, persistence (load/save/delete via REST), goal CRUD helpers, debounced save |
| `utils/request_api.py` | Central API client — 22 backend endpoints (see §3 below) |
| `utils/backend.py` | Simple POST wrapper (largely unused) |
| `utils/format.py` | Markdown document assembly from knowledge points |
| `utils/pdf.py` | PDF text extraction wrapper |
| `utils/personas.py` | FSLSM persona definitions (5 personas) |
| `utils/style.py` | Streamlit CSS injection |
| `utils/color.py` | Empty placeholder |

### 1.5 Static / Mock Data

| File | Data Shape |
|------|------------|
| `assets/data_example/skill_gap.json` | `{ skill_gaps: [{ name, is_gap, required_level, current_level, reason, level_confidence }] }` |
| `assets/data_example/learning_path.json` | `{ learning_path: [{ id, title, abstract, if_learned, associated_skills, knowledge_points, desired_outcome_when_completed }] }` |
| `assets/data_example/learner_profile.json` | `{ learner_profile: { learner_information, learning_goal, cognitive_status, learning_preferences, behavioral_patterns } }` |
| `assets/data_example/knowledge_document.json` | `{ article_title, content (markdown), quizzes }` |
| `assets/data_example/learning_document.json` | `{ title, content (markdown) }` |

---

## 2. Session State Mapping

### 2.1 Persisted Keys (saved to backend via `/user-state`)

```
if_complete_onboarding  sample_number  logged_in  show_chatbot
llm_type  tutor_messages  goals  learner_information
learner_information_pdf  learner_information_text  learner_persona
if_refining_learning_goal  if_rescheduling_learning_path
if_updating_learner_profile  selected_goal_id  selected_session_id
selected_point_id  to_add_goal  learned_skills_history  userId
document_caches  session_learning_times  path_feedback_cache
if_simulating_feedback  if_refining_path
```

### 2.2 React State Strategy

| Streamlit Pattern | React Equivalent |
|-------------------|------------------|
| `st.session_state` (persisted keys) | React Context + `useReducer` → sync to backend via REST (future PR) |
| `st.session_state` (transient UI keys) | Component-local `useState` |
| `st.rerun()` | React re-render (automatic) |
| `st.cache_data` | React Query / SWR cache (future PR) |
| `st.query_params` | React Router `useSearchParams` |

---

## 3. Backend Endpoints Called

| API Name | Endpoint Path | Used By |
|----------|--------------|---------|
| `auth_register` | `POST auth/register` | topbar.py |
| `auth_login` | `POST auth/login` | topbar.py |
| `chat_with_tutor` | `POST chat-with-tutor` | chatbot.py |
| `refine_goal` | `POST refine-learning-goal` | goal_refinement.py, onboarding.py, goal_management.py |
| `identify_skill_gap` | `POST identify-skill-gap-with-info` | gap_identification.py, skill_gap.py, goal_management.py |
| `create_profile` | `POST create-learner-profile-with-info` | skill_gap.py, learner_profile.py, goal_management.py |
| `update_profile` | `POST update-learner-profile` | knowledge_document.py, learner_profile.py |
| `schedule_path` | `POST schedule-learning-path` | learning_path.py |
| `reschedule_path` | `POST reschedule-learning-path` | learning_path.py |
| `explore_knowledge_points` | `POST explore-knowledge-points` | knowledge_document.py |
| `draft_knowledge_points` | `POST draft-knowledge-points` | knowledge_document.py |
| `integrate_learning_document` | `POST integrate-learning-document` | knowledge_document.py |
| `generate_document_quizzes` | `POST generate-document-quizzes` | knowledge_document.py |
| `simulate_path_feedback` | `POST simulate-path-feedback` | learning_path.py |
| `refine_path` | `POST refine-learning-path` | learning_path.py |
| `iterative_refine_path` | `POST iterative-refine-path` | learning_path.py |
| `get_user_state` | `GET user-state/{user_id}` | state.py |
| `save_user_state` | `PUT user-state/{user_id}` | state.py |
| `delete_user_state` | `DELETE user-state/{user_id}` | state.py |
| `get_available_models` | `GET available-models` | topbar.py |

> **Note:** Additional draft/explore endpoints exist (`draft-knowledge-point`, `explore-knowledge-perspectives`, `draft-point-perspectives`, `tailor-learning-content`) but appear to be legacy or used conditionally.

---

## 4. Proposed React Route Mapping

| Streamlit Page | React Route | Priority | Notes |
|----------------|-------------|----------|-------|
| Login (topbar.py) | `/login` | P0 – PR1 | Demo auth only; real JWT auth in later PR |
| Dashboard | `/dashboard` | P0 – PR1 | Placeholder in PR1; charts in future PR |
| Onboarding | `/onboarding` | P1 | First real user flow; persona + goal entry |
| Skill Gap | `/onboarding/skill-gap` | P1 | Continuation of onboarding flow |
| Goal Management | `/goals` | P2 | CRUD for goals; depends on skill-gap integration |
| Learning Path | `/goals/:goalId/path` | P2 | Session list + scheduling |
| Knowledge Document | `/goals/:goalId/path/:sessionId/document` | P3 | Most complex page (4-stage generation, paginated reader, quizzes) |
| Learner Profile | `/profile` | P3 | Profile view + update form |
| Chatbot | Floating overlay (all routes) | P3 | Independent widget |

---

## 5. Suggested Migration Order

### Phase 1 — Foundation (PR1, this PR)
- [x] Vite + React + TypeScript scaffold
- [x] Tailwind CSS configuration
- [x] React Router with demo auth guard
- [x] Placeholder pages (Login, Dashboard, Data Example)
- [x] Mock data file mirroring Streamlit data shapes

### Phase 2 — Auth & State (PR2)
- Real JWT authentication (register / login / token refresh)
- Global state management (React Context + `useReducer`)
- Persistence layer wired to `GET/PUT/DELETE /user-state`
- Protected route refinement (token-based, not localStorage)

### Phase 3 — Onboarding Flow (PR3)
- Onboarding page: persona selector, PDF upload, goal entry
- AI goal refinement integration (`POST refine-learning-goal`)
- Skill gap page: gap identification UI + backend call
- Learner profile creation on skill-gap confirmation

### Phase 4 — Goal Management & Learning Path (PR4)
- Goal Management page: CRUD operations, active goal switching
- Learning Path page: session list, progress tracking
- Schedule / reschedule integration
- Path feedback simulation + refinement

### Phase 5 — Knowledge Document & Quizzes (PR5)
- 4-stage content generation pipeline
- Paginated markdown reader with sidebar TOC
- Quiz renderer (single-choice, multi-choice, T/F, short answer)
- Session completion + learner profile update
- Content feedback form

### Phase 6 — Profile, Dashboard & Chatbot (PR6)
- Learner Profile view + update form
- Dashboard with charts (Recharts or similar)
- Floating chatbot widget
- Time tracking and mastery history

### Phase 7 — Polish & Parity (PR7)
- Responsive design audit
- Accessibility audit (keyboard nav, ARIA labels)
- Error handling & loading states for all API calls
- E2E tests (Playwright or Cypress)
- Feature-flag toggle between Streamlit and React

---

## 6. Data Models Inferred from Streamlit Code

### Goal
```ts
interface Goal {
  id: string;                  // UUID
  learning_goal: string;
  skill_gaps: SkillGap[];
  learner_profile: LearnerProfile | null;
  learning_path: LearningSession[];
  is_completed: boolean;
  is_deleted: boolean;
}
```

### SkillGap
```ts
interface SkillGap {
  name: string;
  is_gap: boolean;
  required_level: "unlearned" | "beginner" | "intermediate" | "advanced";
  current_level: "unlearned" | "beginner" | "intermediate" | "advanced";
  reason: string;
  level_confidence: string;
}
```

### LearningSession
```ts
interface LearningSession {
  id: string;               // e.g. "Session 1"
  title: string;
  abstract: string;
  if_learned: boolean;
  associated_skills: string[];
  knowledge_points: KnowledgePoint[];
  desired_outcome_when_completed: { name: string; level: string }[];
}
```

### KnowledgePoint
```ts
interface KnowledgePoint {
  name: string;
  complexity_level: "beginner" | "intermediate" | "advanced";
}
```

### LearnerProfile
```ts
interface LearnerProfile {
  learner_information: string;
  learning_goal: string;
  cognitive_status: {
    overall_progress: number;            // 0–100
    mastered_skills: MasteredSkill[];
    in_progress_skills: InProgressSkill[];
    additional_notes: string;
  };
  learning_preferences: {
    fslsm_dimensions: {
      fslsm_processing: number;          // –1.0 to 1.0
      fslsm_perception: number;
      fslsm_input: number;
      fslsm_understanding: number;
    };
    additional_notes: string;
  };
  behavioral_patterns: {
    system_usage_frequency: string;
    session_duration_engagement: string;
    motivational_triggers: string;
    additional_notes: string;
  };
}
```

### Persona (FSLSM)
```ts
interface Persona {
  description: string;
  fslsm_dimensions: {
    processing: number;
    perception: number;
    input: number;
    understanding: number;
  };
}
// Predefined: "Hands-on Explorer", "Reflective Reader",
//             "Visual Learner", "Conceptual Thinker", "Balanced Learner"
```

### KnowledgeDocument
```ts
interface KnowledgeDocument {
  article_title: string;
  content: string;           // Markdown
  quizzes: {
    single_choice_questions: Quiz[];
    multiple_choice_questions: Quiz[];
    true_false_questions: Quiz[];
    short_answer_questions: Quiz[];
  };
}
```

---

## 7. Key Considerations

1. **No Streamlit code changes** — the existing frontend remains untouched and operational throughout migration.
2. **Mock-first development** — each React page should work against local mock data before wiring to real API.
3. **Shared types** — define TypeScript interfaces in `src/types/` early so all pages share consistent models.
4. **API client layer** — create a single `src/api/` module mirroring `utils/request_api.py`; swap mock ↔ real via env flag.
5. **State persistence** — the Streamlit app uses server-side debounced save; React should use optimistic updates with background sync.
6. **Complex pages** — `knowledge_document.py` is by far the most complex page (4-stage generation, pagination, JS injection, quizzes). Plan extra time for this.
7. **Plotly → Recharts** — Dashboard uses Plotly for charts; Recharts (or Chart.js) is lighter for React.
8. **PDF upload** — `onboarding.py` and `learner_profile.py` accept PDF uploads; use a React file input + FormData POST.
