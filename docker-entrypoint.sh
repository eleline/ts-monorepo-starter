#!/bin/sh
set -e

pnpm --filter database db:generate

exec "$@"
