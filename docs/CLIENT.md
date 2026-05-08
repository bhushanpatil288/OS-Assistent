# Client Documentation

> Technical reference for the OS Assistant frontend.

## Overview

The client is a **React 19** single-page application bootstrapped with **Vite 8** and written in **TypeScript 6**. It follows a **feature-sliced architecture** — UI is organized by domain feature rather than by technical role — making it easy to scale as new monitoring modules are added.

---

## Entry Points

### `index.html`

The Vite entry point. Contains a single `<div id="root">` mount point and loads `src/main.tsx` as an ES module.

### `main.tsx`

Renders the `<App />` component inside `<React.StrictMode>` and mounts it to the DOM.

### `App.tsx`

The root component. Currently serves as the top-level shell; this is where routing and layout wrappers will be integrated.

---

## Architecture

```
src/
├── api/           ← HTTP client functions (fetch wrappers)
├── components/    ← Shared, reusable UI components
├── features/      ← Feature-sliced modules (domain-scoped)
├── hooks/         ← Custom React hooks
├── layouts/       ← Page layout components (headers, sidebars)
├── pages/         ← Route-level page components
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
- Polls `fetchSystemStats()` at the given interval.
- Returns reactive state: loading indicators, data, and error messages.

> **Status:** Hook signature and interface are defined; polling implementation is in progress.

### Feature Component — `features/system/SystemStats.tsx`

Responsible for rendering the system metrics dashboard card. Consumes data from `useSystemStats` and displays CPU and memory stats.

> **Status:** Component shell created; UI implementation in progress.

### Page — `pages/DashboardPage.tsx`

The main monitoring view. Composes `SystemStats` and future feature components into a unified dashboard layout.

> **Status:** Component shell created; layout implementation in progress.

---

## Type Definitions

### `SystemStats` — `types/system.types.ts`

```typescript
interface SystemStats {
  cpu: number;        // CPU load percentage (0–100)
  totalMemory: number; // Total physical memory in bytes
  usedMemory: number;  // Used physical memory in bytes
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
