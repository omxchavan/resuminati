"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import ATSScoreChart from "@/components/ATSScoreChart";
import FeedbackSection from "@/components/FeedbackSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Target,
    Loader2,
    FileText,
    Zap,
    Sparkles,
    BarChart3,
    TrendingUp,
} from "lucide-react";

interface ResumeData {
    id: string;
    fileName: string;
    parsedText: string;
}

interface AnalysisData {
    atsScore: number;
    formatting: number;
    keywords: number;
    impact: number;
    readability: number;
    skills: number;
    suggestions: string[];
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
}

export default function DashboardPage() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadComplete = (data: ResumeData) => {
        setResumeData(data);
        setAnalysis(null);
    };

    const analyzeResume = async () => {
        if (!resumeData) return;
        setAnalyzing(true);
        try {
            const res = await fetch("/api/analyze-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText: resumeData.parsedText,
                    resumeId: resumeData.id,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setAnalysis(data.analysis);
            }
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        Resume{" "}
                    </span>
                    <span className="bg-gradient-to-r from-french-blue to-cool-sky bg-clip-text text-transparent">
                        Analysis
                    </span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Get deep insights into how ATS systems see your resume.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Upload & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Upload Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                                Upload Resume
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader onUploadComplete={handleUploadComplete} />
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <AnimatePresence>
                        {resumeData && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-4"
                            >
                                {/* Analyze Button */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <Button
                                            onClick={analyzeResume}
                                            disabled={analyzing}
                                            className="w-full gap-2 text-french-blue dark:text-cool-sky font-bold h-14 rounded-2xl"
                                        >
                                            {analyzing ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Target className="h-5 w-5" />
                                            )}
                                            {analyzing ? "Analyzing..." : "Analyze ATS Score"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Quick Stats */}
                                {analysis && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <BarChart3 className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                                                Quick Stats
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Words</span>
                                                <Badge variant="secondary">
                                                    {resumeData.parsedText.split(/\s+/).length}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Suggestions</span>
                                                <Badge variant="secondary">
                                                    {analysis.suggestions?.length || 0}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Status</span>
                                                <Badge className={
                                                    analysis.atsScore >= 80
                                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                        : analysis.atsScore >= 60
                                                            ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                }>
                                                    {analysis.atsScore >= 80 ? "Strong" : analysis.atsScore >= 60 ? "Needs Work" : "Weak"}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <div className="p-5 rounded-3xl neo-pressed bg-background">
                                    <h4 className="text-sm font-bold text-french-blue dark:text-cool-sky flex items-center gap-2 mb-2">
                                        <Sparkles className="h-4 w-4" />
                                        Advanced Tools
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-4 font-medium">Try our AI Roaster for a deeper take on your resume.</p>
                                    <Button size="sm" variant="outline" className="w-full text-sm h-10 rounded-xl" onClick={() => window.location.href = "/roast"}>
                                        Open Roaster
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-2 space-y-6">
                    {!resumeData && (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full neo-pressed mb-6">
                                    <Sparkles className="h-10 w-10 text-french-blue dark:text-cool-sky" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Your Resume to Begin</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Drop a PDF or DOCX file to get your ATS score and professional feedback from our AI.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* ATS Score Analysis */}
                    <AnimatePresence>
                        {analysis && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-2">
                                                <Target className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                                                ATS Score Analysis
                                            </CardTitle>
                                            <Badge>
                                                <TrendingUp className="mr-1 h-3 w-3" />
                                                Complete
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <ATSScoreChart
                                            scores={{
                                                formatting: analysis.formatting,
                                                keywords: analysis.keywords,
                                                impact: analysis.impact,
                                                readability: analysis.readability,
                                                skills: analysis.skills,
                                            }}
                                            overallScore={analysis.atsScore}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Suggestions */}
                                {analysis.suggestions && analysis.suggestions.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Sparkles className="h-5 w-5 text-cool-sky" />
                                                AI Suggestions
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {analysis.suggestions.map((suggestion, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-start gap-4 rounded-2xl neo-pressed p-4"
                                                    >
                                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full neo-sm text-sm text-french-blue dark:text-cool-sky font-bold">
                                                            {i + 1}
                                                        </span>
                                                        <p className="text-[15px] font-medium text-foreground/80 leading-relaxed">{suggestion}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <Separator />

                                {/* Feedback */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Professional Feedback</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <FeedbackSection
                                            strengths={analysis.strengths || []}
                                            weaknesses={analysis.weaknesses || []}
                                            improvements={analysis.improvements || []}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading State */}
                    {analyzing && (
                        <Card className="neo-pressed">
                            <CardContent className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-french-blue dark:text-cool-sky mb-4" />
                                    <p className="font-medium">Analyzing your resume...</p>
                                    <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
