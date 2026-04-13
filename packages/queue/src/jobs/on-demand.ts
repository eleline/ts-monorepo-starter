import { boss } from "../boss";
import { JOB_NAMES, type OnDemandJobPayload } from "@repo/types";

export async function dispatchOnDemandJob(payload: OnDemandJobPayload): Promise<string | null> {
  return boss.send(JOB_NAMES.ON_DEMAND, payload, {
    retryLimit: 3,
    retryDelay: 30,
    retryBackoff: true,
  });
}
