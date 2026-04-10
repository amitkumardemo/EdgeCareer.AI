import { getFirebaseUser } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getStudentLmsProgress } from "@/actions/internship-lms";
import { PlayCircle, Award, Clock, BookOpen, ChevronRight, GraduationCap } from "lucide-react";

export const metadata = {
  title: "LMS Dashboard | TechieHelp",
};

export default async function StudentLmsDashboardPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid }
  });
  if (!dbUser) redirect("/sign-in");

  // Get active application
  const application = await prisma.internshipApplication.findFirst({
    where: { userId: dbUser.id, status: "SELECTED" },
    include: { batch: { include: { mentor: true } } },
    orderBy: { appliedAt: "desc" },
  });

  if (!application) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
        <div className="text-center bg-white/5 border border-white/10 rounded-3xl p-10 max-w-md w-full">
          <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Active Course</h2>
          <p className="text-gray-400">You are not enrolled in any LMS courses currently.</p>
        </div>
      </div>
    );
  }

  const progressData = await getStudentLmsProgress(application.id);

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 md:p-12 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">My Learning</h1>
           <p className="text-gray-400 text-lg">Pick up right where you left off.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-[#0c101a] to-[#0A0D14] border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
               
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(79,70,229,0.3)]">Enrolled Course</span>
               </div>
               <h2 className="text-3xl md:text-4xl font-black text-white mb-3 relative z-10 leading-tight">{application.batch?.name || "Internship Training Course"}</h2>
               <p className="text-gray-400 mb-10 relative z-10 line-clamp-2 md:text-lg">{application.batch?.description || "Master industry-level skills through our fully structured, interactive video modules mapped out by senior mentors."}</p>
               
               <div className="bg-black/40 border border-white/5 rounded-2xl p-6 md:p-8 mb-10 relative z-10 backdrop-blur-md">
                  <div className="flex justify-between items-end mb-4">
                     <span className="text-gray-300 font-bold uppercase tracking-wider text-xs">Overall Progress</span>
                     <span className="text-4xl font-black text-white">{progressData.progressPct}<span className="text-xl text-primary">%</span></span>
                  </div>
                  <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-1000" style={{ width: `${progressData.progressPct}%` }} />
                  </div>
                  <div className="mt-5 flex gap-4 text-sm text-gray-400 font-medium bg-white/[0.02] w-fit px-4 py-2 rounded-xl border border-white/5">
                     <span className="flex items-center gap-2"><PlayCircle className="w-5 h-5 text-primary"/> {progressData.completedVideos} / {progressData.totalVideos} Completed</span>
                  </div>
               </div>

               <Link href="/internship/student/lms/viewer" className="relative z-10 block">
                  <button className="w-full px-8 py-5 bg-white hover:bg-gray-200 text-black font-black text-lg md:text-xl rounded-2xl flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 active:scale-95 shadow-[0_15px_40px_rgba(255,255,255,0.15)] group">
                     <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform" /> Resume Learning Journey
                  </button>
               </Link>
            </div>
         </div>

         <div className="space-y-6">
            <div className="bg-[#0c101a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
               <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl"><GraduationCap className="w-6 h-6"/></div>
                  <h3 className="text-xl font-black text-white tracking-tight">Course Instructor</h3>
               </div>
               {application.batch?.mentor ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                     <div className="w-24 h-24 bg-black rounded-full border-4 border-white/10 shrink-0 overflow-hidden mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        {application.batch.mentor.imageUrl ? (
                           <img src={application.batch.mentor.imageUrl} alt={application.batch.mentor.name} className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-3xl font-black text-gray-500">{application.batch.mentor.name?.charAt(0)}</div>
                        )}
                     </div>
                     <h4 className="text-xl font-black text-white mb-1">{application.batch.mentor.name || "Mentor"}</h4>
                     <p className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest mt-2 border border-blue-500/20">Lead Instructor</p>
                  </div>
               ) : (
                  <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl text-center border-dashed">
                     <p className="text-sm text-gray-400 font-medium">Instructor details will be assigned soon.</p>
                  </div>
               )}
            </div>

            <div className="bg-[#0c101a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
               <h3 className="text-lg font-black text-white mb-6 uppercase tracking-wider text-xs">Course Highlights</h3>
               <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-[15px] font-medium text-gray-300 p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                     <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><Award className="w-5 h-5"/></div>
                     Verified Certificate
                  </li>
                  <li className="flex items-center gap-4 text-[15px] font-medium text-gray-300 p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                     <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Clock className="w-5 h-5"/></div>
                     Self-Paced Learning
                  </li>
                  <li className="flex items-center gap-4 text-[15px] font-medium text-gray-300 p-3 bg-white/[0.02] rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                     <div className="p-2 bg-primary/10 text-primary rounded-lg"><PlayCircle className="w-5 h-5"/></div>
                     {progressData.totalVideos} Core Modules
                  </li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
}
