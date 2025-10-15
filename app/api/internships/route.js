import { NextResponse } from "next/server";
import { getInternshipMatches } from "../../../actions/internships";

export async function POST(request) {
  try {
    const { role, skills, location } = await request.json();
    if (!role || !skills || !location) {
      return NextResponse.json({ error: "Role, skills, and location are required" }, { status: 400 });
    }
    const data = await getInternshipMatches(role, skills, location);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in internships API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
