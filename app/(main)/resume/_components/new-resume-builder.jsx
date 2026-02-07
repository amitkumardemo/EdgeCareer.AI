"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Loader2, Sparkles, Wand2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resumeSchema } from "@/app/lib/schema";
import { EntryForm } from "./entry-form";
import ResumePreview from "./resume-preview";
import useFetch from "@/hooks/use-fetch";
import { saveResume, improveWithAI } from "@/actions/resume";
import { useUser } from "@clerk/nextjs";
import { CharacterCounter } from "./character-counter";
import { ResumeLimitInfo } from "./resume-limit-info";

export default function NewResumeBuilder({ initialContent }) {
  const { user } = useUser();
  const [showPreview, setShowPreview] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {
        name: user?.fullName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
      },
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
      achievements: "",
      positions: "",
      whyIFit: "",
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const {
    loading: isImproving,
    fn: improveWithAIFn,
    data: improveResult,
  } = useFetch(improveWithAI);

  // Watch all form values for live preview
  const formValues = watch();

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
      if (saveResult.gamification?.earnedBadges?.length > 0) {
        saveResult.gamification.earnedBadges.forEach((badge) => {
          toast.success(`🎉 Badge Earned: ${badge.name}`, {
            description: badge.description,
            duration: 5000,
          });
        });
      }
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  useEffect(() => {
    if (improveResult) {
      toast.success("Content improved with AI!");
    }
  }, [improveResult]);

  const handleImproveWithAI = async (type, currentContent) => {
    if (!currentContent?.trim()) {
      toast.error("Please add some content first");
      return;
    }
    try {
      const improved = await improveWithAIFn({ current: currentContent, type });
      return improved;
    } catch (error) {
      toast.error("Failed to improve content");
    }
  };

  const generateAISuggestions = async () => {
    if (!selectedJobTitle?.trim()) {
      toast.error("Please enter a job title first");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: selectedJobTitle,
          currentSkills: formValues.skills || "",
          currentExperience: formValues.experience || []
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.suggestions || []);
        if (data.suggestions && data.suggestions.length > 0) {
          toast.success(`AI suggestions generated! (${data.suggestions.length} suggestions)`);
        } else {
          toast.error("No suggestions were generated. Please try again.");
        }
      } else {
        toast.error("Failed to generate suggestions");
      }
    } catch (error) {
      console.error("AI suggestions error:", error);
      toast.error("Error generating AI suggestions");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePDF = async () => {
    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
      const element = document.getElementById("resume-preview");
      
      const opt = {
        margin: [10, 10],
        filename: `${formValues.contactInfo?.name || 'Resume'}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait" 
        },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const onSubmit = async (data) => {
    try {
      // Convert form data to markdown for storage
      const content = JSON.stringify(data);
      await saveResumeFn(content);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="space-y-2">
          <h1 className="font-bold gradient-title text-5xl md:text-6xl">
            AI Resume Builder
          </h1>
          <p className="text-muted-foreground">
            Build ATS-optimized resumes with live preview
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden"
          >
            {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button onClick={generatePDF} variant="default">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Limit Info */}
      <ResumeLimitInfo />

      {/* AI Tools Bar */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter job title for AI suggestions..."
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                className="max-w-md"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={generateAISuggestions}
                disabled={isAnalyzing || !selectedJobTitle}
              >
                {isAnalyzing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get AI Suggestions
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 AI will suggest skills, keywords, and improvements based on the job title
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions Display */}
      {aiSuggestions.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Suggestions for {selectedJobTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium">{suggestion.title}</p>
                      <Badge
                        variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{suggestion.description}</p>
                    {suggestion.keywords && suggestion.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {suggestion.keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        if (suggestion.type === 'skill') {
                          const currentSkills = formValues.skills || '';
                          const newSkills = currentSkills ? `${currentSkills}, ${suggestion.keywords.join(', ')}` : suggestion.keywords.join(', ');
                          setValue('skills', newSkills);
                          toast.success(`Skills added: ${suggestion.keywords.join(', ')}`);
                        } else if (suggestion.type === 'summary') {
                          setValue('summary', suggestion.description);
                          toast.success('Summary updated with AI suggestion!');
                        }
                      }}
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="order-2 lg:order-1">
          <div className="h-[calc(100vh-300px)] overflow-y-auto pr-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pr-4">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name (Max 50 chars)</label>
                    <Input
                      {...register("contactInfo.name")}
                      placeholder="Your full name"
                      maxLength={50}
                      className={
                        watch("contactInfo.name")?.length >= 50
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    />
                    <CharacterCounter
                      current={watch("contactInfo.name")?.length || 0}
                      limit={50}
                    />
                    {errors.contactInfo?.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.contactInfo.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      {...register("contactInfo.email")}
                      type="email"
                      placeholder="your@email.com"
                    />
                    {errors.contactInfo?.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.contactInfo.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mobile Number (Max 20 chars)</label>
                    <Input
                      {...register("contactInfo.mobile")}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      maxLength={20}
                      className={
                        watch("contactInfo.mobile")?.length >= 20
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }
                    />
                    <CharacterCounter
                      current={watch("contactInfo.mobile")?.length || 0}
                      limit={20}
                    />
                    {errors.contactInfo?.mobile && (
                      <p className="text-sm text-red-500 mt-1">{errors.contactInfo.mobile.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">LinkedIn URL</label>
                    <Input
                      {...register("contactInfo.linkedin")}
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                    {errors.contactInfo?.linkedin && (
                      <p className="text-sm text-red-500 mt-1">{errors.contactInfo.linkedin.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">GitHub Profile</label>
                    <Input
                      {...register("contactInfo.github")}
                      type="url"
                      placeholder="https://github.com/your-username"
                    />
                    {errors.contactInfo?.github && (
                      <p className="text-sm text-red-500 mt-1">{errors.contactInfo.github.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Portfolio Website</label>
                    <Input
                      {...register("contactInfo.portfolio")}
                      type="url"
                      placeholder="https://yourwebsite.com"
                    />
                    {errors.contactInfo?.portfolio && (
                      <p className="text-sm text-red-500 mt-1">{errors.contactInfo.portfolio.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Professional Summary (Max 200 chars)</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        const improved = await handleImproveWithAI("summary", formValues.summary);
                        if (improved) setValue("summary", improved);
                      }}
                      disabled={isImproving || !formValues.summary}
                    >
                      {isImproving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                      AI Enhance
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="summary"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Textarea
                          {...field}
                          className={`h-32 ${
                            field.value?.length >= 200
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="Write a compelling professional summary..."
                          maxLength={200}
                        />
                        <CharacterCounter
                          current={field.value?.length || 0}
                          limit={200}
                        />
                      </div>
                    )}
                  />
                  {errors.summary && (
                    <p className="text-sm text-red-500 mt-2">{errors.summary.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Skills (Max 12 per category)</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        const improved = await handleImproveWithAI("skills", formValues.skills);
                        if (improved) setValue("skills", improved);
                      }}
                      disabled={isImproving || !formValues.skills}
                    >
                      {isImproving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="h-4 w-4" />
                      )}
                      AI Enhance
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Textarea
                          {...field}
                          className={`h-32 ${
                            field.value?.length >= 300
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="List your key skills (e.g., React, Node.js, Python, AWS)"
                          maxLength={300}
                        />
                        <CharacterCounter
                          current={field.value?.length || 0}
                          limit={300}
                        />
                      </div>
                    )}
                  />
                  {errors.skills && (
                    <p className="text-sm text-red-500 mt-2">{errors.skills.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <EntryForm
                        type="Experience"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="education"
                    control={control}
                    render={({ field }) => (
                      <EntryForm
                        type="Education"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="projects"
                    control={control}
                    render={({ field }) => (
                      <EntryForm
                        type="Project"
                        entries={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements / Certifications (Max 3 × 100 chars)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="achievements"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Textarea
                          {...field}
                          className={`h-32 ${
                            field.value?.length >= 300
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="• Achievement 1 (max 100 chars)&#10;• Achievement 2 (max 100 chars)&#10;• Achievement 3 (max 100 chars)"
                          maxLength={300}
                        />
                        <CharacterCounter
                          current={field.value?.length || 0}
                          limit={300}
                        />
                      </div>
                    )}
                  />
                  {errors.achievements && (
                    <p className="text-sm text-red-500 mt-2">{errors.achievements.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Positions of Responsibility */}
              <Card>
                <CardHeader>
                  <CardTitle>Leadership / Positions (Max 2 × 110 chars)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="positions"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Textarea
                          {...field}
                          className={`h-32 ${
                            field.value?.length >= 220
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="• Leadership position 1 (max 110 chars)&#10;• Leadership position 2 (max 110 chars)"
                          maxLength={220}
                        />
                        <CharacterCounter
                          current={field.value?.length || 0}
                          limit={220}
                        />
                      </div>
                    )}
                  />
                  {errors.positions && (
                    <p className="text-sm text-red-500 mt-2">{errors.positions.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Why I Fit This Role */}
              <Card>
                <CardHeader>
                  <CardTitle>Why I Fit This Role (Max 3 × 100 chars)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Controller
                    name="whyIFit"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Textarea
                          {...field}
                          className={`h-32 ${
                            field.value?.length >= 300
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="• Reason 1 (max 100 chars)&#10;• Reason 2 (max 100 chars)&#10;• Reason 3 (max 100 chars)"
                          maxLength={300}
                        />
                        <CharacterCounter
                          current={field.value?.length || 0}
                          limit={300}
                        />
                      </div>
                    )}
                  />
                  {errors.whyIFit && (
                    <p className="text-sm text-red-500 mt-2">{errors.whyIFit.message}</p>
                  )}
                </CardContent>
              </Card>
            </form>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className={`order-1 lg:order-2 ${showPreview ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Live Preview</h3>
              <p className="text-sm text-muted-foreground">Your resume updates as you type</p>
            </div>
            <div className="h-[calc(100vh-200px)] overflow-y-auto border rounded-lg bg-gray-50 p-4">
              <ResumePreview formData={formValues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
