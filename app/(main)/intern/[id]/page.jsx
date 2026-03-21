import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Award, Briefcase, Calendar, CheckCircle2, TrendingUp, Github, FileText } from "lucide-react";

export default async function PublicInternProfilePage({ params }) {
  const { id } = params;
  
  const decodedId = decodeURIComponent(id);
  const potentialName = decodedId.replace(/-/g, " ");

  // Search by either user ID or name (for flexibility)
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { id: decodedId },
        { name: { equals: potentialName, mode: 'insensitive' } }
      ]
    },
    include: {
      college: true,
      internApplications: {
        where: { status: "SELECTED" },
        include: {
          batch: { include: { program: true } },
          progress: { include: { certificate: true } },
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const applications = user.internApplications;

  return (
    <div className="min-h-screen bg-[#030712] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-4xl font-bold text-white flex-shrink-0 shadow-xl">
              {user.imageUrl ? (
                <Image src={user.imageUrl} alt={user.name} width={96} height={96} className="rounded-full rounded-2xl" />
              ) : (
                user.name?.[0]?.toUpperCase()
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-lg text-primary font-medium mb-3">{user.branch || "Student"} | {user.college?.name || "Independent Learner"}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                {user.githubUsername && (
                  <a href={`https://github.com/${user.githubUsername}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/10 transition">
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Internship Portfolio */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" /> Internship Portfolio
          </h2>

          {applications.length === 0 ? (
             <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
               <Briefcase className="h-8 w-8 mx-auto mb-3 opacity-30" />
               <p>No active or completed internships found.</p>
             </div>
          ) : (
            applications.map((app) => {
              const prog = app.progress;
              const isCompleted = prog?.completed;

              return (
                <div key={app.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{app.batch?.program?.title}</h3>
                        {isCompleted ? (
                          <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-green-400/10 text-green-400 px-2.5 py-1 rounded-full border border-green-400/20">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Certified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
                            <TrendingUp className="h-3.5 w-3.5" /> In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{app.batch?.program?.domain} • {app.batch?.program?.duration} Weeks</p>
                      
                      {isCompleted && prog?.certificate && (
                        <div className="flex items-center gap-2 mt-4 p-3 bg-green-400/5 border border-green-400/10 rounded-xl inline-flex text-green-400">
                          <Award className="h-5 w-5" />
                          <div className="text-xs">
                            <p className="font-bold">Credential Issued</p>
                            <p className="opacity-80">ID: {prog.certificate.serialNo}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 md:w-64 border border-white/5">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-3">Performance metrics</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-white mb-1">
                            <span>Tasks Completed</span>
                            <span className="font-bold">{prog?.tasksCompleted} / {prog?.totalTasks}</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${prog?.progressPct || 0}%` }}></div>
                          </div>
                        </div>
                        <div className="flex justify-between border-t border-white/5 pt-2">
                          <span className="text-xs text-gray-400">Evaluation Score</span>
                          <span className="text-xs font-bold text-primary">{prog?.performScore.toFixed(1)} / 100</span>
                        </div>
                        <div className="flex justify-between border-t border-white/5 pt-2">
                          <span className="text-xs text-gray-400">Attendance</span>
                          <span className="text-xs font-bold text-white">{prog?.attendancePct}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
