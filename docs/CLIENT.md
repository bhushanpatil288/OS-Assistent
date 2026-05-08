# Client Documentation

> Technical reference for the OS Assistant frontend.

## Overview

The client is a **React 19** single-page application bootstrapped with **Vite 8** and written in **TypeScript 6**. It uses **Tailwind CSS v4** (via the `@tailwindcss/vite` plugin) for utility-first styling. It follows a **feature-sliced architecture** — UI is organized by domain feature rather than by technical role — making it easy to scale as new monitoring modules are added.

---

## Entry Points

### `index.html`

The Vite entry point. Contains a single `<div id="root">` mount point and loads `src/main.tsx` as an ES module.

### `main.tsx`

Renders the `<App />` component inside `<React.StrictMode>` and mounts it to the DOM.

### `App.tsx`

The root component. Wraps all content in a full-height dark-themed container (`bg-[#12121f]`) and renders the `DashboardPage`. Page imports use barrel exports from `pages/index.js` for cleaner import paths.

---

## Architecture

```
src/
├── api/           ← HTTP client functions (fetch wrappers)
├── components/    ← Shared, reusable UI components
├── features/      ← Feature-sliced modules (domain-scoped)
├── hooks/         ← Custom React hooks
├── layouts/       ← Page layout components (headers, sidebars)
├── pages/         ← Route-level page components + barrel exports
├── services/      ← Business logic / external integrations
├── store/         ← Redux Toolkit store & slices (planned)
├── types/         ← Shared TypeScript interfaces
└── utils/         ← Utility functions & constants
```

### Data Flow

```
DashboardPage
    └── SystemStats (feature component)
            └── useSystemStats (hook — polls every 2s)
                    └── fetchSystemStats (API layer)
                            └── fetch(`${BASE_URL}/api/system/stats`)
```

1. **Pages** compose one or more **feature components**.
2. **Feature components** use **custom hooks** for data fetching and state.
3. **Hooks** call **API functions** that handle HTTP communication.
4. **API functions** use the native `fetch` API with the configured base URL.

---

## Key Modules

### API Layer — `api/system.api.ts`

```typescript
fetchSystemStats(): Promise<SystemStats>
```

- Calls `GET /api/system/stats`.
- Throws on non-2xx responses with the HTTP status code.
- Returns typed `SystemStats` data.

Base URL is sourced from `utils/envConfig.ts`, which reads `VITE_BASE_URL` from the environment (defaults to `http://localhost:7070`).

### Custom Hook — `hooks/useSystemStats.ts`

```typescript
useSystemStats(pollInterval?: number): {
  stats: SystemStats | null;
  loading: boolean;
  error: string | null;
}
```

- Accepts an optional `pollInterval` in milliseconds (default: `2000`).
- Polls `fetchSystemStats()` at the given interval using `setInterval`.
- Uses a `cancelled` flag to prevent state updates after unmount.
- Clears the interval on cleanup to avoid memory leaks.
- Returns reactive state: loading indicators, data, and error messages.

**Implementation details:**

- `useState` manages three pieces of state: `stats`, `loading`, and `error`.
- `useEffect` runs on mount (and when `pollInterval` changes), immediately fetching data then setting up a repeating interval.
- On errors, gracefully captures the message via `instanceof Error` check.

### Feature Component — `features/system/SystemStats.tsx`

Renders a row of dark-themed stat cards showing real-time system metrics. Consumes data from `useSystemStats` and displays:

- **CPU Usage** — Current load percentage
- **Memory Used** — Active memory formatted in GB (via `formatBytes` helper)
- **Memory Total** — Total physical memory formatted in GB
- **Memory %** — Calculated percentage of active memory vs total

Includes a reusable `StatCard` sub-component styled with Tailwind CSS (`bg-[#1e1e2e]`, `rounded-xl`, etc.).

Handles three UI states:
- **Loading** — Shows a muted loading message.
- **Error** — Displays the error in red (`text-[#f87171]`).
- **Data** — Renders the stat card grid.

### Page — `pages/DashboardPage.tsx`

The main monitoring view. Renders a page title ("System Dashboard") and the `SystemStats` feature component inside a padded layout.

### Barrel Exports — `pages/index.js`

Re-exports all page components for clean import paths:

```typescript
import { DashboardPage } from "./pages";
```

---

## Type Definitions

### `SystemStats` — `types/system.types.ts`

```typescript
interface SystemStats {
  cpu: number;        // CPU load percentage (0–100)
  totalMemory: number; // Total physical memory in bytes
  usedMemory: number;  // Active memory in bytes (excludes buffers/cache)
}
```

This interface is the shared contract between the API layer, hooks, and UI components.

---

## Environment Variables

| Variable         | Default                    | Description                        |
| ---------------- | -------------------------- | ---------------------------------- |
| `VITE_BASE_URL`  | `http://localhost:7070`    | API server URL for fetch requests  |

> Vite requires the `VITE_` prefix to expose environment variables to client-side code.

---

## Dependencies

### Production

| Package             | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `react` ^19.2       | UI framework                                 |
| `react-dom` ^19.2   | React DOM renderer                           |
| `react-router-dom` ^7.15 | Client-side routing                     |
| `tailwindcss` ^4.2  | Utility-first CSS framework                  |
| `@tailwindcss/vite` ^4.2 | Tailwind CSS Vite plugin integration    |
| `@reduxjs/toolkit` ^2.11  | State management (planned)             |
| `axios` ^1.16       | HTTP client (available, currently using fetch)|

### Development

| Package                     | Purpose                                |
| --------------------------- | -------------------------------------- |
| `vite` ^8.0                 | Build tool & dev server                |
| `@vitejs/plugin-react`      | React Fast Refresh for Vite            |
| `typescript` ^6.0           | TypeScript compiler                    |
| `eslint` + plugins           | Linting & code quality                 |
| `@types/react`, `@types/react-dom` | Type definitions              |

---

## Scripts

| Command            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `npm run dev`      | Start Vite dev server with HMR                 |
| `npm run build`    | Type-check and build production bundle         |
| `npm run preview`  | Preview the production build locally           |
| `npm run lint`     | Run ESLint across the project                  |
