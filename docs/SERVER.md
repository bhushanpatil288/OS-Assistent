# Server Documentation

> Technical reference for the OS Assistant backend.

## Overview

The server is a **Node.js** application built with **Express 5** and **TypeScript 6**. It runs as an ES Module (`"type": "module"`) and uses [`tsx`](https://github.com/privatenumber/tsx) for development with hot-reloading. Its primary responsibility is to expose REST endpoints that return real-time system metrics collected via the [`systeminformation`](https://github.com/sebhildebrandt/systeminformation) library.

---

## Entry Points

### `server.ts`

The bootstrap file. Loads environment variables via `dotenv`, imports the configured Express app, and starts the HTTP server.

```
dotenv.config() → import app → app.listen(PORT)
```

### `app.ts`

Configures the Express application instance:

- Enables CORS for cross-origin requests from the client.
- Parses incoming JSON request bodies.
- Mounts module route handlers under their respective prefixes.

**Current route mounts:**

| Prefix           | Module  |
| ---------------- | ------- |
| `/api/system`    | System  |

---

## Module Pattern

Each feature is organized as a self-contained **module** inside `src/modules/<name>/`. Every module follows the same file convention:

| File                   | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `<name>.routes.ts`     | Express `Router` — defines HTTP endpoints.           |
| `<name>.controller.ts` | Request handlers — bridges HTTP and business logic.  |
| `<name>.service.ts`    | Core logic — data fetching, transformations.         |
| `<name>.types.ts`      | TypeScript interfaces and types for the module.      |
| `<name>.validators.ts` | Input validation schemas and middleware.              |

This separation of concerns keeps each layer independently testable and swappable.

---

## System Module

### Service — `system.service.ts`

Exports `getSystemStats()` which queries `systeminformation` for:

- **`currentLoad()`** → overall CPU load percentage.
- **`mem()`** → total and active physical memory (in bytes).

> **Note:** The service uses `memory.active` rather than `memory.used`. Active memory reflects memory currently in use by applications, excluding OS buffers and cached data, giving a more accurate picture of actual consumption.

Returns a plain object:

```typescript
{
  cpu: number;        // e.g. 12.45 (percentage)
  totalMemory: number; // e.g. 16086261760 (bytes)
  usedMemory: number;  // e.g. 6454640640 (bytes) — active memory, excludes buffers/cache
}
```

### Controller — `system.controller.ts`

`systemStatsController` is an async Express handler that:

1. Awaits `getSystemStats()`.
2. Returns the result as a JSON response.

### Routes — `system.routes.ts`

| Method | Path     | Handler                  | Description             |
| ------ | -------- | ------------------------ | ----------------------- |
| `GET`  | `/stats` | `systemStatsController`  | Fetch current system metrics |

> Mounted at `/api/system`, so the full path is `GET /api/system/stats`.

---

## Planned Directories

These directories exist in the structure and are reserved for future use:

| Directory       | Intended Purpose                                  |
| --------------- | ------------------------------------------------- |
| `src/ai/`       | AI model integrations (health analysis, anomaly detection) |
| `src/config/`   | Centralized configuration (database, third-party APIs)     |
| `src/events/`   | Event-driven architecture (WebSocket, SSE handlers)        |
| `src/middleware/`| Express middleware (auth, rate limiting, logging)           |
| `src/services/` | Shared services consumed across modules                    |
| `src/tools/`    | CLI utilities, scripts, and developer tools                |
| `src/types/`    | Global TypeScript type definitions                         |
| `src/utils/`    | General-purpose helper functions                           |

---

## TypeScript Configuration

Key compiler options (from `tsconfig.json`):

| Option                     | Value        | Why                                                        |
| -------------------------- | ------------ | ---------------------------------------------------------- |
| `module`                   | `nodenext`   | Full Node.js ESM support with `.js` import extensions.     |
| `target`                   | `esnext`     | Emit modern JS — no downleveling.                          |
| `strict`                   | `true`       | Enables all strict type-checking flags.                    |
| `verbatimModuleSyntax`     | `true`       | Enforces `import type` for type-only imports.              |
| `noUncheckedIndexedAccess` | `true`       | Index signatures include `undefined` — safer object access.|
| `exactOptionalPropertyTypes` | `true`     | Distinguishes `undefined` from missing properties.         |

> **Import convention:** Relative imports must use `.js` extensions (e.g., `./system.service.js`) even though source files are `.ts`. This is required by the `nodenext` module resolution strategy.

---

## Dependencies

### Production

| Package             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `express` ^5.2      | HTTP server framework                    |
| `cors` ^2.8         | Cross-Origin Resource Sharing middleware |
| `dotenv` ^17.4      | Environment variable management          |
| `mongoose` ^9.6     | MongoDB ODM (planned)                    |
| `systeminformation` ^5.31 | OS-level hardware/software metrics  |

### Development

| Package             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `tsx` ^4.21          | TypeScript execution with hot-reload     |
| `typescript` ^6.0    | TypeScript compiler                      |
| `@types/cors`        | Type definitions for cors                |
| `@types/express`     | Type definitions for Express             |
| `@types/node`        | Type definitions for Node.js             |

---

## Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Start development server with `tsx watch` (hot-reload) |
| `npm test`      | Run tests *(not yet configured)*                   |
