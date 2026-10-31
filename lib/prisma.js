import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

// Ensure single reusable PrismaClient instance across all environments
// (including Next.js hot-reloads and container reuse) to prevent connection pool exhaustion
export const db = globalForPrisma.prisma || createPrismaClient();
export const prisma = db;

// Always preserve singleton in globalThis regardless of NODE_ENV
globalForPrisma.prisma = db;

export default db;


