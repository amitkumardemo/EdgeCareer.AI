 "use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Clock, Star, Award, CheckCircle, Loader2, Sparkles, Quote, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CourseRecommendation() {
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [playlists, setPlaylists] = useState([]);
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
      setRecommendations(data.courses || []);
      setPlaylists(data.playlists || []);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Courses</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6">
            Unlock your potential with personalized course recommendations tailored to your skills and career goals
          </p>
          <div className="flex justify-center space-x-8 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Top-Rated Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Certifications</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto p-4 space-y-6 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-black">Get Course Recommendations</CardTitle>
              <CardDescription className="text-center">
                Enter your skills and goals to receive personalized course suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="skills" className="text-sm font-medium flex items-center gap-2 text-black">
                  <Target className="w-4 h-4 text-blue-600" />
                  Your Skills (comma-separated)
                </Label>
                <Input
                  id="skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. Python, Data Analysis, Machine Learning"
                  className="w-full border-2 border-gray-200 focus:border-blue-500 transition-colors text-black"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="goal" className="text-sm font-medium flex items-center gap-2 text-black">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  Your Career Goal (optional)
                </Label>
                <Input
                  id="goal"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. Become a Data Scientist"
                  className="w-full border-2 border-gray-200 focus:border-purple-500 transition-colors text-black"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-lg"
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

        {(recommendations.length > 0 || playlists.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 space-y-12"
          >
            {/* Coursera Courses Section */}
            {recommendations.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  Coursera Certification Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.slice(0, -1).map((course, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                    >
                      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex-shrink-0">
                              <img
                                src={course.thumbnail}
                                alt={course.course_title}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTI4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+VGh1bWJuYWlsPC90ZXh0Pgo8L3N2Zz4K'}
                              />
                            </div>
                            <div className="flex-1">
                              <a
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-semibold text-lg hover:underline line-clamp-2"
                              >
                                {course.course_title}
                              </a>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{course.description}</p>
                              <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {course.platform}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  {course.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.duration}
                                </span>
                                {course.isPaid !== undefined && (
                                  <Badge variant={course.isPaid ? "destructive" : "secondary"} className="text-xs">
                                    {course.isPaid ? "Paid" : "Free"}
                                  </Badge>
                                )}
                              </div>
                              <p className="italic mt-3 text-sm text-gray-700">{course.reason}</p>
                              <div className="mt-4 flex gap-2">
                                <Button asChild size="sm" className="bg-red-600 hover:bg-red-700">
                                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                                    Enroll Now
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {recommendations.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-8"
                  >
                    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 p-6 rounded-lg shadow-lg">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-yellow-500 text-white font-semibold">
                          Top Pick
                        </Badge>
                        <h3 className="text-xl font-semibold text-black">Best Certification Course</h3>
                      </div>
                      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                              <img
                                src={recommendations[recommendations.length - 1].thumbnail}
                                alt={recommendations[recommendations.length - 1].course_title}
                                className="w-40 h-28 object-cover rounded-lg"
                                onError={(e) => e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTI4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+VGh1bWJuYWlsPC90ZXh0Pgo8L3N2Zz4K'}
                              />
                            </div>
                            <div className="flex-1">
                              <a
                                href={recommendations[recommendations.length - 1].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-semibold text-xl hover:underline"
                              >
                                {recommendations[recommendations.length - 1].course_title}
                              </a>
                              <p className="text-sm text-gray-600 mt-2">{recommendations[recommendations.length - 1].description}</p>
                              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {recommendations[recommendations.length - 1].platform}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  {recommendations[recommendations.length - 1].rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {recommendations[recommendations.length - 1].duration}
                                </span>
                                {recommendations[recommendations.length - 1].isPaid !== undefined && (
                                  <Badge variant={recommendations[recommendations.length - 1].isPaid ? "destructive" : "secondary"} className="text-xs">
                                    {recommendations[recommendations.length - 1].isPaid ? "Paid" : "Free"}
                                  </Badge>
                                )}
                              </div>
                              <p className="italic mt-3 text-sm text-gray-700">{recommendations[recommendations.length - 1].reason}</p>
                              <div className="mt-4 flex gap-2">
                                <Button asChild className="bg-red-600 hover:bg-red-700">
                                  <a href={recommendations[recommendations.length - 1].url} target="_blank" rel="noopener noreferrer">
                                    Enroll Now
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* YouTube Playlists Section */}
            {playlists.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-center text-black flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-black" />
                  YouTube Learning Playlists
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {playlists.map((playlist, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                    >
                      <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4">
                            <div className="flex-shrink-0">
                              <img
                                src={playlist.thumbnail}
                                alt={playlist.title}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTI4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTI4IiBoZWlnaHQ9IjcyIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjY0IiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+VGh1bWJuYWlsPC90ZXh0Pgo8L3N2Zz4K'}
                              />
                            </div>
                            <div className="flex-1">
                              <a
                                href={playlist.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 font-semibold text-lg hover:underline line-clamp-2"
                              >
                                {playlist.title}
                              </a>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-3">{playlist.description}</p>
                              <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {playlist.channelTitle}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  {playlist.videoCount} videos
                                </span>
                              </div>
                              <p className="italic mt-3 text-sm text-gray-700">{playlist.reason}</p>
                              <div className="mt-4 flex gap-2">
                                <Button asChild size="sm" className="bg-red-600 hover:bg-red-700">
                                  <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                                    Watch Playlist
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Real experiences from career professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Data Scientist",
                content: "The course recommendations were spot-on! I landed my dream job in data science thanks to the personalized suggestions.",
                rating: 5
              },
              {
                name: "Marcus Johnson",
                role: "Full Stack Developer",
                content: "This platform helped me transition from marketing to tech. The AI-powered recommendations saved me months of research.",
                rating: 5
              },
              {
                name: "Priya Patel",
                role: "UX Designer",
                content: "The certifications I earned through these recommendations opened doors I never thought possible. Highly recommend!",
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
              >
                <Card className="h-full shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-blue-600 mb-4" />
                    <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-16"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex justify-center mb-6"
              >
                <TrendingUp className="w-16 h-16" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have accelerated their career growth with our AI-powered course recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => document.getElementById('skills').focus()}
                >
                  Get Started Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
