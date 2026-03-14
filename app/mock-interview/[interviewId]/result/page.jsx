"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { getFinalResult } from "@/actions/mock-interview";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Loader2,
    CheckCircle2,
    XCircle,
    Star,
    TrendingUp,
    Target,
    Briefcase,
    Home,
    RefreshCcw,
    Sparkles,
    Trophy
} from "lucide-react";

export default function InterviewResult() {
    const { interviewId } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const failedRound = searchParams.get("failedRound");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getFinalResult(interviewId);
                setData(result);
            } catch (error) {
                console.error("Failed to load results:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [interviewId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-xl font-semibold italic text-muted-foreground animate-pulse">Analyzing your overall performance...</p>
            </div>
        );
    }

    const isHired = data?.status === "COMPLETED";

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-5xl">
            <div className="text-center mb-12">
                <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-6 shadow-xl ${isHired ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isHired ? <CheckCircle2 className="h-12 w-12" /> : <XCircle className="h-12 w-12" />}
                </div>
                <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Hiring Assessment Results</h1>
                <div className="text-2xl text-muted-foreground flex items-center justify-center gap-2">
                    Hiring Status: <Badge variant="outline" className={`text-lg px-4 py-1 uppercase tracking-wider ${isHired ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-600 bg-red-50'}`}>{data?.feedback?.readiness || data?.status}</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Readiness Card */}
                <Card className="lg:col-span-1 shadow-xl border-none overflow-hidden h-full">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-yellow-500" /> Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="relative h-40 w-40 flex items-center justify-center">
                            <svg className="h-full w-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" className="stroke-muted fill-none" strokeWidth="12" />
                                <circle
                                    cx="80" cy="80" r="70"
                                    className={`fill-none transition-all duration-1000 ${isHired ? 'stroke-green-500' : 'stroke-orange-500'}`}
                                    strokeWidth="12"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * (data?.overallScore || 0)) / 100}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-5xl font-black">{Math.round(data?.overallScore || 0)}</span>
                                <span className="text-xl font-bold text-muted-foreground">%</span>
                            </div>
                        </div>
                        <p className="mt-8 text-sm font-medium text-muted-foreground italic text-center">
                            {isHired ? "Excellent work! You've met the criteria for all rounds." : "Keep practicing! You can retake the assessment anytime."}
                        </p>
                    </CardContent>
                </Card>

                {/* AI Feedback Card */}
                <Card className="lg:col-span-2 shadow-xl border-none h-full bg-slate-900 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-white"><Sparkles className="h-5 w-5 text-blue-400" /> AI Insights & Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2 mt-2">
                                <Star className="h-4 w-4" /> Your Strengths
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {data?.feedback?.strengths?.map((s, i) => (
                                    <Badge key={i} className="bg-white/10 text-white border-white/20 px-3 py-1">{s}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2 mt-2">
                                <Target className="h-4 w-4" /> Areas for Improvement
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {data?.feedback?.improvements?.map((im, i) => (
                                    <Badge key={i} variant="outline" className="border-orange-500/50 text-orange-200 px-3 py-1 bg-orange-500/10">{im}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-slate-300 leading-relaxed italic italic">"{data?.feedback?.feedback}"</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Round-wise Breakdown */}
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Performance Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {data?.rounds?.map((r, i) => {
                    const isPending = r.status === "PENDING";
                    const isFailed = r.status === "FAILED";

                    // Parse answers to get breakdown
                    let correctCount = 0;
                    let totalQuestions = 0;
                    try {
                        const answers = JSON.parse(r.answers || "[]");
                        totalQuestions = answers.length;
                        correctCount = answers.filter(a => a.isCorrect).length;
                    } catch (e) { }

                    return (
                        <Card key={i} className={`shadow-lg border-2 transition-all hover:scale-[1.02] ${r.status === "PASSED" ? 'border-green-500/20' : r.status === "FAILED" ? 'border-red-500/20' : 'border-muted'}`}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground italic">ROUND {r.roundNumber}</span>
                                    <Badge className={r.status === "PASSED" ? "bg-green-500" : isFailed ? "bg-red-500" : "bg-muted text-muted-foreground"}>
                                        {isPending ? "NOT ATTEMPTED" : r.status}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg">{r.type}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1 font-semibold">
                                        <span>{isPending ? "Weighting" : "Score"}</span>
                                        <span>{isPending ? (r.type === "HR" ? "20%" : "40%") : `${Math.round(r.score || 0)}%`}</span>
                                    </div>
                                    <Progress value={isPending ? 0 : (r.score || 0)} className={`h-2 ${r.status === "PASSED" ? 'bg-green-100' : 'bg-red-100/50'}`} />
                                </div>

                                {!isPending && totalQuestions > 0 && (
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3 text-green-500" /> {correctCount} Correct
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                        <div className="flex items-center gap-1">
                                            <XCircle className="h-3 w-3 text-red-500" /> {totalQuestions - correctCount} Incorrect
                                        </div>
                                    </div>
                                )}

                                {isFailed && !isPending && (
                                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                                        <p className="text-[10px] text-red-600 font-bold uppercase flex items-center gap-1">
                                            <Target className="h-3 w-3" /> Failure Reason
                                        </p>
                                        <p className="text-xs text-red-700 mt-1 leading-relaxed">
                                            Score of {Math.round(r.score || 0)}% is below the required 50% threshold.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Detailed Answer Analysis (Technical Only for now) */}
            {data?.rounds?.some(r => r.type === "TECHNICAL" && r.answers) && (
                <Card className="mb-12 border-none shadow-xl overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b">
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" /> Technical Question Analysis
                        </CardTitle>
                        <CardDescription>Review the detailed evaluation and correct solutions for your technical round.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-muted/50">
                            {(() => {
                                const techRound = data.rounds.find(r => r.type === "TECHNICAL");
                                let answers = [];
                                try { answers = JSON.parse(techRound.answers); } catch (e) { }

                                return answers.map((ans, idx) => (
                                    <div key={idx} className="p-6 space-y-4">
                                        <div className="flex justify-between gap-4">
                                            <p className="font-bold text-slate-800 leading-relaxed max-w-2xl">
                                                <span className="text-muted-foreground mr-2">{idx + 1}.</span>
                                                {ans.questionText}
                                            </p>
                                            <Badge variant={ans.isCorrect ? "success" : "destructive"} className="h-fit">
                                                {ans.isCorrect ? "Correct" : "Incorrect"}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
                                            <div className="p-3 bg-muted/30 rounded-lg">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Your Answer</p>
                                                <p className={ans.isCorrect ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                                                    {ans.answer || "N/A"}
                                                </p>
                                            </div>
                                            {!ans.isCorrect && (
                                                <div className="p-3 bg-green-50 rounded-lg">
                                                    <p className="text-[10px] font-bold text-green-700 uppercase mb-1">Correct Answer</p>
                                                    <p className="text-green-800 font-medium">{ans.correctAnswer}</p>
                                                </div>
                                            )}
                                        </div>
                                        {ans.explanation && (
                                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                                <p className="text-[10px] font-black text-primary uppercase mb-1 tracking-widest">Explanation</p>
                                                <p className="text-slate-600 italic leading-relaxed text-xs">"{ans.explanation}"</p>
                                            </div>
                                        )}
                                    </div>
                                ));
                            })()}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl shadow-lg hover:scale-105 transition-transform" onClick={() => router.push("/mock-interview")}>
                    <RefreshCcw className="mr-2 h-5 w-5" /> Retake Assessment
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-xl hover:bg-muted" onClick={() => router.push("/mock-interview")}>
                    <Home className="mr-2 h-5 w-5" /> Back to Dashboard
                </Button>
            </div>
        </div>
    );
}
