"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, FileText } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const steps = [
  "Parsing your resume",
  "Analyzing your experience",
  "Extracting your skills",
  "Generating recommendations",
];

export default function ATSChecker() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setAtsScore(null);
        setFeedback(null);
        setCurrentStep(0);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setAtsScore(null);
        setFeedback(null);
        setCurrentStep(0);
      } else {
        toast.error("Please upload a PDF file only.");
      }
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    let timer;
    if (loading && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [loading, currentStep]);

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setAtsScore(null);
    setFeedback(null);
    setCurrentStep(0);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/resume/ats-checker", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to analyze resume");
        return;
      }

      const data = await response.json();
      setAtsScore(data.atsScore);
      if (data.feedback && data.feedback.includes("Unable to parse AI response")) {
        setFeedback("We encountered an issue parsing your resume. Please review it manually or try again.");
      } else {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
      setCurrentStep(steps.length);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Gamification */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23ffffff' fill-opacity='0.05'%3e%3ccircle cx='30' cy='30' r='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-4">
              <span className="text-xl">🏆</span> ATS CHAMPION CHALLENGE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              ATS Resume Analyzer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Level up your resume game! Get AI-powered insights and beat the ATS system to land your dream job
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm text-gray-400">Resumes Analyzed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold text-blue-400">AI-Powered</div>
                <div className="text-sm text-gray-400">Smart Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📤</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Upload Challenge</h2>
              </div>
              <p className="text-gray-400">Drop your resume and see how you rank against top performers</p>
            </div>

            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? "border-purple-500 bg-purple-500/10 scale-105 shadow-lg shadow-purple-500/20"
                  : "border-gray-600 hover:border-purple-400 hover:bg-gray-800/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl font-semibold mb-2 text-white">
                Drag & drop your resume
              </p>
              <p className="text-gray-400 mb-6">or</p>
              <Button
                variant="outline"
                size="lg"
                onClick={handleChooseFile}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 text-white font-semibold px-8 py-3 rounded-xl"
              >
                Choose File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && (
                <p className="mt-4 text-purple-400 font-medium">
                  Selected: <strong className="text-white">{file.name}</strong>
                </p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading || !file}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Your Resume...
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Start ATS Challenge
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
            {loading || currentStep < steps.length ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">⚡</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Analysis in Progress</h2>
                </div>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                      {index < currentStep ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      ) : index === currentStep ? (
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <div className="w-6 h-6 border border-gray-600 rounded-full"></div>
                      )}
                      <span
                        className={`text-lg font-medium ${
                          index === currentStep
                            ? "text-blue-400"
                            : index < currentStep
                            ? "text-green-400"
                            : "text-gray-500"
                        }`}
                      >
                        {step}
                      </span>
                      {index < currentStep && (
                        <div className="ml-auto text-green-400 font-bold">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : atsScore !== null ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">🏆</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Your ATS Score</h2>
                  </div>

                  {/* Circular Progress */}
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - atsScore / 100)}`}
                        className={`transition-all duration-2000 ${
                          atsScore >= 80 ? 'text-green-500' :
                          atsScore >= 60 ? 'text-yellow-500' : 'text-red-500'
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-5xl font-bold ${
                          atsScore >= 80 ? 'text-green-400' :
                          atsScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {atsScore}
                        </div>
                        <div className="text-gray-400 text-sm">/100</div>
                      </div>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                    atsScore >= 80 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    atsScore >= 60 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {atsScore >= 80 ? '🎉 EXCELLENT!' :
                     atsScore >= 60 ? '👍 GOOD JOB!' :
                     '💪 NEEDS WORK'}
                  </div>

                  <p className="text-gray-300 text-lg">
                    {atsScore >= 80 ? 'Your resume is ATS-ready! You\'re in the top tier.' :
                     atsScore >= 60 ? 'Solid foundation! A few tweaks will get you to 80+.' :
                     'Time to level up! Let\'s optimize your resume for better results.'}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">🎯</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Improvement Mission</h3>
                  </div>

                  <div className="space-y-4">
                    {feedback && !feedback.includes("PDF parsing encountered") ? (
                      feedback.split("\n").filter(line => line.trim()).map((line, idx) => {
                        const parts = line.split(":");
                        if (parts.length >= 2) {
                          const issue = parts[0].trim();
                          const solution = parts.slice(1).join(":").trim();
                          return (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-700 rounded-lg border border-gray-600">
                              <span className="text-red-400 text-xl font-bold mt-1">⚠</span>
                              <div className="flex-1">
                                <p className="font-semibold text-white mb-1">{issue}</p>
                                <p className="text-gray-300 text-sm">{solution}</p>
                                <p className="text-xs text-gray-500 mt-1">Found in your resume - this reduced your score</p>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                            <p className="text-gray-300">{line}</p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-300 mb-4">
                          We encountered an issue analyzing your resume. Here are proven strategies:
                        </p>
                        <div className="space-y-3 text-left">
                          <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                            <span className="text-green-400 text-lg">✓</span>
                            <p className="text-gray-300">Use standard fonts (Arial, Calibri, Times New Roman)</p>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                            <span className="text-green-400 text-lg">✓</span>
                            <p className="text-gray-300">Include relevant keywords from job descriptions</p>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                            <span className="text-green-400 text-lg">✓</span>
                            <p className="text-gray-300">Use clear section headings (Experience, Skills, Education)</p>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                            <span className="text-green-400 text-lg">✓</span>
                            <p className="text-gray-300">Save as text-based PDF, not image-based</p>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                            <span className="text-green-400 text-lg">✓</span>
                            <p className="text-gray-300">Avoid tables, graphics, and complex formatting</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 text-center">
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => window.location.href = '/resume'}
                    >
                      <span className="mr-2">🚀</span>
                      Improve Now - Use Resume Builder
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Fix these issues automatically with our AI Resume Builder</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready for Challenge</h3>
                <p className="text-gray-400">Upload your resume to unlock detailed ATS insights and level up your job search game</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
