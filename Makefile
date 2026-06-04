.PHONY: dev up down build logs clean db-migrate db-deploy db-studio db-generate build-prod-backend build-prod-worker

COMPOSE ?= docker compose
SERVICE ?= backend

ifneq (,$(wildcard .env))
include .env
export
endif

dev:
	$(COMPOSE) watch

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

build:
	$(COMPOSE) build

build-prod-backend:
	docker build -f apps/backend/Dockerfile --target prod \
	  --build-arg DATABASE_URL="$(DATABASE_URL)" \
	  -t qiina-backend:prod .

build-prod-worker:
	docker build -f apps/worker/Dockerfile --target prod \
	  --build-arg DATABASE_URL="$(DATABASE_URL)" \
	  -t qiina-worker:prod .

logs:
	$(COMPOSE) logs -f

clean:
	$(COMPOSE) down -v --remove-orphans

db-migrate:
ifdef name
	$(COMPOSE) exec $(SERVICE) pnpm --filter database db:migrate -- --name $(name)
else
	$(COMPOSE) exec $(SERVICE) pnpm --filter database db:migrate
endif

db-deploy:
	$(COMPOSE) exec $(SERVICE) pnpm --filter database db:deploy

db-studio:
	$(COMPOSE) exec $(SERVICE) pnpm --filter database db:studio

db-generate:
	$(COMPOSE) exec $(SERVICE) pnpm --filter database db:generate
