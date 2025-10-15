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
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">ATS Resume Analyzer</h1>
        <p className="text-lg text-gray-600">Get professional insights to optimize your resume for Applicant Tracking Systems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Your Resume</h2>
            <p className="text-gray-600">Upload a PDF resume to get detailed ATS compatibility analysis</p>
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-indigo-500 bg-indigo-50 scale-105"
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
            <p className="text-lg font-medium mb-2 text-gray-900">
              Drag & drop your resume here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <Button
              variant="outline"
              size="lg"
              onClick={handleChooseFile}
              className="cursor-pointer border-indigo-300 hover:bg-indigo-50 hover:border-indigo-500"
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
              <p className="mt-4 text-sm text-indigo-600 font-medium">
                Selected: <strong>{file.name}</strong>
              </p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || !file}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Resume...
              </>
            ) : (
              "Analyze ATS Score"
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {loading || currentStep < steps.length ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analysis in Progress</h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {index < currentStep ? (
                      <CheckCircle2 className="text-green-600 w-6 h-6" />
                    ) : index === currentStep ? (
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-6 h-6 border border-gray-300 rounded-full" />
                    )}
                    <span
                      className={`text-lg ${
                        index === currentStep
                          ? "font-semibold text-indigo-600"
                          : index < currentStep
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your ATS Score</h2>
                <div className={`text-6xl font-extrabold mb-4 ${
                  atsScore >= 80 ? 'text-green-600' :
                  atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {atsScore}/100
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      atsScore >= 80 ? 'bg-green-600' :
                      atsScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">
                  {atsScore >= 80 ? 'Excellent! Your resume is ATS-friendly.' :
                   atsScore >= 60 ? 'Good job! Some improvements needed.' :
                   'Needs significant improvements for better ATS compatibility.'}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Improvement Guide</h3>
                <div className="space-y-4">
                  {feedback && !feedback.includes("PDF parsing encountered") ? (
                    feedback.split("\n").filter(line => line.trim()).map((line, idx) => {
                      const parts = line.split(":");
                      if (parts.length >= 2) {
                        const issue = parts[0].trim();
                        const solution = parts.slice(1).join(":").trim();
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                            <span className="text-red-500 text-xl font-bold mt-1">⚠</span>
                            <div>
                              <p className="font-semibold text-gray-900">{issue}</p>
                              <p className="text-gray-700 text-sm">{solution}</p>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="p-3 bg-white rounded-lg border">
                          <p className="text-gray-700">{line}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        We encountered an issue analyzing your resume. Here are general best practices:
                      </p>
                      <div className="space-y-3 text-left">
                        <div className="flex items-start gap-3">
                          <span className="text-green-500 text-lg">✓</span>
                          <p className="text-gray-700">Use standard fonts (Arial, Calibri, Times New Roman)</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-green-500 text-lg">✓</span>
                          <p className="text-gray-700">Include relevant keywords from job descriptions</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-green-500 text-lg">✓</span>
                          <p className="text-gray-700">Use clear section headings (Experience, Skills, Education)</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-green-500 text-lg">✓</span>
                          <p className="text-gray-700">Save as text-based PDF, not image-based</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-green-500 text-lg">✓</span>
                          <p className="text-gray-700">Avoid tables, graphics, and complex formatting</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600">Upload your resume to get detailed ATS insights and improvement recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
