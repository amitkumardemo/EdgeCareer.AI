"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Sparkles, 
  Loader2,
  AlertCircle,
  Briefcase,
  FileText,
  FileCode
} from "lucide-react";
import { toast } from "sonner";

export default function AIModeSection({ onGenerate, isGenerating }) {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    jobRole: "",
    jobDescription: "",
  });
  
  const [resumeInput, setResumeInput] = useState({
    file: null,
    text: "",
  });
  
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleJobDetailsChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError("Please upload a PDF file");
        toast.error("Please upload a PDF file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        toast.error("File size should be less than 5MB");
        return;
      }
      setResumeInput({ file, text: "" });
      setError(null);
      toast.success(`Resume uploaded: ${file.name}`);
    }
  };

  const handleResumeTextChange = (e) => {
    setResumeInput({ file: null, text: e.target.value });
    setError(null);
  };

  const handleGenerate = () => {
    // Validation
    if (!jobDetails.companyName || !jobDetails.jobRole || !jobDetails.jobDescription) {
      setError("Please fill in all job details");
      toast.error("Please fill in all job details");
      return;
    }

    if (!resumeInput.file && !resumeInput.text) {
      setError("Please upload your resume or paste your resume content");
      toast.error("Please provide your existing resume");
      return;
    }

    setError(null);
    onGenerate(jobDetails, resumeInput);
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BOX 1: Job Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="w-5 h-5" />
              BOX 1: Job Details
            </CardTitle>
            <CardDescription>
              Enter the company and position you're targeting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                name="companyName"
                placeholder="e.g., Google, Microsoft, Amazon"
                value={jobDetails.companyName}
                onChange={handleJobDetailsChange}
                disabled={isGenerating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role / Position *</Label>
              <Input
                id="jobRole"
                name="jobRole"
                placeholder="e.g., Software Engineer, Product Manager"
                value={jobDetails.jobRole}
                onChange={handleJobDetailsChange}
                disabled={isGenerating}
              />
            </div>
          </CardContent>
        </Card>

        {/* BOX 2: Job Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileCode className="w-5 h-5" />
              BOX 2: Job Description
            </CardTitle>
            <CardDescription>
              Paste the complete job description or upload JD file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="jobDescription"
              name="jobDescription"
              placeholder="Paste the complete job description here... Include requirements, responsibilities, and qualifications for best results."
              rows={10}
              value={jobDetails.jobDescription}
              onChange={handleJobDetailsChange}
              disabled={isGenerating}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              💡 More details = Better AI optimization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* BOX 3: Resume Source */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5" />
            BOX 3: Your Existing Resume
          </CardTitle>
          <CardDescription>
            Upload your resume PDF or paste the content below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload PDF</TabsTrigger>
              <TabsTrigger value="paste">Paste Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => !isGenerating && fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-1">
                  {resumeInput.file ? resumeInput.file.name : "Click to upload your resume"}
                </p>
                <p className="text-sm text-muted-foreground">
                  PDF format, max 5MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isGenerating}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="paste" className="space-y-4">
              <Textarea
                placeholder="Paste your resume content here... Include all sections (contact, summary, experience, education, skills, projects, etc.)"
                rows={12}
                value={resumeInput.text}
                onChange={handleResumeTextChange}
                disabled={isGenerating}
                className="resize-none"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          size="lg"
          className="w-full md:w-auto px-8"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating ATS-Optimized Resume...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate ATS-Optimized Resume
            </>
          )}
        </Button>
      </div>

      {isGenerating && (
        <Card className="bg-blue-50 dark:bg-blue-950">
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
              <div>
                <h4 className="font-semibold mb-1">AI is Working...</h4>
                <p className="text-sm text-muted-foreground">
                  Analyzing job requirements, extracting keywords, and optimizing your resume
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
