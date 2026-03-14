"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    getRoundData,
    submitRoundAnswers
} from "@/actions/mock-interview";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Loader2,
    Timer,
    ChevronRight,
    AlertCircle,
    Trophy,
    XCircle,
    Send
} from "lucide-react";
import { toast } from "sonner";

export default function InterviewEngine() {
    const { interviewId } = useParams();
    const router = useRouter();

    const [currentRound, setCurrentRound] = useState(1);
    const [roundData, setRoundData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1800); // 30 mins for R1
    const [roundComplete, setRoundComplete] = useState(false);
    const [roundStats, setRoundStats] = useState(null);

    useEffect(() => {
        fetchRound(currentRound);
    }, [currentRound]);

    useEffect(() => {
        if (timeLeft > 0 && !roundComplete && !loading) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !roundComplete) {
            handleAutoSubmit();
        }
    }, [timeLeft, roundComplete, loading]);

    const fetchRound = async (num) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRoundData(interviewId, num);
            if (!data) throw new Error("Failed to fetch round data");

            setRoundData(data);
            setQuestions(data.questions || []);
            setAnswers(new Array(data.questions?.length || 0).fill(null));

            // Set time based on round
            if (num === 1) setTimeLeft(1800);
            else if (num === 2) setTimeLeft(1200);
            else setTimeLeft(600);

            setRoundComplete(false);
            setCurrentQuestionIndex(0);
        } catch (error) {
            console.error("Fetch round error:", error);
            setError(error.message);
            toast.error("Failed to load round questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (val) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = { questionId: questions[currentQuestionIndex].id, answer: val };
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const result = await submitRoundAnswers(interviewId, currentRound, answers);
            setRoundStats(result);
            setRoundComplete(true);
            toast.success(`Round ${currentRound} Complete!`);
        } catch (error) {
            toast.error("Failed to submit answers.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAutoSubmit = () => {
        toast.warning("Time's up! Submitting your answers...");
        handleSubmit();
    };

    const proceedToNextRound = () => {
        if (roundStats?.status === "PASSED") {
            if (currentRound < 3) {
                setCurrentRound(currentRound + 1);
            } else {
                router.push(`/mock-interview/${interviewId}/result`);
            }
        } else {
            router.push(`/mock-interview/${interviewId}/result?failedRound=${currentRound}`);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (loading || (!roundData && !error)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-xl font-medium">{loading ? "Generating AI Questions..." : "Preparing Interview..."}</p>
                <p className="text-muted-foreground text-sm italic">This may take a moment based on your role and resume.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <p className="text-xl font-medium">Something went wrong</p>
                <p className="text-muted-foreground max-w-md">{error}</p>
                <Button onClick={() => fetchRound(currentRound)} className="mt-2">
                    Retry Loading Questions
                </Button>
            </div>
        );
    }

    if (roundComplete) {
        const isPassed = roundStats?.status === "PASSED";
        return (
            <div className="container mx-auto pt-24 pb-12 px-4 max-w-2xl">
                <Card className="text-center shadow-2xl border-t-4 border-t-primary">
                    <CardHeader>
                        <div className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center mb-4 ${isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {isPassed ? <Trophy className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
                        </div>
                        <CardTitle className="text-3xl">{isPassed ? "Round Qualified!" : "Round Failed"}</CardTitle>
                        <CardDescription className="text-lg">
                            Round {currentRound}: {roundData?.type}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-muted/50 rounded-xl">
                                <p className="text-sm text-muted-foreground">Score</p>
                                <p className="text-3xl font-bold">{Math.round(roundStats?.score)}%</p>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-xl">
                                <p className="text-sm text-muted-foreground">Status</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Badge className={isPassed ? "bg-green-500" : "bg-red-500"}>{roundStats?.status}</Badge>
                                </div>
                            </div>
                        </div>
                        {!isPassed && (
                            <p className="text-muted-foreground bg-red-50 p-4 rounded-lg border border-red-100">
                                Unfortunately, the cutoff for Round 2 is 50%. You'll need to improve your score to proceed.
                            </p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full h-12 text-lg font-bold" onClick={proceedToNextRound}>
                            {currentRound === 3 ? "View Results" : isPassed ? "Proceed to Next Round" : "End Session"}
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container mx-auto pt-24 pb-12 px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">Round {currentRound} of 3</Badge>
                        <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{roundData?.type} ROUND</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Hiring Assessment</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Card className="flex items-center gap-2 px-4 py-2 bg-muted/30 border-primary/20">
                        <Timer className={`h-5 w-5 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
                        <span className={`text-xl font-mono font-bold ${timeLeft < 300 ? 'text-red-600' : ''}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Question Nav */}
                <div className="lg:col-span-1 space-y-4">
                    <Card className="shadow-lg">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-5 gap-2">
                                {questions.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentQuestionIndex(i)}
                                        className={`h-8 w-8 rounded-md text-xs font-bold transition-all ${currentQuestionIndex === i
                                            ? 'bg-primary text-primary-foreground scale-110 shadow-md ring-2 ring-primary ring-offset-2'
                                            : answers[i]
                                                ? 'bg-primary/20 text-primary border border-primary/30'
                                                : 'bg-muted text-muted-foreground hover:bg-muted-foreground/10'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-8 pt-4 border-t space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span>Questions Answered</span>
                                        <span>{answers.filter(Boolean).length} / {questions.length}</span>
                                    </div>
                                    <Progress value={(answers.filter(Boolean).length / questions.length) * 100} className="h-2" />
                                </div>
                                <div className="flex items-start gap-2 text-[10px] text-muted-foreground bg-amber-50 p-2 rounded border border-amber-100">
                                    <AlertCircle className="h-3 w-3 text-amber-500 mt-0.5" />
                                    <span>Cannot go back to previous rounds once submitted. Refreshing will reset the current round questions.</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Interface */}
                <div className="lg:col-span-3">
                    <Card className="shadow-2xl border-none min-h-[450px] flex flex-col">
                        <CardHeader className="bg-muted/10 border-b">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2 text-primary border-primary/20">Question {currentQuestionIndex + 1}</Badge>
                                {currentQuestion?.section && <Badge className="bg-muted text-muted-foreground uppercase text-[10px]">{currentQuestion.section}</Badge>}
                            </div>
                            <CardTitle className="leading-relaxed text-xl font-semibold">
                                {currentQuestion?.question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow p-8">
                            {roundData.type === "HR" ? (
                                <div className="space-y-4">
                                    <textarea
                                        className="w-full min-h-[200px] p-4 bg-muted/30 rounded-xl border border-primary/10 focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                                        placeholder="Type your response professionally as if you're in a real interview..."
                                        value={answers[currentQuestionIndex]?.answer || ""}
                                        onChange={(e) => handleOptionSelect(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground italic tracking-wide">AI will evaluate your tone, clarity, and culture fit in the next phase.</p>
                                </div>
                            ) : (
                                <RadioGroup
                                    onValueChange={handleOptionSelect}
                                    value={answers[currentQuestionIndex]?.answer || ""}
                                    className="space-y-4"
                                >
                                    {currentQuestion?.options?.map((opt, i) => (
                                        <div key={i} className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers[currentQuestionIndex]?.answer === opt
                                            ? 'border-primary bg-primary/5'
                                            : 'border-muted hover:border-primary/20 hover:bg-muted/30'
                                            }`}>
                                            <RadioGroupItem value={opt} id={`q-${i}`} className="text-primary border-primary" />
                                            <Label htmlFor={`q-${i}`} className="flex-grow text-lg font-medium cursor-pointer">{opt}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t p-6 flex justify-between">
                            <Button
                                variant="ghost"
                                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </Button>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <Button
                                    className="px-8 font-bold shadow-lg"
                                    onClick={handleSubmit}
                                    disabled={submitting || answers.filter(Boolean).length < questions.length - 1}
                                >
                                    {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : <>Submit Round Answers <Send className="ml-2 h-4 w-4" /></>}
                                </Button>
                            ) : (
                                <Button onClick={handleNext} className="shadow-lg px-8">Next Question</Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
