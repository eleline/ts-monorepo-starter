/**
 * PATTERN: Scheduled job
 * Triggered automatically by cron via boss.schedule('scheduled', '0 8 * * *')
 * Also triggerable on-demand via dispatchScheduledJob() from backend.
 *
 * pg-boss stores the schedule in the pgboss.schedule table and enqueues
 * the job automatically at each cron interval.
 */
import type { WorkerJob, ScheduledJobPayload } from "@repo/queue";

export async function scheduledWorker(jobs: WorkerJob<ScheduledJobPayload>): Promise<void> {
  for (const job of jobs) {
    console.log(`[scheduled] job=${job.id} triggeredAt=${job.data.triggeredAt}`);

    try {
      await processScheduledJob(job.data);
      console.log(`[scheduled] job=${job.id} ✓ done`);
    } catch (err) {
      console.error(`[scheduled] job=${job.id} ✗ failed`, err);
      throw err;
    }
  }
}

// ---------------------------------------------------------------------------
// Stub — replace with real implementation
async function processScheduledJob(_: ScheduledJobPayload): Promise<void> {
  // implement logic here
  await new Promise((r) => setTimeout(r, 500)); // simulate work
}

