const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function v() {
    try {
        const user = await db.user.findUnique({
            where: { email: "tpo@jiet.ac.in" },
            include: { college: true }
        });

        console.log("JIET_TPO_STATUS:", user ? "FOUND" : "NOT_FOUND");
        if (user) {
            console.log("ROLE:", user.role);
            console.log("COLLEGE:", user.college?.name);
        }

        const studentCount = await db.user.count({
            where: { email: { endsWith: "@jiet.ac.in" }, role: "STUDENT" }
        });
        console.log("JIET_STUDENT_COUNT:", studentCount);

        const activityCount = await db.gitHubActivity.count({
            where: { user: { email: { endsWith: "@jiet.ac.in" } } }
        });
        console.log("JIET_ACTIVITY_COUNT:", activityCount);

    } finally {
        await db.$disconnect();
    }
}

v();
