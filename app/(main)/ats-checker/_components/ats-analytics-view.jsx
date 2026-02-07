"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  TrendingUp, 
  Award, 
  FileText, 
  Target,
  Activity,
  BarChart3,
} from "lucide-react";
import { format } from "date-fns";

export default function ATSAnalyticsView({ analytics }) {
  if (!analytics) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No analytics data available. Analyze your first resume to see insights!
          </p>
        </CardContent>
      </Card>
    );
  }

  const scoreDistributionData = [
    { name: "Poor", value: analytics.scoreDistribution.poor, color: "#ef4444" },
    { name: "Average", value: analytics.scoreDistribution.average, color: "#f59e0b" },
    { name: "Good", value: analytics.scoreDistribution.good, color: "#3b82f6" },
    { name: "Excellent", value: analytics.scoreDistribution.excellent, color: "#10b981" },
  ];

  const trendChartData = analytics.trendData.map((item, index) => ({
    name: `#${index + 1}`,
    score: item.score,
    date: format(new Date(item.date), "MMM dd"),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">ATS Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive insights into your resume performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Analyses
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalAnalyses}</div>
            <p className="text-xs text-muted-foreground">
              Resume versions analyzed
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
              {analytics.bestScore}/100
            </div>
            <p className="text-xs text-muted-foreground">
              Your highest achievement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Score
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {analytics.averageScore}/100
            </div>
            <p className="text-xs text-muted-foreground">
              Overall performance
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
              analytics.improvementPercentage >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics.improvementPercentage >= 0 ? '+' : ''}
              {analytics.improvementPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              From first to latest
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              ATS Score Trend
            </CardTitle>
            <CardDescription>
              Your progress over time (last 10 analyses)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {trendChartData.length > 0 ? (
              <div className="h-80">
                <ChartContainer
                  config={{
                    score: {
                      label: "ATS Score",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="w-full h-full"
                >
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'hsl(var(--foreground))' }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-semibold">{payload[0].payload.date}</p>
                              <p className="text-primary font-bold text-lg">
                                {payload[0].value}/100
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                No trend data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Score Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Score Distribution
            </CardTitle>
            <CardDescription>
              Breakdown by performance category
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scoreDistributionData.some(d => d.value > 0) ? (
              <div className="h-80 flex items-center">
                <ChartContainer
                  config={{
                    poor: {
                      label: "Poor",
                      color: "#ef4444",
                    },
                    average: {
                      label: "Average",
                      color: "#f59e0b",
                    },
                    good: {
                      label: "Good",
                      color: "#3b82f6",
                    },
                    excellent: {
                      label: "Excellent",
                      color: "#10b981",
                    },
                  }}
                  className="w-full h-full"
                >
                  <PieChart>
                    <Pie
                      data={scoreDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={(entry) => entry.value > 0 ? `${entry.name}: ${entry.value}` : ''}
                    >
                      {scoreDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                No distribution data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance Distribution</CardTitle>
          <CardDescription>
            Number of resumes in each performance category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--primary))",
                },
              }}
              className="w-full h-full"
            >
              <BarChart data={scoreDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-3 shadow-lg">
                          <p className="font-semibold">{payload[0].payload.name}</p>
                          <p className="text-primary font-bold text-lg">
                            {payload[0].value} {payload[0].value === 1 ? 'resume' : 'resumes'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
