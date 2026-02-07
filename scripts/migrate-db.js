const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting database migration...\n');

    // Step 1: Drop default constraints
    console.log('Step 1: Dropping default constraints...');
    try {
      await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN badges DROP DEFAULT`;
    } catch (e) {
      console.log('  - badges already has no default');
    }
    try {
      await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN skills DROP DEFAULT`;
    } catch (e) {
      console.log('  - skills already has no default');
    }

    // Step 2: Convert badges from array to text (JSON)
    console.log('Step 2: Converting badges array to JSON text...');
    await prisma.$executeRaw`
      ALTER TABLE "User" ALTER COLUMN badges TYPE TEXT USING 
        CASE 
          WHEN badges IS NULL THEN '[]'
          WHEN array_length(badges, 1) IS NULL THEN '[]'
          ELSE array_to_json(badges)::text
        END
    `;

    // Step 3: Update any remaining NULL badges
    console.log('Step 3: Updating NULL badges...');
    await prisma.$executeRaw`UPDATE "User" SET badges = '[]' WHERE badges IS NULL`;

    // Step 4: Set badges default and NOT NULL
    console.log('Step 4: Setting badges constraints...');
    await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN badges SET DEFAULT '[]'`;
    await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN badges SET NOT NULL`;

    // Step 5: Convert skills from array to text (JSON)
    console.log('Step 5: Converting skills array to JSON text...');
    await prisma.$executeRaw`
      ALTER TABLE "User" ALTER COLUMN skills TYPE TEXT USING 
        CASE 
          WHEN skills IS NULL THEN '[]'
          WHEN array_length(skills, 1) IS NULL THEN '[]'
          ELSE array_to_json(skills)::text
        END
    `;

    // Step 6: Update any remaining NULL skills
    console.log('Step 6: Updating NULL skills...');
    await prisma.$executeRaw`UPDATE "User" SET skills = '[]' WHERE skills IS NULL`;

    // Step 7: Set skills default and NOT NULL
    console.log('Step 7: Setting skills constraints...');
    await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN skills SET DEFAULT '[]'`;
    await prisma.$executeRaw`ALTER TABLE "User" ALTER COLUMN skills SET NOT NULL`;

    // Step 8: Add ATS columns
    console.log('Step 8: Adding ATS columns...');
    try {
      await prisma.$executeRaw`ALTER TABLE "User" ADD COLUMN "totalResumesAnalyzed" INTEGER NOT NULL DEFAULT 0`;
    } catch (e) {
      console.log('  - totalResumesAnalyzed already exists');
    }
    try {
      await prisma.$executeRaw`ALTER TABLE "User" ADD COLUMN "bestAtsScore" DOUBLE PRECISION`;
    } catch (e) {
      console.log('  - bestAtsScore already exists');
    }
    try {
      await prisma.$executeRaw`ALTER TABLE "User" ADD COLUMN "lastAtsScore" DOUBLE PRECISION`;
    } catch (e) {
      console.log('  - lastAtsScore already exists');
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
