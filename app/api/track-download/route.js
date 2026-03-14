import { getFirebaseUser } from "@/lib/auth-utils";
import db from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) {
      console.error("❌ [API] Unauthorized download tracking attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const uid = firebaseUser.uid;

    const { resumeId } = await req.json();

    console.log(`📥 [API] Download tracking request for resume: ${resumeId} by Firebase UID: ${uid}`);

    const user = await db.user.findUnique({
      where: { uid: uid },
    });

    if (!user) {
      console.error("❌ [API] User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`🔄 [DB] Incrementing download count for resume ${resumeId}...`);

    // Update resume download count
    const updatedResume = await db.resume.update({
      where: {
        id: resumeId,
        userId: user.id,
      },
      data: {
        downloadCount: {
          increment: 1,
        },
        status: "downloaded",
      },
    });

    console.log(`✅ [DB] Resume download count updated: ${updatedResume.downloadCount}`);

    // Update user analytics
    await db.user.update({
      where: { id: user.id },
      data: {
        totalResumesDownloaded: {
          increment: 1,
        },
      },
    });

    console.log(`✅ [DB] User analytics updated for user ${user.id}`);
    console.log(`📊 Download tracked for resume ${resumeId} by user ${user.id}`);

    // Revalidate paths to update analytics in real-time
    revalidatePath("/resume");
    revalidatePath("/dashboard");

    return NextResponse.json({
      success: true,
      downloadCount: updatedResume.downloadCount,
      message: "Download tracked successfully"
    });
  } catch (error) {
    console.error("❌ [API] Error tracking download:", error.message);
    return NextResponse.json(
      { error: "Failed to track download" },
      { status: 500 }
    );
  }
}
