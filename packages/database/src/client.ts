import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var prismaGlobal: PrismaClient | undefined;
}

const globalForPrisma = globalThis as typeof globalThis & { prismaGlobal?: PrismaClient };

const connectionString = `${process.env.DATABASE_URL}`;

console.log(123123123, connectionString)

const adapter = new PrismaPg({ connectionString });
const prisma = globalForPrisma.prismaGlobal ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGlobal = prisma;
}

export { prisma as db };