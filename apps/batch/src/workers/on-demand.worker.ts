/**
 * PATTERN: On-demand job
 * Triggered explicitly by caller via dispatchOnDemandJob() → boss.send()
 * Options: retryLimit 3, retryBackoff true (30s → 60s → 120s)
 *
 * pg-boss delivers a batch of jobs per poll cycle.
 * Throw inside the loop to fail that job and trigger retry.
 */
import type { WorkerJob, OnDemandJobPayload } from "@repo/queue";

export async function onDemandWorker(jobs: WorkerJob<OnDemandJobPayload>): Promise<void> {
  for (const job of jobs) {
    console.log(`[on-demand] job=${job.id} message="${job.data.message}"`);

    try {
      await processOnDemandJob(job.data);
      console.log(`[on-demand] job=${job.id} ✓ done`);
    } catch (err) {
      // Throwing causes pg-boss to mark this job as failed → retried
      console.error(`[on-demand] job=${job.id} ✗ failed, will retry`, err);
      throw err;
    }
  }
}

// ---------------------------------------------------------------------------
// Stub — replace with real implementation
async function processOnDemandJob(_: OnDemandJobPayload): Promise<void> {
  // implement logic here
}

