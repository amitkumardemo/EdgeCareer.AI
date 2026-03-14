const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function run() {
    try {
        const domain = "jiet.ac.in";
        const tpoEmail = "tpo@jiet.ac.in";
        const tpoName = "Amit Kumar";

        console.log("🚀 Starting JIET Universe environment setup...");

        // 1. Create College
        const college = await db.college.upsert({
            where: { domain },
            update: { name: "JIET Universe" },
            create: {
                name: "JIET Universe",
                domain,
                location: "Jodhpur",
                type: "University"
            },
        });
        console.log(`✅ College created/found: ${college.name} (ID: ${college.id})`);

        // 2. Create/Update TPO User
        // Use a placeholder for uid since it's external
        const tpo = await db.user.upsert({
            where: { email: tpoEmail },
            update: {
                role: "TPO",
                name: tpoName,
                collegeId: college.id
            },
            create: {
                uid: "placeholder-firebase-jiet-tpo",
                email: tpoEmail,
                name: tpoName,
                role: "TPO",
                collegeId: college.id
            },
        });
        console.log(`✅ TPO Configured: ${tpo.name} (${tpo.email})`);

        // 3. Seed Students for jiet.ac.in
        console.log("👨‍🎓 Seeding demo students for jiet.ac.in...");
        const students = [
            { name: "Siddharth Jain", roll: "JIET/CS/01", branch: "Computer Science", year: 4 },
            { name: "Ananya Goyal", roll: "JIET/DS/05", branch: "Data Science", year: 3 },
            { name: "Vikram Rathore", roll: "JIET/ML/12", branch: "AI & ML", year: 4 },
        ];

        for (const s of students) {
            const student = await db.user.upsert({
                where: { uid: `firebase-jiet-${s.roll.replace(/\//g, "-").toLowerCase()}` },
                update: {
                    collegeId: college.id,
                    role: "STUDENT",
                    branch: s.branch,
                    year: s.year,
                    rollNumber: s.roll
                },
                create: {
                    uid: `firebase-jiet-${s.roll.replace(/\//g, "-").toLowerCase()}`,
                    email: `${s.roll.replace(/\//g, "-").toLowerCase()}@${domain}`,
                    name: s.name,
                    role: "STUDENT",
                    collegeId: college.id,
                    branch: s.branch,
                    year: s.year,
                    rollNumber: s.roll,
                    industry: "tech-software-development"
                },
            });

            // Seed mock activity for charts
            for (let j = 0; j < 14; j++) {
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() - j);
                await db.gitHubActivity.upsert({
                    where: { userId_date: { userId: student.id, date } },
                    update: {
                        commits: Math.floor(Math.random() * 5) + 1,
                        pullRequests: Math.random() > 0.5 ? 1 : 0,
                    },
                    create: {
                        userId: student.id,
                        date,
                        commits: Math.floor(Math.random() * 5) + 1,
                        pullRequests: Math.random() > 0.5 ? 1 : 0,
                        repositories: JSON.stringify(["jiet-core", "student-app"]),
                        languages: JSON.stringify({ "JavaScript": 500, "Python": 200 }),
                        isActive: true
                    }
                });
            }
        }
        console.log(`✅ Seeded ${students.length} students for JIET Universe.`);
        console.log("\n✨ SETUP COMPLETE! ✨");
        console.log(`👉 TPO Name: ${tpoName}`);
        console.log(`👉 TPO Email: ${tpoEmail}`);
        console.log(`👉 Dashboard URL: /tpo/dashboard`);
        console.log(`👉 Verification: Students with @${domain} will now automatically appear on this dashboard.`);

    } catch (e) {
        console.error("❌ Setup failed:", e);
    } finally {
        await db.$disconnect();
    }
}

run();
