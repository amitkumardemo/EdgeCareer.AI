import { NextResponse } from "next/server";
import { shareResume } from "@/actions/resume-analytics";

export async function POST(request) {
  try {
    const { resumeId } = await request.json();
    
    console.log(`📤 [API] Share resume request received for ID: ${resumeId}`);
    
    if (!resumeId) {
      console.error("❌ [API] Resume ID is missing in request");
      return NextResponse.json(
        { error: "Resume ID is required" },
        { status: 400 }
      );
    }

    const result = await shareResume(resumeId);
    
    console.log(`✅ [API] Resume shared successfully. Token: ${result.shareToken}`);
    console.log(`📊 [API] Share URL: ${result.shareUrl}`);
    console.log(`🌐 [API] Branded URL: ${result.brandedUrl}`);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ [API] Share resume error:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to share resume" },
      { status: 500 }
    );
  }
}
