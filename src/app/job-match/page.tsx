"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Target,
    Loader2,
    CheckCircle2,
    XCircle,
    TrendingUp,
    FileSearch,
} from "lucide-react";

interface MatchResult {
    fitScore: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    recommendations: string[];
    interviewProbability: number;
    summary: string;
}

export default function JobMatchPage() {
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [matching, setMatching] = useState(false);
    const [result, setResult] = useState<MatchResult | null>(null);

    const handleUploadComplete = (data: { parsedText: string }) => {
        setResumeText(data.parsedText);
    };

    const matchJob = async () => {
        if (!resumeText || !jobDescription) return;
        setMatching(true);
        try {
            const res = await fetch("/api/job-match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDescription }),
            });
            const data = await res.json();
            if (data.success) {
                setResult(data.match);
            }
        } catch (error) {
            console.error("Match failed:", error);
        } finally {
            setMatching(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 60) return "text-yellow-400";
        if (score >= 40) return "text-orange-400";
        return "text-red-400";
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold">
                    <span className="text-foreground">
                        Job{" "}
                    </span>
                    <span className="bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent">
                        Match Analyzer
                    </span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Compare your resume against any job description to see how well you match
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left - Inputs */}
                <div className="space-y-6">
                    <Card className="neo">
                        <CardHeader>
                            <CardTitle className="text-lg">Your Resume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader
                                onUploadComplete={handleUploadComplete}
                                compact
                            />
                            {resumeText && (
                                <p className="mt-2 text-xs text-emerald-400">
                                    ✓ Resume loaded ({resumeText.split(/\s+/).length} words)
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="neo">
                        <CardHeader>
                            <CardTitle className="text-lg">Job Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Paste the full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows={8}
                                className="neo-pressed bg-background resize-none border-none shadow-none"
                            />
                            {jobDescription && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                    {jobDescription.split(/\s+/).length} words
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Button
                        onClick={matchJob}
                        disabled={matching || !resumeText || !jobDescription}
                        className="w-full gap-2 bg-gradient-to-r from-yellow-700 to-amber-800 text-white font-bold h-12 rounded-2xl"
                    >
                        {matching ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <Target className="h-5 w-5" />
                        )}
                        {matching ? "Analyzing Match..." : "Analyze Job Match"}
                    </Button>
                </div>

                {/* Right - Results */}
                <div className="space-y-6">
                    {!result && !matching && (
                        <Card className="neo">
                            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                                <FileSearch className="h-16 w-16 text-yellow-400/40 mb-4" />
                                <h3 className="text-lg font-semibold mb-2">
                                    Upload & Paste to Compare
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-sm">
                                    Upload your resume and paste a job description to see your match score
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {matching && (
                        <Card className="border-yellow-500/20 bg-yellow-500/5">
                            <CardContent className="flex items-center justify-center py-24">
                                <div className="text-center">
                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-yellow-400 mb-4" />
                                    <p className="font-medium">Comparing your resume...</p>
                                    <p className="text-sm text-muted-foreground">
                                        Matching keywords, skills, and requirements
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Fit Score */}
                            <Card className="neo">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold">Overall Fit Score</h3>
                                        <span className={`text-3xl font-bold ${getScoreColor(result.fitScore)}`}>
                                            {result.fitScore}%
                                        </span>
                                    </div>
                                    <Progress value={result.fitScore} className="h-3" />
                                    <p className="mt-4 text-sm text-foreground/70">{result.summary}</p>
                                </CardContent>
                            </Card>

                            {/* Interview Probability */}
                            <Card className="neo">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-purple-400" />
                                            <h3 className="font-semibold text-sm">Interview Probability</h3>
                                        </div>
                                        <span className={`text-xl font-bold ${getScoreColor(result.interviewProbability)}`}>
                                            {result.interviewProbability}%
                                        </span>
                                    </div>
                                    <Progress value={result.interviewProbability} className="h-2" />
                                </CardContent>
                            </Card>

                            {/* Matched Keywords */}
                            <Card className="neo">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                        Matched Skills ({result.matchedKeywords.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {result.matchedKeywords.map((kw, i) => (
                                            <Badge
                                                key={i}
                                                className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                                            >
                                                {kw}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Missing Keywords */}
                            <Card className="neo">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <XCircle className="h-4 w-4 text-red-400" />
                                        Missing Skills ({result.missingKeywords.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {result.missingKeywords.map((kw, i) => (
                                            <Badge
                                                key={i}
                                                className="bg-red-500/15 text-red-400 border-red-500/20"
                                            >
                                                {kw}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Recommendations */}
                            {result.recommendations && result.recommendations.length > 0 && (
                                <Card className="neo">
                                    <CardHeader>
                                        <CardTitle className="text-base">Recommendations</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {result.recommendations.map((rec, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-start gap-3 rounded-lg border border-blue-500/10 bg-blue-500/5 p-3"
                                                >
                                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400 font-medium">
                                                        {i + 1}
                                                    </span>
                                                    <p className="text-sm text-foreground/80">{rec}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
