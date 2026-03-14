"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle2, Github, AlertCircle } from "lucide-react";
import { verifyGitHubUsername } from "@/actions/github-sync";

export default function StudentOnboarding() {
    const { user } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        branch: "",
        year: "",
        section: "",
        rollNumber: "",
        githubUsername: "",
        leetcodeUsername: "",
    });

    const [githubVerification, setGithubVerification] = useState({
        status: "idle", // idle, verifying, success, error
        message: "",
        userData: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Reset GitHub verification when username changes
        if (field === "githubUsername") {
            setGithubVerification({ status: "idle", message: "", userData: null });
        }
    };

    const verifyGitHub = async () => {
        if (!formData.githubUsername) {
            setGithubVerification({
                status: "error",
                message: "Please enter a GitHub username",
                userData: null,
            });
            return;
        }

        setGithubVerification({ status: "verifying", message: "Verifying...", userData: null });

        try {
            const result = await verifyGitHubUsername(formData.githubUsername);

            if (result.valid) {
                setGithubVerification({
                    status: "success",
                    message: `Verified! Found ${result.user.publicRepos} public repositories`,
                    userData: result.user,
                });
            } else {
                setGithubVerification({
                    status: "error",
                    message: result.error || "GitHub username not found",
                    userData: null,
                });
            }
        } catch (err) {
            setGithubVerification({
                status: "error",
                message: "Failed to verify GitHub username",
                userData: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.branch || !formData.year || !formData.rollNumber) {
            setError("Please fill in all required fields");
            return;
        }

        if (githubVerification.status !== "success") {
            setError("Please verify your GitHub username first");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/student/onboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to complete onboarding");
            }

            router.push("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-2xl">
            <Card className="shadow-xl border-none">
                <CardHeader>
                    <CardTitle className="text-3xl">Student Onboarding</CardTitle>
                    <CardDescription>
                        Complete your profile to access the TPO Dashboard and track your GitHub activity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Branch */}
                        <div className="space-y-2">
                            <Label htmlFor="branch">Branch *</Label>
                            <Select
                                value={formData.branch}
                                onValueChange={(value) => handleInputChange("branch", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your branch" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                    <SelectItem value="Mechanical">Mechanical</SelectItem>
                                    <SelectItem value="Civil">Civil</SelectItem>
                                    <SelectItem value="Electrical">Electrical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Year */}
                        <div className="space-y-2">
                            <Label htmlFor="year">Year *</Label>
                            <Select
                                value={formData.year}
                                onValueChange={(value) => handleInputChange("year", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1st Year</SelectItem>
                                    <SelectItem value="2">2nd Year</SelectItem>
                                    <SelectItem value="3">3rd Year</SelectItem>
                                    <SelectItem value="4">4th Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Section */}
                        <div className="space-y-2">
                            <Label htmlFor="section">Section</Label>
                            <Input
                                id="section"
                                placeholder="e.g., A, B, C"
                                value={formData.section}
                                onChange={(e) => handleInputChange("section", e.target.value)}
                            />
                        </div>

                        {/* Roll Number */}
                        <div className="space-y-2">
                            <Label htmlFor="rollNumber">Roll Number *</Label>
                            <Input
                                id="rollNumber"
                                placeholder="Enter your roll number"
                                value={formData.rollNumber}
                                onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                                required
                            />
                        </div>

                        {/* GitHub Username */}
                        <div className="space-y-2">
                            <Label htmlFor="githubUsername">GitHub Username *</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="githubUsername"
                                    placeholder="Enter your GitHub username"
                                    value={formData.githubUsername}
                                    onChange={(e) => handleInputChange("githubUsername", e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={verifyGitHub}
                                    disabled={githubVerification.status === "verifying"}
                                >
                                    {githubVerification.status === "verifying" ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Github className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            {githubVerification.status === "success" && (
                                <Alert className="bg-green-50 border-green-200">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertDescription className="text-green-700">
                                        {githubVerification.message}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {githubVerification.status === "error" && (
                                <Alert className="bg-red-50 border-red-200">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                    <AlertDescription className="text-red-700">
                                        {githubVerification.message}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                        {/* LeetCode Username (Optional) */}
                        <div className="space-y-2">
                            <Label htmlFor="leetcodeUsername">LeetCode Username (Optional)</Label>
                            <Input
                                id="leetcodeUsername"
                                placeholder="Enter your LeetCode username"
                                value={formData.leetcodeUsername}
                                onChange={(e) => handleInputChange("leetcodeUsername", e.target.value)}
                            />
                        </div>

                        {error && (
                            <Alert className="bg-red-50 border-red-200">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-700">{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-bold"
                            disabled={loading || githubVerification.status !== "success"}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Completing Onboarding...
                                </>
                            ) : (
                                "Complete Onboarding"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
