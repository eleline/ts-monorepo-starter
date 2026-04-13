import { boss } from "../boss";
import { JOB_NAMES, type SingletonJobPayload } from "@repo/types";

export async function dispatchSingletonJob(payload: SingletonJobPayload): Promise<string | null> {
  return boss.send(JOB_NAMES.SINGLETON, payload, {
    retryLimit: 5,
    retryDelay: 60,
    retryBackoff: true,
    singletonKey: "global-singleton",
  });
}
