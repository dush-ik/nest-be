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

### Tasks

The task module is scaffolded and connected to TypeORM entities. The project includes task routes and a task entity, but the current active implementation is still being built out.

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
- The auth flow includes duplicate-user protection via PostgreSQL unique constraint handling.
- The task API is still being expanded and may not yet expose all CRUD operations in the controller.
