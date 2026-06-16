import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

prisma.$on('error', (event) => {
  console.error('Prisma client error:', event);
});

export default prisma;
