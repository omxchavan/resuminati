"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Zap,
    Loader2,
    FileText,
    Target,
    CheckCircle2,
    XCircle,
    ArrowRight,
    Sparkles,
    Briefcase,
} from "lucide-react";
import { useResume } from "@/components/ResumeProvider";

export default function JobMatchPage() {
    const { resumeData, isLoaded, analyses, setAnalysis } = useResume();
    const matchData = analyses.jobMatch;
    const [jobDescription, setJobDescription] = useState("");
    const [matching, setMatching] = useState(false);

    // Sync jobDescription from matchData if available
    useEffect(() => {
        if (isLoaded && analyses.jobMatch?.jobDescription) {
            setJobDescription(analyses.jobMatch.jobDescription);
        }
    }, [isLoaded, analyses.jobMatch]);

    const findMatch = async () => {
        if (!resumeData || !jobDescription) return;
        setMatching(true);
        try {
            const res = await fetch("/api/job-match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText: resumeData.parsedText,
                    jobDescription,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setAnalysis("jobMatch", {
                    ...data.match,
                    jobDescription // Save the JD too
                });
            }
        } catch (error) {
            console.error("Match failed:", error);
        } finally {
            setMatching(false);
        }
    };

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
                        <Target className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-black text-m3-primary uppercase tracking-widest">Precision Alignment</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-m3-on-surface">
                    Job Description <span className="text-m3-primary italic">Match</span>
                </h1>
                <p className="mt-4 text-xl text-m3-on-surface-variant font-medium max-w-2xl opacity-80">
                    Paste a job description to see exactly how your profile stacks up against the requirements.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column - Input */}
                <div className="lg:col-span-5 space-y-8">
                    <Card className="m3-card !p-2 bg-m3-surface-variant/20 border-m3-outline-variant/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-4 text-xl font-black text-m3-on-surface">
                                <FileText className="h-6 w-6 text-m3-primary" />
                                1. Source Resume
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader />
                        </CardContent>
                    </Card>

                    <Card className="m3-card bg-m3-surface border-2 border-m3-primary/5">
                        <CardHeader className="pb-6">
                            <CardTitle className="flex items-center gap-4 text-xl font-black text-m3-on-surface">
                                <Briefcase className="h-6 w-6 text-m3-primary" />
                                2. Target Role
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Textarea
                                placeholder="Paste the job description here..."
                                className="min-h-[300px] m3-input bg-m3-surface-variant/20 border-none p-6 text-base font-medium leading-relaxed resize-none focus:bg-m3-surface-variant/40"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <Button
                                onClick={findMatch}
                                disabled={matching || !resumeData || !jobDescription}
                                className="m3-button-filled w-full h-16 text-lg m3-elev-2 hover:m3-elev-4 active:scale-95 transition-all"
                            >
                                {matching ? (
                                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                ) : (
                                    <Zap className="h-6 w-6 mr-3" />
                                )}
                                {matching ? "Calculating Depth..." : "Calculate Fit Score"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {matching ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="m3-card bg-m3-surface-variant/10 border-none h-full min-h-[600px] flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="relative mb-10">
                                    <Loader2 className="h-20 w-20 animate-spin text-m3-primary" />
                                    <motion.div
                                        animate={{ scale: [1, 2, 1], opacity: [0.1, 0.3, 0.1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="absolute inset-0 bg-m3-primary blur-3xl rounded-full"
                                    />
                                </div>
                                <h3 className="text-3xl font-black mb-3">Syncing Semantic Vectors...</h3>
                                <p className="text-xl text-m3-on-surface-variant font-bold opacity-70">Analyzing skill overlap and contextual relevance.</p>
                            </motion.div>
                        ) : matchData ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Score Card */}
                                <Card className="m3-card bg-m3-surface border-none m3-elev-2 overflow-hidden">
                                    <div className="bg-m3-primary p-12 text-center relative">
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[10rem]" />
                                        <div className="relative">
                                            <span className="text-xs font-black text-white/60 uppercase tracking-[0.3em] block mb-4">Overall Match Index</span>
                                            {matchData.matchScore !== undefined && (
                                                <div className="text-[7rem] font-black text-white leading-none tracking-tighter">
                                                    {matchData.matchScore}<span className="text-3xl opacity-50 ml-1">%</span>
                                                </div>
                                            )}
                                            {matchData.matchScore !== undefined && (
                                                <Badge className="mt-8 px-6 py-2 bg-white/20 text-white rounded-full border-none font-black text-sm backdrop-blur-md">
                                                    {matchData.matchScore >= 80 ? "EXCELLENT FIT" : matchData.matchScore >= 60 ? "STRONG CONTENDER" : "POTENTIAL GAP"}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="p-10">
                                        <h4 className="text-xl font-black text-m3-on-surface mb-8">Executive Summary</h4>
                                        <p className="text-lg font-medium text-m3-on-surface-variant leading-relaxed opacity-90 italic">
                                            "{matchData.summary || matchData.result?.summary}"
                                        </p>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Success Indicators */}
                                    <Card className="m3-card bg-emerald-50/50 dark:bg-emerald-950/20 border-none m3-elev-1">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-black text-emerald-700 dark:text-emerald-400 flex items-center gap-3">
                                                <CheckCircle2 className="h-6 w-6" />
                                                Requirement Hits
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {(matchData.matchingSkills || matchData.result?.matchedKeywords)?.map((skill: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-m3-surface m3-elev-0 border border-emerald-100 dark:border-emerald-900/50">
                                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                                        <span className="text-sm font-bold text-m3-on-surface-variant">{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Skill Gaps */}
                                    <Card className="m3-card bg-amber-50/50 dark:bg-amber-950/20 border-none m3-elev-1">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-black text-amber-700 dark:text-amber-400 flex items-center gap-3">
                                                <XCircle className="h-6 w-6" />
                                                Identified Gaps
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {(matchData.missingSkills || matchData.result?.missingKeywords)?.map((skill: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-m3-surface m3-elev-0 border border-amber-100 dark:border-amber-900/50">
                                                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                                                        <span className="text-sm font-bold text-m3-on-surface-variant">{skill}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Optimization Path */}
                                <Card className="m3-card bg-m3-surface-variant/20 border-none">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-black text-m3-on-surface flex items-center gap-4">
                                            <Sparkles className="h-7 w-7 text-m3-primary" />
                                            Optimization Path
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-5">
                                            {(matchData.recommendations || matchData.result?.recommendations)?.map((rec: string, i: number) => (
                                                <div key={i} className="flex items-start gap-5 p-6 rounded-[2rem] bg-m3-surface m3-elev-1 border border-m3-outline-variant/10">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-m3-primary-container text-m3-primary font-black m3-elev-1">
                                                        {i + 1}
                                                    </div>
                                                    <p className="text-base font-bold text-m3-on-surface-variant leading-relaxed">{rec}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <div className="m3-card bg-m3-surface-variant/10 border-dashed border-2 border-m3-outline-variant/30 h-full min-h-[600px] flex flex-col items-center justify-center p-20 text-center" />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
