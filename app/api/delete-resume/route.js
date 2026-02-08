import { NextResponse } from "next/server";
import { deleteResume } from "@/actions/resume-analytics";

export async function POST(request) {
  try {
    const { resumeId } = await request.json();
    
    console.log(`🗑️ [API] Delete resume request received for ID: ${resumeId}`);
    
    if (!resumeId) {
      console.error("❌ [API] Resume ID is missing in request");
      return NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 }
      );
    }

    await deleteResume(resumeId);
    
    console.log(`✅ [API] Resume ${resumeId} deleted successfully`);
    
    return NextResponse.json({ 
      success: true,
      message: "Resume deleted successfully"
    });
  } catch (error) {
    console.error("❌ [API] Delete resume error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to delete resume" },
      { status: 500 }
    );
  }
}
