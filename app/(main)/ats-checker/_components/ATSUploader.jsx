"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function ATSUploader({ onAnalyze, loading, currentStep, steps }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a PDF file only.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Upload Resume</h3>
                  <p className="text-sm text-muted-foreground font-medium">Get a deep-dive ATS compatibility score</p>
                </div>
              </div>

              <div
                className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 cursor-pointer ${
                  dragActive
                    ? "border-emerald-500 bg-emerald-500/10 scale-[1.02] shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    : "border-white/10 hover:border-emerald-500/50 hover:bg-white/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => e.target.files?.[0] && validateAndSetFile(e.target.files[0])}
                  className="hidden"
                />
                
                <div className="w-20 h-20 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <FileText className="w-10 h-10 text-emerald-400" />
                </div>
                
                <p className="text-xl font-bold mb-2">Drag & drop your resume</p>
                <p className="text-muted-foreground mb-6">PDF files only (Max 5MB)</p>
                
                <Button variant="secondary" className="rounded-xl px-8 h-12 bg-white/10 border-white/10 hover:bg-white/20">
                  Select PDF
                </Button>

                {file && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm font-bold truncate max-w-xs">{file.name}</span>
                  </motion.div>
                )}
              </div>

              <Button
                size="lg"
                className="w-full h-16 mt-8 rounded-2xl text-lg font-bold group bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/25"
                disabled={loading || !file}
                onClick={() => onAnalyze(file)}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-3 h-6 w-6" />
                    Start AI Analysis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Display */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl h-full">
            <CardContent className="p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Analysis Stream</h3>
                  <p className="text-sm text-muted-foreground font-medium">Real-time processing feedback</p>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {loading || currentStep < steps.length ? (
                    <div className="space-y-4">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
                            index === currentStep 
                              ? "bg-blue-500/10 border-blue-500/30 scale-[1.02]" 
                              : index < currentStep 
                              ? "bg-emerald-500/5 border-emerald-500/20 opacity-70"
                              : "bg-white/5 border-white/5 opacity-40"
                          }`}
                        >
                          <div className="relative">
                            {index < currentStep ? (
                              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                            ) : index === currentStep ? (
                              <div className="h-6 w-6 border-3 border-blue-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <div className="h-6 w-6 border-2 border-white/10 rounded-full" />
                            )}
                          </div>
                          <span className={`font-bold transition-colors ${
                              index === currentStep ? "text-white" : index < currentStep ? "text-emerald-400" : "text-muted-foreground"
                          }`}>
                            {step}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
                       <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                         <FileText size={48} className="text-muted-foreground" />
                       </div>
                       <div>
                         <h4 className="text-xl font-bold">System Idle</h4>
                         <p className="text-sm max-w-[200px] mx-auto text-muted-foreground">Upload your resume to begin the deep-scan process.</p>
                       </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
