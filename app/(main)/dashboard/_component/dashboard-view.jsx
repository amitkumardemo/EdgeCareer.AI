"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Trophy,
  Star,
  Flame,
  Award,
  FileCheck,
  Target,
  FileText,
  Download,
  Share2,
  Clock,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StreakCalendar from "@/components/streak-calendar";

const DashboardView = ({ 
  insights, 
  gamification, 
  userData, 
  atsAnalytics,
  resumeAnalytics,
  resumeTimeline,
  resumeStatusDistribution,
  recentResumeActivity 
}) => {
  // Safely parse JSON strings back to arrays/objects with fallback values
  const safeJSONParse = (jsonString, fallback = []) => {
    try {
      // If it's already an object/array, return it
      if (typeof jsonString === 'object') {
        return jsonString;
      }
      // Try to parse the JSON string
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return fallback;
    }
  };

  const parsedInsights = {
    ...insights,
    salaryRanges: safeJSONParse(insights.salaryRanges, []),
    topSkills: safeJSONParse(insights.topSkills, []),
    keyTrends: safeJSONParse(insights.keyTrends, []),
    recommendedSkills: safeJSONParse(insights.recommendedSkills, []),
  };

  const parsedGamification = {
    ...gamification,
    // badges are already parsed in getUserGamification()
    badges: gamification.badges || [],
  };

  // Transform salary data for the chart
  const salaryData = parsedInsights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 100000, // Convert to lakhs
    max: range.max / 100000,
    median: range.median / 100000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns
  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userData.name}!
              </h1>
              {userData.industry && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                  {userData.industry.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Professional
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {userData.experience || 0} years of experience • {safeJSONParse(userData.skills, []).length} skills
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Level {gamification.level}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {gamification.points} points
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {parsedInsights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ATS Resume Analytics */}
      {atsAnalytics && atsAnalytics.totalAnalyses > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Resume ATS Performance</h2>
            <a href="/ats-checker/analytics" className="text-sm text-primary hover:underline">
              View Analytics →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resumes Analyzed
                </CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{atsAnalytics.totalAnalyses}</div>
                <p className="text-xs text-muted-foreground">
                  Total analyses completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Latest Score
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {atsAnalytics.lastScore}/100
                </div>
                <p className="text-xs text-muted-foreground">
                  Most recent analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Best Score
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {atsAnalytics.bestScore}/100
                </div>
                <p className="text-xs text-muted-foreground">
                  Your highest achievement
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Improvement
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  atsAnalytics.improvementPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {atsAnalytics.improvementPercentage >= 0 ? '+' : ''}
                  {atsAnalytics.improvementPercentage.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  From first to latest
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Resume Builder Analytics */}
      {resumeAnalytics && resumeAnalytics.totalResumesCreated > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Resume Builder Analytics</h2>
            <a href="/resume" className="text-sm text-primary hover:underline">
              Go to Resume Builder →
            </a>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Resumes
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumeAnalytics.totalResumesCreated}</div>
                <p className="text-xs text-muted-foreground">
                  All resumes built
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Manual Resumes
                </CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumeAnalytics.manualResumesCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Built manually
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  AI Resumes
                </CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumeAnalytics.aiResumesCount || 0}</div>
                <p className="text-xs text-muted-foreground">
                  AI-generated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Downloads
                </CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumeAnalytics.totalResumesDownloaded}</div>
                <p className="text-xs text-muted-foreground">
                  PDF downloads
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Shares
                </CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resumeAnalytics.totalResumesShared}</div>
                <p className="text-xs text-muted-foreground">
                  Resume shares
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Resume Mode Distribution - Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder Mode</CardTitle>
                <CardDescription>
                  Manual vs AI-generated resumes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Manual', count: resumeAnalytics.manualResumesCount || 0 },
                      { name: 'AI', count: resumeAnalytics.aiResumesCount || 0 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-lg p-2 shadow-md">
                                <p className="font-medium">{payload[0].payload.name} Mode</p>
                                <p className="text-sm text-primary">
                                  Count: {payload[0].value}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resume Status Distribution - Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown by status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resumeStatusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {resumeStatusDistribution.map((entry, index) => {
                          const colors = ['#3b82f6', '#10b981', '#f59e0b'];
                          return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                        })}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume Creation Timeline - Line Chart */}
          {resumeTimeline && resumeTimeline.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Resume Creation Timeline</CardTitle>
                <CardDescription>
                  Your resume building activity over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={resumeTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => format(new Date(date), "MMM dd")}
                      />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-background border rounded-lg p-2 shadow-md">
                                <p className="font-medium">
                                  {format(new Date(payload[0].payload.date), "MMM dd, yyyy")}
                                </p>
                                <p className="text-sm text-primary">
                                  Resumes: {payload[0].value}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Resume Activity */}
          {recentResumeActivity && recentResumeActivity.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Resume Activity</CardTitle>
                <CardDescription>
                  Your latest resume updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResumeActivity.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{resume.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {resume.downloadCount > 0 && (
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span>{resume.downloadCount}</span>
                          </div>
                        )}
                        {resume.shareCount > 0 && (
                          <div className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            <span>{resume.shareCount}</span>
                          </div>
                        )}
                        <Badge variant={resume.status === 'downloaded' ? 'default' : 'secondary'}>
                          {resume.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Gamification Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gamification.level}</div>
            <p className="text-xs text-muted-foreground">
              {gamification.points} points earned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gamification.points}</div>
            <p className="text-xs text-muted-foreground">
              Keep learning to level up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gamification.streak}</div>
            <p className="text-xs text-muted-foreground">
              Days active in a row
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{parsedGamification.badges.length}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {parsedGamification.badges.slice(0, 3).map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
              {parsedGamification.badges.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{parsedGamification.badges.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries in INR (lakhs)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ₹{item.value} Lakhs
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
                <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Streak Calendar and Industry Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StreakCalendar />

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Industry Trends</CardTitle>
              <CardDescription>
                Current trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {parsedInsights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
              <CardDescription>Skills to consider developing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {parsedInsights.recommendedSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
