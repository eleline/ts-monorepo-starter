import { createLogger } from '@repo/logger'
import { boss, JOB_NAMES } from '@repo/queue'
import type { WorkerJob } from '@repo/queue'

const logger = createLogger('workers')
import { onDemandWorker } from './on-demand.worker.js'
import { scheduledWorker } from './scheduled.worker.js'
import { singletonWorker } from './singleton.worker.js'

function withErrorLogging<T extends object>(
  name: string,
  handler: (jobs: WorkerJob<T>) => Promise<void>,
): (jobs: WorkerJob<T>) => Promise<void> {
  return async (jobs) => {
    try {
      await handler(jobs)
    }
    catch (err) {
      logger.error({ err }, `[${name}] Unhandled error in worker`)
      throw err
    }
  }
}

export const registerAllWorkers = async (): Promise<void> => {
  await boss.work(JOB_NAMES.ON_DEMAND, withErrorLogging(JOB_NAMES.ON_DEMAND, onDemandWorker))
  await boss.work(JOB_NAMES.SCHEDULED, withErrorLogging(JOB_NAMES.SCHEDULED, scheduledWorker))
  await boss.work(JOB_NAMES.SINGLETON, withErrorLogging(JOB_NAMES.SINGLETON, singletonWorker))

  logger.info('All workers registered')
}
