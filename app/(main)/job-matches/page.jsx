"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Briefcase, Code, MapPin, Building, Star, Users, Globe, Award, ArrowRight, CheckCircle, BookOpen, Target, Search, Filter } from "lucide-react";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

// Job matching testimonials
const jobTestimonials = [
  {
    quote: "The job matching algorithm found me opportunities I never would have discovered. Got my dream job in just 2 weeks!",
    author: "Sarah Chen",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    role: "Senior Software Engineer",
    company: "Tech Giant Inc",
  },
  {
    quote: "The personalized job recommendations were incredibly accurate. It understood my skills and career goals perfectly.",
    author: "Michael Rodriguez",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    role: "Product Manager",
    company: "Startup Co",
  },
  {
    quote: "Saved me hours of searching. The AI-powered matching found relevant positions that matched my experience level.",
    author: "Emily Johnson",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    role: "Data Scientist",
    company: "Analytics Corp",
  },
];

export default function JobMatches() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleSubmit = async () => {
    if (!role.trim() || !skills.trim() || !location.trim()) {
      alert("Please fill in all required fields: role, skills, and location.");
      return;
    }
    setLoading(true);
    setJobs([]);
    try {
      const response = await fetch("/api/job-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills, location, experience }),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your Perfect Job Match
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover personalized job opportunities that match your skills, experience, and career aspirations.
              Get matched with the right roles that align with your professional goals.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Jobs</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600">2000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Companies</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Match Accuracy</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-600">24hrs</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Response</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('search-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Start Job Search <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Form */}
      <section id="search-form" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Tell Us About Your Ideal Job</h2>
            <p className="text-gray-600 dark:text-gray-300">Our AI will find the best matches based on your profile and preferences.</p>
          </motion.div>

          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                    Desired Role *
                  </label>
                  <Input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Software Engineer, Product Manager"
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Code className="h-4 w-4 mr-2 text-green-600" />
                    Key Skills *
                  </label>
                  <Input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. Python, React, Machine Learning"
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-2 text-red-600" />
                    Location *
                  </label>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India or Remote"
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Award className="h-4 w-4 mr-2 text-purple-600" />
                    Experience Level
                  </label>
                  <Input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 2-3 years, Entry Level, Senior"
                    className="h-12 text-base"
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
              >
                {loading ? "Finding Your Perfect Matches..." : "Find My Job Matches"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Loading Animation */}
      {loading && (
        <section className="py-16 px-4">
          <Card className="mx-auto max-w-2xl shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardContent className="text-center space-y-8 py-16">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 w-20 h-20 bg-purple-600/20 rounded-full mx-auto"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">AI-Powered Job Matching</h3>
                <p className="text-gray-600 dark:text-gray-300">Analyzing thousands of job postings to find your perfect matches</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-sm font-medium">Scanning Jobs</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-sm font-medium">Matching Skills</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-green-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <Filter className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-sm font-medium">Ranking Results</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-purple-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1.5 }}
                    />
                  </div>
                </motion.div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">This usually takes 15-20 seconds...</p>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Enhanced Results Display */}
      <AnimatePresence>
        {jobs.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold mb-4">Your Personalized Job Matches</h2>
                <p className="text-gray-600 dark:text-gray-300">Based on your profile, here are the best opportunities that match your skills and career goals.</p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2">
                {jobs.map((job, idx) => (
                  <motion.div
                    key={job.job_id || `job-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="h-full shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2 line-clamp-2">{job.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-1" />
                                  {job.company}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {job.location}
                                </div>
                              </div>
                              <div className="flex items-center mt-2">
                                <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full">
                                  {job.match_percentage}% Match
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">4.{Math.floor(Math.random() * 5) + 5}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{job.description}</p>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              asChild
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <a href={job.apply_link} target="_blank" rel="noopener noreferrer">
                                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                            {job.salary_range && (
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Salary: {job.salary_range}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-blue-600 mb-1">Why This Matches You</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{job.match_reasons}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-semibold text-purple-600 mb-1">Application Tips</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{job.application_tips}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Success Stories from Job Seekers</h2>
            <p className="text-gray-600 dark:text-gray-300">Real stories from professionals who found their dream jobs through our platform.</p>
          </motion.div>

          <TestimonialCarousel testimonials={jobTestimonials} />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">Ready to Find Your Dream Job?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of professionals who have found their perfect career matches.
              Start your job search journey today and get matched with opportunities that fit your ambitions.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Smart Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">AI-powered algorithm finds the most relevant opportunities for you.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Quality Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-400">Access to verified job postings from top companies worldwide.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Global Reach</h3>
                <p className="text-gray-600 dark:text-gray-400">Find opportunities in your preferred locations or work remotely.</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => document.getElementById('search-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Start Your Job Search <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">No credit card required • Free to start</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
