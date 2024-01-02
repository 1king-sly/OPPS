import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = global.prisma || new PrismaClient();
  if (!global.prisma) global.prisma = prisma;
} else {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  prisma = new PrismaClient();
}

export default prisma;