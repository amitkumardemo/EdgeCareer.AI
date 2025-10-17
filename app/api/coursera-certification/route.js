import { NextResponse } from "next/server";

const COURSERA_API_BASE_URL = 'https://collection-for-coursera-courses.p.rapidapi.com/rapidapi/course/get_course.php';
const COURSERA_API_HOST = 'collection-for-coursera-courses.p.rapidapi.com';
const COURSERA_API_KEY = '172ab53626msh8e8a6ea096d9811p192b77jsn7b29c46ac700';

export async function POST(request) {
  try {
    const { courseTitle } = await request.json();
    if (!courseTitle) {
      return NextResponse.json({ error: "Course title is required" }, { status: 400 });
    }

    // Assuming the API supports query parameter for search
    const url = `${COURSERA_API_BASE_URL}?query=${encodeURIComponent(courseTitle)}&num=1`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': COURSERA_API_KEY,
        'X-RapidAPI-Host': COURSERA_API_HOST,
      },
    });

    if (!response.ok) {
      throw new Error(`Coursera API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data && data.length > 0) {
      const course = data[0];
      return NextResponse.json({
        name: course.title || courseTitle,
        provider: 'Coursera',
        url: course.url || `https://www.coursera.org/search?query=${encodeURIComponent(courseTitle)}`,
      });
    } else {
      return NextResponse.json({ error: 'No certification found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error in Coursera certification API:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
