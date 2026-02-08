"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  FileText,
  Briefcase,
  Target
} from "lucide-react";
import AIResumePreview from "./_components/ai-resume-preview";

export default function AIResumeGeneratorPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    jobDescription: "",
  });
  
  const [resumeInput, setResumeInput] = useState({
    file: null,
    text: "",
    inputMethod: "upload" // 'upload' or 'paste'
  });

  const [generatedResume, setGeneratedResume] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError("Please upload a PDF file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("File size should be less than 5MB");
        return;
      }
      setResumeInput(prev => ({ ...prev, file, text: "" }));
      setError(null);
    }
  };

  const handleResumeTextChange = (e) => {
    setResumeInput(prev => ({ ...prev, text: e.target.value, file: null }));
  };

  const handleGenerate = async () => {
    // Validation
    if (!formData.companyName || !formData.jobRole || !formData.jobDescription) {
      setError("Please fill in all job details");
      return;
    }

    if (!resumeInput.file && !resumeInput.text) {
      setError("Please upload your resume or paste your resume content");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedResume(null);
    setAtsScore(null);

    try {
      const apiFormData = new FormData();
      apiFormData.append("companyName", formData.companyName);
      apiFormData.append("jobRole", formData.jobRole);
      apiFormData.append("jobDescription", formData.jobDescription);
      
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

      setGeneratedResume(data.resume);
      setAtsScore(data.resume.atsScore);
    } catch (err) {
      setError(err.message || "Failed to generate resume. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getATSScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getATSScoreBadge = (score) => {
    if (score >= 90) return { text: "Excellent", variant: "default", className: "bg-green-100 text-green-800" };
    if (score >= 75) return { text: "Good", variant: "default", className: "bg-yellow-100 text-yellow-800" };
    return { text: "Needs Improvement", variant: "default", className: "bg-red-100 text-red-800" };
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">AI Resume Generator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate a company-specific, ATS-optimized resume in seconds. Zero manual form filling required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Job Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Details
                </CardTitle>
                <CardDescription>
                  Enter the company and position you're targeting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="e.g., Google, Microsoft, Amazon"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    disabled={isGenerating}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobRole">Job Role *</Label>
                  <Input
                    id="jobRole"
                    name="jobRole"
                    placeholder="e.g., Software Engineer, Product Manager"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    disabled={isGenerating}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description *</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste the complete job description here..."
                    rows={8}
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    disabled={isGenerating}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Include requirements, responsibilities, and qualifications
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resume Input Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Your Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume or paste the content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="upload" 
                  onValueChange={(value) => setResumeInput(prev => ({ ...prev, inputMethod: value }))}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">Upload PDF</TabsTrigger>
                    <TabsTrigger value="paste">Paste Text</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-4">
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="font-medium mb-1">
                        {resumeInput.file ? resumeInput.file.name : "Click to upload resume"}
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
                      placeholder="Paste your resume content here..."
                      rows={10}
                      value={resumeInput.text}
                      onChange={handleResumeTextChange}
                      disabled={isGenerating}
                      className="resize-none"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Resume...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate ATS-Optimized Resume
                </>
              )}
            </Button>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {isGenerating && (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-16 h-16 mx-auto animate-spin text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Analyzing & Optimizing...</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI is extracting keywords, matching skills, and generating your optimized resume
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!isGenerating && !generatedResume && (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <Target className="w-16 h-16 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Preview Will Appear Here</h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in the job details and upload your resume to generate an ATS-optimized version
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedResume && (
              <>
                {/* ATS Score Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>ATS Compatibility Score</span>
                      <Badge className={getATSScoreBadge(atsScore).className}>
                        {getATSScoreBadge(atsScore).text}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className={`text-5xl font-bold ${getATSScoreColor(atsScore)}`}>
                          {atsScore}%
                        </div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${
                                atsScore >= 90 ? 'bg-green-600' : 
                                atsScore >= 75 ? 'bg-yellow-600' : 
                                'bg-red-600'
                              }`}
                              style={{ width: `${atsScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {generatedResume.matchedKeywords && generatedResume.matchedKeywords.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Matched Keywords:</p>
                          <div className="flex flex-wrap gap-2">
                            {generatedResume.matchedKeywords.slice(0, 8).map((keyword, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                <CheckCircle2 className="w-3 h-3 mr-1 text-green-600" />
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {generatedResume.optimizationNotes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-900">
                            <span className="font-semibold">Optimization Notes: </span>
                            {generatedResume.optimizationNotes}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Resume Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Preview</CardTitle>
                    <CardDescription>
                      Your ATS-optimized resume is ready
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AIResumePreview resumeData={generatedResume} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
