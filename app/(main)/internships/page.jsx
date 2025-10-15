"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Internships() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [internships, setInternships] = useState([]);

  const handleSubmit = async () => {
    if (!role.trim() || !skills.trim() || !location.trim()) {
      alert("Please fill in all fields: role, skills, and location.");
      return;
    }
    setLoading(true);
    setInternships([]);
    try {
      const response = await fetch("/api/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch internships");
      }
      const data = await response.json();
      setInternships(data.internships);
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
        Find Best Internships
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
      >
        <div>
          <label className="block font-semibold mb-2">Desired Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded p-3 focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Software Engineer"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Your Skills (comma-separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border rounded p-3 focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Python, React, Machine Learning"
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
          {loading ? "Finding Internships..." : "Find Internships"}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {internships.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Recommended Internships</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {internships.map((internship, idx) => (
                <motion.div
                  key={internship.internship_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{internship.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{internship.company} - {internship.location}</p>
                  <p className="mb-4">{internship.description}</p>
                  <div className="flex space-x-2 mb-4">
                    <a
                      href={internship.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Apply Now
                    </a>
                    {internship.preparation_course && (
                      <a
                        href={internship.preparation_course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Prepare Now
                      </a>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-indigo-600">Resume Tips</h4>
                      <p className="text-sm">{internship.resume_tips}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-600">Interview Prep Tips</h4>
                      <p className="text-sm">{internship.interview_tips}</p>
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
