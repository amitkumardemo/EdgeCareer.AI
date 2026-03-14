"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Loader2,
    Github,
    Code2,
    TrendingUp,
    Calendar,
    Award,
    ArrowLeft,
    ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function StudentProfile() {
    const params = useParams();
    const router = useRouter();
    const studentId = params.id;

    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        fetchStudentData();
    }, [studentId]);

    const fetchStudentData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/tpo/student/${studentId}`);
            const data = await response.json();
            setStudentData(data);
        } catch (error) {
            console.error("Failed to fetch student data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!studentData) {
        return (
            <div className="container mx-auto pt-24 pb-12 px-4 max-w-4xl text-center">
                <h1 className="text-2xl font-bold mb-4">Student Not Found</h1>
                <Button onClick={() => router.push("/tpo/dashboard")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
            </div>
        );
    }

    const { student, githubStats, leetcodeStats, activityHistory, ranking } = studentData;

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <Button variant="ghost" onClick={() => router.push("/tpo/dashboard")} className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>

                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        {student.imageUrl && (
                            <img
                                src={student.imageUrl}
                                alt={student.name}
                                className="w-20 h-20 rounded-full"
                            />
                        )}
                        <div>
                            <h1 className="text-4xl font-bold">{student.name}</h1>
                            <p className="text-muted-foreground text-lg">{student.rollNumber}</p>
                            <div className="flex gap-2 mt-2">
                                <Badge>{student.branch}</Badge>
                                <Badge variant="outline">{student.year}th Year</Badge>
                                {student.section && <Badge variant="outline">Section {student.section}</Badge>}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-sm text-muted-foreground">Overall Rank</div>
                        <div className="text-4xl font-bold text-primary">#{ranking?.rank || "N/A"}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                            Score: {ranking?.score?.toFixed(1) || "0.0"}/100
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Commits
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{githubStats?.totalCommits || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pull Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{githubStats?.totalPRs || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active Days
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{githubStats?.activeDays || 0}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Current Streak
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{githubStats?.streak || 0} days</div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="github" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="github">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub Activity
                    </TabsTrigger>
                    <TabsTrigger value="leetcode">
                        <Code2 className="mr-2 h-4 w-4" />
                        LeetCode Stats
                    </TabsTrigger>
                    <TabsTrigger value="performance">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Performance
                    </TabsTrigger>
                </TabsList>

                {/* GitHub Tab */}
                <TabsContent value="github" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Activity Timeline (Last 30 Days)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={activityHistory || []}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="commits" stroke="#10b981" name="Commits" />
                                        <Line type="monotone" dataKey="prs" stroke="#3b82f6" name="PRs" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Languages Used</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(githubStats?.languages || {}).slice(0, 5).map(([lang, count]) => (
                                        <div key={lang}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{lang}</span>
                                                <span className="text-muted-foreground">{count} repos</span>
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-2">
                                                <div
                                                    className="bg-primary h-2 rounded-full"
                                                    style={{ width: `${Math.min(100, (count / 10) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>GitHub Profile</CardTitle>
                                <a
                                    href={`https://github.com/${student.githubUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline flex items-center gap-1"
                                >
                                    View on GitHub
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <div className="text-sm text-muted-foreground">Repositories</div>
                                    <div className="text-2xl font-bold">{githubStats?.repositories?.length || 0}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Issues</div>
                                    <div className="text-2xl font-bold">{githubStats?.totalIssues || 0}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Reviews</div>
                                    <div className="text-2xl font-bold">{githubStats?.totalReviews || 0}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Longest Streak</div>
                                    <div className="text-2xl font-bold">{githubStats?.longestStreak || 0} days</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* LeetCode Tab */}
                <TabsContent value="leetcode" className="space-y-6">
                    {student.leetcodeUsername ? (
                        <>
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>LeetCode Profile</CardTitle>
                                        <a
                                            href={`https://leetcode.com/${student.leetcodeUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline flex items-center gap-1"
                                        >
                                            View on LeetCode
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600">
                                                {leetcodeStats?.easy || 0}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Easy</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-yellow-600">
                                                {leetcodeStats?.medium || 0}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Medium</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-red-600">
                                                {leetcodeStats?.hard || 0}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Hard</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-primary">
                                                {(leetcodeStats?.easy || 0) + (leetcodeStats?.medium || 0) + (leetcodeStats?.hard || 0)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Total Solved</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Problem Difficulty Distribution</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={[
                                            { difficulty: "Easy", count: leetcodeStats?.easy || 0 },
                                            { difficulty: "Medium", count: leetcodeStats?.medium || 0 },
                                            { difficulty: "Hard", count: leetcodeStats?.hard || 0 },
                                        ]}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="difficulty" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#3b82f6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-12">
                                <Code2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No LeetCode username provided</p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Performance Tab */}
                <TabsContent value="performance" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Score Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Commit Score (35%)</span>
                                        <span className="font-bold">{ranking?.commitScore?.toFixed(1) || 0}/100</span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: `${ranking?.commitScore || 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>PR Score (25%)</span>
                                        <span className="font-bold">{ranking?.prScore?.toFixed(1) || 0}/100</span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${ranking?.prScore || 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Issue Score (20%)</span>
                                        <span className="font-bold">{ranking?.issueScore?.toFixed(1) || 0}/100</span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-yellow-600 h-2 rounded-full"
                                            style={{ width: `${ranking?.issueScore || 0}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Consistency Score (20%)</span>
                                        <span className="font-bold">{ranking?.consistencyScore?.toFixed(1) || 0}/100</span>
                                    </div>
                                    <div className="w-full bg-secondary rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{ width: `${ranking?.consistencyScore || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Insights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {ranking?.score >= 70 && (
                                    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <Award className="h-5 w-5 text-green-600 mt-0.5" />
                                        <div>
                                            <div className="font-medium text-green-900">Excellent Performance</div>
                                            <div className="text-sm text-green-700">Consistently active with high-quality contributions</div>
                                        </div>
                                    </div>
                                )}

                                {ranking?.score >= 40 && ranking?.score < 70 && (
                                    <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <div className="font-medium text-yellow-900">Good Progress</div>
                                            <div className="text-sm text-yellow-700">Keep up the momentum to reach top tier</div>
                                        </div>
                                    </div>
                                )}

                                {ranking?.score < 40 && (
                                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <Calendar className="h-5 w-5 text-red-600 mt-0.5" />
                                        <div>
                                            <div className="font-medium text-red-900">Needs Improvement</div>
                                            <div className="text-sm text-red-700">Increase activity frequency and consistency</div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-3 border-t">
                                    <div className="text-sm font-medium mb-2">Recommendations:</div>
                                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                                        {ranking?.commitScore < 50 && <li>Increase daily commit frequency</li>}
                                        {ranking?.prScore < 50 && <li>Contribute more pull requests</li>}
                                        {ranking?.consistencyScore < 50 && <li>Maintain a consistent coding schedule</li>}
                                        {ranking?.issueScore < 50 && <li>Engage more in code reviews and issues</li>}
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
