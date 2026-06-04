# syntax=docker/dockerfile:1
# Build from repo root: docker build -f apps/backend/Dockerfile .

FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && corepack enable \
  && corepack prepare pnpm@10.19.0 --activate

WORKDIR /app

# -----------------------------------------------------------------------------
# Dev: full workspace install (pnpm-workspace.yaml picks up all packages)
# -----------------------------------------------------------------------------
FROM base AS dev

COPY . .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "--filter", "backend", "dev"]

# -----------------------------------------------------------------------------
# Build: compile TypeScript across the workspace
# -----------------------------------------------------------------------------
FROM dev AS build

ARG DATABASE_URL
RUN DATABASE_URL="${DATABASE_URL}" pnpm --filter database db:generate

RUN pnpm -r run build

# -----------------------------------------------------------------------------
# Prod: runtime (tsx required while workspace packages export .ts)
# -----------------------------------------------------------------------------
FROM base AS prod

ENV NODE_ENV=production

COPY --from=build /app /app

RUN npm install -g tsx@4.21.0 \
  && groupadd --system app \
  && useradd --system --gid app --create-home app \
  && chown -R app:app /app

USER app
WORKDIR /app

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["pnpm", "--filter", "backend", "exec", "tsx", "dist/server.js"]
