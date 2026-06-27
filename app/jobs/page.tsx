import { PrismaClient } from "@prisma/client";
import JobCard from "@/components/JobCard";
import { Briefcase } from "lucide-react";
import JobsSearchForm from "@/components/JobsSearchForm";
import JobsFilterSidebar from "@/components/JobsFilterSidebar";

const prisma = new PrismaClient();

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; type?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const location = params.location || "";
  const type = params.type || "";
  const mode = params.mode || "";

  // Split query into terms for better matching (e.g. "Tesla Frontend" will match title "Frontend" and company "Tesla")
  const searchTerms = query.split(/\s+/).filter(Boolean);

  const jobs = await prisma.job.findMany({
    where: {
      status: "PUBLISHED",
      ...(searchTerms.length > 0 && {
        AND: searchTerms.map(term => ({
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { skills: { contains: term, mode: "insensitive" } },
            { company: { name: { contains: term, mode: "insensitive" } } },
          ],
        }))
      }),
      ...(location && { locationId: { contains: location, mode: "insensitive" } }),
      ...(type && { employmentType: { equals: type } }),
      ...(mode && { workMode: { equals: mode } }),
    },
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Search Section */}
      <div className="bg-[#0F4CBA] py-16 px-4">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Discover thousands of verified internships and job opportunities from top companies tailored for your skills.
          </p>

          <JobsSearchForm defaultQuery={query} defaultLocation={location} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <JobsFilterSidebar />

        {/* Job Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found
            </h2>
            <select className="border border-gray-200 text-sm rounded-md p-2 bg-white text-gray-700 outline-none">
              <option>Most Recent</option>
              <option>Most Relevant</option>
            </select>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job as any} />
            ))}
            
            {jobs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No jobs match your search</h3>
                <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your filters or search terms to find more opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
