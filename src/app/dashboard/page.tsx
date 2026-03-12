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

interface ScoreDetail {
    score: number;
    avg: number;
    top10: number;
}

interface AnalysisData {
    atsScore: number;
    formatting: ScoreDetail;
    keywords: ScoreDetail;
    impact: ScoreDetail;
    readability: ScoreDetail;
    skills: ScoreDetail;
    suggestions: string[];
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
    percentile?: number;
    impactMetrics?: string[];
}

import { useResume } from "@/components/ResumeProvider";

export default function DashboardPage() {
    const { resumeData, isLoaded } = useResume();
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [analyzing, setAnalyzing] = useState(false);

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

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-french-blue" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-4xl font-bold tracking-tight">
                    <span className="text-foreground">
                        Resume{" "}
                    </span>
                    <span className="bg-gradient-to-r from-french-blue to-cool-sky bg-clip-text text-transparent">
                        Intelligence
                    </span>
                </h1>
                <p className="mt-3 text-lg text-muted-foreground font-medium max-w-2xl">
                    Our AI analyzes your resume through the lens of modern ATS systems to give you a competitive edge.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Upload & Actions */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Upload Card */}
                    <Card className="neo p-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                <FileText className="h-6 w-6 text-french-blue dark:text-cool-sky" />
                                Your Resume
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader />
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <AnimatePresence>
                        {resumeData && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-6"
                            >
                                {/* Analyze Button */}
                                <Button
                                    onClick={analyzeResume}
                                    disabled={analyzing}
                                    className="w-full gap-3 text-french-blue dark:text-cool-sky font-bold h-16 rounded-3xl neo-interactive hover:neo-pressed border-none bg-background text-lg"
                                >
                                    {analyzing ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        <Target className="h-6 w-6" />
                                    )}
                                    {analyzing ? "Analyzing..." : "Calculate ATS Score"}
                                </Button>

                                {/* Quick Stats */}
                                {analysis && (
                                    <Card className="neo">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3 text-lg font-bold">
                                                <BarChart3 className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                                                Quick Metrics
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between p-3 rounded-2xl neo-pressed bg-background/50">
                                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Word Count</span>
                                                <span className="font-bold text-french-blue dark:text-cool-sky text-lg">
                                                    {resumeData.parsedText.split(/\s+/).length}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-2xl neo-pressed bg-background/50">
                                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Action Items</span>
                                                <span className="font-bold text-french-blue dark:text-cool-sky text-lg">
                                                    {analysis.suggestions?.length || 0}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2 p-3 rounded-2xl neo-pressed bg-background/50">
                                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Impact Level</span>
                                                <div className="flex items-center justify-between">
                                                    <Badge className={`px-4 py-1 text-sm font-bold rounded-lg ${
                                                        analysis.atsScore >= 80
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                            : analysis.atsScore >= 60
                                                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                    }`}>
                                                        {analysis.atsScore >= 80 ? "Premium" : analysis.atsScore >= 60 ? "Moderate" : "Needs Polish"}
                                                    </Badge>
                                                    {analysis.percentile && (
                                                        <span className="text-xs font-bold text-french-blue dark:text-cool-sky">
                                                            Top {100 - analysis.percentile}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <div className="p-6 rounded-3xl neo bg-background/50">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-xl neo-sm">
                                            <Sparkles className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                                        </div>
                                        <h4 className="text-lg font-bold text-foreground">Next Steps</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed">Try our AI Roaster for a brutal honesty check on your experience.</p>
                                    <Button size="lg" variant="outline" className="w-full text-base h-12 rounded-2xl font-bold neo-interactive hover:neo-pressed border-none" onClick={() => window.location.href = "/roast"}>
                                        Open AI Roaster
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-8 space-y-8">
                    {!resumeData && (
                        <Card className="neo-pressed">
                            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="flex h-32 w-32 items-center justify-center rounded-full neo mb-8"
                                >
                                    <Sparkles className="h-12 w-12 text-french-blue dark:text-cool-sky" />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-3">Let's Get Started</h3>
                                <p className="text-muted-foreground max-w-md text-lg font-medium leading-relaxed">
                                    Upload your resume in the sidebar to unlock professional ATS analysis and AI-powered insights.
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
                                className="space-y-8"
                            >
                                <Card className="neo overflow-visible">
                                    <CardHeader className="pb-6 border-b border-border/10">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                                                <Target className="h-8 w-8 text-french-blue dark:text-cool-sky" />
                                                Benchmark Results
                                            </CardTitle>
                                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl neo-pressed bg-background/50">
                                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Analysis Live</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-10">
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

                                 {/* Optimization Roadmap & Quantified Impact */}
                                 {analysis.suggestions && analysis.suggestions.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <Card className="neo h-full">
                                            <CardHeader className="pb-4">
                                                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                                    <Sparkles className="h-6 w-6 text-cool-sky" />
                                                    Optimization Roadmap
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {analysis.suggestions.map((suggestion, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start gap-4 rounded-2xl neo-pressed p-4 group transition-all"
                                                        >
                                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl neo-sm text-sm text-french-blue dark:text-cool-sky font-bold">
                                                                {i + 1}
                                                            </div>
                                                            <p className="text-sm font-medium text-foreground/90 leading-relaxed">{suggestion}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Impact Metrics */}
                                        {analysis.impactMetrics && analysis.impactMetrics.length > 0 && (
                                            <Card className="neo h-full">
                                                <CardHeader className="pb-4">
                                                    <CardTitle className="flex items-center gap-3 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                                        <TrendingUp className="h-6 w-6" />
                                                        Quantified Impact
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {analysis.impactMetrics.map((metric, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-start gap-4 rounded-2xl neo-pressed p-4 bg-emerald-500/5 group transition-all"
                                                            >
                                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl neo-sm text-emerald-500 font-bold">
                                                                    <Zap className="h-4 w-4" />
                                                                </div>
                                                                <p className="text-sm font-medium text-foreground/90 leading-relaxed">{metric}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                )}

                                <Separator className="opacity-10" />

                                {/* Feedback */}
                                <Card className="neo">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-2xl font-bold flex items-center gap-3">
                                            <Zap className="h-7 w-7 text-french-blue dark:text-cool-sky" />
                                            Professional Review
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
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
                            <CardContent className="flex flex-col items-center justify-center py-24">
                                <div className="text-center">
                                    <div className="relative mb-8 mt-2">
                                        <Loader2 className="mx-auto h-16 w-16 animate-spin text-french-blue dark:text-cool-sky" />
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-french-blue/20 blur-2xl rounded-full"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Analyzing Deeply...</h3>
                                    <p className="text-lg text-muted-foreground font-medium">Extracting intent and calculating impact scores.</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
