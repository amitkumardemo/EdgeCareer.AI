import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, IndianRupee, Clock, Share2, CheckCircle2, ChevronRight, Bookmark, ArrowRight, CheckCircle, FileText, CheckSquare } from "lucide-react";
import { Metadata } from "next";
import ShareJobButton from "@/components/ShareJobButton";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findFirst({
    where: { slug },
    include: { company: true },
  });

  if (!job) return { title: "Opportunity Not Found" };

  return {
    title: `${job.title} at ${job.company.name}`,
    description: job.seoDescription || (job.description || "").substring(0, 160).replace(/<[^>]*>?/gm, ''),
    openGraph: {
      images: job.bannerUrl || job.thumbnailUrl ? [job.bannerUrl || job.thumbnailUrl || ""] : [],
    },
  };
}

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await prisma.job.findFirst({
    where: { slug },
    include: { company: true },
  });

  if (!job) notFound();

  // Increment views silently in background
  prisma.job.update({
    where: { id: job.id },
    data: { views: { increment: 1 } }
  }).catch(console.error);

  // Parse skills from JSON string or default to empty
  let skillsList = [];
  try {
    skillsList = job.skills ? JSON.parse(job.skills) : [];
  } catch(e) {
    if (typeof job.skills === 'string' && job.skills.length > 0) {
      skillsList = job.skills.split(',').map(s => s.trim());
    }
  }

  // Format dates
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  const deadlineDate = job.applyBefore ? new Date(job.applyBefore).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "Rolling Basis";

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link href="/jobs" className="hover:text-[#0F4CBA] transition-colors">Opportunities</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 truncate">{job.title}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Column (Left) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Banner Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
              {/* Cover Banner */}
              <div className="h-40 md:h-56 w-full bg-slate-800 relative">
                {job.bannerUrl ? (
                  <img src={job.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-[#0F4CBA] via-blue-800 to-indigo-900"></div>
                )}
              </div>

              <div className="p-6 md:p-8 relative">
                {/* Overlapping Logo */}
                <div className="absolute -top-12 md:-top-16 left-6 md:left-8 w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-white shadow-md border-4 border-white flex items-center justify-center overflow-hidden">
                  {job.company.logoUrl ? (
                    <img src={job.company.logoUrl} alt={job.company.name} className="w-full h-full object-cover p-2" />
                  ) : (
                    <span className="text-4xl font-bold text-gray-300">{job.company.name.charAt(0)}</span>
                  )}
                </div>

                <div className="mt-12 md:mt-14">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">{job.title}</h1>
                  <h2 className="text-lg text-slate-600 font-semibold mb-6 flex items-center gap-2">
                    {job.company.name}
                    {job.isFeatured && <CheckCircle className="w-4 h-4 text-blue-500" />}
                  </h2>

                  {/* Highlights / Badges Row */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {job.locationId && (
                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {job.locationId}</div>
                    )}
                    {job.workMode && (
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {job.workMode}</div>
                    )}
                    {job.employmentType && (
                      <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-slate-400" /> {job.employmentType}</div>
                    )}
                    {job.experience && (
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-400" /> {job.experience}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About the Opportunity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h3 className="text-sm font-extrabold text-[#0F4CBA] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">About the Opportunity</h3>
              <div 
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description || "" }}
              />
            </div>

            {/* Key Technical Competencies */}
            {skillsList.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-sm font-extrabold text-[#0F4CBA] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">Key Technical Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill: string, i: number) => (
                    <span key={i} className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:border-[#0F4CBA] transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility (Rendered from requirements if present) */}
            {job.requirements && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-sm font-extrabold text-[#0F4CBA] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Who is eligible to apply
                </h3>
                <div 
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed prose-li:marker:text-blue-500"
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
              </div>
            )}

            {/* Benefits & Rewards */}
            {job.benefits && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-sm font-extrabold text-[#0F4CBA] uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Bookmark className="w-5 h-5" /> Benefits & Rewards Structure
                </h3>
                <div 
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed prose-li:marker:text-amber-500"
                  dangerouslySetInnerHTML={{ __html: job.benefits }}
                />
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sticky top-28">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-6 pb-3 border-b border-slate-100">Assessment Details</h3>
              
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Method</span>
                  <span className="text-slate-900 font-bold">Online Application</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Application Deadline</span>
                  <span className="text-red-600 font-bold">{deadlineDate}</span>
                </li>
                {job.salary && (
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Stipend / Salary</span>
                    <span className="text-slate-900 font-bold">{job.salary}</span>
                  </li>
                )}
                {job.openPositions > 1 && (
                  <li className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Openings</span>
                    <span className="text-slate-900 font-bold">{job.openPositions} Positions</span>
                  </li>
                )}
              </ul>

              <div className="space-y-3">
                {job.applyLink ? (
                  <a 
                    href={job.applyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#0F4CBA] text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 transition-all flex justify-center items-center gap-2 shadow-sm shadow-blue-500/20 active:scale-[0.98]"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button className="w-full bg-[#0F4CBA] text-white font-bold py-3.5 px-4 rounded-xl hover:bg-blue-700 transition-all flex justify-center items-center gap-2 shadow-sm shadow-blue-500/20 active:scale-[0.98]">
                    Apply with TechieHelp Profile <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <ShareJobButton title={`${job.title} at ${job.company.name}`} />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-green-600 bg-green-50/50 py-2 rounded-lg mb-6">
                <CheckCircle2 className="w-4 h-4" />
                100% Verified Opportunity
              </div>

              {/* Career Tools Section */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-4">Prep For This Role</h3>
                <div className="space-y-3">
                  <Link href="/resume-builder" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FileText size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Resume Builder</h4>
                      <p className="text-xs text-slate-500">Create ATS-friendly resume</p>
                    </div>
                  </Link>

                  <Link href="/ats" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-green-200 hover:bg-green-50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <CheckSquare size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">ATS Checker</h4>
                      <p className="text-xs text-slate-500">Check resume score</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
