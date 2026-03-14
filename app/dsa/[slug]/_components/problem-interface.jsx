"use client";

import { useState, useEffect } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Send, Loader2, Trophy, Info, History, Clock, Brain } from "lucide-react";
import ReactMarkdown from "react-markdown";
import CodeEditor from "./code-editor";
import SubmissionsList from "./submissions-list";
import { runCode, submitSolution } from "@/actions/dsa";
import { toast } from "sonner";

export default function ProblemInterface({ question }) {
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [terminalOutput, setTerminalOutput] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Initialize code with starter template
    useEffect(() => {
        if (question?.starterCode) {
            setCode(question.starterCode[language] || "");
        }
    }, [language, question]);

    const handleRun = async () => {
        setIsRunning(true);
        setActiveTab("console");
        setTerminalOutput({ status: "RUNNING", message: "Executing sample test cases..." });

        try {
            const results = await runCode(question.id, language, code);
            setTerminalOutput({ status: "DONE", results });
        } catch (error) {
            toast.error("Execution failed: " + error.message);
            setTerminalOutput({ status: "ERROR", message: error.message });
        } finally {
            setIsRunning(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setActiveTab("console");
        setTerminalOutput({ status: "SUBMITTING", message: "Running hidden test cases..." });

        try {
            const submission = await submitSolution(question.id, language, code);
            setTerminalOutput({ status: "VERDICT", submission });
            setRefreshTrigger(prev => prev + 1);

            if (submission.status === "ACCEPTED") {
                toast.success("Accepted! Great job!");
            } else {
                toast.error(`Submission: ${submission.status}`);
            }
        } catch (error) {
            toast.error("Submission failed: " + error.message);
            setTerminalOutput({ status: "ERROR", message: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-background border-t">
            <PanelGroup direction="horizontal">
                {/* Left Side: Description & Console */}
                <Panel defaultSize={40} minSize={30}>
                    <div className="h-full border-r flex flex-col shadow-sm">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                            <div className="px-4 py-2 border-b bg-muted/30">
                                <TabsList className="bg-transparent border shadow-none h-9">
                                    <TabsTrigger value="description" className="text-xs data-[state=active]:bg-background"><Info className="mr-2 h-3 w-3" /> Problem</TabsTrigger>
                                    <TabsTrigger value="console" className="text-xs data-[state=active]:bg-background"><Clock className="mr-2 h-3 w-3" /> Console</TabsTrigger>
                                    <TabsTrigger value="submissions" className="text-xs data-[state=active]:bg-background"><History className="mr-2 h-3 w-3" /> History</TabsTrigger>
                                </TabsList>
                            </div>

                            <div className="flex-1 overflow-y-auto w-full">
                                <TabsContent value="description" className="m-0 p-6 space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl font-bold">{question.title}</h1>
                                            <Badge variant={question.difficulty === 'HARD' ? 'destructive' : question.difficulty === 'MEDIUM' ? 'default' : 'secondary'}>
                                                {question.difficulty}
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {question.tags?.map((tag, i) => (
                                                <Badge key={i} variant="outline" className="text-[10px]">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-muted/80">
                                        <ReactMarkdown>{question.description}</ReactMarkdown>
                                    </div>

                                    {question.constraints && (
                                        <div className="space-y-2 pt-4 border-t">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <Settings className="h-4 w-4" /> Constraints
                                            </h3>
                                            <div className="bg-muted/30 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap">
                                                {question.constraints}
                                            </div>
                                        </div>
                                    )}

                                    {question.testCases?.filter(tc => !tc.isHidden).map((tc, idx) => (
                                        <div key={idx} className="space-y-2 pt-4 border-t">
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                <FlaskConical className="h-4 w-4" /> Example {idx + 1}
                                            </h3>
                                            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Input</p>
                                                    <pre className="text-xs">{tc.input}</pre>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Output</p>
                                                    <pre className="text-xs">{tc.expectedOutput}</pre>
                                                </div>
                                                {tc.explanation && (
                                                    <div>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Explanation</p>
                                                        <p className="text-xs italic text-muted-foreground">{tc.explanation}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </TabsContent>

                                <TabsContent value="console" className="m-0 h-full bg-muted/10 p-4 overflow-y-auto">
                                    {!terminalOutput ? (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                                            <Brain className="h-12 w-12 opacity-20" />
                                            <p className="text-sm">Run your code to see the results here.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 pb-20">
                                            {terminalOutput.status === "RUNNING" || terminalOutput.status === "SUBMITTING" ? (
                                                <div className="flex items-center gap-2 text-primary">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span className="text-sm font-medium">{terminalOutput.message}</span>
                                                </div>
                                            ) : terminalOutput.status === "VERDICT" ? (
                                                <div className="space-y-4">
                                                    <div className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 ${terminalOutput.submission.status === "ACCEPTED"
                                                        ? "bg-green-50 border-green-200 text-green-900"
                                                        : "bg-red-50 border-red-200 text-red-900"
                                                        }`}>
                                                        <h3 className="text-2xl font-black italic tracking-tighter uppercase">{terminalOutput.submission.status}</h3>
                                                        <div className="flex gap-4 text-xs font-bold uppercase opacity-70">
                                                            <span>Time: {terminalOutput.submission.runtime?.toFixed(3)}s</span>
                                                            <span>Memory: {(terminalOutput.submission.memory / 1024).toFixed(1)}MB</span>
                                                            <span>Passed: {terminalOutput.submission.testCasesPassed}/{terminalOutput.submission.totalTestCases}</span>
                                                        </div>
                                                    </div>
                                                    {terminalOutput.submission.verdict && (
                                                        <div className="p-4 bg-muted/40 rounded-lg text-xs font-mono whitespace-pre-wrap text-destructive">
                                                            {terminalOutput.submission.verdict}
                                                        </div>
                                                    )}
                                                    <Button className="w-full" onClick={() => setActiveTab("submissions")}>
                                                        View Submission History
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {terminalOutput.results?.map((res, i) => (
                                                        <Card key={i} className={res.actualOutput === res.expectedOutput ? "border-green-200" : "border-red-200"}>
                                                            <CardContent className="p-4 space-y-2">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-xs font-bold uppercase tracking-tight">Case {i + 1}</span>
                                                                    <Badge variant={res.actualOutput === res.expectedOutput ? "default" : "destructive"} className="text-[10px] h-4">
                                                                        {res.status}
                                                                    </Badge>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                                                    <div>
                                                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Input</p>
                                                                        <div className="bg-muted p-2 rounded">{res.input}</div>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Expected</p>
                                                                        <div className="bg-muted p-2 rounded">{res.expectedOutput}</div>
                                                                    </div>
                                                                    <div className="col-span-2">
                                                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Output</p>
                                                                        <div className={`${res.actualOutput === res.expectedOutput ? "bg-green-100/30" : "bg-red-100/30"} p-2 rounded whitespace-pre-wrap`}>
                                                                            {res.actualOutput || "No Output"}
                                                                        </div>
                                                                    </div>
                                                                    {res.error && (
                                                                        <div className="col-span-2">
                                                                            <p className="text-[10px] text-destructive uppercase mb-1">Error</p>
                                                                            <div className="bg-destructive/10 text-destructive p-2 rounded whitespace-pre-wrap">
                                                                                {res.error}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </Panel>

                <PanelResizeHandle className="w-2 hover:bg-primary/10 transition-colors flex items-center justify-center bg-muted/40">
                    <div className="h-8 w-1 rounded-full bg-muted-foreground/30" />
                </PanelResizeHandle>

                {/* Right Side: Code Editor */}
                <Panel defaultSize={60} minSize={40}>
                    <div className="h-full flex flex-col relative">
                        <CodeEditor
                            language={language}
                            onLanguageChange={setLanguage}
                            value={code}
                            onChange={(val) => setCode(val || "")}
                        />

                        {/* Footer Controls */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background/80 backdrop-blur flex justify-between items-center z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest hidden md:block">Real Interview Mode Active</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-background"
                                    onClick={handleRun}
                                    disabled={isRunning || isSubmitting}
                                >
                                    {isRunning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4 fill-current" />}
                                    Run
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSubmit}
                                    disabled={isRunning || isSubmitting}
                                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
                                >
                                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
}
