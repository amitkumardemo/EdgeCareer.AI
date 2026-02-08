"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Save, Loader2, Wand2, Eye, EyeOff, ArrowLeft, Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resumeSchema } from "@/app/lib/schema";
import { EntryForm } from "./entry-form";
import ResumePreview from "./resume-preview";
import ModeSelector from "./mode-selector";
import AIModeSection from "./ai-mode-section";
import useFetch from "@/hooks/use-fetch";
import { saveResume, improveWithAI } from "@/actions/resume";
import { useUser } from "@clerk/nextjs";
import { CharacterCounter } from "./character-counter";
import { ResumeLimitInfo } from "./resume-limit-info";

export default function DualModeResumeBuilder({ initialContent, initialName, resumeId }) {
  const { user } = useUser();
  const [mode, setMode] = useState("manual"); // 'manual' or 'ai'
  const [showPreview, setShowPreview] = useState(true);
  const [resumeName, setResumeName] = useState(initialName || "My Resume");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedData, setAiGeneratedData] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
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
  } = useFetch(improveWithAI);

  const formValues = watch();

  // Load initial content
  useEffect(() => {
    if (initialContent) {
      try {
        const parsed = JSON.parse(initialContent);
        reset(parsed);
      } catch (error) {
        console.error("Failed to parse initial content:", error);
      }
    }
  }, [initialContent, reset]);

  // Handle save notifications
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

  const handleModeChange = (newMode) => {
    if (mode === newMode) return;
    setMode(newMode);
    toast.success(`Switched to ${newMode === 'manual' ? 'Manual' : 'AI'} mode`);
  };

  const handleAIGenerate = async (jobDetails, resumeInput) => {
    setIsGenerating(true);
    
    try {
      const apiFormData = new FormData();
      apiFormData.append("companyName", jobDetails.companyName);
      apiFormData.append("jobRole", jobDetails.jobRole);
      apiFormData.append("jobDescription", jobDetails.jobDescription);
      
      if (resumeInput.file) {
        apiFormData.append("resumeFile", resumeInput.file);
      } else {
        apiFormData.append("resumeText", resumeInput.text);
      }

      const response = await fetch("/api/ai-resume-generator", {
        method: "POST",
        body: apiFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate resume");
      }

      // Convert AI generated data to form format
      const generatedResume = data.resume;
      setAiGeneratedData(generatedResume);

      // Auto-fill the form with AI data
      reset({
        contactInfo: generatedResume.contactInfo || {},
        summary: generatedResume.summary || "",
        skills: generatedResume.skills || "",
        experience: generatedResume.experience || [],
        education: generatedResume.education || [],
        projects: generatedResume.projects || [],
        achievements: generatedResume.achievements || "",
        positions: generatedResume.positions || "",
        whyIFit: generatedResume.whyIFit || "",
      });

      toast.success(`Resume generated with ${generatedResume.atsScore}% ATS compatibility!`);
      
      // Switch to manual mode to show the filled form
      setMode("manual");
    } catch (error) {
      toast.error(error.message || "Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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

  const generatePDF = async () => {
    try {
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;
      const element = document.getElementById("resume-preview");
      
      if (!element) {
        toast.error("Resume preview not found");
        return;
      }
      
      // Force one-page layout by constraining height
      const A4_HEIGHT_MM = 297; // A4 height in mm
      const MARGIN_MM = 20; // Total margin (top + bottom)
      const MAX_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - MARGIN_MM;
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${formValues.contactInfo?.name || resumeName}_Resume.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          logging: false,
          // Force fixed height to prevent page breaks
          height: element.scrollHeight,
          windowHeight: element.scrollHeight
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait",
          compress: true
        },
        pagebreak: { 
          mode: 'avoid-all',
          avoid: ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'section']
        }
      };

      // Generate PDF
      const pdf = await html2pdf().set(opt).from(element).toPdf().get('pdf');
      
      // Ensure only one page
      if (pdf.internal.getNumberOfPages() > 1) {
        // Delete extra pages
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = totalPages; i > 1; i--) {
          pdf.deletePage(i);
        }
      }
      
      // Save the PDF
      pdf.save(`${formValues.contactInfo?.name || resumeName}_Resume.pdf`);
      
      // Track download if resume is saved
      if (saveResult?.resume?.id) {
        try {
          console.log(`🔄 Tracking download for resume ${saveResult.resume.id}...`);
          
          const response = await fetch('/api/track-download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeId: saveResult.resume.id })
          });
          
          if (response.ok) {
            const result = await response.json();
            console.log("✅ Download tracked successfully:", result);
            
            // Use router refresh instead of full page reload
            window.location.href = window.location.pathname;
          } else {
            const error = await response.json();
            console.error("❌ Download tracking failed:", error);
          }
        } catch (err) {
          console.error("❌ Failed to track download:", err);
        }
      }
      
      toast.success("✅ PDF downloaded! (One page, ATS-optimized)");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    }
  };

  const handleShare = async () => {
    // Check if resume is saved first
    if (!saveResult?.resume?.id) {
      toast.error("Please save your resume before sharing");
      return;
    }

    setIsSharing(true);
    try {
      console.log(`🔄 Sharing resume ${saveResult.resume.id}...`);
      
      const response = await fetch('/api/share-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: saveResult.resume.id })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Share failed:", data.error);
        throw new Error(data.error || "Failed to share resume");
      }

      console.log("✅ Share successful:", data);
      
      // Use the branded URL from the response
      const brandedUrl = data.brandedUrl || data.shareUrl;
      setShareUrl(brandedUrl);
      
      // Copy branded URL to clipboard
      await navigator.clipboard.writeText(brandedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      toast.success("🎉 Share link copied to clipboard!", {
        description: `Branded URL: ${brandedUrl}`,
        duration: 5000,
      });

      console.log(`✅ Resume shared successfully. Share count incremented. Token: ${data.shareToken}`);

      // Use router refresh instead of full page reload
      window.location.href = window.location.pathname;
    } catch (error) {
      console.error("❌ Share error:", error);
      toast.error(error.message || "Failed to share resume");
    } finally {
      setIsSharing(false);
    }
  };

  const copyShareUrl = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard!");
    }
  };

  const onSubmit = async (data) => {
    try {
      const content = JSON.stringify(data);
      // Track mode: 'ai' if AI generated data exists, otherwise 'manual'
      const resumeMode = aiGeneratedData ? "ai" : "manual";
      
      console.log(`🔄 Saving resume... Mode: ${resumeMode}, ID: ${resumeId || 'new'}, Name: ${resumeName}`);
      
      await saveResumeFn(content, resumeId, resumeName, resumeMode);
      
      console.log("✅ Resume saved successfully to database");
    } catch (error) {
      console.error("❌ Save error:", error);
      toast.error("Failed to save resume. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="space-y-2 flex-1">
          <h1 className="font-bold gradient-title text-5xl md:text-6xl">
            Dual-Mode Resume Builder
          </h1>
          <p className="text-muted-foreground">
            Choose your preferred method: Manual forms or AI auto-generation
          </p>
          <div className="max-w-md">
            <Input
              placeholder="Resume name (e.g., Software Engineer Resume)"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
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
          <Button 
            onClick={handleShare} 
            variant="outline"
            disabled={!saveResult?.resume?.id || isSharing}
          >
            {isSharing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sharing...
              </>
            ) : copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mode Selector */}
      <ModeSelector mode={mode} onModeChange={handleModeChange} />

      {/* AI Generated Data Info */}
      {aiGeneratedData && mode === "manual" && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-1">
                  ✓ Resume Auto-Filled by AI
                </h4>
                <p className="text-sm text-green-800">
                  Your resume has been automatically populated with optimized content.
                  ATS Score: <strong>{aiGeneratedData.atsScore}%</strong>
                </p>
                {aiGeneratedData.matchedKeywords && aiGeneratedData.matchedKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {aiGeneratedData.matchedKeywords.slice(0, 8).map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-white">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMode("ai");
                  toast.info("Switched back to AI mode");
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to AI Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resume Limit Info */}
      <ResumeLimitInfo />

      {/* Content Based on Mode */}
      {mode === "ai" ? (
        <AIModeSection 
          onGenerate={handleAIGenerate}
          isGenerating={isGenerating}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Manual Form */}
          <div className="order-2 lg:order-1">
            <div className="h-[calc(100vh-400px)] overflow-y-auto pr-2">
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
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <CharacterCounter
                        current={watch("contactInfo.name")?.length || 0}
                        limit={50}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        {...register("contactInfo.email")}
                        type="email"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mobile (Max 20 chars)</label>
                      <Input
                        {...register("contactInfo.mobile")}
                        type="tel"
                        placeholder="+1 234 567 8900"
                        maxLength={20}
                        className={
                          watch("contactInfo.mobile")?.length >= 20
                            ? "border-red-500"
                            : ""
                        }
                      />
                      <CharacterCounter
                        current={watch("contactInfo.mobile")?.length || 0}
                        limit={20}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">LinkedIn URL</label>
                      <Input
                        {...register("contactInfo.linkedin")}
                        type="url"
                        placeholder="https://linkedin.com/in/your-profile"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">GitHub Profile</label>
                      <Input
                        {...register("contactInfo.github")}
                        type="url"
                        placeholder="https://github.com/your-username"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Portfolio Website</label>
                      <Input
                        {...register("contactInfo.portfolio")}
                        type="url"
                        placeholder="https://yourwebsite.com"
                      />
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
                        <span className="ml-2">AI Enhance</span>
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
                            className={
                              field.value?.length >= 200
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="Write a compelling professional summary..."
                            maxLength={200}
                            rows={4}
                          />
                          <CharacterCounter
                            current={field.value?.length || 0}
                            limit={200}
                          />
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills (Max 300 chars)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Controller
                      name="skills"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-1">
                          <Textarea
                            {...field}
                            className={
                              field.value?.length >= 300
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="List your key skills (e.g., React, Node.js, Python, AWS)"
                            maxLength={300}
                            rows={4}
                          />
                          <CharacterCounter
                            current={field.value?.length || 0}
                            limit={300}
                          />
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Experience */}
                <Card>
                  <CardHeader>
                    <CardTitle>Work Experience (Max 3 entries)</CardTitle>
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
                          maxEntries={3}
                        />
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Projects (Max 3 entries)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Controller
                      name="projects"
                      control={control}
                      render={({ field }) => (
                        <EntryForm
                          type="Projects"
                          entries={field.value}
                          onChange={field.onChange}
                          maxEntries={3}
                        />
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle>Education (Max 2 entries)</CardTitle>
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
                          maxEntries={2}
                        />
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements (Max 3 × 100 chars)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Controller
                      name="achievements"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-1">
                          <Textarea
                            {...field}
                            className={
                              field.value?.length >= 300
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="• Achievement 1 (max 100 chars)&#10;• Achievement 2 (max 100 chars)&#10;• Achievement 3 (max 100 chars)"
                            maxLength={300}
                            rows={4}
                          />
                          <CharacterCounter
                            current={field.value?.length || 0}
                            limit={300}
                          />
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Leadership Positions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Leadership Positions (Max 2 × 110 chars)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Controller
                      name="positions"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-1">
                          <Textarea
                            {...field}
                            className={
                              field.value?.length >= 220
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="• Leadership position 1 (max 110 chars)&#10;• Leadership position 2 (max 110 chars)"
                            maxLength={220}
                            rows={3}
                          />
                          <CharacterCounter
                            current={field.value?.length || 0}
                            limit={220}
                          />
                        </div>
                      )}
                    />
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
                            className={
                              field.value?.length >= 300
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="• Reason 1 (max 100 chars)&#10;• Reason 2 (max 100 chars)&#10;• Reason 3 (max 100 chars)"
                            maxLength={300}
                            rows={4}
                          />
                          <CharacterCounter
                            current={field.value?.length || 0}
                            limit={300}
                          />
                        </div>
                      )}
                    />
                  </CardContent>
                </Card>
              </form>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className={`order-1 lg:order-2 ${showPreview ? "" : "hidden lg:block"}`}>
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    One-page ATS-optimized resume
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[calc(100vh-200px)] overflow-auto">
                    <ResumePreview formData={formValues} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
