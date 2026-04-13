import { boss } from '../boss'
import { JOB_NAMES, type ScheduledJobPayload } from '@repo/types'

export async function dispatchScheduledJob(
  payload: ScheduledJobPayload,
): Promise<string | null> {
  return boss.send(JOB_NAMES.SCHEDULED, payload, {
    retryLimit: 2,
    retryDelay: 60,
    retryBackoff: true,
  })
}
