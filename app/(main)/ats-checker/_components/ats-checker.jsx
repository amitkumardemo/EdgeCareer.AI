"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAtsScore(null);
    setFeedback(null);
    setCurrentStep(0);
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
      toast.error("Please upload a resume file first.");
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
      // Add animation-friendly feedback formatting
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
        <label
          htmlFor="resume-upload"
          className="flex flex-col items-center justify-center gap-2 cursor-pointer text-primary"
        >
          <Upload className="w-10 h-10 text-indigo-600" />
          <span className="text-lg font-semibold">Upload your resume (PDF only)</span>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {file && (
          <p className="mt-2 text-center text-gray-700">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}
        <Button onClick={handleSubmit} disabled={loading} className="mt-4 w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
                      // Parse line for issue and solution if formatted as "Issue: Solution"
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
          <p className="text-gray-500">Upload a resume and check your ATS score.</p>
        )}
      </div>
    </div>
  );
}
