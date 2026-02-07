"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Eye,
  Share2,
  Download,
  Trash2,
  Clock,
  Award,
  Target,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ATSHistoryView({ analyses }) {
  const [filter, setFilter] = useState("all");

  const filteredAnalyses = analyses.filter((analysis) => {
    if (filter === "all") return true;
    return analysis.scoreCategory.toLowerCase() === filter.toLowerCase();
  });

  const getScoreBadgeColor = (category) => {
    switch (category) {
      case "Excellent":
        return "bg-green-500/10 text-green-600 border-green-500/30";
      case "Good":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "Average":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30";
      case "Poor":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
  };

  const getScoreIcon = (category) => {
    switch (category) {
      case "Excellent":
        return <Award className="h-5 w-5 text-green-600" />;
      case "Good":
        return <Target className="h-5 w-5 text-blue-600" />;
      case "Average":
        return <TrendingUp className="h-5 w-5 text-yellow-600" />;
      case "Poor":
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">ATS Analysis History</h1>
          <p className="text-muted-foreground mt-2">
            Track your resume improvements over time
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{analyses.length}</div>
              <p className="text-xs text-muted-foreground">Total Analyses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {analyses.filter(a => a.scoreCategory === "Excellent").length}
              </div>
              <p className="text-xs text-muted-foreground">Excellent Scores</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {analyses.filter(a => a.scoreCategory === "Good").length}
              </div>
              <p className="text-xs text-muted-foreground">Good Scores</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {analyses.length > 0 
                  ? Math.round(analyses.reduce((sum, a) => sum + a.atsScore, 0) / analyses.length)
                  : 0}
              </div>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All ({analyses.length})
          </Button>
          <Button
            variant={filter === "excellent" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("excellent")}
          >
            Excellent ({analyses.filter(a => a.scoreCategory === "Excellent").length})
          </Button>
          <Button
            variant={filter === "good" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("good")}
          >
            Good ({analyses.filter(a => a.scoreCategory === "Good").length})
          </Button>
          <Button
            variant={filter === "average" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("average")}
          >
            Average ({analyses.filter(a => a.scoreCategory === "Average").length})
          </Button>
          <Button
            variant={filter === "poor" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("poor")}
          >
            Poor ({analyses.filter(a => a.scoreCategory === "Poor").length})
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {filteredAnalyses.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {filter === "all" 
                  ? "No analyses found. Start by analyzing your first resume!"
                  : `No ${filter} analyses found. Try a different filter.`}
              </p>
              {filter === "all" && (
                <Link href="/ats-checker">
                  <Button className="mt-4">
                    Analyze Resume
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <AnimatePresence>
              {filteredAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[1.875rem] top-6 w-3 h-3 rounded-full bg-primary border-4 border-background hidden md:block" />

                  <Card className="md:ml-20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getScoreIcon(analysis.scoreCategory)}
                            <CardTitle className="text-lg">
                              {analysis.resumeFileName}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {format(new Date(analysis.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-3xl font-bold text-primary">
                            {analysis.atsScore}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={getScoreBadgeColor(analysis.scoreCategory)}
                          >
                            {analysis.scoreCategory}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">
                            {analysis.keywordMatchScore.toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Keywords</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">
                            {analysis.skillsScore.toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Skills</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-lg font-semibold">
                            {analysis.formattingScore.toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">Formatting</div>
                        </div>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        <Link href={`/ats-checker/analysis/${analysis.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Link href={`/ats-checker/share/${analysis.shareToken}`}>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
