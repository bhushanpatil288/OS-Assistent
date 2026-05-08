<div align="center">

# 🖥️ OS Assistant

**A real-time operating system monitoring dashboard built with React and Node.js.**

Monitor CPU usage, memory consumption, and system health — all from your browser.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

OS Assistant is a lightweight, full-stack system monitoring tool that collects real-time hardware metrics from your machine and displays them through a clean web dashboard. The server leverages the [`systeminformation`](https://github.com/sebhildebrandt/systeminformation) library to gather OS-level data (CPU load, memory usage, etc.) and exposes it via a REST API. The React client consumes that API with automatic polling to keep the dashboard live.

## Features

- **Real-time CPU monitoring** — Current system load percentage, updated on a configurable polling interval.
- **Active memory tracking** — Total and actively used memory at a glance, with percentage calculation.
- **Live dashboard** — Dark-themed stat card UI with loading and error states.
- **REST API** — Clean, versioned API endpoints for programmatic access.
- **Live polling** — Client-side hook with configurable refresh interval (default: 2 seconds) and cleanup on unmount.
- **Modular architecture** — Feature-sliced frontend and module-based backend, designed to scale.
- **Tailwind CSS v4** — Utility-first styling with Vite plugin integration.

## Tech Stack

| Layer      | Technology                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------- |
| **Runtime**    | [Node.js](https://nodejs.org/) 22                                                                  |
| **Language**   | [TypeScript](https://www.typescriptlang.org/) 6                                                    |
| **Server**     | [Express](https://expressjs.com/) 5                                                                |
| **System Data**| [systeminformation](https://github.com/sebhildebrandt/systeminformation)                           |
| **Database**   | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) *(planned)*            |
| **Client**     | [React](https://react.dev/) 19 + [Vite](https://vite.dev/) 8                                      |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/) 4 (Vite plugin)                                           |
| **State**      | [Redux Toolkit](https://redux-toolkit.js.org/) *(planned)*                                         |
| **Routing**    | [React Router](https://reactrouter.com/) 7                                                        |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (React)                       │
│                                                             │
│  Pages ──► Features ──► Hooks ──► API Layer ──► fetch()     │
│                                                     │       │
└─────────────────────────────────────────────────────┼───────┘
                                                      │ HTTP
┌─────────────────────────────────────────────────────┼───────┐
│                     Server (Express)                │       │
│                                                     ▼       │
│  Routes ──► Controllers ──► Services ──► systeminformation  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Data flow:**

1. The React client calls `GET /api/system/stats` on a polling interval.
2. Express routes the request to `systemStatsController`.
3. The controller calls `getSystemStats()` in the service layer.
4. The service queries `systeminformation` for live CPU and memory data.
5. JSON response is returned to the client and rendered on the dashboard.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 22.x — [Download](https://nodejs.org/)
- **npm** ≥ 10.x (ships with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/os-assistant.git
cd os-assistant

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

#### Server (`server/.env`)

```env
PORT=7070
```

#### Client (`client/.env`)

```env
VITE_BASE_URL=http://localhost:7070
```

### Running the Project

Open **two terminal windows** from the project root:

```bash
# Terminal 1 — Start the API server
cd server
npm run dev
# ✔ Server is running on port 7070
```

```bash
# Terminal 2 — Start the React dev server
cd client
npm run dev
# ✔ Vite dev server at http://localhost:5173
```

> **Tip:** The server uses [`tsx watch`](https://github.com/privatenumber/tsx) for hot-reloading on file changes.

---

## Project Structure

```
os-assistant/
├── client/                     # React frontend (Vite + Tailwind CSS 4)
│   ├── src/
│   │   ├── api/                # API client functions
│   │   │   └── system.api.ts       # fetchSystemStats()
│   │   ├── components/         # Shared/reusable UI components
│   │   ├── features/           # Feature-sliced modules
│   │   │   └── system/
│   │   │       └── SystemStats.tsx  # Stat cards (CPU, Memory, Memory %)
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useSystemStats.ts   # Polling hook with cleanup
│   │   ├── layouts/            # Page layout wrappers
│   │   ├── pages/              # Route-level page components
│   │   │   ├── DashboardPage.tsx
│   │   │   └── index.js            # Barrel exports
│   │   ├── services/           # Business logic / external services
│   │   ├── store/              # Redux store (planned)
│   │   ├── types/              # Shared TypeScript interfaces
│   │   │   └── system.types.ts
│   │   ├── utils/              # Utility functions & config
│   │   │   └── envConfig.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css           # Tailwind CSS entry (@import "tailwindcss")
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── server/                     # Express backend
│   ├── src/
│   │   ├── ai/                 # AI integrations (planned)
│   │   ├── config/             # App configuration
│   │   ├── events/             # Event emitters / handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── modules/            # Feature modules
│   │   │   └── system/
│   │   │       ├── system.controller.ts
│   │   │       ├── system.routes.ts
│   │   │       ├── system.service.ts
│   │   │       ├── system.types.ts
│   │   │       └── system.validators.ts
│   │   ├── services/           # Shared services
│   │   ├── tools/              # CLI / utility tools
│   │   ├── types/              # Global type definitions
│   │   ├── utils/              # Helper functions
│   │   ├── app.ts              # Express app setup & middleware
│   │   └── server.ts           # Entry point — starts HTTP server
│   ├── tsconfig.json
│   └── package.json
│
├── shared/                     # Shared code between client & server
├── docs/                       # Documentation assets
├── scripts/                    # Build & deployment scripts
├── docker-compose.yml          # Docker orchestration (planned)
├── .gitignore
└── README.md
```

---

## API Reference

### System

#### `GET /api/system/stats`

Returns current CPU and memory statistics.

**Response** `200 OK`

```json
{
  "cpu": 12.45,
  "totalMemory": 16086261760,
  "usedMemory": 13789904896
}
```

| Field          | Type     | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| `cpu`          | `number` | Current CPU load as a percentage (0–100)            |
| `totalMemory`  | `number` | Total system memory in bytes                       |
| `usedMemory`   | `number` | Active memory in bytes (excludes buffers/cache)    |

---

## Roadmap

- [x] System stats API (CPU + active memory)
- [x] React client scaffold with feature-sliced architecture
- [x] Live polling hook (`useSystemStats`) with cleanup
- [x] Dashboard UI with stat cards (CPU, Memory Used, Memory Total, Memory %)
- [x] Tailwind CSS v4 integration with Vite plugin
- [x] Barrel exports for clean page imports
- [ ] Dashboard UI with real-time charts and graphs
- [ ] Disk usage monitoring
- [ ] Network stats (bandwidth, latency)
- [ ] Process list and management
- [ ] AI-powered system health recommendations
- [ ] Redux Toolkit state management
- [ ] WebSocket support for push-based updates
- [ ] Docker Compose for one-command deployment
- [ ] Authentication & multi-user support

---

## Contributing

Contributions are welcome! To get started:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a **Pull Request**

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.