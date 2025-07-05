import type { PrismaClient } from "@prisma/client"; // ✅ default path
const { PrismaClient } = require("@prisma/client"); // ✅ runtime-safe for Vercel

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
