"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Briefcase,
    FileText,
    Rocket,
    ShieldCheck,
    ChevronRight,
    Loader2,
    Upload,
    CheckCircle,
    Target,
    BarChart3,
    Brain,
    User,
    History,
    Zap
} from "lucide-react";
import { getAllResumes } from "@/actions/resume";
import { startMockInterview, extractResumeText, getMockInterviewStats } from "@/actions/mock-interview";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const roles = [
    { id: "software-engineer", name: "Software Engineer", icon: <Briefcase className="h-4 w-4" /> },
    { id: "frontend-developer", name: "Frontend Developer", icon: <Briefcase className="h-4 w-4" /> },
    { id: "backend-developer", name: "Backend Developer", icon: <Briefcase className="h-4 w-4" /> },
    { id: "fullstack-developer", name: "Full-Stack Developer", icon: <Briefcase className="h-4 w-4" /> },
    { id: "ai-ml-engineer", name: "AI/ML Engineer", icon: <Briefcase className="h-4 w-4" /> },
    { id: "data-scientist", name: "Data Scientist", icon: <Briefcase className="h-4 w-4" /> },
];

export default function MockInterviewLanding() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedResumeId, setSelectedResumeId] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingResumes, setFetchingResumes] = useState(true);
    const [extracting, setExtracting] = useState(false);
    const [stats, setStats] = useState(null);
    const [fetchingStats, setFetchingStats] = useState(true);

    const fileInputRef = React.useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [resumeData, statsData] = await Promise.all([
                    getAllResumes(),
                    getMockInterviewStats()
                ]);
                setResumes(resumeData || []);
                setStats(statsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setFetchingResumes(false);
                setFetchingStats(false);
            }
        }
        fetchData();
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("Please upload a PDF file.");
            return;
        }

        setUploadedFile(file);
        setExtracting(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const data = await extractResumeText(formData);

            setResumeText(data.text);
            setCandidateName(data.candidateName || "Candidate");
            toast.success(`Resume uploaded! Hello, ${data.candidateName || 'Candidate'}.`);
        } catch (error) {
            toast.error(`Error: ${error.message}`);
            setUploadedFile(null);
        } finally {
            setExtracting(false);
        }
    };

    const handleStart = async () => {
        if (!selectedRole) {
            toast.error("Please select a job role to continue.");
            return;
        }

        if (selectedResumeId === "upload" && !resumeText) {
            toast.error("Please upload a resume first.");
            return;
        }

        setLoading(true);
        try {
            const interview = await startMockInterview(
                selectedRole,
                selectedResumeId === "upload" ? "none" : selectedResumeId,
                selectedResumeId === "upload" ? resumeText : null,
                candidateName
            );
            toast.success("Interview session initialized!");
            router.push(`/mock-interview/${interview.id}`);
        } catch (error) {
            toast.error(error.message || "Failed to start interview.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div className="space-y-2">
                    <h1 className="text-5xl font-extrabold gradient-title tracking-tight">
                        Interview Dashboard
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Track your progress and attempt realistic AI-driven mock interviews.
                    </p>
                </div>
                {stats && (
                    <div className="flex gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <div className="text-center">
                            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Total Attempts</p>
                            <p className="text-2xl font-black text-primary">{stats.totalAttempts}</p>
                        </div>
                        <div className="w-px bg-primary/10 mx-2" />
                        <div className="text-center">
                            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Pass Ratio</p>
                            <p className="text-2xl font-black text-green-600">{stats.passRatio}%</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Analytics Grid */}
            {!fetchingStats && stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Target className="h-16 w-16" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-blue-600 uppercase tracking-widest">Aptitude Mastery</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black mb-2">{stats.avgAptitude}%</div>
                            <Progress value={parseFloat(stats.avgAptitude)} className="h-2 bg-blue-100" />
                            <p className="text-xs text-muted-foreground mt-3 italic leading-relaxed">Average across all logic screening rounds.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Brain className="h-16 w-16" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-purple-600 uppercase tracking-widest">Technical Proficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black mb-2">{stats.avgTechnical}%</div>
                            <Progress value={parseFloat(stats.avgTechnical)} className="h-2 bg-purple-100" />
                            <p className="text-xs text-muted-foreground mt-3 italic leading-relaxed">Score based on role-specific competency.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-pink-50 to-white border-pink-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <User className="h-16 w-16" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-pink-600 uppercase tracking-widest">Communication (HR)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black mb-2">{stats.avgHR}%</div>
                            <Progress value={parseFloat(stats.avgHR)} className="h-2 bg-pink-100" />
                            <p className="text-xs text-muted-foreground mt-3 italic leading-relaxed">Evaluated by AI for culture fit & clarity.</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Left: Preparation & Start */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <Rocket className="h-6 w-6 text-primary" />
                                Start New Session
                            </CardTitle>
                            <CardDescription>
                                Set your role and background to generate targeted interview questions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" /> Target Job Role
                                </label>
                                <Select onValueChange={setSelectedRole} value={selectedRole}>
                                    <SelectTrigger className="h-12 text-lg">
                                        <SelectValue placeholder="Select a role..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.id}>
                                                <div className="flex items-center gap-2">
                                                    {role.icon} {role.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <FileText className="h-4 w-4" /> Personalize with Resume
                                </label>
                                <Select
                                    onValueChange={(val) => {
                                        setSelectedResumeId(val);
                                        if (val !== "upload") {
                                            setUploadedFile(null);
                                            setResumeText("");
                                        }
                                    }}
                                    value={selectedResumeId}
                                >
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder={fetchingResumes ? "Loading resumes..." : "Choose an option..."} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Skip personalization</SelectItem>
                                        <SelectItem value="upload">Upload New Resume (PDF)</SelectItem>
                                        {resumes.length > 0 && <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50">Saved Resumes</div>}
                                        {resumes.map((resume) => (
                                            <SelectItem key={resume.id} value={resume.id}>
                                                {resume.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {selectedResumeId === "upload" && (
                                    <div className={`mt-4 p-6 border-2 border-dashed rounded-xl transition-all ${uploadedFile ? 'border-green-500/50 bg-green-50/10' : 'border-primary/20 hover:border-primary/40'}`}>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                        {uploadedFile ? (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-green-600">
                                                    <CheckCircle className="h-5 w-5" />
                                                    <span className="font-medium truncate max-w-[200px]">{uploadedFile.name}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={extracting}
                                                >
                                                    Change
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-center space-y-2">
                                                <Upload className="h-8 w-8 mx-auto text-primary/40" />
                                                <p className="text-sm font-medium">Click to upload your resume (PDF only)</p>
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={extracting}
                                                >
                                                    {extracting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Select PDF"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 p-8 flex flex-col gap-4">
                            <Button
                                className="w-full h-14 text-xl font-bold rounded-xl shadow-lg ring-offset-background transition-all hover:scale-[1.01] active:scale-[0.99]"
                                size="lg"
                                onClick={handleStart}
                                disabled={loading || !selectedRole}
                            >
                                {loading ? (
                                    <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Initializing...</>
                                ) : (
                                    <>Start Mock Interview <ChevronRight className="ml-2 h-6 w-6" /></>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Round Explanation Guide */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                        <div className="p-5 bg-white rounded-2xl border border-muted shadow-sm flex flex-col gap-3">
                            <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Zap className="h-4 w-4" />
                            </div>
                            <h4 className="font-bold text-sm uppercase tracking-wider">Aptitude Round</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Tests logical reasoning, quantitative ability, and verbal skills required for initial screening rounds at top firms.
                            </p>
                        </div>
                        <div className="p-5 bg-white rounded-2xl border border-muted shadow-sm flex flex-col gap-3">
                            <div className="h-8 w-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                                <Brain className="h-4 w-4" />
                            </div>
                            <h4 className="font-bold text-sm uppercase tracking-wider">Technical Round</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Evaluates role-based technical knowledge through role-specific MCQs similar to real company assessments.
                            </p>
                        </div>
                        <div className="p-5 bg-white rounded-2xl border border-muted shadow-sm flex flex-col gap-3">
                            <div className="h-8 w-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                                <User className="h-4 w-4" />
                            </div>
                            <h4 className="font-bold text-sm uppercase tracking-wider">HR Interview</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Assesses communication, confidence, and culture fit using sophisticated AI-based behavioral evaluation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: History */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="h-full border-muted/50 shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <History className="h-5 w-5 text-muted-foreground" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-2">
                            {!fetchingStats && stats?.recentInterviews?.length > 0 ? (
                                <div className="space-y-1">
                                    {stats.recentInterviews.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => router.push(`/mock-interview/${item.id}/result`)}
                                            className="p-4 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors border-b last:border-0 border-muted/30 group"
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <h5 className="font-bold text-sm truncate capitalize">{item.role.replace('-', ' ')}</h5>
                                                <Badge className={item.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} variant="outline">
                                                    {item.status}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-[10px] text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                                                <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded italic">
                                                    {item.score}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center space-y-2">
                                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto opacity-20">
                                        <History className="h-6 w-6" />
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground">No recent sessions found.</p>
                                    <p className="text-xs text-muted-foreground italic">Start your first interview to see history.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
