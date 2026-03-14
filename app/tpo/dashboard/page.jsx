"use client";

import React, { useState, useEffect } from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Loader2,
    Users,
    TrendingUp,
    TrendingDown,
    Download,
    Search,
    Filter,
    RefreshCw,
    Github,
    Award,
    BarChart3,
    Clock,
} from "lucide-react";
import Link from "next/link";
import {
    ActivityTrendChart,
    BranchWiseChart,
    ActiveInactiveChart,
    YearWiseChart,
} from "@/components/tpo/analytics-charts";

export default function TPODashboard() {
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [dashboardData, setDashboardData] = useState(null);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const [filters, setFilters] = useState({
        branch: "",
        year: "",
        section: "",
        search: "",
        topN: "10",
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (dashboardData) {
            applyFilters();
        }
    }, [filters, dashboardData]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/tpo/dashboard");
            const data = await response.json();
            setDashboardData(data);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const syncGitHubData = async () => {
        setSyncing(true);
        try {
            const response = await fetch("/api/tpo/sync-github", {
                method: "POST",
            });
            const data = await response.json();

            if (data.success) {
                await fetchDashboardData();
            }
        } catch (error) {
            console.error("Failed to sync GitHub data:", error);
        } finally {
            setSyncing(false);
        }
    };

    const applyFilters = () => {
        if (!dashboardData) return;

        let filtered = dashboardData?.rankedStudents ? [...dashboardData.rankedStudents] : [];

        if (filters.branch && filters.branch !== "all") {
            filtered = filtered.filter(s => s.branch === filters.branch);
        }

        if (filters.year && filters.year !== "all") {
            filtered = filtered.filter(s => s.year === parseInt(filters.year));
        }

        if (filters.section && filters.section !== "all") {
            filtered = filtered.filter(s => s.section === filters.section);
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(s =>
                s.name?.toLowerCase().includes(searchLower) ||
                s.rollNumber?.toLowerCase().includes(searchLower) ||
                s.githubUsername?.toLowerCase().includes(searchLower)
            );
        }

        // Apply top N filter
        const topN = parseInt(filters.topN);
        filtered = filtered.slice(0, topN);

        setFilteredStudents(filtered);
    };

    const exportData = async (format) => {
        try {
            const response = await fetch(`/api/tpo/export?format=${format}&topN=${filters.topN}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filters }),
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `student-rankings-${new Date().toISOString().split("T")[0]}.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Failed to export data:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    const stats = dashboardData?.stats || {};
    const branches = [...new Set(dashboardData?.rankedStudents?.map(s => s.branch).filter(Boolean) || [])];
    const years = [...new Set(dashboardData?.rankedStudents?.map(s => s.year).filter(y => y !== null) || [])];
    const sections = [...new Set(dashboardData?.rankedStudents?.map(s => s.section).filter(Boolean) || [])];

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold">
                        Welcome {user?.fullName || user?.firstName || "TPO"}!
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Dashboard for {dashboardData?.collegeName || "your institution"}
                    </p>
                </div>
                <Button
                    onClick={syncGitHubData}
                    disabled={syncing}
                    className="h-12 px-6"
                >
                    {syncing ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Syncing...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="mr-2 h-5 w-5" />
                            Sync GitHub Data
                        </>
                    )}
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Students
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="text-3xl font-bold">{stats.totalStudents || 0}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Active (Last 7 Days)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <span className="text-3xl font-bold text-green-600">
                                {stats.activeStudents || 0}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Inactive
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-red-600" />
                            <span className="text-3xl font-bold text-red-600">
                                {stats.inactiveStudents || 0}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            New Onboardings (30d)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span className="text-3xl font-bold text-blue-600">
                                {stats.onboardedThisMonth || 0}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Avg Activity Score
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-600" />
                            <span className="text-3xl font-bold">
                                {stats.averageScore?.toFixed(1) || "0.0"}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analytics Charts */}
            <Tabs defaultValue="rankings" className="mb-8">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="rankings">Rankings</TabsTrigger>
                    <TabsTrigger value="new-onboardings">
                        <Clock className="mr-2 h-4 w-4" />
                        New Onboardings
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analytics
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="analytics" className="space-y-6 mt-6">
                    {/* Prepare chart data */}
                    {(() => {
                        // Branch-wise data
                        const branchData = branches.map(branch => {
                            const branchStudents = dashboardData.rankedStudents.filter(s => s.branch === branch);
                            const avgScore = branchStudents.reduce((sum, s) => sum + (s.score || 0), 0) / branchStudents.length || 0;
                            return {
                                branch: branch.length > 15 ? branch.substring(0, 15) + "..." : branch,
                                students: branchStudents.length,
                                avgScore: parseFloat(avgScore.toFixed(1)),
                            };
                        });

                        // Year-wise data
                        const yearData = years.map(year => {
                            const yearStudents = dashboardData.rankedStudents.filter(s => s.year === year);
                            const avgScore = yearStudents.reduce((sum, s) => sum + (s.score || 0), 0) / yearStudents.length || 0;
                            return {
                                year: `${year}${year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year`,
                                avgScore: parseFloat(avgScore.toFixed(1)),
                            };
                        });

                        // Activity trend data (mock for now - would come from API in production)
                        const activityData = Array.from({ length: 30 }, (_, i) => {
                            const date = new Date();
                            date.setDate(date.getDate() - (29 - i));
                            return {
                                date: `${date.getMonth() + 1}/${date.getDate()}`,
                                commits: Math.floor(Math.random() * 50) + 10,
                                prs: Math.floor(Math.random() * 10) + 1,
                                issues: Math.floor(Math.random() * 8) + 1,
                            };
                        });

                        return (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <ActiveInactiveChart
                                        active={stats.activeStudents || 0}
                                        inactive={stats.inactiveStudents || 0}
                                    />
                                    <BranchWiseChart data={branchData} />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <YearWiseChart data={yearData} />
                                    <ActivityTrendChart data={activityData.slice(-14)} />
                                </div>
                            </>
                        );
                    })()}
                </TabsContent>

                <TabsContent value="new-onboardings" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Newly Onboarded Students</CardTitle>
                            <CardDescription>
                                Showing students who joined in the last 30 days
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Join Date</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Branch/Year</TableHead>
                                        <TableHead>Roll Number</TableHead>
                                        <TableHead>GitHub Performance</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dashboardData?.newlyOnboarded?.length > 0 ? (
                                        dashboardData.newlyOnboarded.map((student) => {
                                            // Find student in rankedStudents to get their score
                                            const rankedInfo = dashboardData.rankedStudents.find(s => s.id === student.id);
                                            const score = rankedInfo?.score || 0;

                                            return (
                                                <TableRow key={student.id}>
                                                    <TableCell>
                                                        {new Date(student.createdAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            {student.imageUrl && (
                                                                <img
                                                                    src={student.imageUrl}
                                                                    alt={student.name}
                                                                    className="h-8 w-8 rounded-full"
                                                                />
                                                            )}
                                                            <div className="font-medium">{student.name}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {student.branch} - {student.year}th Year
                                                    </TableCell>
                                                    <TableCell>{student.rollNumber}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={score >= 70 ? "success" : score >= 40 ? "default" : "destructive"}>
                                                                {score.toFixed(1)}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground italic">
                                                                {score > 0 ? "Tracking" : "Awaiting Sync"}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Link href={`/tpo/student/${student.id}`}>
                                                            <Button variant="outline" size="sm">
                                                                View Profile
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No new onboardings in the last 30 days.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="rankings" className="mt-6">
                    {/* Filters and Search */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Filter className="h-5 w-5" />
                                Filters & Search
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="space-y-2">
                                    <Label>Search</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Name, Roll No, GitHub"
                                            className="pl-10"
                                            value={filters.search}
                                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Branch</Label>
                                    <Select
                                        value={filters.branch}
                                        onValueChange={(value) => setFilters(prev => ({ ...prev, branch: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Branches" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Branches</SelectItem>
                                            {branches.map(b => (
                                                <SelectItem key={b} value={b}>{b}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Year</Label>
                                    <Select
                                        value={filters.year}
                                        onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Years" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Years</SelectItem>
                                            {years.map(y => (
                                                <SelectItem key={y} value={y.toString()}>{y}th Year</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Section</Label>
                                    <Select
                                        value={filters.section}
                                        onValueChange={(value) => setFilters(prev => ({ ...prev, section: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Sections" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Sections</SelectItem>
                                            {sections.map(s => (
                                                <SelectItem key={s} value={s}>{s}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Top N</Label>
                                    <Select
                                        value={filters.topN}
                                        onValueChange={(value) => setFilters(prev => ({ ...prev, topN: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">Top 10</SelectItem>
                                            <SelectItem value="50">Top 50</SelectItem>
                                            <SelectItem value="100">Top 100</SelectItem>
                                            <SelectItem value="999999">All</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" onClick={() => exportData("pdf")}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export PDF
                                </Button>
                                <Button variant="outline" onClick={() => exportData("xlsx")}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Excel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rankings Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Rankings</CardTitle>
                            <CardDescription>
                                Showing {filteredStudents.length} students ranked by GitHub activity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16">Rank</TableHead>
                                        <TableHead>Student</TableHead>
                                        <TableHead>Branch</TableHead>
                                        <TableHead>Year</TableHead>
                                        <TableHead>GitHub</TableHead>
                                        <TableHead className="text-right">Score</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student, index) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-bold">
                                                {index + 1}
                                                {index === 0 && <Award className="inline ml-1 h-4 w-4 text-yellow-500" />}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{student.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {student.rollNumber}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{student.branch}</TableCell>
                                            <TableCell>{student.year}th</TableCell>
                                            <TableCell>
                                                <a
                                                    href={`https://github.com/${student.githubUsername}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-primary hover:underline"
                                                >
                                                    <Github className="h-4 w-4" />
                                                    {student.githubUsername}
                                                </a>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant={student.score >= 70 ? "success" : student.score >= 40 ? "default" : "destructive"}>
                                                    {student.score?.toFixed(1) || "0.0"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/tpo/student/${student.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View Profile
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
