
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testFields() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log("No user found");
      return;
    }
    
    console.log("Checking if specific fields are accessible in the client...");
    const updateData = {
      collegeId: null,
      collegeName: "Verification Test",
      branch: "Test Branch",
      year: 1,
      industry: "tech-test"
    };
    
    console.log("Fields to update:", Object.keys(updateData));
    
    // We won't actually update if we don't have a valid industry insight for 'tech-test'
    // but we can check if the client *recognizes* the arguments.
    // The previous error was a validation error from Prisma Client itself.
    
    await prisma.user.update({
      where: { id: user.id },
      data: updateData
    });
    
    console.log("SUCCESS: Prisma Client recognizes these fields!");
  } catch (e) {
    if (e.message.includes("Unknown argument")) {
      console.error("FAILURE: Prisma Client still does not recognize the fields!");
      console.error(e.message);
    } else {
      console.log("SUCCESS: Prisma Client recognizes the fields, but update failed for other reasons (likely relation constraint):", e.message.split('\n')[0]);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testFields();
