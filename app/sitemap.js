import prisma from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = "https://techiehelpinstituteofai.in";

  // Base static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume-builder`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ats-checker`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/interview`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/internships`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dsa`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career-branding-lab`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Try to fetch dynamic active internships to add to sitemap
  try {
    const activePrograms = await prisma.internshipProgram.findMany({
      where: { isActive: true },
      select: { id: true, updatedAt: true },
    });

    const dynamicRoutes = activePrograms.map((program) => ({
      url: `${baseUrl}/internships/${program.id}`,
      lastModified: program.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...routes, ...dynamicRoutes];
  } catch (error) {
    console.error("Sitemap dynamic generation error:", error);
    // If DB fails, still return the static routes so the sitemap doesn't break
    return routes;
  }
}
