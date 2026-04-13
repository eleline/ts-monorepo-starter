/**
 * PATTERN: Scheduled job
 * Triggered automatically by cron via boss.schedule('scheduled', '0 8 * * *')
 * Also triggerable on-demand via dispatchScheduledJob() from backend.
 *
 * pg-boss stores the schedule in the pgboss.schedule table and enqueues
 * the job automatically at each cron interval.
 */
import type { WorkerJob, ScheduledJobPayload } from "@repo/queue";
import { createLogger } from "@repo/logger";

const logger = createLogger("scheduled");

export const scheduledWorker = async (jobs: WorkerJob<ScheduledJobPayload>): Promise<void> => {
  for (const job of jobs) {
    try {
      logger.info({ jobId: job.id, triggeredAt: job.data.triggeredAt }, "job started");
      await processScheduledJob(job.data);
      logger.info({ jobId: job.id }, "job done");
    } catch (err) {
      logger.error({ jobId: job.id, err }, "job failed");
      throw err;
    }
  }
};

// ---------------------------------------------------------------------------
// Stub — replace with real implementation
const processScheduledJob = async (_: ScheduledJobPayload): Promise<void> => {
  // implement logic here
  logger.info({ triggeredAt: _.triggeredAt }, "processing job");
  await new Promise((r) => setTimeout(r, 500)); // simulate work
  logger.info({ triggeredAt: _.triggeredAt }, "finished processing job");
};

