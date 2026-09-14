# Nest Task API

Small NestJS project for CRUD-style task management.

## Run it

```bash
npm install
npm run start:dev
```

API runs on `http://localhost:3003` by default.

## Routes

- `GET /tasks` — list all tasks
- `GET /tasks/:id` — get a task by id
- `POST /tasks` — create a task
- `PATCH /tasks/:id/status` — update task status
- `DELETE /tasks/:id` — delete a task

Supported task statuses:

- `OPEN`
- `IN_PROGRESS`
- `DONE`

## Examples

```bash
curl http://localhost:3003/tasks

curl -X POST http://localhost:3003/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Read README","description":"Update docs"}'

curl 'http://localhost:3003/tasks?status=OPEN'
curl 'http://localhost:3003/tasks?search=README'
```

## Useful commands

```bash
npm run build
npm run test
npm run test:e2e
npm run lint
```

This app stores tasks in memory, so data resets when the server restarts.
