const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function run() {
    try {
        const user = await db.user.findFirst();
        if (!user) {
            console.log("NO_USERS_IN_DB_TO_PROMOTE");
            return;
        }

        const domain = user.email.split("@")[1];
        console.log(`Promoting ${user.email} to TPO for domain ${domain}`);

        await db.user.update({
            where: { id: user.id },
            data: { role: "TPO" }
        });

        console.log("Seeding data for domain:", domain);

        // Create College
        const college = await db.college.upsert({
            where: { domain },
            update: {},
            create: { name: "TEST UNIVERSITY", domain }
        });

        await db.user.update({
            where: { id: user.id },
            data: { collegeId: college.id }
        });

        // Create Students
        for (let i = 1; i <= 3; i++) {
            const student = await db.user.upsert({
                where: { uid: `test-firebase-student-${i}` },
                update: { collegeId: college.id, role: "STUDENT" },
                create: {
                    uid: `test-firebase-student-${i}`,
                    name: `Test Student ${i}`,
                    email: `student${i}@${domain}`,
                    role: "STUDENT",
                    collegeId: college.id,
                    branch: "Computer Science",
                    year: 4,
                    rollNumber: `ROLL-${i}-${Date.now()}`,
                    githubUsername: `github-user-${i}`,
                    industry: "tech-software-development",
                    createdAt: new Date()
                }
            });

            // Mock GitHub Activity
            for (let j = 0; j < 15; j++) {
                const date = new Date();
                date.setHours(0, 0, 0, 0); // Normalize to midnight
                date.setDate(date.getDate() - j);

                try {
                    await db.gitHubActivity.upsert({
                        where: {
                            userId_date: {
                                userId: student.id,
                                date: date,
                            }
                        },
                        update: {
                            commits: Math.floor(Math.random() * 5) + 1,
                            pullRequests: Math.random() > 0.5 ? 1 : 0,
                        },
                        create: {
                            userId: student.id,
                            date: date,
                            commits: Math.floor(Math.random() * 5) + 1,
                            pullRequests: Math.random() > 0.5 ? 1 : 0,
                            issues: 0,
                            repositories: JSON.stringify(["repo-1", "repo-2"]),
                            languages: JSON.stringify({ "JavaScript": 1000 }),
                            isActive: true
                        }
                    });
                } catch (e) {
                    console.error("❌ Failed to upsert activity:", {
                        name: e.name,
                        code: e.code,
                        message: e.message,
                        meta: e.meta
                    });
                }
            }
        }


        console.log("✅ DONE! You are now a TPO and have 3 dummy students.");
    } catch (e) {
        console.error("💥 CRITICAL ERROR:", e);
    } finally {
        await db.$disconnect();
    }
}

run();
