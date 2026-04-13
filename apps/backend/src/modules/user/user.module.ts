import type { FastifyInstance } from 'fastify'
import { UserRepository } from 'database'
import { UserService } from './user.service'
import { userRoute } from './user.route'
import { createLogger } from '@repo/logger'

export function createUserModule() {
  const repo = new UserRepository()
  const service = new UserService(repo)
  const logger = createLogger('user-module')
  return (app: FastifyInstance) => userRoute(app, { service, logger })
}
