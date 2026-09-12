import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient(): PrismaClient {
  let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';

  // In Vercel / AWS Lambda environment, the /var/task filesystem is read-only.
  // We copy the seeded SQLite db to /tmp/dev.db where SQLite has full read & write permissions.
  if (process.env.VERCEL) {
    try {
      const tmpDir = '/tmp';
      const tmpDb = path.join(tmpDir, 'dev.db');

      if (!fs.existsSync(tmpDb)) {
        const possibleLocations = [
          path.join(process.cwd(), 'prisma', 'dev.db'),
          path.join(process.cwd(), 'dev.db'),
          path.join('/var/task', 'prisma', 'dev.db'),
          path.join('/var/task', 'dev.db'),
        ];

        let found = false;
        for (const loc of possibleLocations) {
          if (fs.existsSync(loc)) {
            fs.copyFileSync(loc, tmpDb);
            found = true;
            break;
          }
        }

        if (!found) {
          console.warn('Prisma: dev.db not found in bundle, creating empty /tmp/dev.db');
          fs.writeFileSync(tmpDb, '');
        }
      }

      dbUrl = 'file:' + tmpDb;
    } catch (e) {
      console.error('Prisma serverless setup error:', e);
    }
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

