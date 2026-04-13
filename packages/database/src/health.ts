import { createLogger } from '@repo/logger'
import { db } from './client'

const logger = createLogger('database')

export async function checkDbHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  }
  catch (e) {
    logger.error({ err: e }, 'Database health check failed')
    return false
  }
}
