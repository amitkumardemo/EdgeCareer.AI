"use client";

import { useEffect, useState } from "react";
import { getUserSubmissions } from "@/actions/dsa";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function SubmissionsList({ questionId, refreshTrigger }) {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setIsLoading(true);
            try {
                const data = await getUserSubmissions(questionId);
                setSubmissions(data);
            } catch (error) {
                console.error("Failed to fetch submissions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubmissions();
    }, [questionId, refreshTrigger]);

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading your history...</div>;
    }

    if (submissions.length === 0) {
        return (
            <div className="p-12 text-center space-y-3 opacity-50">
                <Clock className="mx-auto h-12 w-12" />
                <p className="text-sm font-medium">No submissions yet for this problem.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold">Your Recent Submissions</h3>
            <div className="space-y-3">
                {submissions.map((sub) => (
                    <Card key={sub.id} className="overflow-hidden">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {sub.status === "ACCEPTED" ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                ) : (
                                    <XCircle className="h-6 w-6 text-destructive" />
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${sub.status === "ACCEPTED" ? "text-green-600" : "text-destructive"}`}>
                                            {sub.status}
                                        </span>
                                        <Badge variant="outline" className="text-[10px] uppercase">{sub.language}</Badge>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">
                                        {formatDistanceToNow(new Date(sub.createdAt))} ago
                                    </p>
                                </div>
                            </div>
                            <div className="text-right text-[11px] font-mono text-muted-foreground">
                                <p>{sub.runtime?.toFixed(3)}s</p>
                                <p>{(sub.memory / 1024).toFixed(1)}MB</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
