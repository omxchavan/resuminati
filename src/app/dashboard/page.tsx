"use client";

import { useState, useEffect } from "react";
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
import { useResume } from "@/components/ResumeProvider";

export default function DashboardPage() {
    const { resumeData, isLoaded, analyses, setAnalysis } = useResume();
    const analysisData = analyses.dashboard;
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
                setAnalysis("dashboard", data.analysis);
            }
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setAnalyzing(false);
        }
    };

    // Auto-analyze if resume exists but no analysis data
    useEffect(() => {
        if (resumeData && !analysisData && !analyzing) {
            analyzeResume();
        }
    }, [resumeData, analysisData]);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] bg-m3-surface">
                <Loader2 className="h-10 w-10 animate-spin text-m3-primary" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-m3-surface min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-m3-primary-container text-m3-primary m3-elev-1">
                        <BarChart3 className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-black text-m3-primary uppercase tracking-widest">Analytics Dashboard</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-m3-on-surface">
                    Resume <span className="text-m3-primary italic">Intelligence</span>
                </h1>
                <p className="mt-4 text-xl text-m3-on-surface-variant font-medium max-w-2xl opacity-80">
                    Our AI evaluates your impact, keywords, and formatting through the lens of modern ATS systems.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column - Upload & Actions (Sticky) */}
                <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-24 lg:self-start">
                    {/* Upload Card */}
                    <Card className="m3-card !p-2 bg-m3-surface-variant/20 border-m3-outline-variant/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-4 text-xl font-black text-m3-on-surface">
                                <FileText className="h-6 w-6 text-m3-primary" />
                                Your Source
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
                                className="space-y-8"
                            >
                                {/* Analyze Button */}
                                <Button
                                    onClick={analyzeResume}
                                    disabled={analyzing}
                                    className="m3-button-filled w-full h-16 text-lg m3-elev-2 hover:m3-elev-4 active:scale-95 transition-all"
                                >
                                    {analyzing ? (
                                        <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                    ) : (
                                        <Target className="h-6 w-6 mr-3" />
                                    )}
                                    {analyzing ? "Synthesizing..." : "Analyze ATS Scores"}
                                </Button>

                                {/* Quick Stats */}
                                {analysisData && (
                                    <Card className="m3-card bg-m3-secondary-container/30 border-none">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-3 text-lg font-black text-m3-on-secondary-container">
                                                <Zap className="h-5 w-5" />
                                                Key Metrics
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex items-center justify-between p-4 rounded-2xl bg-m3-surface m3-elev-1">
                                                <span className="text-xs font-black text-m3-on-surface-variant uppercase tracking-widest">Word Count</span>
                                                <span className="font-black text-m3-primary text-xl">
                                                    {resumeData.parsedText.split(/\s+/).length}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 rounded-2xl bg-m3-surface m3-elev-1">
                                                <span className="text-xs font-black text-m3-on-surface-variant uppercase tracking-widest">Action Items</span>
                                                <span className="font-black text-m3-primary text-xl">
                                                    {analysisData.suggestions?.length || 0}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-3 p-4 rounded-2xl bg-m3-surface m3-elev-1">
                                                <span className="text-xs font-black text-m3-on-surface-variant uppercase tracking-widest">Assessment</span>
                                                <div className="flex items-center justify-between">
                                                    <Badge className={`px-4 py-1.5 text-xs font-black rounded-lg border-none m3-elev-1 ${
                                                        analysisData.atsScore >= 80
                                                            ? "bg-emerald-100 text-emerald-800"
                                                            : analysisData.atsScore >= 60
                                                                ? "bg-amber-100 text-amber-800"
                                                                : "bg-red-100 text-red-800"
                                                    }`}>
                                                        {analysisData.atsScore >= 80 ? "PREMIUM" : analysisData.atsScore >= 60 ? "MODERATE" : "NEEDS POLISH"}
                                                    </Badge>
                                                    {analysisData.percentile && (
                                                        <span className="text-xs font-black text-m3-primary">
                                                            TOP {100 - analysisData.percentile}%
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <div className="p-8 rounded-[2.5rem] bg-m3-primary-container/20 border border-m3-primary/10 m3-elev-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-2 rounded-xl bg-m3-primary text-m3-on-primary">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                        <h4 className="text-xl font-black text-m3-on-primary-container underline decoration-m3-primary/30 decoration-4 underline-offset-4">Next Step</h4>
                                    </div>
                                    <p className="text-sm text-m3-on-primary-container/70 mb-8 font-bold leading-relaxed italic">"Brutal honesty is the shortcut to perfection."</p>
                                    <Button variant="outline" className="m3-button-tonal w-full h-14 text-base m3-elev-1 font-black" onClick={() => window.location.href = "/roast"}>
                                        Open AI Roaster
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-9 space-y-10">
                    {!resumeData && (
                        <Card className="m3-card bg-m3-surface-variant/10 border-dashed border-2 border-m3-outline-variant">
                            <CardContent className="flex flex-col items-center justify-center py-32 text-center">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    className="flex h-40 w-40 items-center justify-center rounded-[3rem] bg-m3-primary text-m3-on-primary m3-elev-3 mb-10"
                                >
                                    <Sparkles className="h-16 w-16" />
                                </motion.div>
                                <h3 className="text-3xl font-black mb-4 text-m3-on-surface">Ready for lift-off?</h3>
                                <p className="text-m3-on-surface-variant max-w-md text-lg font-medium opacity-80 leading-relaxed">
                                    Upload your professional profile in the sidebar to activate the AI analysis grid.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {/* ATS Score Analysis */}
                    <AnimatePresence>
                        {analysisData && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-10"
                            >
                                <Card className="m3-card bg-m3-surface border border-m3-outline-variant/30">
                                    <CardHeader className="pb-8 border-b border-m3-outline-variant/20">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-4 text-2xl font-black text-m3-on-surface">
                                                <Target className="h-8 w-8 text-m3-primary" />
                                                ATS Benchmarks
                                            </CardTitle>
                                            <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-100 text-emerald-800 m3-elev-1">
                                                <TrendingUp className="h-4 w-4" />
                                                <span className="text-xs font-black uppercase tracking-widest">Real-time Analysis</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-12 px-0 md:px-6">
                                        <div className="m3-elev-1 bg-m3-surface-variant/5 rounded-[3rem] p-8">
                                            <ATSScoreChart
                                                scores={{
                                                    formatting: analysisData.formatting,
                                                    keywords: analysisData.keywords,
                                                    impact: analysisData.impact,
                                                    readability: analysisData.readability,
                                                    skills: analysisData.skills,
                                                }}
                                                overallScore={analysisData.atsScore}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                 {/* Optimization Roadmap & Quantified Impact */}
                                 {analysisData.suggestions && analysisData.suggestions.length > 0 && (
                                    <div className="flex flex-col gap-10">
                                        <Card className="m3-card bg-m3-surface-variant/10 border-none">
                                            <CardHeader className="pb-6">
                                                <CardTitle className="flex items-center gap-4 text-xl font-black text-m3-on-surface">
                                                    <Sparkles className="h-7 w-7 text-m3-primary" />
                                                    Optimization Roadmap
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                    {analysisData.suggestions.map((suggestion: string, i: number) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start gap-5 rounded-3xl bg-m3-surface p-5 m3-elev-1 border border-m3-outline-variant/10"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-m3-primary-container text-m3-primary font-black text-sm m3-elev-1">
                                                                {i + 1}
                                                            </div>
                                                            <p className="text-sm font-bold text-m3-on-surface-variant leading-relaxed">{suggestion}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Impact Metrics */}
                                        {analysisData.impactMetrics && analysisData.impactMetrics.length > 0 && (
                                            <Card className="m3-card bg-m3-primary-container/10 border-none shadow-inner">
                                                <CardHeader className="pb-6">
                                                    <CardTitle className="flex items-center gap-4 text-xl font-black text-m3-primary">
                                                        <TrendingUp className="h-7 w-7" />
                                                        Quantified Results
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        {analysisData.impactMetrics.map((metric: string, i: number) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-start gap-5 rounded-3xl bg-m3-surface p-5 m3-elev-1 border border-emerald-100"
                                                            >
                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 font-black m3-elev-1">
                                                                    <Zap className="h-5 w-5" />
                                                                </div>
                                                                <p className="text-sm font-bold text-m3-on-surface-variant leading-relaxed">{metric}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                )}

                                <Separator className="opacity-20 bg-m3-outline" />

                                {/* Feedback */}
                                <Card className="m3-card bg-m3-surface border border-m3-outline-variant/40">
                                    <CardHeader className="pb-6">
                                        <CardTitle className="text-2xl font-black flex items-center gap-4 text-m3-on-surface">
                                            <Zap className="h-8 w-8 text-m3-primary" />
                                            Professional Verdict
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <FeedbackSection
                                            strengths={analysisData.strengths || []}
                                            weaknesses={analysisData.weaknesses || []}
                                            improvements={analysisData.improvements || []}
                                        />
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading State */}
                    {analyzing && (
                        <Card className="m3-card bg-m3-surface border-none overflow-hidden outline outline-m3-primary/10">
                            <CardContent className="flex flex-col items-center justify-center py-32">
                                <div className="text-center">
                                    <div className="relative mb-10 inline-block">
                                        <Loader2 className="h-20 w-20 animate-spin text-m3-primary" />
                                        <motion.div
                                            animate={{ scale: [1, 2.5, 1], opacity: [0.1, 0.3, 0.1] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute inset-0 bg-m3-primary blur-3xl rounded-full"
                                        />
                                    </div>
                                    <h3 className="text-3xl font-black mb-3 text-m3-on-surface">Processing Signals...</h3>
                                    <p className="text-xl text-m3-on-surface-variant font-bold opacity-70">Synthesizing recruiter logic and calculating depth indices.</p>
                                </div>
                            </CardContent>
                            <motion.div 
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                className="h-1.5 w-full bg-m3-primary mt-auto"
                            />
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
