import { PrismaClient } from "@prisma/client";
import JobCard from "@/components/JobCard";
import { Briefcase } from "lucide-react";
import JobsFilterBar from "@/components/JobsFilterBar";
import Link from "next/link";

const prisma = new PrismaClient();

const CATEGORIES = [
  "All", "Internships", "Jobs", "Hackathons", "Scholarships", 
  "Campus Ambassador", "Events", "Open Source Programs", 
  "Competitions", "Workshops", "Conferences"
];

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; location?: string; type?: string; mode?: string; category?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const location = params.location || "";
  const type = params.type || "";
  const mode = params.mode || "";
  const category = params.category || "All";

  // Split query into terms for better matching
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
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="pt-20 pb-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase mb-6">
            Discover Opportunities Early
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            The Opportunity Hub <br className="hidden md:block" />
            <span className="text-[#a855f7]">Every Student</span> Deserves.
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Discover internships, jobs, hackathons, ca programs, events, competitions and career opportunities in one place.
          </p>

          <JobsFilterBar defaultQuery={query} defaultLocation={location} />

          {/* Category Pills (Horizontal Scroll) */}
          <div className="flex overflow-x-auto hide-scrollbar gap-3 mt-10 max-w-5xl mx-auto pb-4 items-center justify-start lg:justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={cat === "All" ? "/jobs" : `/jobs?category=${encodeURIComponent(cat)}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  category === cat 
                  ? "bg-[#a855f7] text-white shadow-md shadow-purple-500/20" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Verified Listings: Showing {jobs.length} Programs
          </h2>
          <span className="text-xs font-bold text-slate-400">Realtime updates</span>
        </div>

        {/* Job Grid Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job as any} />
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
            <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No opportunities match your search</h3>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">Try adjusting your filters or search terms to find more opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
}
