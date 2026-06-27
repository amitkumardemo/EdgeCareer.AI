import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { PlusCircle, MoreVertical, Edit, Trash2, Eye } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      company: true,
      _count: {
        select: { applications: true },
      },
    },
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Jobs Management</h1>
          <p className="text-gray-500 mt-1">Manage your job listings, track applications, and performance.</p>
        </div>
        <Link 
          href="/admin/jobs/create" 
          className="flex items-center gap-2 bg-[#0F4CBA] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          Create Job
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-600 text-sm">
              <th className="p-4 font-medium">Job Title</th>
              <th className="p-4 font-medium">Company</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Applications</th>
              <th className="p-4 font-medium">Views</th>
              <th className="p-4 font-medium">Posted</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No jobs found. Create your first job posting!
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{job.title}</div>
                    <div className="text-xs text-gray-500">{job.employmentType} • {job.workMode}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-700">{job.company?.name || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      job.status === "PUBLISHED" ? "bg-green-100 text-green-700" :
                      job.status === "DRAFT" ? "bg-gray-100 text-gray-700" : "bg-red-100 text-red-700"
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium">{job._count.applications}</td>
                  <td className="p-4 text-sm text-gray-600">{job.views}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400">
                      <Link href={`/jobs/${job.slug}`} className="hover:text-[#0F4CBA]"><Eye size={18} /></Link>
                      <button className="hover:text-amber-500"><Edit size={18} /></button>
                      <button className="hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
