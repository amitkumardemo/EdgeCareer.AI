
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("No user found to test with");
      return;
    }
    console.log("Testing update with non-existent industry...");
    await prisma.user.update({
      where: { id: user.id },
      data: { industry: "non-existent-test-industry" }
    });
    console.log("Update successful! Relation is not strict on existing records.");
  } catch (e) {
    console.error("Update failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
