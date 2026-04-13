import PgBoss from "pg-boss";

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var bossGlobal: PgBoss | undefined;
}

const globalForBoss = globalThis as typeof globalThis & { bossGlobal?: PgBoss };

function createBoss(): PgBoss {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return new PgBoss(connectionString);
}

const boss = globalForBoss.bossGlobal ?? createBoss();

if (process.env.NODE_ENV !== "production") {
  globalForBoss.bossGlobal = boss;
}

export { boss };
