# API Reference

> Complete reference for all REST endpoints exposed by the OS Assistant server.

**Base URL:** `http://localhost:7070` (configurable via `PORT` env var)

---

## System

Endpoints for retrieving real-time operating system metrics.

### Get System Stats

```http
GET /api/system/stats
```

Returns the current CPU load and active memory usage of the host machine.

#### Request

No parameters, headers, or body required.

#### Response

**`200 OK`** — `application/json`

```json
{
  "cpu": 12.45,
  "totalMemory": 16086261760,
  "usedMemory": 13789904896
}
```

#### Response Fields

| Field         | Type     | Description                                    | Example            |
| ------------- | -------- | ---------------------------------------------- | ------------------ |
| `cpu`         | `number` | Aggregate CPU load across all cores (0–100 %)  | `12.45`            |
| `totalMemory` | `number` | Total installed physical RAM in bytes           | `16086261760` (≈15 GB) |
| `usedMemory`  | `number` | Active memory in bytes (excludes buffers/cache) | `6454640640` (≈6 GB) |

> **Note:** `usedMemory` reports **active** memory (`memory.active` from `systeminformation`), which reflects memory currently in use by applications. This is more accurate than `memory.used`, which includes OS buffers and cached data.

#### Example

```bash
curl http://localhost:7070/api/system/stats
```

```json
{
  "cpu": 5.62,
  "totalMemory": 16086261760,
  "usedMemory": 6454640640
}
```

#### Error Responses

| Status | Condition                | Body                                 |
| ------ | ------------------------ | ------------------------------------ |
| `500`  | `systeminformation` failure | `{ "error": "Internal Server Error" }` |

---

## Future Endpoints

The following endpoints are planned but not yet implemented:

| Method | Path                    | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| `GET`  | `/api/system/disk`      | Disk usage and partition info        |
| `GET`  | `/api/system/network`   | Network interfaces and bandwidth     |
| `GET`  | `/api/system/processes` | Running processes with resource usage|
| `GET`  | `/api/system/os`        | OS name, version, uptime             |
