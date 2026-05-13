# ── base: shared setup ────────────────────────────────────────────
FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/database/package.json packages/database/
COPY packages/types/package.json packages/types/
COPY packages/queue/package.json packages/queue/
COPY packages/logger/package.json packages/logger/
COPY apps/backend/package.json apps/backend/

# ── dev: hot-reload with tsx watch ────────────────────────────────
FROM base AS dev
RUN pnpm install --frozen-lockfile
COPY packages/ packages/
COPY apps/backend/ apps/backend/
WORKDIR /app/apps/backend
EXPOSE 3000
CMD ["pnpm", "dev"]

# ── builder: compile TypeScript ────────────────────────────────────
FROM base AS builder
RUN pnpm install --frozen-lockfile
COPY packages/ packages/
COPY apps/backend/ apps/backend/
WORKDIR /app
RUN pnpm --filter database db:generate
WORKDIR /app/apps/backend
RUN pnpm build

# ── prod: minimal runtime image ────────────────────────────────────
FROM node:22-alpine AS prod
RUN corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/database/package.json packages/database/
COPY packages/types/package.json packages/types/
COPY packages/queue/package.json packages/queue/
COPY packages/logger/package.json packages/logger/
COPY apps/backend/package.json apps/backend/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/packages/database/generated packages/database/generated
COPY --from=builder /app/apps/backend/dist apps/backend/dist
COPY packages/ packages/

WORKDIR /app/apps/backend
EXPOSE 3000
CMD ["node", "dist/server.js"]
