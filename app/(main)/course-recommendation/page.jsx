"use client";

import { useState } from "react";

export default function CourseRecommendation() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async () => {
    if (!skills.trim()) {
      alert("Please enter your skills.");
      return;
    }
    setLoading(true);
    setRecommendations([]);
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

      {recommendations.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Courses</h2>
          <ul className="space-y-4">
            {recommendations.slice(0, -1).map((course, idx) => (
              <li key={idx} className="border p-4 rounded shadow">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold text-lg">
                  {course.course_title}
                </a>
                <p>Platform: {course.platform}</p>
                <p>Rating: {course.rating}</p>
                <p>Duration: {course.duration}</p>
                <p className="italic mt-2">{course.reason}</p>
              </li>
            ))}
          </ul>
          {recommendations.length > 1 && (
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold mb-2">Best Recommendation</h3>
              <div className="border p-4 rounded shadow bg-white">
                <a href={recommendations[recommendations.length - 1].url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold text-lg">
                  {recommendations[recommendations.length - 1].course_title}
                </a>
                <p>Platform: {recommendations[recommendations.length - 1].platform}</p>
                <p>Rating: {recommendations[recommendations.length - 1].rating}</p>
                <p>Duration: {recommendations[recommendations.length - 1].duration}</p>
                <p className="italic mt-2">{recommendations[recommendations.length - 1].reason}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
