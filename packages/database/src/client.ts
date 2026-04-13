import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

declare global {

  var prismaGlobal: PrismaClient | undefined
}

const globalForPrisma = globalThis as typeof globalThis & { prismaGlobal?: PrismaClient }

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = globalForPrisma.prismaGlobal ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaGlobal = prisma
}

export { prisma as db }
