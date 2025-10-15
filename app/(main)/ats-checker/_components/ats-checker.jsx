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
        throw new Error(errorData.error || "Failed to analyze resume");
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
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="border rounded-lg p-4 bg-white shadow-md">
        <label className="flex flex-col gap-2">
          <span className="text-lg font-semibold">Upload PDF Resume</span>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium mb-1">
              Drag & drop your resume here
            </p>
            <p className="text-xs text-gray-500 mb-3">or</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleChooseFile}
              className="cursor-pointer"
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
              <p className="mt-3 text-xs text-gray-600">
                Selected: <strong>{file.name}</strong>
              </p>
            )}
          </div>
        </label>
        <Button onClick={handleSubmit} disabled={loading} className="mt-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Check ATS Score"
          )}
        </Button>
      </div>

      <div className="md:col-span-2 p-6 bg-gray-50 rounded shadow">
        {loading || currentStep < steps.length ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Analyzing Resume</h2>
            <ul className="space-y-3">
              {steps.map((step, index) => (
                <li key={index} className="flex items-center gap-3">
                  {index < currentStep ? (
                    <CheckCircle2 className="text-blue-600" />
                  ) : (
                    <div className="w-5 h-5 border border-gray-400 rounded-full" />
                  )}
                  <span
                    className={
                      index === currentStep
                        ? "font-semibold text-blue-600"
                        : "text-gray-700"
                    }
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : atsScore !== null ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Your Score</h2>
              <div className="text-5xl font-extrabold text-indigo-600">
                {atsScore.toFixed(0)}/100
              </div>
              <p className="text-gray-600 mt-1">
                {feedback ? `${feedback.split("\n").length} Issues Found` : ""}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">CONTENT</h3>
              <p className="mb-2">
                ATS Parse Rate:{" "}
                <span className="font-semibold text-indigo-600">
                  {atsScore.toFixed(0)}%
                </span>
              </p>
              <p className="text-gray-700">
                An Applicant Tracking System (ATS) is a system used by employers
                and recruiters to quickly scan a large number of job
                applications. A high parse rate of your resume ensures that the
                ATS can read your resume, experience, and skills.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Improvement Tips</h3>
              <ul className="max-h-64 overflow-y-auto space-y-3">
                {feedback && !feedback.includes("Unable to parse AI response") ? (
                  feedback
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, idx) => {
                      const parts = line.split(":");
                      if (parts.length >= 2) {
                        const issue = parts[0].trim();
                        const solution = parts.slice(1).join(":").trim();
                        return (
                          <li
                            key={idx}
                            className="flex items-start gap-3 animate-fadeIn"
                          >
                            <span className="text-red-600 text-xl font-bold">✗</span>
                            <div>
                              <p className="font-semibold">{issue}</p>
                              <p className="text-gray-700">{solution}</p>
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li key={idx} className="animate-fadeIn">
                          {line}
                        </li>
                      );
                    })
                ) : (
                  <p className="text-gray-600">
                    We encountered an issue parsing your resume. Please review it
                    manually or try again.
                  </p>
                )}
              </ul>
            </div>
          </motion.div>
        ) : (
          <p className="text-gray-500">Upload a PDF resume and check your ATS score.</p>
        )}
      </div>
    </div>
  );
}
