const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function makeAdmin() {
  try {
    const user = await prisma.user.findFirst({
        orderBy: { createdAt: 'asc' } 
    });
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' }
      });
      console.log(`Successfully set ${user.name || user.email} to ADMIN`);
    } else {
      console.log('No users found in database');
    }
  } catch(e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
makeAdmin();
