import { boss, JOB_NAMES } from "@repo/queue";

export const registerSchedules = async (): Promise<void> => {
  // Scheduled job: runs daily at 08:00 UTC
  await boss.schedule(JOB_NAMES.SCHEDULED, "0 8 * * *", {
    triggeredAt: new Date().toISOString(),
  });

  // Singleton job: runs every hour — global dedup prevents overlapping runs
  await boss.schedule(JOB_NAMES.SINGLETON, "0 * * * *", {
    key: "hourly-singleton",
  });

  console.log("[scheduler] Schedules registered");
};
