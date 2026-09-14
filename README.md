# Task API

A simple NestJS API for managing tasks. Tasks are stored in memory and reset when the app restarts.

## Setup

```bash
npm install
npm run start:dev
```

The API runs at `http://localhost:3003` by default. Set `PORT` to use a different port.

## Endpoints

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/tasks` | Create a task |
| `GET` | `/tasks` | List tasks |
| `GET` | `/tasks/:id` | Get one task |
| `PATCH` | `/tasks/:id/status` | Update task status |
| `DELETE` | `/tasks/:id` | Delete a task |

Supported statuses: `OPEN`, `IN_PROGRESS`, and `DONE`.

```bash
curl -X POST http://localhost:3003/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Read README","description":"Update project docs"}'

curl 'http://localhost:3003/tasks?status=OPEN'
curl 'http://localhost:3003/tasks?search=README'
```

## Commands

```bash
npm run build       # Build
npm run start:dev   # Development mode
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run lint        # Lint
```
