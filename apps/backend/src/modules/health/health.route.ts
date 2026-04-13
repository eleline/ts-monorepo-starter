import type { FastifyInstance } from "fastify";
import { checkDbHealth } from "database";
import { checkBossHealth } from "@repo/queue";

export async function healthRoute(app: FastifyInstance) {
  app.get("/", async () => {
    const [db, boss] = await Promise.all([checkDbHealth(), checkBossHealth()]);
    const status = db && boss ? "ok" : "degraded";
    return { status, db, boss };
  });
}
