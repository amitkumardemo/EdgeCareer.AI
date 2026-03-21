const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const userCount = await prisma.user.count();
    console.log("✅ Success! User count:", userCount);
    
    // Try to find a specific user if possible, or just a random one
    const firstUser = await prisma.user.findFirst({
        select: { id: true, role: true }
    });
    console.log("✅ First user found:", firstUser);
  } catch (e) {
    console.error("❌ Failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
