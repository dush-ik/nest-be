# Nest Task API

Small NestJS app for managing tasks in memory.

## Run

```bash
npm install
npm run start:dev
```

The app runs on `http://localhost:3003` by default.

## Routes

- `GET /tasks` — get all tasks or filter with `status` and `search`
- `GET /tasks/:id` — get a task by id
- `POST /tasks` — create a task
- `PATCH /tasks/:id/status` — update a task status
- `DELETE /tasks/:id` — delete a task

## Task shape

```json
{
  "id": "uuid",
  "title": "Task title",
  "description": "Task description",
  "status": "OPEN"
}
```

Valid status values:

- `OPEN`
- `IN_PROGRESS`
- `DONE`

## Examples

```bash
curl http://localhost:3003/tasks

curl -X POST http://localhost:3003/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title":"Read README","description":"Update project docs"}'

curl 'http://localhost:3003/tasks?status=OPEN'
curl 'http://localhost:3003/tasks?search=README'

curl -X PATCH http://localhost:3003/tasks/<id>/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"DONE"}'
```

## Commands

```bash
npm run start
npm run start:dev
npm run build
npm run test
npm run test:e2e
npm run lint
```

Tasks are stored in memory only, so they reset when the server restarts.
