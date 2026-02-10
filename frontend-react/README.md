# GenMentor — React Frontend

> New React-based frontend for GenMentor, replacing the Streamlit UI.
> **PR1 scope:** foundation scaffolding + demo login + mock data preview.

---

## Quick Start

```bash
cd frontend-react
npm install
npm run dev
```

Vite dev server starts at **http://localhost:5173** (default).

## Routes

| Route | Page | Auth Required |
|-------|------|---------------|
| `/login` | Login screen with "Demo account" button | No |
| `/dashboard` | Dashboard (placeholder) | Yes |
| `/data-example` | Data Example preview — mock skill gaps, learning path, learner profile | Yes |

Any unrecognised path redirects to `/login`.

## Demo Login

1. Visit `/login`.
2. Click **"Demo account"**.
3. This sets `localStorage.demoAuth = "true"` and navigates to `/dashboard`.
4. A **Logout** button in the top nav clears the key and returns to `/login`.

> There is no real authentication in PR1 — this is a client-side demo flag only.

## Mock Data

All mock data lives in:

```
src/data/dataExample.ts
```

It exports:
- `skillGaps` — array of `SkillGap` objects
- `learningSessions` — array of `LearningSession` objects
- `learnerProfile` — a `LearnerProfile` object

To edit mock data, modify the exported constants in that file. TypeScript interfaces are co-located for easy reference.

## Project Structure

```
frontend-react/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── public/
│   └── vite.svg
└── src/
    ├── main.tsx            ← React entry point
    ├── App.tsx             ← Route definitions
    ├── auth.ts             ← Demo auth helpers
    ├── index.css           ← Tailwind import
    ├── vite-env.d.ts
    ├── components/
    │   ├── AppLayout.tsx   ← Top nav + page outlet
    │   └── RequireAuth.tsx ← Route guard
    ├── data/
    │   └── dataExample.ts  ← Mock data + TS interfaces
    └── pages/
        ├── Login.tsx
        ├── Dashboard.tsx
        └── DataExamplePreview.tsx
```

## Tech Stack

- **Vite** — build tool
- **React 19** + **TypeScript**
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — client-side routing

## Migration Docs

See `docs/migration/` at the repo root:
- `streamlit-to-react.md` — full inventory of Streamlit pages, components, state, and API calls, plus proposed React route mapping and migration order.
- `parity-checklist.md` — checkbox tracker for feature-by-feature parity.
