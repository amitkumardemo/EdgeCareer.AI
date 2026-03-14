const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
    console.log("🚀 Starting seed process...");

    try {
        // 1. Create a Test College
        const collegeDomain = "example.com";
        const college = await db.college.upsert({
            where: { domain: collegeDomain },
            update: {},
            create: {
                name: "TECHIEHELP UNIVERSITY",
                domain: collegeDomain,
            },
        });
        console.log(`✅ College created/found: ${college.name} (ID: ${college.id})`);

        // 2. Create Dummy Students
        const studentsData = [
            { name: "Aditya Kumar", roll: "CS001", branch: "Computer Science", github: "adityakumr03" },
            { name: "Priya Sharma", roll: "CS002", branch: "Computer Science", github: "priya-dev" },
            { name: "Rahul Singh", roll: "IT001", branch: "Information Technology", github: "rahul-coder" },
            { name: "Ananya Iyer", roll: "EE001", branch: "Electronics", github: "ananya-tech" },
            { name: "Vikram Mehra", roll: "ME001", branch: "Mechanical", github: "vikram-builder" },
        ];

        console.log("👨‍🎓 Creating dummy students...");
        const students = [];
        for (const data of studentsData) {
            const student = await db.user.upsert({
                where: { uid: `dummy-firebase-${data.roll.toLowerCase()}` },
                update: {
                    collegeId: college.id,
                    role: "STUDENT",
                    branch: data.branch,
                    year: "4",
                    rollNumber: data.roll,
                    githubUsername: data.github,
                    industry: "tech-software-engineering",
                },
                create: {
                    uid: `dummy-firebase-${data.roll.toLowerCase()}`,
                    email: `${data.roll.toLowerCase()}@${collegeDomain}`,
                    name: data.name,
                    role: "STUDENT",
                    collegeId: college.id,
                    branch: data.branch,
                    year: "4",
                    rollNumber: data.roll,
                    githubUsername: data.github,
                    industry: "tech-software-engineering",
                    skills: JSON.stringify(["React", "Node.js", "Python"]),
                    bio: "Passionate developer and student.",
                },
            });
            students.push(student);
        }
        console.log(`✅ Created ${students.length} dummy students.`);

        // 3. Create Mock GitHub Activity (Last 30 days)
        console.log("📈 Generating mock GitHub activity...");
        const now = new Date();
        for (const student of students) {
            const activities = [];
            for (let i = 0; i < 30; i++) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);

                // Random activity levels
                const commits = Math.floor(Math.random() * 5);
                const prs = Math.random() > 0.8 ? 1 : 0;

                activities.push({
                    userId: student.id,
                    date: date,
                    commits,
                    pullRequests: prs,
                    repositories: JSON.stringify(["repo1", "repo2"]),
                    languages: JSON.stringify({ "JavaScript": 100 }),
                    isActive: commits > 0 || prs > 0,
                });
            }

            // Batch create for this student
            await db.gitHubActivity.createMany({
                data: activities,
                skipDuplicates: true,
            });
        }
        console.log("✅ Mock GitHub activity generated.");

        console.log("\n✨ SEEDING COMPLETE! ✨");
        console.log(`👉 To view this data, ensure your TPO account email also ends with @${collegeDomain}`);
        console.log("👉 Visit /tpo/dashboard to see the results.");

    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        await db.$disconnect();
    }
}

seed();
