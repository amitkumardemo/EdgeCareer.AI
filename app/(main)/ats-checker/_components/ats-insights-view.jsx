"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb,
  Sparkles,
  Calendar,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

export default function ATSInsightsView({ insights }) {
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

  const getTrendIcon = (comparisonText) => {
    if (comparisonText.includes("Improved")) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (comparisonText.includes("Decreased")) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">ATS Insights Chat</h1>
        </div>
        <p className="text-muted-foreground">
          AI-powered insights from your resume analyses
        </p>
      </div>

      {/* Chat Timeline */}
      <div className="space-y-4">
        {insights.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No insights available yet. Analyze your first resume to get started!
              </p>
            </CardContent>
          </Card>
        ) : (
          insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Bot Avatar */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-sm">ATS Intelligence</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(insight.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getScoreBadgeColor(insight.scoreCategory)}
                        >
                          {insight.scoreCategory}
                        </Badge>
                      </div>

                      {/* Main Message */}
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <p className="text-sm font-medium">
                          Resume "{insight.resumeFileName}" analyzed
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-primary">
                            {insight.atsScore}/100
                          </div>
                          {insight.comparisonText && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {getTrendIcon(insight.comparisonText)}
                              <span>{insight.comparisonText}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Improvement Tip */}
                      {insight.improvementTip && (
                        <div className="flex gap-2 bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                          <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-600 mb-1">
                              Improvement Tip
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {insight.improvementTip}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(insight.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Summary Card */}
      {insights.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Sparkles className="h-6 w-6 text-primary shrink-0" />
              <div>
                <p className="font-semibold mb-2">Summary</p>
                <p className="text-sm text-muted-foreground">
                  You've analyzed {insights.length} resume{insights.length > 1 ? 's' : ''}.
                  {insights.length > 1 && (
                    <>
                      {' '}Keep optimizing your resume based on the insights above to maximize
                      your chances with ATS systems.
                    </>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
