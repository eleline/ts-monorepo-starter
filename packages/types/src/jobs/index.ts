export const JOB_NAMES = {
  ON_DEMAND: 'on-demand',
  SCHEDULED: 'scheduled',
  SINGLETON: 'singleton',
} as const

export type JobName = (typeof JOB_NAMES)[keyof typeof JOB_NAMES]

export type OnDemandJobPayload = {
  message: string
}

export type ScheduledJobPayload = {
  triggeredAt: string
}

export type SingletonJobPayload = {
  key: string
}
