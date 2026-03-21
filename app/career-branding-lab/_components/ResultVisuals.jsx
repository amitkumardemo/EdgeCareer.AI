"use client";

import React from "react";
import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Cell,
  Legend
} from "recharts";

export const ProfileRadarChart = ({ data }) => {
  if (!data) return null;
  
  const chartData = [
    { subject: 'Authority', before: data.before?.authority || 0, after: data.after?.authority || 0 },
    { subject: 'Brand Clarity', before: data.before?.brandClarity || 0, after: data.after?.brandClarity || 0 },
    { subject: 'Credibility', before: data.before?.credibility || 0, after: data.after?.credibility || 0 },
    { subject: 'SEO', before: data.before?.seoVisibility || 0, after: data.after?.seoVisibility || 0 },
    { subject: 'Content', before: data.before?.contentInfluence || 0, after: data.after?.contentInfluence || 0 },
  ];

  return (
    <div className="bg-black/30 rounded-lg p-4">
      <h4 className="font-semibold text-purple-300 mb-4 text-center">Profile Strength: Current → Optimized</h4>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 20]} tick={{ fill: '#6b7280', fontSize: 10 }} />
          <Radar name="Current" dataKey="before" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
          <Radar name="Optimized" dataKey="after" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SectionBarChart = ({ data }) => {
  if (!data) return null;

  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value,
  }));

  return (
    <div className="bg-black/30 rounded-lg p-4">
      <h4 className="font-semibold text-purple-300 mb-4 text-center">Section-wise Scores</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
          <YAxis domain={[0, 20]} tick={{ fill: '#6b7280', fontSize: 10 }} />
          <RechartsTooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][index % 5]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
