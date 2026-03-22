"use client";

import { TrendingUp, LineChart, TrendingDown } from "lucide-react";

export const getScoreColor = (score) => {
  if (score >= 90) return "text-green-400";
  if (score >= 80) return "text-blue-400";
  if (score >= 70) return "text-yellow-400";
  if (score >= 60) return "text-orange-400";
  return "text-red-400";
};

export const getScoreLabel = (score) => {
  if (score >= 90) return "Exceptional";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Good";
  if (score >= 60) return "Average";
  return "Needs Improvement";
};

export const getImpactColor = (impact) => {
  if (impact === "High") return "text-red-400 bg-red-500/10";
  if (impact === "Medium") return "text-yellow-400 bg-yellow-500/10";
  return "text-blue-400 bg-blue-500/10";
};

export const getMarketOutlookInfo = (outlook) => {
  if (!outlook) return { icon: LineChart, color: "text-gray-500" };
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
