import { getBatches } from "@/actions/internship-admin";
import Link from "next/link";
import { BookOpen, Video, ChevronRight, Layers } from "lucide-react";

export const metadata = {
  title: "LMS Management | Admin Portal",
};

export default async function AdminLmsPage() {
  const batches = await getBatches();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">LMS Management</h1>
          <p className="text-gray-500 text-sm mt-1">Select a batch to manage its course syllabus and videos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white/3 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all rounded-2xl p-6 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                batch.status === "ACTIVE" ? "bg-green-500/10 text-green-400 border border-green-500/20" : 
                batch.status === "UPCOMING" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                "bg-gray-500/10 text-gray-400 border border-gray-500/20"
              }`}>
                {batch.status}
              </span>
            </div>
            
            <h2 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{batch.name}</h2>
            <p className="text-xs text-gray-400 font-medium mb-6 line-clamp-1">{batch.program?.title}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Layers className="w-4 h-4 text-gray-500" />
                <span>{batch.modules?.length || 0} Modules</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Video className="w-4 h-4 text-gray-500" />
                <span>{batch.modules?.reduce((acc, m) => acc + (m.videos?.length || 0), 0) || 0} Videos</span>
              </div>
            </div>

            <Link href={`/internship/admin/batches/${batch.id}`}>
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-blue-500/20 text-white hover:text-blue-400 border border-white/10 hover:border-blue-500/30 rounded-xl py-3 text-xs font-bold transition-all">
                Manage Course Content <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        ))}
      </div>

      {batches.length === 0 && (
        <div className="py-20 text-center bg-[#0f172a] border border-dashed border-white/10 rounded-3xl">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
            <BookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-white font-bold">No Batches Found</h3>
          <p className="text-gray-500 text-sm mt-1">Create a batch first to start adding LMS content.</p>
        </div>
      )}
    </div>
  );
}
