import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import prisma from '../src/db.js';

dotenv.config();

const ADMIN_EMAIL = process.env.EMAIL_ADMIN;
const ADMIN_PASSWORD = process.env.PASSWORD_ADMIN;
const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_PROVIDER = process.env.DATABASE_PROVIDER;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET || !DATABASE_URL || !DATABASE_PROVIDER) {
  throw new Error(
    'Les variables d environnement EMAIL_ADMIN, PASSWORD_ADMIN, JWT_SECRET, DATABASE_PROVIDER et DATABASE_URL doivent être définies dans backend/.env'
  );
}

async function main() {
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password: hashedPassword,
      name: 'Admin',
      bio: 'Mon micro-site dynamique',
    },
    create: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
      name: 'Admin',
      bio: 'Mon micro-site dynamique',
    },
  });
  console.log('Admin initialisé avec', ADMIN_EMAIL);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
