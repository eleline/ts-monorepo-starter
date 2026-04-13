import Fastify from 'fastify'
import { corsPlugin } from './plugins/cors.plugin'
import { sensiblePlugin } from './plugins/sensible.plugin'
import { healthRoute } from './modules/health/health.route'
import { createUserModule } from './modules/user/user.module'
import { jobsRoute } from './modules/jobs/jobs.route'

export function buildApp() {
  const app = Fastify({ logger: true })

  app.register(corsPlugin)
  app.register(sensiblePlugin)
  app.register(healthRoute, { prefix: '/health' })
  app.register(createUserModule(), { prefix: '/users' })

  // Job routes for dispatching jobs to worker. Not required for pg-boss to work, just an example of how you might trigger jobs from your app.
  app.register(jobsRoute, { prefix: '/jobs' })

  return app
}
