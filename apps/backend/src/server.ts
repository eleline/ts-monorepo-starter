import "dotenv/config";
import { buildApp } from "./app.js";
import { boss } from "@repo/queue";
import { createLogger } from "@repo/logger";

const logger = createLogger("backend");
const app = buildApp();

try {
  await boss.start();
  await app.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });
} catch (err) {
  logger.error({ err }, "fatal startup error");
  process.exit(1);
}
