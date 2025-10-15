"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Star, Award, CheckCircle, Loader2 } from "lucide-react";

export default function CourseRecommendation() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleSubmit = async () => {
    if (!skills.trim()) {
      alert("Please enter your skills.");
      return;
    }
    setLoading(true);
    setRecommendations([]);
    setCompletedSteps([]);
    try {
      const response = await fetch("/api/course-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, goal }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const timers = [];
      const delays = [0, 0.5, 1, 1.5];
      delays.forEach((delay, index) => {
        const timer = setTimeout(() => {
          setCompletedSteps(prev => [...prev, index]);
        }, (delay + 0.5) * 1000); // Add 0.5s after animation starts
        timers.push(timer);
      });
      return () => timers.forEach(clearTimeout);
    } else {
      setCompletedSteps([]);
    }
  }, [loading]);

  const loadingSteps = [
    { icon: BookOpen, text: "Analyzing your skills...", delay: 0 },
    { icon: Users, text: "Finding relevant courses...", delay: 0.5 },
    { icon: Award, text: "Checking certifications...", delay: 1 },
    { icon: CheckCircle, text: "Preparing recommendations...", delay: 1.5 },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Course Recommendations</h1>
      <div>
        <label className="block font-semibold mb-1">Your Skills (comma-separated)</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="e.g. Python, Data Analysis, Machine Learning"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Your Career Goal (optional)</label>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="e.g. Become a Data Scientist"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
        >
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          </div>
          <div className="space-y-3">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="flex-shrink-0 relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: step.delay
                    }}
                    className="w-5 h-5 text-indigo-600"
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  {completedSteps.includes(index) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-2 h-2 text-white" />
                    </motion.div>
                  )}
                </div>
                <span className={`font-medium ${completedSteps.includes(index) ? 'text-green-700' : 'text-gray-700'}`}>
                  {step.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Courses</h2>
          <ul className="space-y-4">
            {recommendations.slice(0, -1).map((course, idx) => (
              <li key={idx} className="border p-4 rounded shadow flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img src={course.thumbnail} alt={course.course_title} className="w-32 h-24 object-cover rounded" onError={(e) => e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTI4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+VGh1bWJuYWlsPC90ZXh0Pgo8L3N2Zz4K'} />
                </div>
                <div className="flex-1">
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold text-lg hover:underline">
                    {course.course_title}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <p>Platform: {course.platform}</p>
                    <p>Rating: {course.rating}</p>
                    <p>Duration: {course.duration}</p>
                  </div>
                  <p className="italic mt-2 text-sm">{course.reason}</p>
                  <div className="mt-3 flex gap-2">
                    <a href={course.url} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Watch Now
                    </a>
                  </div>
                  {course.certification && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-800">Verified Certification:</p>
                      <p className="text-sm text-green-700">{course.certification.name} by {course.certification.provider}</p>
                      {course.certification.url && (
                        <a href={course.certification.url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">
                          View Certification →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {recommendations.length > 1 && (
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold mb-2">Best Recommendation</h3>
              <div className="border p-4 rounded shadow bg-white flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <img src={recommendations[recommendations.length - 1].thumbnail} alt={recommendations[recommendations.length - 1].course_title} className="w-32 h-24 object-cover rounded" onError={(e) => e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTI4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+VGh1bWJuYWlsPC90ZXh0Pgo8L3N2Zz4K'} />
                </div>
                <div className="flex-1">
                  <a href={recommendations[recommendations.length - 1].url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold text-lg hover:underline">
                    {recommendations[recommendations.length - 1].course_title}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">{recommendations[recommendations.length - 1].description}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <p>Platform: {recommendations[recommendations.length - 1].platform}</p>
                    <p>Rating: {recommendations[recommendations.length - 1].rating}</p>
                    <p>Duration: {recommendations[recommendations.length - 1].duration}</p>
                  </div>
                  <p className="italic mt-2 text-sm">{recommendations[recommendations.length - 1].reason}</p>
                  <div className="mt-3 flex gap-2">
                    <a href={recommendations[recommendations.length - 1].url} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Watch Now
                    </a>
                  </div>
                  {recommendations[recommendations.length - 1].certification && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm font-medium text-green-800">Verified Certification:</p>
                      <p className="text-sm text-green-700">{recommendations[recommendations.length - 1].certification.name} by {recommendations[recommendations.length - 1].certification.provider}</p>
                      {recommendations[recommendations.length - 1].certification.url && (
                        <a href={recommendations[recommendations.length - 1].certification.url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline">
                          View Certification →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
