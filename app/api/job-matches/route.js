import { NextResponse } from "next/server";
import { getJobMatches } from "../../../actions/job-matches";

export async function POST(request) {
  try {
    const { role, skills, location } = await request.json();
    if (!role || !skills || !location) {
      return NextResponse.json({ error: "Role, skills, and location are required" }, { status: 400 });
    }
    const jobMatches = await getJobMatches(role, skills, location);
    return NextResponse.json(jobMatches);
  } catch (error) {
    console.error("Error in job matches API:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
