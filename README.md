# NestJS Task Management API

A NestJS application built with TypeORM and PostgreSQL for task and auth workflows.

## Tech stack

- NestJS 12
- TypeORM
- PostgreSQL
- class-validator / class-transformer
- Vitest for tests

## Prerequisites

- Node.js 18+
- PostgreSQL running locally on `localhost:5432`
- Database: `task-management`
- Credentials: `postgres` / `postgres`

## Setup

```bash
npm install
npm run start:dev
```

The app starts on:

```text
http://localhost:3003
```

## Database config

The app initializes PostgreSQL in `src/app.module.ts` with TypeORM:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task-management',
  autoLoadEntities: true,
  synchronize: true,
})
```

## Current API

### Auth

#### `POST /auth/signup`
Create a new user.

Request body:

```json
{
  "username": "demoUser",
  "password": "StrongPass!123"
}
```

Validation rules:

- `username`: string, 4-20 chars
- `password`: string, 8-32 chars, must include uppercase, lowercase, and a number or special character

Duplicate usernames return a `409 Conflict` response.

#### `POST /auth/signin`
Authenticate an existing user and receive a JWT access token.

Request body:

```json
{
  "username": "demoUser",
  "password": "StrongPass!123"
}
```

Successful response:

```json
{
  "accessToken": "<jwt>"
}
```

Send the token on protected requests with the standard bearer header:

```text
Authorization: Bearer <jwt>
```

#### `DELETE /auth/deleteuser`
Delete an existing user after re-verifying credentials.

Request body:

```json
{
  "username": "demoUser",
  "password": "StrongPass!123"
}
```

Invalid credentials return a `401 Unauthorized` response.

### Tasks

All task routes require a valid JWT (`AuthGuard`). Each task is linked to the authenticated user that created it (`Task.user`, `User.tasks`), and every read/update/delete operation is scoped to the requesting user — tasks belonging to other users are not visible or modifiable.

- `GET /tasks` — list the current user's tasks, optionally filtered by `status` and `search`.
- `GET /tasks/:id` — fetch one of the current user's tasks by ID.
- `POST /tasks` — create a task owned by the current user.
- `PATCH /tasks/:id/status` — update the status of one of the current user's tasks.
- `DELETE /tasks/:id` — delete one of the current user's tasks.

Responses are serialized through a global `TransformInterceptor` (`src/transform.interceptor.ts`), which strips the `user` relation (marked `@Exclude` on `Task`) from task payloads.

Requests are logged via NestJS's built-in `Logger` in `TasksController` (per-action, including the acting user) and `TasksRepository` (errors from the `getTasks` query are logged and surfaced as a `500 Internal Server Error`).

## Project structure

```text
src/
  app.module.ts
  main.ts
  auth/
    auth.controller.ts
    auth.module.ts
    auth.service.ts
    user.entity.ts
    users.repository.ts
    jwt-interface.ts
    jwt-strategy.ts
    dto/
      auth.credential.dto.ts
  tasks/
    task.entity.ts
    task.model.ts
    tasks.controller.ts
    tasks.module.ts
    tasks.service.ts
    tasks.repository.ts
    dto/
      create-task.dto.ts
      get-task-filter.dto.ts
      update-task-status.dto.ts
```

## Useful commands

```bash
npm run start
npm run start:dev
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Notes

- The project is using PostgreSQL rather than in-memory task storage.
- Passwords are hashed with `bcrypt` before they are stored.
- The auth flow includes duplicate-user protection via PostgreSQL unique constraint handling.
- JWTs are signed with the configured NestJS `JwtModule` secret and validated through Passport JWT.
- The task API is still being expanded and may not yet expose all CRUD operations in the controller.
