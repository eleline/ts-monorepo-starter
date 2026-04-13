# ── base: shared setup ────────────────────────────────────────────
FROM node:22-alpine AS base
RUN corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/database/package.json packages/database/
COPY packages/types/package.json packages/types/
COPY packages/queue/package.json packages/queue/
COPY apps/worker/package.json apps/worker/

# ── dev: hot-reload with tsx watch ────────────────────────────────
FROM base AS dev
RUN pnpm install --frozen-lockfile
COPY packages/ packages/
COPY apps/worker/ apps/worker/
WORKDIR /app/apps/worker
CMD ["pnpm", "dev"]

# ── builder: compile TypeScript ────────────────────────────────────
FROM base AS builder
RUN pnpm install --frozen-lockfile
COPY packages/ packages/
COPY apps/worker/ apps/worker/
WORKDIR /app/apps/worker
RUN pnpm build

# ── prod: minimal runtime image ────────────────────────────────────
FROM node:22-alpine AS prod
RUN corepack enable pnpm
WORKDIR /app

COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/pnpm-lock.yaml ./
COPY --from=builder /app/packages/database/package.json packages/database/
COPY --from=builder /app/packages/types/package.json packages/types/
COPY --from=builder /app/packages/queue/package.json packages/queue/
COPY --from=builder /app/apps/worker/package.json apps/worker/

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/packages/database/dist packages/database/dist
COPY --from=builder /app/packages/queue/dist packages/queue/dist
COPY --from=builder /app/apps/worker/dist apps/worker/dist

WORKDIR /app/apps/worker
CMD ["node", "dist/server.js"]
