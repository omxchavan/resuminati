"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    PenTool,
    FileText,
    MessageSquare,
    Loader2,
    ArrowRight,
    Copy,
    CheckCircle2,
    Sparkles,
    Star,
    Zap,
} from "lucide-react";
import { useResume } from "@/components/ResumeProvider";
import { Separator } from "@/components/ui/separator";
export default function ImprovePage() {
    const { resumeData, isLoaded, analyses, setAnalysis } = useResume();
    const [activeTool, setActiveTool] = useState<"bullets" | "cover-letter" | "interview">("bullets");

    // Bullet improver
    const [bulletPoint, setBulletPoint] = useState("");
    const [improving, setImproving] = useState(false);
    const improvement = analyses.bulletImprover || null;

    // Cover letter
    const [coverLetterJD, setCoverLetterJD] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [generatingCL, setGeneratingCL] = useState(false);
    const coverLetter = analyses.coverLetter?.result || null;

    // Interview questions
    const [interviewJD, setInterviewJD] = useState("");
    const [generatingIQ, setGeneratingIQ] = useState(false);
    const questions = analyses.interviewPrep?.result || null;

    const [copied, setCopied] = useState(false);

    // Sync state when data is loaded from localStorage
    useEffect(() => {
        if (isLoaded) {
            if (analyses.bulletImprover?.original) setBulletPoint(analyses.bulletImprover.original);
            if (analyses.coverLetter?.jobDescription) setCoverLetterJD(analyses.coverLetter.jobDescription);
            if (analyses.coverLetter?.companyName) setCompanyName(analyses.coverLetter.companyName);
            if (analyses.interviewPrep?.jobDescription) setInterviewJD(analyses.interviewPrep.jobDescription);
        }
    }, [isLoaded, analyses]);

    const improveBullet = async () => {
        if (!bulletPoint) return;
        setImproving(true);
        try {
            const res = await fetch("/api/improve-bullet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bulletPoint }),
            });
            const data = await res.json();
            if (data.success) {
                setAnalysis("bulletImprover", data.improvement);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setImproving(false);
        }
    };

    const generateCoverLetter = async () => {
        if (!resumeData) return;
        setGeneratingCL(true);
        try {
            const res = await fetch("/api/generate-cover-letter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText: resumeData.parsedText,
                    jobDescription: coverLetterJD,
                    companyName,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setAnalysis("coverLetter", {
                    jobDescription: coverLetterJD,
                    companyName,
                    result: data.coverLetter
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingCL(false);
        }
    };

    const generateQuestions = async () => {
        if (!resumeData) return;
        setGeneratingIQ(true);
        try {
            const res = await fetch("/api/interview-questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText: resumeData.parsedText,
                    jobDescription: interviewJD,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setAnalysis("interviewPrep", {
                    jobDescription: interviewJD,
                    result: data.questions
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingIQ(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                className="mb-12 text-center"
            >
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl neo-sm mb-6">
                    <Sparkles className="h-6 w-6 text-french-blue dark:text-cool-sky" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    <span className="text-foreground">AI Career </span>
                    <span className="bg-gradient-to-r from-french-blue to-cool-sky bg-clip-text text-transparent">
                        Superpowers
                    </span>
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                    Professional tools to help you land your dream job, powered by advanced AI.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Tool Selection sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    {[
                        { id: "bullets", icon: Star, label: "Bullet Points" },
                        { id: "cover-letter", icon: FileText, label: "Cover Letter" },
                        { id: "interview", icon: MessageSquare, label: "Interview Prep" },
                    ].map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id as any)}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all font-bold text-sm uppercase tracking-wider
                                ${activeTool === tool.id 
                                    ? "neo-pressed text-french-blue dark:text-cool-sky" 
                                    : "neo-interactive hover:neo-pressed text-muted-foreground"}`}
                        >
                            <tool.icon className="h-5 w-5" />
                            {tool.label}
                        </button>
                    ))}

                    <div className="mt-8 p-6 rounded-3xl neo bg-background/30 border-none">
                        <ResumeUploader />
                        {resumeData && (
                            <p className="mt-4 text-[10px] text-center font-bold text-french-blue uppercase tracking-widest">
                                ✓ CONTEXT READY
                            </p>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9">
                    <AnimatePresence mode="wait">
                        {activeTool === "bullets" && (
                            <motion.div
                                key="bullets"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <Card className="neo p-2">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold flex items-center gap-3">
                                                <PenTool className="h-6 w-6 text-french-blue" />
                                                Original Bullet
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <Textarea
                                                placeholder='e.g., "Responsible for team management and project delivery."'
                                                className="w-full h-40 rounded-2xl neo-pressed bg-transparent p-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:neo-pressed transition-all border-none"
                                                value={bulletPoint}
                                                onChange={(e) => setBulletPoint(e.target.value)}
                                            />
                                            <Button
                                                onClick={improveBullet}
                                                disabled={improving || !bulletPoint}
                                                className="w-full gap-3 text-french-blue dark:text-cool-sky font-bold h-14 rounded-2xl neo-interactive hover:neo-pressed border-none bg-background text-base shadow-none"
                                            >
                                                {improving ? (
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                ) : (
                                                    <Zap className="h-5 w-5" />
                                                )}
                                                {improving ? "Optimizing..." : "Improve with AI"}
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="neo p-2 overflow-hidden">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-bold flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                                                <Sparkles className="h-6 w-6" />
                                                AI Optimized
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {improvement ? (
                                                <div className="space-y-6">
                                                    <div className="p-6 rounded-2xl neo-pressed bg-background/50">
                                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3 opacity-50">Original</p>
                                                        <p className="text-muted-foreground line-through decoration-red-500/30">{improvement.original}</p>
                                                    </div>
                                                    <div className="p-6 rounded-2xl neo-sm bg-background border-none">
                                                        <p className="text-sm font-bold text-french-blue uppercase tracking-widest mb-3">Refactored</p>
                                                        <p className="text-foreground font-bold leading-relaxed">{improvement.improved}</p>
                                                    </div>
                                                    <div className="p-4 rounded-xl bg-french-blue/5 border border-french-blue/10">
                                                        <p className="text-xs font-medium text-french-blue leading-relaxed">
                                                            <span className="font-bold">Logic:</span> {improvement.explanation}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-24 text-center opacity-30">
                                                    <Zap className="h-16 w-16 mb-4" />
                                                    <p className="font-bold uppercase tracking-widest text-sm">Waiting for input</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        )}

                        {activeTool === "cover-letter" && (
                            <motion.div
                                key="cover-letter"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <Card className="neo p-2">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-bold">Target Details</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Company Name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Acme Corp"
                                                        className="w-full h-12 rounded-xl neo-pressed bg-transparent px-4 text-sm text-foreground focus:outline-none transition-all border-none"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Job Description</label>
                                                    <Textarea
                                                        placeholder="Paste the job description for better personalization..."
                                                        className="w-full h-40 rounded-2xl neo-pressed bg-transparent p-6 text-sm text-foreground focus:outline-none focus:neo-pressed transition-all border-none"
                                                        value={coverLetterJD}
                                                        onChange={(e) => setCoverLetterJD(e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={generateCoverLetter}
                                                    disabled={generatingCL || !resumeData}
                                                    className="w-full gap-3 text-french-blue dark:text-cool-sky font-bold h-14 rounded-2xl neo-interactive hover:neo-pressed border-none bg-background text-base shadow-none"
                                                >
                                                    {generatingCL ? (
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <FileText className="h-5 w-5" />
                                                    )}
                                                    {generatingCL ? "Drafting..." : "Generate Letter"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                        
                                        {!resumeData && (
                                            <div className="p-6 rounded-2xl neo-pressed bg-red-400/5 text-center">
                                                <p className="text-sm font-bold text-red-500/70">RESUME REQUIRED FOR CONTEXT</p>
                                            </div>
                                        )}
                                    </div>

                                    <Card className="neo p-2 min-h-[500px]">
                                        <CardHeader className="flex flex-row items-center justify-between">
                                            <CardTitle className="text-xl font-bold">Preview</CardTitle>
                                            {coverLetter && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="neo-interactive rounded-xl px-4 h-10 border-none bg-background/50 font-bold text-xs"
                                                    onClick={() => copyToClipboard(coverLetter.coverLetter)}
                                                >
                                                    {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                                    {copied ? "COPIED" : "COPY"}
                                                </Button>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            {coverLetter ? (
                                                <div className="space-y-6">
                                                    <div className="p-8 rounded-2xl neo-pressed bg-background/30 max-h-[400px] overflow-y-auto">
                                                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium text-foreground/80">
                                                            {coverLetter.coverLetter}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {coverLetter.highlights.map((h: string, i: number) => (
                                                            <Badge key={i} className="bg-french-blue/10 text-french-blue border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                                                                {h}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-40 text-center opacity-20">
                                                    <FileText className="h-20 w-20 mb-4" />
                                                    <p className="font-bold uppercase tracking-widest text-sm">No Letter Generated</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </motion.div>
                        )}

                        {activeTool === "interview" && (
                            <motion.div
                                key="interview"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-4">
                                        <Card className="neo p-2">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-bold">Preparation</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Target Role JD</label>
                                                    <Textarea
                                                        placeholder="Paste JD for specialized questions..."
                                                        className="w-full h-40 rounded-2xl neo-pressed bg-transparent p-6 text-sm text-foreground focus:outline-none focus:neo-pressed transition-all border-none"
                                                        value={interviewJD}
                                                        onChange={(e) => setInterviewJD(e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={generateQuestions}
                                                    disabled={generatingIQ || !resumeData}
                                                    className="w-full gap-3 text-french-blue dark:text-cool-sky font-bold h-14 rounded-2xl neo-interactive hover:neo-pressed border-none bg-background text-base shadow-none"
                                                >
                                                    {generatingIQ ? (
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                    ) : (
                                                        <MessageSquare className="h-5 w-5" />
                                                    )}
                                                    {generatingIQ ? "Strategizing..." : "Get Questions"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="lg:col-span-8 space-y-6">
                                        {questions ? (
                                            <div className="space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Technical */}
                                                    <Card className="neo p-2 border-none">
                                                        <CardHeader>
                                                            <CardTitle className="text-lg font-bold flex items-center gap-3">
                                                                <Star className="h-5 w-5 text-french-blue" />
                                                                Technical Focus
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                            {questions.technical.map((q: any, i: number) => (
                                                                <div key={i} className="p-4 rounded-xl neo-pressed bg-background/50 space-y-2">
                                                                    <div className="flex justify-between gap-2">
                                                                        <p className="text-sm font-bold text-foreground leading-tight">{q.question}</p>
                                                                        <Badge className="bg-french-blue/10 text-french-blue text-[9px] h-5 border-none">{q.difficulty}</Badge>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground font-medium italic">💡 {q.hint}</p>
                                                                </div>
                                                            ))}
                                                        </CardContent>
                                                    </Card>

                                                    {/* Behavioral */}
                                                    <Card className="neo p-2 border-none">
                                                        <CardHeader>
                                                            <CardTitle className="text-lg font-bold flex items-center gap-3 text-cool-sky">
                                                                <Zap className="h-5 w-5" />
                                                                Behavioral
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                            {questions.behavioral.map((q: any, i: number) => (
                                                                <div key={i} className="p-4 rounded-xl neo-pressed bg-background/50 space-y-2">
                                                                     <div className="flex justify-between gap-2">
                                                                        <p className="text-sm font-bold text-foreground leading-tight">{q.question}</p>
                                                                        <Badge className="bg-cool-sky/10 text-cool-sky text-[9px] h-5 border-none">{q.difficulty}</Badge>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground font-medium italic">💡 {q.hint}</p>
                                                                </div>
                                                            ))}
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                <Card className="neo-pressed p-4 border-none bg-emerald-500/5">
                                                    <CardHeader className="py-2">
                                                        <CardTitle className="text-sm font-bold text-emerald-600 flex items-center gap-2">
                                                            <Sparkles className="h-4 w-4" />
                                                            PREP STRATEGY
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-2">
                                                        {questions.tips.map((tip: string, i: number) => (
                                                            <p key={i} className="text-xs font-medium text-emerald-700/80 leading-relaxed px-3 py-2 rounded-lg bg-background/50">
                                                                • {tip}
                                                            </p>
                                                        ))}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ) : (
                                            <Card className="neo-pressed border-none min-h-[400px] flex items-center justify-center">
                                                <div className="text-center opacity-20">
                                                    <MessageSquare className="h-20 w-20 mx-auto mb-4" />
                                                    <p className="font-bold uppercase tracking-widest text-sm text-center">No Questions Loaded</p>
                                                </div>
                                            </Card>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// Sub-components placeholder logic (normally these would be separate files but here 
// the original file had everything inlined or expected they existed. 
// However, the original file I viewed did NOT have these sub-components defined.
// Wait, I must have missed something. Let me check the original file again 
// for where BulletImprover, CoverLetterGenerator, and InterviewPrep are defined.
// Actually, looking at the code I viewed, it used THEM as components:
// <BulletImprover />, <CoverLetterGenerator />, <InterviewPrep />
// But they were NOT imported. This implies they might have been defined 
// in the SAME file lower down, or I missed the imports.
// Re-check: lines 1-20 had imports. No sub-components there.
// I'll define them as simple sub-components in this file to be safe, 
// or check if they are in components/.

