"use client";

import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

export function ActivityTrendChart({ data }) {
    // data format: [{ date: "2024-01-01", commits: 10, prs: 2, issues: 1 }, ...]
    return (
        <Card>
            <CardHeader>
                <CardTitle>GitHub Activity Trend (Last 30 Days)</CardTitle>
                <CardDescription>Daily commits, PRs, and issues across all students</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="commits" stroke="#10b981" strokeWidth={2} name="Commits" />
                        <Line type="monotone" dataKey="prs" stroke="#3b82f6" strokeWidth={2} name="Pull Requests" />
                        <Line type="monotone" dataKey="issues" stroke="#f59e0b" strokeWidth={2} name="Issues" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function BranchWiseChart({ data }) {
    // data format: [{ branch: "Computer Science", students: 50, avgScore: 75.5 }, ...]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Branch-wise Performance</CardTitle>
                <CardDescription>Average GitHub activity score by branch</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="branch" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgScore" fill="#3b82f6" name="Avg Score" />
                        <Bar dataKey="students" fill="#10b981" name="Students" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function ActiveInactiveChart({ active, inactive }) {
    const data = [
        { name: "Active (Last 7 Days)", value: active },
        { name: "Inactive", value: inactive },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Activity Distribution</CardTitle>
                <CardDescription>Active vs Inactive students</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export function YearWiseChart({ data }) {
    // data format: [{ year: "1st Year", students: 30, avgScore: 65.2 }, ...]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Year-wise Performance</CardTitle>
                <CardDescription>Average scores across different years</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="year" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgScore" fill="#8b5cf6" name="Avg Score" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
