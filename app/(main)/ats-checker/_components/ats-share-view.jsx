"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckCircle,
  XCircle,
  Award,
  Calendar,
  Share2,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export default function ATSShareView({ analysis }) {
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

  const scoreBreakdown = [
    { label: "Keywords Match", score: analysis.keywordMatchScore },
    { label: "Skills", score: analysis.skillsScore },
    { label: "Formatting", score: analysis.formattingScore },
    { label: "Experience", score: analysis.experienceScore },
    { label: "Projects", score: analysis.projectScore },
    { label: "ATS Compatible", score: analysis.atsCompatibleScore },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ATS Analysis Report - ${analysis.resumeFileName}`,
          text: `Check out my ATS resume analysis! Score: ${analysis.atsScore}/100`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* TechieHelp Branding Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">TechieHelp Institute of AI</h1>
              <p className="text-sm text-muted-foreground">
                Enterprise-Grade ATS Intelligence System
              </p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">Shared Report</Badge>
              <p className="text-xs text-muted-foreground">
                Powered by AI Analysis
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl mb-2">{analysis.resumeFileName}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Analyzed on {format(new Date(analysis.createdAt), "MMMM dd, yyyy")}
              </CardDescription>
              {analysis.user?.name && (
                <p className="text-sm text-muted-foreground mt-1">
                  Submitted by: {analysis.user.name}
                </p>
              )}
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
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share This Report
            </Button>
            <Link href="/ats-checker">
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Analyze Your Resume
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Score Breakdown</CardTitle>
          <CardDescription>
            Performance across different ATS evaluation criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreBreakdown.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{item.label}</span>
                  <span className="text-lg font-semibold">
                    {item.score.toFixed(0)}%
                  </span>
                </div>
                <Progress value={item.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Keywords */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Matched Keywords
            </CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <XCircle className="h-5 w-5 text-orange-600" />
              Missing Keywords
            </CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
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

      {/* CTA Footer */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-bold mb-2">Want to improve your ATS score?</h3>
          <p className="text-muted-foreground mb-4">
            Get your resume analyzed by TechieHelp's AI-powered ATS system
          </p>
          <Link href="/ats-checker">
            <Button size="lg">
              Analyze Your Resume Free
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground py-4">
        <p>© {new Date().getFullYear()} TechieHelp Institute of AI. All rights reserved.</p>
        <p className="mt-1">Enterprise-Grade Career Intelligence Platform</p>
      </div>
    </div>
  );
}
