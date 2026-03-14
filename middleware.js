import { NextResponse } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("__session")?.value;
  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = [
    "/dashboard",
    "/resume",
    "/interview",
    "/ai-cover-letter",
    "/onboarding",
    "/ats-checker",
    "/admin",
    "/dsa",
    "/roadmap",
    "/course-recommendation",
    "/internships",
    "/latest-jobs",
    "/job-matches",
    "/career-branding-lab"
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Skip public routes (e.g. /resume/share)
  const publicRoutes = ["/resume/share"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isPublicRoute && !session) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public static files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
