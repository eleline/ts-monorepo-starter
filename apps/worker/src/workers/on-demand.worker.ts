/**
 * PATTERN: On-demand job
 * Triggered explicitly by caller via dispatchOnDemandJob() → boss.send()
 * Options: retryLimit 3, retryBackoff true (30s → 60s → 120s)
 *
 * pg-boss delivers a batch of jobs per poll cycle.
 * Throw inside the loop to fail that job and trigger retry.
 */
import type { WorkerJob, OnDemandJobPayload } from '@repo/queue'
import { createLogger } from '@repo/logger'

const logger = createLogger('on-demand')

export const onDemandWorker = async (jobs: WorkerJob<OnDemandJobPayload>): Promise<void> => {
  for (const job of jobs) {
    try {
      logger.info({ jobId: job.id, message: job.data.message }, 'job started')
      await processOnDemandJob(job.data)
      logger.info({ jobId: job.id }, 'job done')
    }
    catch (err) {
      // Throwing causes pg-boss to mark this job as failed → retried
      logger.error({ jobId: job.id, err }, 'job failed, will retry')
      throw err
    }
  }
}

// ---------------------------------------------------------------------------
// Stub — replace with real implementation
const processOnDemandJob = async (_: OnDemandJobPayload): Promise<void> => {
  // implement logic here
  logger.info({ message: _.message }, 'processing job')
  await new Promise(r => setTimeout(r, 1000)) // simulate work
  logger.info({ message: _.message }, 'finished processing job')
}
