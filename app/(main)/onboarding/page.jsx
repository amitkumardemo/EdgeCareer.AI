"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { saveOnboardingData, getColleges } from "@/actions/onboarding";
import { toast } from "sonner";
import { 
  Briefcase, 
  GraduationCap, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  Code, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  FileText,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { industries } from "@/data/industries";
import { Textarea } from "@/components/ui/textarea";

const STEPS = [
  { id: "personal", title: "Personal Info", icon: User },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "profiles", title: "Professional Links", icon: LinkIcon },
  { id: "career", title: "Career Details", icon: Briefcase },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [colleges, setColleges] = useState([]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    collegeId: "",
    collegeName: "",
    department: "",
    branch: "",
    year: "",
    industry: "",
    subIndustry: "",
    experience: "",
    skills: "",
    bio: "",
    resumeLink: "",
    cvLink: "",
    portfolioLink: "",
    githubLink: "",
    leetcodeLink: "",
    linkedinLink: "",
  });

  const [selectedIndustry, setSelectedIndustry] = useState(null);

  useEffect(() => {
    if (formData.industry) {
      const ind = industries.find(i => i.id === formData.industry);
      setSelectedIndustry(ind);
    }
  }, [formData.industry]);

  useEffect(() => {
    getColleges().then(setColleges);
    if (user?.displayName) {
      setFormData(prev => ({ ...prev, fullName: user.displayName }));
    }
  }, [user]);

  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    if (step === 0) {
      if (!formData.fullName) return toast.error("Full name is required");
      setStep(1);
    } else if (step === 1) {
      if (!formData.collegeId) return toast.error("College selection is required");
      if (formData.collegeId === "other" && !formData.collegeName) return toast.error("College name is required");
      if (!formData.department || !formData.year) return toast.error("Education details are required");
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    // Validation for URLs
    const urlFields = ['resumeLink', 'cvLink', 'portfolioLink', 'githubLink', 'leetcodeLink', 'linkedinLink'];
    for (const field of urlFields) {
      if (formData[field] && !validateUrl(formData[field])) {
        return toast.error(`Please enter a valid URL for ${field.replace('Link', '')}`);
      }
    }

    // Specific domain validations as requested
    if (formData.githubLink && !formData.githubLink.startsWith("https://github.com/")) {
      return toast.error("GitHub link must start with https://github.com/");
    }
    const isLinkedinValid = formData.linkedinLink && (
      formData.linkedinLink.startsWith("https://linkedin.com/") || 
      formData.linkedinLink.startsWith("https://www.linkedin.com/")
    );
    if (formData.linkedinLink && !isLinkedinValid) {
      return toast.error("LinkedIn link must start with https://linkedin.com/ or https://www.linkedin.com/");
    }

    // Validate Step 3 (Career)
    if (!formData.industry || !formData.subIndustry || !formData.experience) {
      return toast.error("Please complete all career details");
    }

    setLoading(true);
    try {
      // Extract githubUsername from link if provided
      let githubUsername = "";
      if (formData.githubLink) {
        githubUsername = formData.githubLink.replace("https://github.com/", "").split("/")[0];
      }

      await saveOnboardingData({
        ...formData,
        githubUsername
      });
      
      toast.success("Welcome aboard! Your dashboard is ready.");
      setIsRedirecting(true);
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <Loader2 className="h-10 w-10 text-primary animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-2xl font-bold text-white mt-8 animate-pulse text-center">
          Building Your Career Dashboard...
        </h2>
        <p className="text-gray-500 mt-2 text-sm">Please wait while we personalize your experience</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl text-center mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white animate-in fade-in slide-in-from-top-4 duration-1000">
          Your Career Journey <span className="text-primary italic">Starts Here</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top-4 duration-1000 delay-200">
          Complete your profile to unlock <span className="text-white font-medium text-primary">AI-powered insights</span>, 
          exclusive <span className="text-white font-medium text-primary">internship opportunities</span>, 
          and a professional <span className="text-white font-medium text-primary">industry-grade dashboard</span>.
        </p>
        <div className="flex flex-wrap justify-center gap-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>AI Career Coaching</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Verified Student Profile</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Priority Internship Access</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="flex justify-between gap-4 mb-10 px-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
              <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${i <= step ? "bg-primary" : "bg-white/10"}`} />
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md ${i <= step ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-500"}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className={`text-xs font-semibold ${i <= step ? "text-white" : "text-gray-500"}`}>{s.title}</span>
              </div>
            </div>
          ))}
        </div>

        <Card className="bg-[#0d1117] border-white/10 shadow-2xl">
          <CardHeader className="border-b border-white/5 pb-6">
            <CardTitle className="text-2xl font-bold text-white">
              {step === 0 && "Let's get started!"}
              {step === 1 && "Academic Details"}
              {step === 2 && "Professional Presence"}
              {step === 3 && "Career Preferences"}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {step === 0 && "Tell us a bit about yourself to personalize your experience."}
              {step === 1 && "These details help us match you with the right internships."}
              {step === 2 && "These links will be used for your internship applications."}
              {step === 3 && "This information powers your personalized career dashboard."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-8 space-y-6">
            {step === 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-400">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Enter your full name" 
                    className="bg-white/5 border-white/10 h-11 text-white"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400">College</Label>
                    <Select onValueChange={(val) => setFormData({...formData, collegeId: val})}>
                      <SelectTrigger className="bg-white/5 border-white/10 h-11 text-white">
                        <SelectValue placeholder="Select College" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1117] border-white/10 text-white">
                        {colleges.map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                        <SelectItem value="other">Other (Manual Entry)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.collegeId === "other" && (
                    <div className="space-y-2">
                      <Label className="text-gray-400">Enter College Name</Label>
                      <Input 
                        placeholder="Type your college name" 
                        className="bg-white/5 border-white/10 h-11 text-white"
                        value={formData.collegeName}
                        onChange={e => setFormData({...formData, collegeName: e.target.value})}
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label className="text-gray-400">Department / Course</Label>
                    <Input 
                      placeholder="e.g. B.Tech, MCA" 
                      className="bg-white/5 border-white/10 h-11 text-white"
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400">Branch</Label>
                    <Input 
                      placeholder="e.g. Computer Science" 
                      className="bg-white/5 border-white/10 h-11 text-white"
                      value={formData.branch}
                      onChange={e => setFormData({...formData, branch: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400">Year of Study</Label>
                    <Select onValueChange={(val) => setFormData({...formData, year: val})}>
                      <SelectTrigger className="bg-white/5 border-white/10 h-11 text-white">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1117] border-white/10 text-white">
                        {[1, 2, 3, 4].map(y => (
                          <SelectItem key={y} value={y.toString()}>{y}{y === 1 ? "st" : y === 2 ? "nd" : y === 3 ? "rd" : "th"} Year</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <FileText className="h-3 w-3 text-red-400" /> Resume Link
                    </Label>
                    <Input 
                      placeholder="https://drive.google.com/..." 
                      className="bg-white/5 border-white/10 h-11 text-[10px] text-white"
                      value={formData.resumeLink}
                      onChange={e => setFormData({...formData, resumeLink: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Globe className="h-3 w-3 text-blue-400" /> Portfolio Link
                    </Label>
                    <Input 
                      placeholder="https://yourportfolio.com" 
                      className="bg-white/5 border-white/10 h-11 text-[10px] text-white"
                      value={formData.portfolioLink}
                      onChange={e => setFormData({...formData, portfolioLink: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Github className="h-3 w-3" /> GitHub Profile
                    </Label>
                    <Input 
                      placeholder="https://github.com/username" 
                      className="bg-white/5 border-white/10 h-11 text-[10px] text-white"
                      value={formData.githubLink}
                      onChange={e => setFormData({...formData, githubLink: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Linkedin className="h-3 w-3 text-blue-500" /> LinkedIn Profile
                    </Label>
                    <Input 
                      placeholder="https://linkedin.com/in/username" 
                      className="bg-white/5 border-white/10 h-11 text-[10px] text-white"
                      value={formData.linkedinLink}
                      onChange={e => setFormData({...formData, linkedinLink: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Code className="h-3 w-3 text-orange-500" /> LeetCode Profile
                    </Label>
                    <Input 
                      placeholder="https://leetcode.com/username" 
                      className="bg-white/5 border-white/10 h-11 text-[10px] text-white"
                      value={formData.leetcodeLink}
                      onChange={e => setFormData({...formData, leetcodeLink: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <FileText className="h-3 w-3 text-gray-400" /> CV Link (Optional)
                    </Label>
                    <Input 
                      placeholder="https://..." 
                      className="bg-white/5 border-white/10 h-11 text-[10px] text-white"
                      value={formData.cvLink}
                      onChange={e => setFormData({...formData, cvLink: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-400">Industry</Label>
                    <Select onValueChange={(val) => setFormData({...formData, industry: val, subIndustry: ""})}>
                      <SelectTrigger className="bg-white/5 border-white/10 h-11 text-white">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1117] border-white/10 text-white">
                        {industries.map(ind => (
                          <SelectItem key={ind.id} value={ind.id}>{ind.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-400">Specialization</Label>
                    <Select 
                      onValueChange={(val) => setFormData({...formData, subIndustry: val})}
                      disabled={!formData.industry}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 h-11 text-white">
                        <SelectValue placeholder="Select Specialization" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0d1117] border-white/10 text-white">
                        {selectedIndustry?.subIndustries.map(sub => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Years of Experience</Label>
                  <Input 
                    type="number"
                    placeholder="Enter years of experience" 
                    className="bg-white/5 border-white/10 h-11 text-white"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Skills (Comma separated)</Label>
                  <Input 
                    placeholder="e.g. Python, JavaScript, React" 
                    className="bg-white/5 border-white/10 h-11 text-white"
                    value={formData.skills}
                    onChange={e => setFormData({...formData, skills: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Professional Bio</Label>
                  <Textarea 
                    placeholder="Tell us about yourself..." 
                    className="bg-white/5 border-white/10 min-h-[100px] text-white"
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              {step > 0 && (
                <Button 
                  variant="outline" 
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button 
                className="flex-[2] bg-white hover:bg-white/90 text-black font-bold h-11 transition-all"
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {step === 3 ? "Complete Setup" : "Continue"}
                    {step < 3 && <ArrowRight className="h-4 w-4" />}
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-gray-600 text-[10px] mt-8 flex items-center justify-center gap-4">
          <span>🔒 Secured Data</span>
          <span>🛡️ Verified Profiles</span>
          <span>✨ Automated Applications</span>
        </p>
      </div>
    </div>
  );
}
