 // "use client";

// import { useState, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   AlertTriangle,
//   Download,
//   Edit,
//   Loader2,
//   Monitor,
//   Save,
// } from "lucide-react";
// import { toast } from "sonner";
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "@/components/ui/button";
// import { BUTTONS_MENUS } from "@/lib/constants";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { saveResume } from "@/actions/resume";
// import { EntryForm } from "./entry-form";
// import useFetch from "@/hooks/use-fetch";
// import { useUser } from "@clerk/nextjs";
// import { entriesToMarkdown } from "@/app/lib/helper";
// import { resumeSchema } from "@/app/lib/schema";
// import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

// export default function ResumeBuilder({ initialContent }) {
//   const [activeTab, setActiveTab] = useState("edit");
//   const [previewContent, setPreviewContent] = useState(initialContent);
//   const { user } = useUser();
//   const [resumeMode, setResumeMode] = useState("preview");

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(resumeSchema),
//     defaultValues: {
//       contactInfo: {},
//       summary: "",
//       skills: "",
//       experience: [],
//       education: [],
//       projects: [],
//     },
//   });

//   const {
//     loading: isSaving,
//     fn: saveResumeFn,
//     data: saveResult,
//     error: saveError,
//   } = useFetch(saveResume);

//   // Watch form fields for preview updates
//   const formValues = watch();

//   useEffect(() => {
//     if (initialContent) setActiveTab("preview");
//   }, [initialContent]);

//   // Update preview content when form values change
//   useEffect(() => {
//     if (activeTab === "edit") {
//       const newContent = getCombinedContent();
//       setPreviewContent(newContent ? newContent : initialContent);
//     }
//   }, [formValues, activeTab]);

//   // Handle save result
//   useEffect(() => {
//     if (saveResult && !isSaving) {
//       toast.success("Resume saved successfully!");
//     }
//     if (saveError) {
//       toast.error(saveError.message || "Failed to save resume");
//     }
//   }, [saveResult, saveError, isSaving]);

//   const getContactMarkdown = () => {
//     const { contactInfo } = formValues;
//     const parts = [];
//     if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
//     if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
//     if (contactInfo.linkedin)
//       parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
//     if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

//     return parts.length > 0
//       ? `## <div align="center">${user.fullName}</div>
//         \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
//       : "";
//   };

//   const getCombinedContent = () => {
//     const { summary, skills, experience, education, projects } = formValues;
//     return [
//       getContactMarkdown(),
//       summary && `## Professional Summary\n\n${summary}`,
//       skills && `## Skills\n\n${skills}`,
//       entriesToMarkdown(experience, "Work Experience"),
//       entriesToMarkdown(education, "Education"),
//       entriesToMarkdown(projects, "Projects"),
//     ]
//       .filter(Boolean)
//       .join("\n\n");
//   };

//   const [isGenerating, setIsGenerating] = useState(false);

//   const generatePDF = async () => {
//     setIsGenerating(true);
//     try {
//       const element = document.getElementById("resume-pdf");
//       const opt = {
//         margin: [15, 15],
//         filename: "resume.pdf",
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//       };

//       await html2pdf().set(opt).from(element).save();
//     } catch (error) {
//       console.error("PDF generation error:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       const formattedContent = previewContent
//         .replace(/\n/g, "\n") // Normalize newlines
//         .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
//         .trim();

//       console.log(previewContent, formattedContent);
//       await saveResumeFn(previewContent);
//     } catch (error) {
//       console.error("Save error:", error);
//     }
//   };

//   return (
//     <div data-color-mode="light" className="space-y-4">
//       <div className="flex flex-col md:flex-row justify-between items-center gap-2">
//         <h1 className="font-bold gradient-title text-5xl md:text-6xl">
//           Resume Builder
//         </h1>
//         <div className="space-x-2">
//           <Button
//             variant="destructive"
//             onClick={handleSubmit(onSubmit)}
//             disabled={isSaving}
//           >
//             {isSaving ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="h-4 w-4" />
//                 {BUTTONS_MENUS.SAVE}
//               </>
//             )}
//           </Button>
//           <Button onClick={generatePDF} disabled={isGenerating}>
//             {isGenerating ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Generating PDF...
//               </>
//             ) : (
//               <>
//                 <Download className="h-4 w-4" />
//                 {BUTTONS_MENUS.DOWNLOAD}
//               </>
//             )}
//           </Button>
//         </div>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="edit">Form</TabsTrigger>
//           <TabsTrigger value="preview">Markdown</TabsTrigger>
//         </TabsList>

//         <TabsContent value="edit">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Contact Information */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Contact Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Email</label>
//                   <Input
//                     {...register("contactInfo.email")}
//                     type="email"
//                     placeholder="your@email.com"
//                     error={errors.contactInfo?.email}
//                   />
//                   {errors.contactInfo?.email && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.email.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Mobile Number</label>
//                   <Input
//                     {...register("contactInfo.mobile")}
//                     type="tel"
//                     placeholder="+1 234 567 8900"
//                   />
//                   {errors.contactInfo?.mobile && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.mobile.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">LinkedIn URL</label>
//                   <Input
//                     {...register("contactInfo.linkedin")}
//                     type="url"
//                     placeholder="https://linkedin.com/in/your-profile"
//                   />
//                   {errors.contactInfo?.linkedin && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.linkedin.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Twitter/X Profile
//                   </label>
//                   <Input
//                     {...register("contactInfo.twitter")}
//                     type="url"
//                     placeholder="https://twitter.com/your-handle"
//                   />
//                   {errors.contactInfo?.twitter && (
//                     <p className="text-sm text-red-500">
//                       {errors.contactInfo.twitter.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Summary */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Professional Summary</h3>
//               <Controller
//                 name="summary"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="h-32"
//                     placeholder="Write a compelling professional summary..."
//                     error={errors.summary}
//                   />
//                 )}
//               />
//               {errors.summary && (
//                 <p className="text-sm text-red-500">{errors.summary.message}</p>
//               )}
//             </div>

//             {/* Skills */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Skills</h3>
//               <Controller
//                 name="skills"
//                 control={control}
//                 render={({ field }) => (
//                   <Textarea
//                     {...field}
//                     className="h-32"
//                     placeholder="List your key skills..."
//                     error={errors.skills}
//                   />
//                 )}
//               />
//               {errors.skills && (
//                 <p className="text-sm text-red-500">{errors.skills.message}</p>
//               )}
//             </div>

//             {/* Experience */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Work Experience</h3>
//               <Controller
//                 name="experience"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Experience"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.experience && (
//                 <p className="text-sm text-red-500">
//                   {errors.experience.message}
//                 </p>
//               )}
//             </div>

//             {/* Education */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Education</h3>
//               <Controller
//                 name="education"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Education"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.education && (
//                 <p className="text-sm text-red-500">
//                   {errors.education.message}
//                 </p>
//               )}
//             </div>

//             {/* Projects */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Projects</h3>
//               <Controller
//                 name="projects"
//                 control={control}
//                 render={({ field }) => (
//                   <EntryForm
//                     type="Project"
//                     entries={field.value}
//                     onChange={field.onChange}
//                   />
//                 )}
//               />
//               {errors.projects && (
//                 <p className="text-sm text-red-500">
//                   {errors.projects.message}
//                 </p>
//               )}
//             </div>
//           </form>
//         </TabsContent>

//         <TabsContent value="preview">
//           {activeTab === "preview" && (
//             <Button
//               variant="link"
//               type="button"
//               className="mb-2"
//               onClick={() =>
//                 setResumeMode(resumeMode === "preview" ? "edit" : "preview")
//               }
//             >
//               {resumeMode === "preview" ? (
//                 <>
//                   <Edit className="h-4 w-4" />
//                   Edit Resume
//                 </>
//               ) : (
//                 <>
//                   <Monitor className="h-4 w-4" />
//                   Show Preview
//                 </>
//               )}
//             </Button>
//           )}

//           {activeTab === "preview" && resumeMode !== "preview" && (
//             <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
//               <AlertTriangle className="h-5 w-5" />
//               <span className="text-sm">
//                 You will lose editied markdown if you update the form data.
//               </span>
//             </div>
//           )}
//           <div className="border rounded-lg">
//             <MDEditor
//               value={previewContent}
//               onChange={setPreviewContent}
//               height={800}
//               preview={resumeMode}
//             />
//           </div>
//           <div className="hidden">
//             <div id="resume-pdf">
//               <MDEditor.Markdown
//                 source={previewContent}
//                 style={{
//                   background: "white",
//                   color: "black",
//                 }}
//               />
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
  Sparkles,
  Wand2,
  Target,
  Zap,
  Trophy,
  Lightbulb,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { BUTTONS_MENUS } from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { saveResume, improveWithAI, atsChecker } from "@/actions/resume";

import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [atsScore, setAtsScore] = useState(null);
  const [atsFeedback, setAtsFeedback] = useState("");
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
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
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

  const {
    loading: isCheckingATS,
    fn: checkATSFn,
    data: atsResult,
  } = useFetch(atsChecker);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
      // Show earned badges
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

  useEffect(() => {
    if (atsResult) {
      setAtsScore(atsResult.atsScore);
      setAtsFeedback(atsResult.feedback);
      toast.success(`ATS Score: ${atsResult.atsScore}/100`);
    }
  }, [atsResult]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.github) parts.push(`💻 [GitHub](${contactInfo.github})`);

    const displayName = contactInfo.name || (user?.fullName) || "Your Name";

    return parts.length > 0
      ? `## <div align="center">${displayName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : `## <div align="center">${displayName}</div>`;
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Dynamic import to avoid SSR issues
      const html2pdf = (await import("html2pdf.js/dist/html2pdf.min.js")).default;

      const element = document.getElementById("resume-pdf");
      const opt = {
        margin: [15, 15],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      const formattedContent = previewContent
        .replace(/\n/g, "\n")
        .replace(/\n\s*\n/g, "\n\n")
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImproveWithAI = async (type, currentContent) => {
    if (!currentContent?.trim()) {
      toast.error("Please add some content first");
      return;
    }
    try {
      await improveWithAIFn({ current: currentContent, type });
    } catch (error) {
      toast.error("Failed to improve content");
    }
  };

  const handleATSAnalysis = async () => {
    if (!previewContent?.trim()) {
      toast.error("Please create a resume first");
      return;
    }
    try {
      // Create a temporary file-like object for ATS checking
      const resumeBlob = new Blob([previewContent], { type: 'text/plain' });
      const file = new File([resumeBlob], 'resume.txt', { type: 'text/plain' });
      await checkATSFn(file);
    } catch (error) {
      toast.error("Failed to analyze ATS score");
    }
  };

  const generateAISuggestions = async () => {
    if (!selectedJobTitle?.trim()) {
      toast.error("Please enter a job title first");
      return;
    }

    setIsAnalyzing(true);
    try {
      // Use Gemini API to generate suggestions
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
        console.log("AI suggestions data:", data);
        console.log("Suggestions array:", data.suggestions);
        setAiSuggestions(data.suggestions || []);
        if (data.suggestions && data.suggestions.length > 0) {
          toast.success(`AI suggestions generated! (${data.suggestions.length} suggestions)`);
        } else {
          toast.error("No suggestions were generated. Please try again.");
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error:", errorData);
        toast.error("Failed to generate suggestions");
      }
    } catch (error) {
      console.error("AI suggestions error:", error);
      toast.error("Error generating AI suggestions");
    } finally {
      setIsAnalyzing(false);
    }
  };



  return (
    <div data-color-mode="light" className="space-y-6">
      {/* Header with AI Features */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="space-y-2">
          <h1 className="font-bold gradient-title text-5xl md:text-6xl">
            AI Resume Builder
          </h1>
          <p className="text-muted-foreground">
            Build ATS-optimized resumes with AI-powered suggestions
          </p>
        </div>

        {/* ATS Score Display */}
        {atsScore !== null && (
          <Card className="min-w-[200px]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>ATS Score</span>
                    <span className="font-bold">{atsScore}/100</span>
                  </div>
                  <Progress value={atsScore} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Tools Bar */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="p-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter job title for AI suggestions..."
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={generateAISuggestions}
                disabled={isAnalyzing || !selectedJobTitle}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
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
              💡 After generating suggestions, they will show in the Markdown tab. Please check and apply them before building your resume.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="destructive"
          onClick={handleSubmit(onSubmit)}
          disabled={isSaving || isProcessing}
        >
          {isSaving || isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isProcessing ? "Processing..." : "Saving..."}
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {BUTTONS_MENUS.SAVE}
            </>
          )}
        </Button>
        <Button onClick={generatePDF} disabled={isGenerating || isProcessing}>
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              {BUTTONS_MENUS.DOWNLOAD}
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit" disabled={isProcessing}>
            Form
          </TabsTrigger>
          <TabsTrigger value="preview" disabled={isProcessing}>
            Markdown
          </TabsTrigger>
        </TabsList>

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center h-96 border rounded-lg bg-muted/50">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-lg font-medium">
                  AI is enhancing your resume
                </h3>
                <p className="text-sm text-muted-foreground">
                  This may take a few moments...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="edit">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <fieldset disabled={isProcessing} className="space-y-8">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input
                          {...register("contactInfo.name")}
                          type="text"
                          placeholder="Your full name"
                        />
                        {errors.contactInfo?.name && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          {...register("contactInfo.email")}
                          type="email"
                          placeholder="your@email.com"
                          error={errors.contactInfo?.email}
                        />
                        {errors.contactInfo?.email && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Mobile Number
                        </label>
                        <Input
                          {...register("contactInfo.mobile")}
                          type="tel"
                          placeholder="+1 234 567 8900"
                        />
                        {errors.contactInfo?.mobile && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.mobile.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          LinkedIn URL
                        </label>
                        <Input
                          {...register("contactInfo.linkedin")}
                          type="url"
                          placeholder="https://linkedin.com/in/your-profile"
                        />
                        {errors.contactInfo?.linkedin && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.linkedin.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          GitHub Profile
                        </label>
                        <Input
                          {...register("contactInfo.github")}
                          type="url"
                          placeholder="https://github.com/your-username"
                        />
                        {errors.contactInfo?.github && (
                          <p className="text-sm text-red-500">
                            {errors.contactInfo.github.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Professional Summary</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleImproveWithAI("summary", formValues.summary)}
                        disabled={isImproving || !formValues.summary}
                        className="text-primary hover:text-primary/80"
                      >
                        {isImproving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="h-4 w-4" />
                        )}
                        AI Enhance
                      </Button>
                    </div>
                    <Controller
                      name="summary"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className="h-32"
                          placeholder="Write a compelling professional summary..."
                          error={errors.summary}
                        />
                      )}
                    />
                    {errors.summary && (
                      <p className="text-sm text-red-500">
                        {errors.summary.message}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Skills</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleImproveWithAI("skills", formValues.skills)}
                        disabled={isImproving || !formValues.skills}
                        className="text-primary hover:text-primary/80"
                      >
                        {isImproving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="h-4 w-4" />
                        )}
                        AI Enhance
                      </Button>
                    </div>
                    <Controller
                      name="skills"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          className="h-32"
                          placeholder="List your key skills..."
                          error={errors.skills}
                        />
                      )}
                    />
                    {errors.skills && (
                      <p className="text-sm text-red-500">
                        {errors.skills.message}
                      </p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Work Experience</h3>
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
                    {errors.experience && (
                      <p className="text-sm text-red-500">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>

                  {/* Education */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Education</h3>
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
                    {errors.education && (
                      <p className="text-sm text-red-500">
                        {errors.education.message}
                      </p>
                    )}
                  </div>

                  {/* Projects */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Projects</h3>
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
                    {errors.projects && (
                      <p className="text-sm text-red-500">
                        {errors.projects.message}
                      </p>
                    )}
                  </div>
                </fieldset>
              </form>
            </TabsContent>

            <TabsContent value="preview">
              {/* AI Suggestions Panel */}
              {aiSuggestions.length > 0 && (
                <Card className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                  <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    AI Suggestions for {selectedJobTitle}
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/80 rounded-lg">
                          {suggestion.priority === 'high' ? (
                            <TrendingUp className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          ) : suggestion.priority === 'medium' ? (
                            <Target className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          )}
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
                            <p className="text-sm text-black">{suggestion.description}</p>
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
                                // Apply suggestion to form
                                if (suggestion.type === 'skill') {
                                  const currentSkills = formValues.skills || '';
                                  const newSkills = currentSkills ? `${currentSkills}, ${suggestion.keywords.join(', ')}` : suggestion.keywords.join(', ');
                                  setValue('skills', newSkills);
                                  toast.success(`Skills added: ${suggestion.keywords.join(', ')}`);
                                } else if (suggestion.type === 'summary') {
                                  setValue('summary', suggestion.description);
                                  toast.success('Summary updated with AI suggestion!');
                                } else {
                                  toast.success('Suggestion applied to your resume!');
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

              {/* ATS Feedback */}
              {atsFeedback && (
                <Card className="mb-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-600" />
                      ATS Analysis Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{atsFeedback}</p>
                  </CardContent>
                </Card>
              )}

              {activeTab === "preview" && (
                <Button
                  variant="link"
                  type="button"
                  className="mb-2"
                  onClick={() =>
                    setResumeMode(resumeMode === "preview" ? "edit" : "preview")
                  }
                  disabled={isProcessing}
                >
                  {resumeMode === "preview" ? (
                    <>
                      <Edit className="h-4 w-4" />
                      Edit Resume
                    </>
                  ) : (
                    <>
                      <Monitor className="h-4 w-4" />
                      Show Preview
                    </>
                  )}
                </Button>
              )}

              {activeTab === "preview" && resumeMode !== "preview" && (
                <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm">
                    You will lose edited markdown if you update the form data.
                  </span>
                </div>
              )}
              <div className="border rounded-lg">
                <MDEditor
                  value={previewContent}
                  onChange={setPreviewContent}
                  height={800}
                  preview={resumeMode}
                />
              </div>
              <div className="hidden">
                <div id="resume-pdf">
                  <MDEditor.Markdown
                    source={previewContent}
                    style={{
                      background: "white",
                      color: "black",
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}