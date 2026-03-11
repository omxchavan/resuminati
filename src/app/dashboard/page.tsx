"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import ATSScoreChart from "@/components/ATSScoreChart";
import RoastCard from "@/components/RoastCard";
import FeedbackSection from "@/components/FeedbackSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Flame,
    Target,
    Loader2,
    FileText,
    Zap,
    ThermometerSun,
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

interface RoastData {
    roastLevel: "mild" | "spicy" | "brutal";
    roastText: string;
}

export default function DashboardPage() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [roast, setRoast] = useState<RoastData | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [roasting, setRoasting] = useState(false);
    const [selectedRoastLevel, setSelectedRoastLevel] = useState<
        "mild" | "spicy" | "brutal"
    >("spicy");

    const handleUploadComplete = (data: ResumeData) => {
        setResumeData(data);
        setAnalysis(null);
        setRoast(null);
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

    const roastResume = async () => {
        if (!resumeData) return;
        setRoasting(true);
        try {
            const res = await fetch("/api/roast-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText: resumeData.parsedText,
                    roastLevel: selectedRoastLevel,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setRoast(data.roast);
            }
        } catch (error) {
            console.error("Roast failed:", error);
        } finally {
            setRoasting(false);
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
                    <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Resume{" "}
                    </span>
                    <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        Dashboard
                    </span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Upload your resume and get instant AI-powered analysis
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Upload & Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Upload Card */}
                    <Card className="border-white/10 bg-white/[0.03]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="h-5 w-5 text-orange-400" />
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-4"
                            >
                                {/* Analyze Button */}
                                <Card className="border-white/10 bg-white/[0.03]">
                                    <CardContent className="pt-6">
                                        <Button
                                            onClick={analyzeResume}
                                            disabled={analyzing}
                                            className="w-full gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 h-11"
                                        >
                                            {analyzing ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Target className="h-4 w-4" />
                                            )}
                                            {analyzing ? "Analyzing..." : "Analyze ATS Score"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Roast Section */}
                                <Card className="border-white/10 bg-white/[0.03]">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Flame className="h-5 w-5 text-orange-400" />
                                            Roast Level
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-2">
                                            {[
                                                { level: "mild" as const, icon: ThermometerSun, label: "Mild" },
                                                { level: "spicy" as const, icon: Flame, label: "Spicy" },
                                                { level: "brutal" as const, icon: Zap, label: "Brutal" },
                                            ].map(({ level, icon: Icon, label }) => (
                                                <Button
                                                    key={level}
                                                    variant={selectedRoastLevel === level ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setSelectedRoastLevel(level)}
                                                    className={`flex-1 gap-1 ${selectedRoastLevel === level
                                                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                                            : "border-white/10"
                                                        }`}
                                                >
                                                    <Icon className="h-3.5 w-3.5" />
                                                    {label}
                                                </Button>
                                            ))}
                                        </div>
                                        <Button
                                            onClick={roastResume}
                                            disabled={roasting}
                                            className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 h-11"
                                        >
                                            {roasting ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Flame className="h-4 w-4" />
                                            )}
                                            {roasting ? "Roasting..." : "🔥 Roast My Resume"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Quick Stats */}
                                {analysis && (
                                    <Card className="border-white/10 bg-white/[0.03]">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <BarChart3 className="h-5 w-5 text-blue-400" />
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
                                                        ? "bg-emerald-500/20 text-emerald-400"
                                                        : analysis.atsScore >= 60
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-red-500/20 text-red-400"
                                                }>
                                                    {analysis.atsScore >= 80 ? "Strong" : analysis.atsScore >= 60 ? "Needs Work" : "Weak"}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-2 space-y-6">
                    {!resumeData && (
                        <Card className="border-white/10 bg-white/[0.03]">
                            <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 mb-6">
                                    <Sparkles className="h-10 w-10 text-orange-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Your Resume to Begin</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Drop a PDF or DOCX file to get your ATS score, AI roast, and professional feedback
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
                                <Card className="border-white/10 bg-white/[0.03]">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center gap-2">
                                                <Target className="h-5 w-5 text-blue-400" />
                                                ATS Score Analysis
                                            </CardTitle>
                                            <Badge className="bg-blue-500/20 text-blue-400 border-0">
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
                                    <Card className="border-white/10 bg-white/[0.03]">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <Sparkles className="h-5 w-5 text-amber-400" />
                                                AI Suggestions
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {analysis.suggestions.map((suggestion, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-start gap-3 rounded-lg border border-amber-500/10 bg-amber-500/5 p-3"
                                                    >
                                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs text-amber-400 font-medium">
                                                            {i + 1}
                                                        </span>
                                                        <p className="text-sm text-foreground/80">{suggestion}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                <Separator className="bg-white/10" />

                                {/* Feedback */}
                                {analysis.strengths && (
                                    <Card className="border-white/10 bg-white/[0.03]">
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
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Roast Result */}
                    <AnimatePresence>
                        {roast && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <RoastCard
                                    roastLevel={roast.roastLevel}
                                    roastText={roast.roastText}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Loading States */}
                    {analyzing && (
                        <Card className="border-blue-500/20 bg-blue-500/5">
                            <CardContent className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-400 mb-4" />
                                    <p className="font-medium">Analyzing your resume...</p>
                                    <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {roasting && (
                        <Card className="border-orange-500/20 bg-orange-500/5">
                            <CardContent className="flex items-center justify-center py-16">
                                <div className="text-center">
                                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-orange-400 mb-4" />
                                    <p className="font-medium">Preparing your roast... 🔥</p>
                                    <p className="text-sm text-muted-foreground">Our AI is sharpening its wit</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
