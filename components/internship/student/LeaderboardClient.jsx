"use client";

import { Trophy, Medal, Star, Award, TrendingUp, Download, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const loadImageAsBase64 = async (url) => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
};

const generateCertificate = async (leader, rank) => {
  const { jsPDF } = await import("jspdf");
  
  // Fetch required images dynamically
  const logoPromise = loadImageAsBase64("/thp%20logo.png");
  const signaturePromise = loadImageAsBase64("/EdgeCareers.png");
  const sealPromise = loadImageAsBase64("/seal.png");
  const isoPromise = loadImageAsBase64("/image%20(3).png");
  const msmePromise = loadImageAsBase64("/image%20(4).png");
  const [logo, signature, seal, iso, msme] = await Promise.all([logoPromise, signaturePromise, sealPromise, isoPromise, msmePromise]);

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth(); // 841.89
  const pageHeight = doc.internal.pageSize.getHeight(); // 595.28

  // Colors
  const navy = [15, 23, 42];
  const royalBlue = [37, 99, 235];
  const gold = [245, 158, 11];
  const grayText = [100, 116, 139];
  const lightGray = [241, 245, 249];

  // 1. Background Watermark (simulated with faint text if no watermark image)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(100);
  doc.setTextColor(248, 250, 252);
  doc.text("TechieHelp", pageWidth / 2, pageHeight / 2 + 30, { align: "center", angle: -30 });

  // 2. Borders
  // Outer Navy Border
  doc.setDrawColor(...navy);
  doc.setLineWidth(15);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
  // Inner Gold Border
  doc.setDrawColor(...gold);
  doc.setLineWidth(3);
  doc.rect(35, 35, pageWidth - 70, pageHeight - 70);

  // 3. Header
  if (logo) {
    doc.addImage(logo, "PNG", pageWidth / 2 - 60, 50, 120, 45);
  } else {
    doc.setFontSize(20);
    doc.setTextColor(...navy);
    doc.text("TechieHelp Institute of AI", pageWidth / 2, 80, { align: "center" });
  }
  
  doc.setFontSize(10);
  doc.setTextColor(...grayText);
  doc.setFont("helvetica", "italic");
  doc.text("Learn • Build • Grow", pageWidth / 2, 110, { align: "center" });

  // 4. Title
  doc.setFont("times", "bold");
  doc.setFontSize(32);
  doc.setTextColor(...gold);
  doc.text("CERTIFICATE OF EXCELLENCE", pageWidth / 2, 160, { align: "center" });

  // 5. Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...grayText);
  doc.text("Awarded to", pageWidth / 2, 190, { align: "center" });

  // 6. Student Name
  const studentName = leader.application?.user?.name || "Intern";
  doc.setFont("times", "bold");
  doc.setFontSize(36);
  doc.setTextColor(...navy);
  doc.text(studentName.toUpperCase(), pageWidth / 2, 235, { align: "center" });

  // Underline Name
  const nameWidth = doc.getTextWidth(studentName.toUpperCase());
  doc.setDrawColor(...gold);
  doc.setLineWidth(1.5);
  doc.line(pageWidth / 2 - nameWidth / 2 - 20, 245, pageWidth / 2 + nameWidth / 2 + 20, 245);

  // 7. Student Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...royalBlue);
  const domain = leader.application?.batch?.program?.domain || "Software Development";
  const college = leader.application?.user?.college?.name || leader.application?.user?.collegeName || "Institute";
  doc.text(`${domain} Intern  •  ${college}`, pageWidth / 2, 265, { align: "center" });

  // 8. Body Text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...navy);
  
  const bodyLines = doc.splitTextToSize(
    `This Certificate of Excellence is proudly presented to ${studentName} for demonstrating outstanding dedication, consistency, innovation, and exceptional performance throughout the TechieHelp Institute of AI Internship Program. Your commitment to learning, timely task completion, and excellent contribution to real-world projects have earned you recognition as one of the top-performing interns.`, 
    pageWidth - 200
  );
  doc.text(bodyLines, pageWidth / 2, 310, { align: "center", lineHeightFactor: 1.5 });

  // 9. Performance Dashboard Cards (4 boxes)
  const boxY = 380;
  const boxW = 140;
  const boxH = 45;
  const startX = (pageWidth - (boxW * 4 + 45)) / 2; // 4 boxes, 15px gap
  
  const drawStat = (x, title, val, color) => {
    doc.setFillColor(...lightGray);
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.roundedRect(x, boxY, boxW, boxH, 4, 4, "FD");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...grayText);
    doc.text(title, x + boxW / 2, boxY + 18, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...color);
    doc.text(val, x + boxW / 2, boxY + 35, { align: "center" });
  };

  const rankText = rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd";
  drawStat(startX, "Global Rank", `#${rankText}`, gold);
  drawStat(startX + boxW + 15, "Performance Score", `${leader.performScore.toFixed(1)}/100`, royalBlue);
  drawStat(startX + (boxW + 15) * 2, "Tasks Completed", `${leader.tasksCompleted}/${leader.totalTasks}`, navy);
  drawStat(startX + (boxW + 15) * 3, "Attendance", `${leader.attendancePct}%`, [22, 163, 74]); // green

  // 10. Footer Left (Founder)
  if (signature) {
    doc.addImage(signature, "PNG", 80, 470, 90, 45);
  }
  doc.setDrawColor(...grayText);
  doc.setLineWidth(1);
  doc.line(80, 520, 220, 520);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...navy);
  doc.text("Amit Kumar", 150, 535, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grayText);
  doc.text("Founder & CEO", 150, 548, { align: "center" });

  // 11. Footer Right (Seal Only)
  if (seal) {
    doc.addImage(seal, "PNG", pageWidth - 170, 455, 80, 80);
  }

  // 12. Bottom Center Verification (ISO and MSME)
  if (iso) {
    doc.addImage(iso, "PNG", pageWidth / 2 - 90, 470, 75, 45);
  }
  if (msme) {
    doc.addImage(msme, "PNG", pageWidth / 2 + 15, 470, 75, 45);
  }

  // 13. Very Bottom Strip
  doc.setFillColor(...navy);
  doc.rect(15, pageHeight - 35, pageWidth - 30, 20, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("www.techiehelp.in   |   support@techiehelp.in   |   Jodhpur, Rajasthan, India", pageWidth / 2, pageHeight - 22, { align: "center" });

  // Download
  doc.save(`${studentName.replace(/\s+/g, "_")}_Excellence_Certificate.pdf`);
};

export default function LeaderboardClient({ leaders, batchId, myAppId, batchName }) {
  return (
    <motion.div 
      className="space-y-8 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Trophy className="w-8 h-8 text-amber-500" /> Leaderboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {batchId ? `Top performers in ${batchName}` : "Join a batch to see the leaderboard"}
          </p>
        </div>
      </motion.div>

      {!batchId ? (
        <motion.div variants={itemVariants} className="text-center py-16 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <Trophy className="h-10 w-10 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-600 font-medium">You need to be selected in a batch to see the leaderboard.</p>
        </motion.div>
      ) : leaders.length === 0 ? (
        <motion.div variants={itemVariants} className="text-center py-16 bg-slate-50 border border-slate-200 shadow-sm rounded-2xl text-slate-500 text-sm font-medium">
          No data yet — keep completing tasks to appear here!
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Top 3 podium */}
          {leaders.length >= 3 && (
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 md:gap-6 pt-10 pb-4 items-end">
              {[leaders[1], leaders[0], leaders[2]].map((leader, idx) => {
                if (!leader) return <div key={idx}></div>;
                const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
                const heights = ["h-36 md:h-44", "h-44 md:h-56", "h-32 md:h-36"];
                
                const styleConfig = {
                  1: { border: "border-amber-300", bg: "bg-amber-50/80", shadow: "shadow-[0_0_20px_rgba(251,191,36,0.2)]", iconColor: "text-amber-500", iconBg: "bg-amber-100", medal: "🥇" },
                  2: { border: "border-slate-300", bg: "bg-slate-50", shadow: "shadow-sm", iconColor: "text-slate-500", iconBg: "bg-slate-200", medal: "🥈" },
                  3: { border: "border-orange-300", bg: "bg-orange-50/50", shadow: "shadow-sm", iconColor: "text-orange-500", iconBg: "bg-orange-100", medal: "🥉" },
                };
                
                const isMe = leader.applicationId === myAppId;
                const conf = styleConfig[rank];

                return (
                  <motion.div 
                    key={leader.id} 
                    className={`relative flex flex-col items-center justify-start pt-10 px-2 pb-4 ${heights[idx]} rounded-t-3xl border-t border-x ${conf.border} ${conf.bg} ${conf.shadow} transition-all duration-300 hover:-translate-y-2 group`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Rank Badge */}
                    <div className={`absolute -top-6 w-12 h-12 rounded-full border-4 border-white ${conf.iconBg} flex items-center justify-center text-2xl shadow-md z-10`}>
                      {conf.medal}
                    </div>
                    
                    {/* User Info */}
                    <div className="text-center mt-2 w-full">
                      <p className="text-xs md:text-sm font-black text-slate-800 truncate px-1">
                        {leader.application?.user?.name?.split(" ")[0]}
                        {isMe && <span className="text-primary ml-1 block text-[9px] uppercase">(You)</span>}
                      </p>
                      
                      <div className="mt-3 py-1.5 px-2 bg-white/60 rounded-lg inline-block border border-white/40 shadow-sm backdrop-blur-sm">
                        <p className="text-xs md:text-sm font-black text-primary flex items-center justify-center gap-1">
                          {leader.performScore.toFixed(1)} <span className="text-[10px] text-slate-500 font-medium">pts</span>
                        </p>
                      </div>

                      {/* Action Buttons for Top 3 */}
                      <div className="flex flex-col gap-1.5 mt-4 w-full px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={() => generateCertificate(leader, rank)}
                          className="flex items-center justify-center gap-1 text-[9px] md:text-[10px] font-bold bg-white text-slate-800 border border-slate-200 py-1.5 px-2 rounded-md hover:bg-slate-50 shadow-sm w-full"
                        >
                          <Download className="w-3 h-3" /> Certificate
                        </button>
                        <a 
                          href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`I am extremely proud to share that I have secured Rank ${rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'} on the TechieHelp Institute of AI Internship Leaderboard with a score of ${leader.performScore.toFixed(1)} points! 🚀\n\nThanks to my mentors and peers for this incredible learning journey.\n\n#Internship #TopPerformer #TechieHelpInstituteofAI #AI #CareerGrowth`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1 text-[9px] md:text-[10px] font-bold bg-[#0A66C2] text-white py-1.5 px-2 rounded-md hover:bg-[#004182] shadow-sm w-full"
                        >
                          <Linkedin className="w-3 h-3" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Full list */}
          <motion.div variants={itemVariants} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:grid">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Intern Name</div>
              <div className="col-span-2 text-right">Tasks</div>
              <div className="col-span-2 text-right">Attendance</div>
              <div className="col-span-2 text-right">Score</div>
            </div>

            <div className="divide-y divide-slate-100">
              {leaders.map((leader, i) => {
                const isMe = leader.applicationId === myAppId;
                
                const rankBadgeClass = 
                  i === 0 ? "bg-amber-100 text-amber-600 border-amber-200" : 
                  i === 1 ? "bg-slate-200 text-slate-600 border-slate-300" : 
                  i === 2 ? "bg-orange-100 text-orange-600 border-orange-200" : 
                  "bg-slate-50 text-slate-500 border-slate-100";

                return (
                  <motion.div 
                    key={leader.id} 
                    className={`flex items-center gap-4 px-6 py-4 transition-colors ${isMe ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-slate-50"}`}
                  >
                    <div className="sm:hidden w-8 text-center text-xs font-bold text-slate-400">#{i + 1}</div>
                    <div className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-xs font-bold flex-shrink-0 border ${rankBadgeClass}`}>
                      {i + 1}
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-black flex-shrink-0 border border-primary/20">
                      {leader.application?.user?.name?.[0]?.toUpperCase()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {leader.application?.user?.name} {isMe && <span className="inline-block px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] ml-2 uppercase tracking-widest">You</span>}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{leader.application?.user?.branch || "Student Intern"}</p>
                    </div>
                    
                    {/* Mobile visible score */}
                    <div className="text-right sm:hidden">
                      <p className="text-sm font-black text-primary">{leader.performScore.toFixed(1)}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">pts</p>
                    </div>

                    {/* Desktop columns */}
                    <div className="hidden sm:block w-24 text-right">
                      <p className="text-sm font-semibold text-slate-700">{leader.tasksCompleted}<span className="text-slate-400 text-xs">/{leader.totalTasks}</span></p>
                    </div>
                    <div className="hidden sm:block w-24 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-slate-700">{leader.attendancePct}%</p>
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="hidden sm:block w-24 text-right">
                      <div className="inline-flex items-center gap-2 py-1 px-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" />
                        <p className="text-sm font-black text-primary">{leader.performScore.toFixed(1)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
