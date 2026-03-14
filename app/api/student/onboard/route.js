import { NextResponse } from "next/server";
import { getFirebaseUser } from "@/lib/auth-utils";
import db from "@/lib/prisma";

export async function POST(req) {
    try {
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = firebaseUser.uid;

        const body = await req.json();

        const { branch, year, section, rollNumber, githubUsername, leetcodeUsername } = body;

        // Validation
        if (!branch || !year || !rollNumber || !githubUsername) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if GitHub username is already taken
        const existingGitHub = await db.user.findFirst({
            where: {
                githubUsername,
                uid: { not: uid },
            },
        });

        if (existingGitHub) {
            return NextResponse.json(
                { error: "This GitHub username is already registered" },
                { status: 400 }
            );
        }

        // Check if roll number is already taken
        const existingRoll = await db.user.findFirst({
            where: {
                rollNumber,
                uid: { not: uid },
            },
        });

        if (existingRoll) {
            return NextResponse.json(
                { error: "This roll number is already registered" },
                { status: 400 }
            );
        }

        // Extract college domain from email
        const email = firebaseUser.email;
        if (!email) {
            return NextResponse.json({ error: "No email found" }, { status: 400 });
        }

        const domain = email.split("@")[1];
        console.log(`Extracting domain from student email (${email}): ${domain}`);

        // Find or create college
        let college = await db.college.findUnique({
            where: { domain },
        });

        if (!college) {
            console.log(`College not found for domain ${domain}, auto-creating...`);
            // Auto-create college from domain
            const collegeName = domain.split(".")[0].toUpperCase();
            college = await db.college.create({
                data: {
                    name: collegeName,
                    domain,
                },
            });
        }

        console.log(`Assigned student to college: ${college.name} (ID: ${college.id}, Domain: ${college.domain})`);

        // Update user with student information
        const user = await db.user.upsert({
            where: { uid: uid },
            update: {
                role: "STUDENT",
                collegeId: college.id,
                branch,
                year: parseInt(year),
                section,
                rollNumber,
                githubUsername,
                leetcodeUsername: leetcodeUsername || null,
                name: firebaseUser.name || email.split("@")[0],
                email,
                imageUrl: firebaseUser.picture || null,
            },
            create: {
                uid: uid,
                role: "STUDENT",
                collegeId: college.id,
                branch,
                year: parseInt(year),
                section,
                rollNumber,
                githubUsername,
                leetcodeUsername: leetcodeUsername || null,
                name: firebaseUser.name || email.split("@")[0],
                email,
                imageUrl: firebaseUser.picture || null,
            },
        });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Student onboarding error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
