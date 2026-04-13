# monorepo-prisma

A TypeScript monorepo template for building scalable Node.js backends with a REST API, background job processing, and a shared package architecture.

## Overview

This project demonstrates a production-ready monorepo setup with two applications and four shared packages:

- **`apps/backend`** — Fastify REST API exposing CRUD, health check
- **`apps/worker`** — Dedicated pg-boss worker process handling background jobs
- **`packages/database`** — Prisma client and migrations (shared by both apps)
- **`packages/queue`** — pg-boss abstraction layer with typed job definitions
- **`packages/logger`** — Centralized Pino logger (nodejs only)
- **`packages/types`** — Shared TypeScript types and job payload definitions

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | TypeScript 6.x (ES modules) |
| Package manager | pnpm 10.x workspaces |
| API framework | Fastify 5.x |
| Database | PostgreSQL 18 + Prisma ORM 7.x |
| Job queue | pg-boss 10.x |
| Logging | Pino 9.x |
| Containers | Docker & Docker Compose |
| Dev runtime | tsx (hot-reload) |

## Prerequisites

- [Node.js](https://nodejs.org) 22+
- [pnpm](https://pnpm.io) 10+
- [Docker](https://www.docker.com) & Docker Compose

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

Create a `.env` file at the root of the project:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mydb
PORT=3000
```

### 3. Start with Docker Compose

The easiest way to run the full stack locally:

```bash
docker compose up
```

This starts:

- **PostgreSQL 18** on port `5432`
- **backend** API on port `3000`
- **worker** background process

Both app containers use volume mounts for hot-reload during development.

### 4. Run database migrations

```bash
pnpm --filter database db:migrate
```

## Development

Run all apps in development mode (outside of Docker):

```bash
pnpm dev
```

Or target a specific app:

```bash
pnpm --filter backend dev
pnpm --filter worker dev
```

## Project Structure

```text
.
├── apps/
│   ├── backend/          # Fastify REST API
│   └── worker/           # pg-boss worker process
└── packages/
    ├── database/         # Prisma client & migrations
    ├── queue/            # pg-boss wrapper & job types
    ├── logger/           # Pino logger factory
    └── types/            # Shared TypeScript types
```

## Database

Schema is managed via Prisma. Common commands:

```bash
# Generate Prisma client
pnpm --filter database db:generate

# Run migrations (dev)
pnpm --filter database db:migrate

# Apply migrations (production)
pnpm --filter database db:deploy

# Open Prisma Studio
pnpm --filter database db:studio
```

## Building

```bash
pnpm build
```

Compiles all packages and apps via TypeScript project references.

> [!NOTE]
> pg-boss stores job state in PostgreSQL, so both the API and the worker must share the same `DATABASE_URL`.
