"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobMatches() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleSubmit = async () => {
    if (!role.trim() || !skills.trim() || !location.trim()) {
      alert("Please fill in all fields: role, skills, and location.");
      return;
    }
    setLoading(true);
    setJobs([]);
    try {
      const response = await fetch("/api/job-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch job matches");
      }
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center"
      >
        Get Job Matches
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <label className="block font-semibold mb-2">Job Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded p-3 focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Software Engineer"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border rounded p-3 focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. JavaScript, React, Node.js"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded p-3 focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Bangalore, India"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Finding Jobs..." : "Find Job Matches"}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {jobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Recommended Jobs</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company} - {job.location}</p>
                  <p className="mb-4">{job.description || "No description available."}</p>
                  <div className="flex space-x-2 mb-4">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Apply Now
                    </a>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-indigo-600">Match Score</h4>
                      <p className="text-sm">{job.match_score}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
