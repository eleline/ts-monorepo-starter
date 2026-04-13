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

export async function singletonWorker(jobs: WorkerJob<SingletonJobPayload>): Promise<void> {
  for (const job of jobs) {
    console.log(`[singleton] job=${job.id} key=${job.data.key}`);

    try {
      await processSingletonJob(job.data);
      console.log(`[singleton] job=${job.id} ✓ done`);
    } catch (err) {
      console.error(`[singleton] job=${job.id} ✗ failed`, err);
      throw err;
    }
  }
}

// ---------------------------------------------------------------------------
// Stub — replace with real implementation
async function processSingletonJob(_: SingletonJobPayload): Promise<void> {
  // implement logic here
  await new Promise((r) => setTimeout(r, 1000)); // simulate work
}

