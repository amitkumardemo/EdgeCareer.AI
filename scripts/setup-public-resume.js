const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function setupPublicResume() {
    try {
        // 1. Find a user
        const user = await prisma.user.findFirst();
        if (!user) {
            console.log("NO_USER_FOUND");
            return;
        }
        console.log(`Using User: ${user.id} (${user.email})`);

        // 2. Find a resume for this user
        let resume = await prisma.resume.findFirst({
            where: { userId: user.id }
        });

        if (!resume) {
            console.log("No resume found, creating one...");
            resume = await prisma.resume.create({
                data: {
                    userId: user.id,
                    name: "Verify Resume",
                    content: JSON.stringify({
                        contactInfo: { name: "Test User", email: "test@example.com" },
                        summary: "This is a test resume for verification.",
                        education: [],
                        experience: [],
                        skills: "React, Node.js, Prisma",
                        projects: []
                    }),
                    status: "draft"
                }
            });
        }

        // 3. Make it public if not already
        if (!resume.isPublic || !resume.shareToken) {
            const shareToken = `verify_${Date.now()}`;
            resume = await prisma.resume.update({
                where: { id: resume.id },
                data: {
                    isPublic: true,
                    shareToken: shareToken,
                    shareCount: { increment: 1 }
                }
            });
            console.log(`UPDATED_RESUME: ${resume.id}`);
        } else {
            console.log(`EXISTING_PUBLIC_RESUME: ${resume.id}`);
        }

        console.log(`SHARE_TOKEN: ${resume.shareToken}`);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

setupPublicResume();
