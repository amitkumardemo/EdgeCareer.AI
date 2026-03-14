import { NextResponse } from "next/server";
import { getFirebaseUser } from "@/lib/auth-utils";
import { db } from "@/lib/prisma";
import { syncAllStudents } from "@/actions/github-sync";

export async function POST(req) {
    try {
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = firebaseUser.uid;

        // Verify user is TPO
        const tpo = await db.user.findUnique({
            where: { uid: uid },
            select: { role: true, collegeId: true },
        });

        if (tpo?.role !== "TPO" || !tpo.collegeId) {
            return NextResponse.json({ error: "Unauthorized: TPO access required" }, { status: 403 });
        }

        // Trigger sync for all students in the college
        const result = await syncAllStudents(tpo.collegeId);

        return NextResponse.json({
            success: true,
            ...result,
        });
    } catch (error) {
        console.error("GitHub sync error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
