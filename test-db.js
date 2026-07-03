const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const record = await prisma.offerLetter.findUnique({
    where: { applicationId: 'c0a75c9c-12b1-4d2a-a795-2c8d7d3c5bd5' }
  });
  console.log(record ? record.pdfUrl ? record.pdfUrl.substring(0, 50) + '...' : 'NULL pdfUrl' : 'NO RECORD');
}
main();
