"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  CheckCircle,
  XCircle,
  Lightbulb,
  TrendingUp,
  Award,
  Calendar,
  Share2,
  Download,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ATSAnalysisDetailView({ analysis }) {
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

  const getProgressColor = (score) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const scoreBreakdown = [
    { label: "Keywords Match", score: analysis.keywordMatchScore, icon: FileText },
    { label: "Skills", score: analysis.skillsScore, icon: Award },
    { label: "Formatting", score: analysis.formattingScore, icon: CheckCircle },
    { label: "Experience", score: analysis.experienceScore, icon: TrendingUp },
    { label: "Projects", score: analysis.projectScore, icon: FileText },
    { label: "ATS Compatible", score: analysis.atsCompatibleScore, icon: CheckCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/ats-checker/history">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Button>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{analysis.resumeFileName}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(analysis.createdAt), "MMMM dd, yyyy 'at' hh:mm a")}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-primary mb-2">
            {analysis.atsScore}
          </div>
          <Badge 
            variant="outline" 
            className={`${getScoreBadgeColor(analysis.scoreCategory)} text-base px-4 py-1`}
          >
            {analysis.scoreCategory}
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share Report
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Score Breakdown</CardTitle>
          <CardDescription>
            Performance across different ATS evaluation criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scoreBreakdown.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold">
                      {item.score.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Keywords Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Matched Keywords
            </CardTitle>
            <CardDescription>
              Keywords found in your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.matchedKeywords && analysis.matchedKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {analysis.matchedKeywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-green-500/10 text-green-600 border-green-500/30"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No matched keywords found</p>
            )}
          </CardContent>
        </Card>

        {/* Missing Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-orange-600" />
              Missing Keywords
            </CardTitle>
            <CardDescription>
              Important keywords to add
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysis.missingKeywords && analysis.missingKeywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-orange-500/10 text-orange-600 border-orange-500/30"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No missing keywords identified</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.strengths && analysis.strengths.length > 0 ? (
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No strengths identified</p>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-orange-600" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.weaknesses && analysis.weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No areas for improvement identified</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              Recommendations
            </CardTitle>
            <CardDescription>
              Action items to improve your ATS score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <span className="text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Improvement Tip */}
      {analysis.improvementTip && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Lightbulb className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-semibold mb-2">Key Improvement Tip</p>
                <p className="text-sm text-muted-foreground">
                  {analysis.improvementTip}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
