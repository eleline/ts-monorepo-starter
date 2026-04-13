import { db } from "./client";

export async function checkDbHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch (e) {
    console.error("Database health check failed:", e);
    return false;
  }
}
