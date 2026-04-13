import type { FastifyInstance } from 'fastify'
import {
  JOB_NAMES,
  dispatchOnDemandJob,
  dispatchScheduledJob,
  dispatchSingletonJob,
  type OnDemandJobPayload,
  type ScheduledJobPayload,
  type SingletonJobPayload,
} from '@repo/queue'

export async function jobsRoute(app: FastifyInstance) {
  app.post<{ Body: OnDemandJobPayload }>(`/${JOB_NAMES.ON_DEMAND}`, async (request, reply) => {
    const jobId = await dispatchOnDemandJob(request.body)
    return reply.code(202).send({ jobId })
  })

  app.post<{ Body: ScheduledJobPayload }>(`/${JOB_NAMES.SCHEDULED}`, async (request, reply) => {
    const jobId = await dispatchScheduledJob(request.body)
    return reply.code(202).send({ jobId })
  })

  app.post<{ Body: SingletonJobPayload }>(`/${JOB_NAMES.SINGLETON}`, async (request, reply) => {
    const jobId = await dispatchSingletonJob(request.body)
    // jobId is null when singleton prevents duplicate
    return reply.code(jobId ? 202 : 200).send({ jobId })
  })
}
