"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Award, 
  CheckCircle, 
  Sparkles, 
  Quote, 
  TrendingUp, 
  Target, 
  Search, 
  Cpu, 
  BrainCircuit, 
  Zap, 
  ArrowRight,
  ExternalLink,
  Code2,
  PlaySquare,
  ShieldCheck,
  Video
} from "lucide-react";

// --- Advanced Loading Component ---
const loadingSteps = [
  { text: "Analyzing your proficiency and skill tree...", icon: <Cpu className="w-5 h-5 text-blue-400" /> },
  { text: "Mapping ideal career trajectories...", icon: <Target className="w-5 h-5 text-purple-400" /> },
  { text: "Scanning global certification databases...", icon: <Search className="w-5 h-5 text-pink-400" /> },
  { text: "Evaluating high-yield YouTube playlists...", icon: <PlaySquare className="w-5 h-5 text-red-400" /> },
  { text: "Compiling personalized learning roadmap...", icon: <Sparkles className="w-5 h-5 text-emerald-400" /> }
];

const MatchLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-3xl mx-auto bg-[#0b0d14]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden my-12"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Animated Core */}
        <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
          <div className="absolute w-full h-full border-[6px] border-dashed border-indigo-500/20 rounded-full animate-[spin_6s_linear_infinite]" />
          <div className="absolute w-32 h-32 border-[6px] border-t-blue-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]" />
          <div className="absolute w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full animate-pulse" />
          <BrainCircuit className="w-10 h-10 text-amber-400 animate-pulse drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] relative z-10" />
        </div>

        {/* Dynamic Stepper */}
        <div className="w-full space-y-5">
          <h3 className="text-3xl font-black text-white tracking-tight mb-2">Architecting Syllabus</h3>
          {loadingSteps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            
            return (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${isActive ? 'opacity-100 scale-[1.02] transform' : isCompleted ? 'opacity-40' : 'opacity-10'}`}>
                <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-[#151822] border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.3)]' : isCompleted ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5'}`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : step.icon}
                </div>
                <span className={`text-base font-bold ${isActive ? 'text-white' : isCompleted ? 'text-emerald-400/80' : 'text-slate-500'}`}>
                  {step.text}
                </span>
                {isActive && (
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "30px" }} 
                    transition={{ repeat: Infinity, duration: 1.2 }} 
                    className="h-1 bg-indigo-500/50 rounded-full ml-auto"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default function CourseRecommendation() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const handleSubmit = async () => {
    if (!skills.trim()) {
      alert("Please enter your current skills.");
      return;
    }
    setLoading(true);
    setRecommendations([]);
    setPlaylists([]);
    
    try {
      const response = await fetch("/api/course-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, goal }),
      });
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      const data = await response.json();
      
      // Artificial delay for intense UI loader presentation
      await new Promise(resolve => setTimeout(resolve, 8500));
      
      setRecommendations(data.courses || []);
      setPlaylists(data.playlists || []);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03030a] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* Immersive Deep Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 px-6 z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-bold text-indigo-200 tracking-widest uppercase">AI Learning Architect</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight"
        >
          Master Your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-lg">
            Future Skillset
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto font-medium mb-12 leading-relaxed"
        >
          Input your current knowledge base and target goal. Our AI will curate the highest-rated global certifications and premium YouTube playlists to accelerate your growth.
        </motion.p>

        {/* Floating Glowing Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 w-full max-w-4xl mx-auto">
          {[
            { tag: "Top-Rated", icon: <Star className="w-5 h-5 text-amber-400" />, glow: "from-amber-500/10" },
            { tag: "Verified Certs", icon: <Award className="w-5 h-5 text-emerald-400" />, glow: "from-emerald-500/10" },
            { tag: "Deep AI Logic", icon: <BrainCircuit className="w-5 h-5 text-blue-400" />, glow: "from-blue-500/10" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + (i * 0.1), type: "spring" }}
              className={`px-6 py-3 bg-gradient-to-r ${stat.glow} to-transparent border border-white/10 rounded-2xl backdrop-blur-md shadow-lg flex items-center gap-3`}
            >
              {stat.icon}
              <span className="font-bold text-slate-300 uppercase tracking-widest text-sm">{stat.tag}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Generation Form */}
      <section className="py-10 px-6 relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Subtle Form Inner Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] pointer-events-none" />
          
          <div className="mb-10 text-center relative z-10">
            <h2 className="text-3xl font-black text-white mb-3">Initialize Learning Path</h2>
            <p className="text-slate-400 font-medium">Define your starting point and ultimate objective to generate your curriculum.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10 mb-8">
            <div className="space-y-2.5">
              <label className="flex items-center text-sm font-black text-slate-300 uppercase tracking-widest pl-1">
                <Code2 className="h-4 w-4 mr-2 text-indigo-400" /> Current Skills *
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Python, SQL, Basic Math"
                  className="w-full h-14 bg-[#0b0d14] border border-white/10 focus:border-indigo-500/50 rounded-xl px-5 text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="flex items-center text-sm font-black text-slate-300 uppercase tracking-widest pl-1">
                <Target className="h-4 w-4 mr-2 text-pink-400" /> Career Goal
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Become a Data Scientist"
                  className="w-full h-14 bg-[#0b0d14] border border-white/10 focus:border-pink-500/50 rounded-xl px-5 text-white placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-pink-500/10 transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-4.5 rounded-2xl flex items-center justify-center gap-3 font-black text-xl text-white shadow-[0_0_40px_rgba(79,70,229,0.4)] hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] transition-all disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-1 h-16"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2.5s_infinite] group-hover:scale-105 transition-transform" />
            <span className="relative z-10 tracking-wide">{loading ? "Synthesizing Roadmap..." : "Generate Course Curriculum"}</span>
            {!loading && <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />}
          </button>
        </motion.div>
      </section>

      {/* Output Display */}
      <section className="py-8 px-6 relative z-10 w-full max-w-7xl mx-auto pb-32">
        <AnimatePresence mode="wait">
          {loading ? (
             <MatchLoader key="loader" />
          ) : (recommendations.length > 0 || playlists.length > 0) ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16 mt-8"
            >
              
              {/* Premium Certifications */}
              {recommendations.length > 0 && (
                <div>
                  <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div>
                      <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                        <Award className="w-8 h-8 text-blue-400" />
                        Top Global Certifications
                      </h2>
                      <p className="text-slate-400 font-medium mt-1">Highly-rated career advancing paths from Coursera and leading universities.</p>
                    </div>
                  </div>

                  {/* Best Pick Emphasized */}
                  {recommendations.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-8 p-[1px] rounded-[2.5rem] bg-gradient-to-br from-amber-400 via-orange-500 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.2)]"
                    >
                      <div className="bg-[#0b0d14] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px]" />
                        <div className="flex-shrink-0 relative">
                          <img
                            src={recommendations[recommendations.length - 1].thumbnail}
                            className="w-full md:w-64 h-48 object-cover rounded-2xl border border-white/10 shadow-xl"
                            alt="Top Course Thumbnail"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className="absolute -top-4 -left-4 bg-amber-500 text-black font-black uppercase tracking-widest text-xs px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transform -rotate-2">
                             <TrendingUp className="w-4 h-4" /> Best Overall Growth
                          </div>
                        </div>
                        <div className="flex-1 relative z-10">
                          <h3 className="text-3xl font-black text-white mb-2 leading-tight">{recommendations[recommendations.length - 1].course_title}</h3>
                          <div className="flex flex-wrap items-center gap-3 mb-6">
                             <span className="flex items-center gap-1.5 text-sm font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300">
                               <Users className="w-4 h-4 text-blue-400" /> {recommendations[recommendations.length - 1].platform}
                             </span>
                             <span className="flex items-center gap-1.5 text-sm font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-amber-400">
                               <Star className="w-4 h-4 fill-amber-400" /> {recommendations[recommendations.length - 1].rating}
                             </span>
                             <span className="flex items-center gap-1.5 text-sm font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300">
                               <Clock className="w-4 h-4 text-emerald-400" /> {recommendations[recommendations.length - 1].duration}
                             </span>
                             {recommendations[recommendations.length - 1].isPaid !== undefined && (
                                <span className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-lg ${recommendations[recommendations.length - 1].isPaid ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                                  {recommendations[recommendations.length - 1].isPaid ? "Paid License" : "Free Access"}
                                </span>
                             )}
                          </div>
                          <p className="text-slate-400 font-medium leading-relaxed mb-6">{recommendations[recommendations.length - 1].description}</p>
                          
                          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-6 flex items-start gap-3">
                             <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                             <p className="text-sm text-indigo-200 font-medium"><strong>AI Reasoning:</strong> {recommendations[recommendations.length - 1].reason}</p>
                          </div>

                          <a
                             href={recommendations[recommendations.length - 1].url} target="_blank" rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-slate-200 rounded-xl font-black text-base transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                          >
                            Enroll in Masterclass <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {recommendations.slice(0, recommendations.length === 1 ? 1 : -1).map((course, idx) => (
                       <motion.div
                         key={idx}
                         initial={{ opacity: 0, scale: 0.95, y: 30 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                         className="group bg-[#0b0d14]/80 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 rounded-[2rem] shadow-xl hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] transition-all duration-500 flex flex-col overflow-hidden"
                       >
                         <div className="relative h-48 overflow-hidden bg-[#151822]">
                            <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" onError={(e) => { e.target.style.display = 'none'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 flex gap-2">
                               <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                                 <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {course.rating}
                               </span>
                               {course.isPaid !== undefined && (
                                <span className={`px-2.5 py-1 backdrop-blur-md rounded-lg border text-xs font-bold flex items-center gap-1.5 ${course.isPaid ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                                  {course.isPaid ? "Paid" : "Free"}
                                </span>
                               )}
                            </div>
                         </div>
                         <div className="p-8 flex flex-col flex-1 relative z-10 bg-[#0b0d14]">
                            <h3 className="text-xl font-black text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2">{course.course_title}</h3>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-500 mb-4">
                               <span className="flex items-center gap-1"><Users className="w-4 h-4 text-slate-400" /> {course.platform}</span>
                               <span className="w-1 h-1 bg-white/20 rounded-full" />
                               <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-slate-400" /> {course.duration}</span>
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">{course.description}</p>
                            
                            <a href={course.url} target="_blank" rel="noopener noreferrer" className="mt-auto w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-white/20">
                              View Syllabus <ExternalLink className="w-4 h-4" />
                            </a>
                         </div>
                       </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Playlists */}
              {playlists.length > 0 && (
                <div>
                  <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 pt-8 border-t border-white/10">
                    <div>
                      <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
                        <Video className="w-8 h-8 text-red-500" />
                        Targeted YouTube Modules
                      </h2>
                      <p className="text-slate-400 font-medium mt-1">Free highly-dense video learning structures verified by the AI.</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {playlists.map((playlist, idx) => (
                      <motion.div
                         key={idx}
                         initial={{ opacity: 0, scale: 0.95, y: 30 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                         className="group bg-[#151822]/80 backdrop-blur-xl border border-white/10 hover:border-red-500/40 rounded-3xl shadow-lg transition-all duration-500 flex flex-col overflow-hidden"
                       >
                         <div className="relative h-40 overflow-hidden bg-[#0b0d14]">
                            <img src={playlist.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" onError={(e) => { e.target.style.display = 'none'; }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#151822] to-transparent pointer-events-none" />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                               <PlaySquare className="w-3 h-3 text-red-400" /> {playlist.videoCount} Videos
                            </div>
                         </div>
                         <div className="p-6 flex flex-col flex-1 bg-[#151822]">
                            <h3 className="text-lg font-black text-white mb-1 group-hover:text-red-400 transition-colors line-clamp-2">{playlist.title}</h3>
                            <h4 className="text-sm font-bold text-slate-500 mb-4">{playlist.channelTitle}</h4>
                            <p className="text-xs font-medium text-slate-400 line-clamp-3 mb-6 flex-1 bg-white/5 p-3 rounded-lg border border-white/5">{playlist.reason}</p>
                            
                            <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="mt-auto w-full py-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                              Start Bingeing <ExternalLink className="w-4 h-4" />
                            </a>
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </div>
  );
}
