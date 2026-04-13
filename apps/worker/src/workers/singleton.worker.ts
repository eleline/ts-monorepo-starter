/**
 * PATTERN: Singleton job
 * Only ONE instance of this job can be queued or active at any time.
 * Triggered on-demand via dispatchSingletonJob() or by cron via boss.schedule().
 * Options: singletonKey='global-singleton' — any duplicate send() returns null.
 *
 * Spam-safe: calling dispatchSingletonJob() 10 times rapidly still results in
 * at most 1 queued job. boss.send() returns null for the duplicates.
 */
import type { WorkerJob, SingletonJobPayload } from "@repo/queue";
import { createLogger } from "@repo/logger";

const logger = createLogger("singleton");

export const singletonWorker = async (jobs: WorkerJob<SingletonJobPayload>): Promise<void> => {
  for (const job of jobs) {
    try {
      logger.info({ jobId: job.id, key: job.data.key }, "job started");
      await processSingletonJob(job.data);
      logger.info({ jobId: job.id }, "job done");
    } catch (err) {
      logger.error({ jobId: job.id, err }, "job failed");
      throw err;
    }
  }
};

// ---------------------------------------------------------------------------
// Stub — replace with real implementation
const processSingletonJob = async (_: SingletonJobPayload): Promise<void> => {
  // implement logic here
  logger.info({ key: _.key }, "processing job");
  await new Promise((r) => setTimeout(r, 1000)); // simulate work
  logger.info({ key: _.key }, "finished processing job");
};

