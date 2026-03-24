"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateRoadmap } from "@/actions/roadmap";
import useFetch from "@/hooks/use-fetch";
import RoadmapDisplay from "./roadmap-display";
import { BUTTONS_MENUS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { BarLoader, PulseLoader } from "react-spinners";
import { BrainCircuit, Target, Clock, Zap, Cpu, RefreshCw, Sparkles, Loader2 } from "lucide-react";

export default function RoadmapGenerator() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [timeFrame, setTimeFrame] = useState("6 months");

  const {
    loading: generating,
    fn: generateFn,
    data: resultData,
    setData,
  } = useFetch(generateRoadmap);

  const handleGenerate = () => {
    if (!currentSkills.trim() || !targetRole.trim()) {
      toast.error("Please fill in current skills and target role.");
      return;
    }
    generateFn(currentSkills, targetRole, timeFrame);
  };

  const startNew = () => {
    setCurrentSkills("");
    setTargetRole("");
    setTimeFrame("6 months");
    setData(null);
  };

  if (generating) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse" />
           <div className="relative w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              <Loader2 className="h-16 w-16 text-blue-400 animate-spin" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent animate-pulse" />
           </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 tracking-tight uppercase">Generating your personalized roadmap...</h3>
        <p className="text-muted-foreground max-w-md mx-auto font-medium leading-relaxed">
           This may take a moment as we craft a tailored learning path just for you!
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-4">
           <BarLoader width={200} color="#3b82f6" />
           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-400/60 animate-pulse">Neural Path Synthesis in Progress</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <AnimatePresence mode="wait">
        {!resultData ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-[48px] overflow-hidden">
               <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-20">
                  <BrainCircuit className="w-32 h-32 text-blue-400" />
               </div>
               
               <CardHeader className="p-10 lg:p-14 pb-0">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 bg-blue-500/10 rounded-2xl">
                        <Cpu className="h-6 w-6 text-blue-400" />
                     </div>
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight mb-2">Create Your Personalized Roadmap</CardTitle>
               </CardHeader>

               <CardContent className="p-10 lg:p-14 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-8">
                        <div className="space-y-3">
                           <Label htmlFor="skills" className="text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                             Current Skills
                           </Label>
                           <Textarea
                             id="skills"
                             value={currentSkills}
                             onChange={(e) => setCurrentSkills(e.target.value)}
                             placeholder="List your current skills and experience (e.g., Basic JavaScript, React basics)"
                             className="bg-white/5 border-white/10 rounded-[20px] p-4 focus:border-blue-500/50 focus:ring-blue-500/20 text-white min-h-[140px] text-base font-medium transition-all"
                             rows={4}
                           />
                        </div>
                     </div>

                     <div className="space-y-8">
                        <div className="space-y-3">
                           <Label htmlFor="role" className="text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                             Target Role
                           </Label>
                           <Input
                             id="role"
                             value={targetRole}
                             onChange={(e) => setTargetRole(e.target.value)}
                             placeholder="e.g., Senior Frontend Developer"
                             className="h-14 bg-white/5 border-white/10 rounded-xl px-4 focus:border-blue-500/50 focus:ring-blue-500/20 text-white text-base font-bold transition-all"
                           />
                        </div>

                        <div className="space-y-3 relative z-50">
                           <Label htmlFor="timeframe" className="text-xs uppercase tracking-widest font-black text-muted-foreground flex items-center gap-2">
                             Time Frame
                           </Label>
                           <Select value={timeFrame} defaultValue={timeFrame} onValueChange={(val) => setTimeFrame(val)}>
                             <SelectTrigger id="timeframe" className="h-14 bg-white/5 border-white/10 rounded-xl px-4 focus:border-blue-500/50 focus:ring-blue-500/20 text-white font-bold text-base">
                               <SelectValue placeholder="Select time frame" />
                             </SelectTrigger>
                             <SelectContent className="bg-zinc-950 border-white/10 rounded-2xl z-[100]">
                               <SelectItem value="3 months" className="focus:bg-blue-500/10 focus:text-blue-400 py-3 font-bold">3 months</SelectItem>
                               <SelectItem value="6 months" className="focus:bg-blue-500/10 focus:text-blue-400 py-3 font-bold">6 months</SelectItem>
                               <SelectItem value="12 months" className="focus:bg-blue-500/10 focus:text-blue-400 py-3 font-bold">12 months</SelectItem>
                             </SelectContent>
                           </Select>
                        </div>
                     </div>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={generating} 
                    className="w-full h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white text-lg font-bold transition-all shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)] group"
                  >
                    <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                    {BUTTONS_MENUS.GENERATE_ROADMAP || "Generate Roadmap"}
                  </Button>
               </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            <RoadmapDisplay roadmap={resultData.roadmap} />
            <div className="flex justify-center">
               <Button 
                 onClick={startNew} 
                 variant="outline" 
                 className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white text-base font-bold uppercase tracking-widest flex items-center gap-2"
               >
                 <RefreshCw className="h-5 w-5" />
                 Generate New Roadmap
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
