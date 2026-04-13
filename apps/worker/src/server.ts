import 'dotenv/config'
import { boss, JOB_NAMES } from '@repo/queue'
import { createLogger } from '@repo/logger'
import { registerAllWorkers } from './workers/index'
import { registerSchedules } from './scheduler'

const logger = createLogger('worker')

const createQueues = async () => {
  for (const name of Object.values(JOB_NAMES)) {
    await boss.createQueue(name)
  }
  logger.info({ queues: Object.values(JOB_NAMES) }, 'queues created')
}

const start = async () => {
  logger.info('starting pg-boss')
  await boss.start()
  logger.info('pg-boss started')

  await createQueues()
  await registerSchedules()
  await registerAllWorkers()

  logger.info('worker process ready')
}

const stop = async () => {
  logger.info('shutting down')
  await boss.stop()
  logger.info('stopped')
  process.exit(0)
}

process.on('SIGTERM', stop)
process.on('SIGINT', stop)

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'uncaught exception')
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'unhandled rejection')
  process.exit(1)
})

boss.on('error', err => logger.error({ err }, 'pg-boss internal error'))

start().catch((err) => {
  logger.error({ err }, 'fatal startup error')
  process.exit(1)
})
