import { NextResponse } from "next/server";
import { recommendCourses } from "../../../actions/course-recommendation";

export async function POST(request) {
  try {
    const { skills, goal } = await request.json();
    if (!skills) {
      return NextResponse.json({ error: "Skills are required" }, { status: 400 });
    }
    const recommendations = await recommendCourses(skills, goal);
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error in course recommendation API:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
