import type PgBoss from "pg-boss";

/**
 * pg-boss v10 delivers jobs in batches — handlers receive an array.
 * Import this from @repo/queue instead of importing pg-boss directly.
 */
export type WorkerJob<T extends object> = PgBoss.Job<T>[];
