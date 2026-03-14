const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getShareToken() {
    try {
        const resume = await prisma.resume.findFirst({
            where: {
                isPublic: true,
                shareToken: { not: null }
            }
        });

        if (resume) {
            console.log(`FOUND_TOKEN: ${resume.shareToken}`);
        } else {
            console.log("NO_PUBLIC_RESUME_FOUND");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

getShareToken();
