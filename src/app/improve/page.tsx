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
            if (analyses.bulletImprover?.original && !bulletPoint) setBulletPoint(analyses.bulletImprover.original);
            if (analyses.coverLetter?.jobDescription && !coverLetterJD) setCoverLetterJD(analyses.coverLetter.jobDescription);
            if (analyses.coverLetter?.companyName && !companyName) setCompanyName(analyses.coverLetter.companyName);
            if (analyses.interviewPrep?.jobDescription && !interviewJD) setInterviewJD(analyses.interviewPrep.jobDescription);
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
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-black text-m3-primary uppercase tracking-widest">Growth Engine</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-m3-on-surface">
                    Career <span className="text-m3-primary italic">Optimization</span>
                </h1>
                <p className="mt-4 text-xl text-m3-on-surface-variant font-medium max-w-2xl opacity-80">
                    Leverage advanced AI tools to polish your bullet points, generate personalized cover letters, and prepare for interviews.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                    {[
                        { id: "bullets", icon: Star, label: "Bullet Points" },
                        { id: "cover-letter", icon: FileText, label: "Cover Letter" },
                        { id: "interview", icon: MessageSquare, label: "Interview Prep" },
                    ].map((tool) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id as any)}
                            className={`w-full flex items-center gap-4 px-6 py-5 rounded-[2rem] transition-all font-black text-sm uppercase tracking-wider
                                ${activeTool === tool.id 
                                    ? "bg-m3-primary text-m3-on-primary m3-elev-2 scale-105" 
                                    : "text-m3-on-surface-variant hover:bg-m3-surface-variant/50"}`}
                        >
                            <tool.icon className={`h-5 w-5 ${activeTool === tool.id ? "text-m3-on-primary" : "text-m3-primary"}`} />
                            {tool.label}
                        </button>
                    ))}

                    <Card className="mt-10 m3-card !p-4 bg-m3-surface-variant/20 border-none m3-elev-0">
                        <ResumeUploader />
                        {resumeData && (
                            <div className="mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-emerald-100/50 text-emerald-700">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Resume Context Locked</span>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9">
                    <AnimatePresence mode="wait">
                        {activeTool === "bullets" && (
                            <motion.div
                                key="bullets"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <Card className="m3-card bg-m3-surface border-2 border-m3-primary/5 h-full">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-black flex items-center gap-4 text-m3-on-surface">
                                                <PenTool className="h-6 w-6 text-m3-primary" />
                                                Original Statement
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <Textarea
                                                placeholder='e.g., "Responsible for team management and project delivery."'
                                                className="w-full h-48 m3-input bg-m3-surface-variant/20 border-none p-6 text-base font-medium leading-relaxed resize-none focus:bg-m3-surface-variant/40"
                                                value={bulletPoint}
                                                onChange={(e) => setBulletPoint(e.target.value)}
                                            />
                                            <Button
                                                onClick={improveBullet}
                                                disabled={improving || !bulletPoint}
                                                className="m3-button-filled w-full h-16 text-lg m3-elev-2 hover:m3-elev-4 active:scale-95 transition-all"
                                            >
                                                {improving ? (
                                                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                                ) : (
                                                    <Zap className="h-6 w-6 mr-3" />
                                                )}
                                                {improving ? "Optimizing Assets..." : "Optimize with AI"}
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="m3-card bg-m3-surface-variant/10 border-none h-full overflow-hidden">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-black flex items-center gap-4 text-emerald-700 dark:text-emerald-400">
                                                <Sparkles className="h-6 w-6" />
                                                AI Polished Result
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {improvement ? (
                                                <div className="space-y-6">
                                                    <div className="p-6 rounded-[2rem] bg-m3-surface m3-elev-1 border border-m3-outline-variant/10">
                                                        <p className="text-[10px] font-black text-m3-on-surface-variant uppercase tracking-widest mb-3 opacity-50">Impact Analysis</p>
                                                        <p className="text-m3-on-surface-variant line-through decoration-red-500/30 font-medium">{improvement.original}</p>
                                                    </div>
                                                    <div className="p-8 rounded-[2.5rem] bg-m3-primary-container text-m3-on-primary-container m3-elev-1 border-none relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-[4rem]" />
                                                        <p className="text-[10px] font-black text-m3-primary uppercase tracking-widest mb-4">Refined Point</p>
                                                        <p className="text-lg font-black leading-relaxed">{improvement.improved}</p>
                                                    </div>
                                                    <div className="p-5 rounded-2xl bg-m3-secondary-container/30 border border-m3-secondary-container">
                                                        <p className="text-xs font-bold text-m3-on-secondary-container leading-relaxed">
                                                            <span className="font-black italic">Strategic Context:</span> {improvement.explanation}
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
                                                    <div className="h-32 w-32 rounded-full bg-m3-surface m3-elev-1 flex items-center justify-center mb-8">
                                                        <Zap className="h-14 w-14" />
                                                    </div>
                                                    <p className="font-black uppercase tracking-[0.2em] text-xs">Awaiting Analysis</p>
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    <div className="lg:col-span-5 space-y-6">
                                        <Card className="m3-card bg-m3-surface border-2 border-m3-primary/5">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-black text-m3-on-surface">Letter Context</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-m3-on-surface-variant uppercase tracking-widest ml-1">Company Entity</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Acme Corp"
                                                        className="w-full h-14 rounded-2xl m3-input bg-m3-surface-variant/20 border-none px-6 text-base font-bold text-m3-on-surface focus:bg-m3-surface-variant/40 transition-all outline-none"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-m3-on-surface-variant uppercase tracking-widest ml-1">Target Job Description</label>
                                                    <Textarea
                                                        placeholder="Paste JD for deep personalization..."
                                                        className="w-full h-56 m3-input bg-m3-surface-variant/20 border-none p-6 text-base font-medium leading-relaxed resize-none focus:bg-m3-surface-variant/40"
                                                        value={coverLetterJD}
                                                        onChange={(e) => setCoverLetterJD(e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={generateCoverLetter}
                                                    disabled={generatingCL || !resumeData}
                                                    className="m3-button-filled w-full h-16 text-lg m3-elev-2 hover:m3-elev-4 active:scale-95 transition-all"
                                                >
                                                    {generatingCL ? (
                                                        <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                                    ) : (
                                                        <FileText className="h-6 w-6 mr-3" />
                                                    )}
                                                    {generatingCL ? "Synthesizing Draft..." : "Draft Cover Letter"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                        
                                        {!resumeData && (
                                            <div className="p-6 rounded-3xl bg-red-100/50 border border-red-200 text-center">
                                                <p className="text-xs font-black text-red-700 uppercase tracking-widest">Profile Context Required</p>
                                            </div>
                                        )}
                                    </div>

                                    <Card className="lg:col-span-7 m3-card bg-m3-surface border-none m3-elev-1 min-h-[600px] flex flex-col">
                                        <CardHeader className="flex flex-row items-center justify-between border-b border-m3-outline-variant/30 pb-6 px-8">
                                            <CardTitle className="text-xl font-black text-m3-on-surface">Draft Preview</CardTitle>
                                            {coverLetter && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="rounded-full px-6 h-10 border border-m3-outline-variant text-m3-primary font-black text-xs hover:bg-m3-primary/5 transition-all"
                                                    onClick={() => copyToClipboard(coverLetter.coverLetter)}
                                                >
                                                    {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                                                    {copied ? "COPIED" : "COPY TO CLIPBOARD"}
                                                </Button>
                                            )}
                                        </CardHeader>
                                        <CardContent className="flex-1 p-0 flex flex-col">
                                            {coverLetter ? (
                                                <div className="flex-1 flex flex-col">
                                                    <div className="flex-1 p-10 max-h-[500px] overflow-y-auto bg-m3-surface-variant/5">
                                                        <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium text-m3-on-surface-variant italic">
                                                            {coverLetter.coverLetter}
                                                        </p>
                                                    </div>
                                                    <div className="p-8 border-t border-m3-outline-variant/30 flex flex-wrap gap-3 mt-auto">
                                                        <span className="text-[10px] font-black text-m3-primary uppercase tracking-widest w-full mb-1">Key Value Propositions</span>
                                                        {coverLetter.highlights?.map((h: string, i: number) => (
                                                            <Badge key={i} className="bg-m3-primary-container text-m3-primary border-none px-4 py-1.5 text-xs font-black rounded-lg m3-elev-0">
                                                                {h}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex flex-col items-center justify-center py-40 text-center opacity-20">
                                                    <FileText className="h-24 w-24 mb-6" />
                                                    <p className="font-black uppercase tracking-[0.2em] text-xs">No Letter Generated</p>
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                    <div className="lg:col-span-4">
                                        <Card className="m3-card bg-m3-surface border-2 border-m3-primary/5">
                                            <CardHeader>
                                                <CardTitle className="text-xl font-black text-m3-on-surface">Target Arena</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black text-m3-on-surface-variant uppercase tracking-widest ml-1">Target Role JD</label>
                                                    <Textarea
                                                        placeholder="Paste JD for tactical questions..."
                                                        className="w-full h-56 m3-input bg-m3-surface-variant/20 border-none p-6 text-base font-medium leading-relaxed resize-none focus:bg-m3-surface-variant/40"
                                                        value={interviewJD}
                                                        onChange={(e) => setInterviewJD(e.target.value)}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={generateQuestions}
                                                    disabled={generatingIQ || !resumeData}
                                                    className="m3-button-filled w-full h-16 text-lg m3-elev-2 hover:m3-elev-4 active:scale-95 transition-all"
                                                >
                                                    {generatingIQ ? (
                                                        <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                                    ) : (
                                                        <MessageSquare className="h-6 w-6 mr-3" />
                                                    )}
                                                    {generatingIQ ? "Scenario Mapping..." : "Get Tactics"}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div className="lg:col-span-8 space-y-8">
                                        {questions ? (
                                            <div className="space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {/* Technical */}
                                                    <div className="space-y-5">
                                                        <div className="flex items-center gap-3 mb-2 px-2">
                                                            <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                                                <Star className="h-4 w-4" />
                                                            </div>
                                                            <h4 className="text-lg font-black text-m3-on-surface">Domain Expertise</h4>
                                                        </div>
                                                        <div className="space-y-5">
                                                            {questions.technical.map((q: any, i: number) => (
                                                                <Card key={i} className="m3-card border-none bg-m3-surface m3-elev-1 !p-6 hover:m3-elev-3 transition-all duration-300">
                                                                    <div className="flex justify-between items-start gap-4 mb-4">
                                                                        <p className="text-base font-black text-m3-on-surface leading-snug">{q.question}</p>
                                                                        <Badge className="bg-m3-primary-container text-m3-primary px-3 py-1 font-black text-[9px] rounded-lg tracking-widest shrink-0">
                                                                            {q.difficulty?.toUpperCase()}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex items-start gap-4 bg-m3-surface-variant/10 p-4 rounded-2xl border-l-4 border-m3-primary">
                                                                        <Zap className="h-4 w-4 text-m3-primary shrink-0 mt-1" />
                                                                        <p className="text-sm font-bold text-m3-on-surface-variant italic leading-relaxed">{q.hint}</p>
                                                                    </div>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Behavioral */}
                                                    <div className="space-y-5">
                                                        <div className="flex items-center gap-3 mb-2 px-2">
                                                            <div className="h-8 w-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                                                <Zap className="h-4 w-4" />
                                                            </div>
                                                            <h4 className="text-lg font-black text-m3-on-surface">Cultural Impact</h4>
                                                        </div>
                                                        <div className="space-y-5">
                                                            {questions.behavioral.map((q: any, i: number) => (
                                                                <Card key={i} className="m3-card border-none bg-m3-surface m3-elev-1 !p-6 hover:m3-elev-3 transition-all duration-300">
                                                                    <div className="flex justify-between items-start gap-4 mb-4">
                                                                        <p className="text-base font-black text-m3-on-surface leading-snug">{q.question}</p>
                                                                        <Badge className="bg-orange-100 text-orange-700 px-3 py-1 font-black text-[9px] rounded-lg tracking-widest shrink-0">
                                                                            {q.difficulty?.toUpperCase()}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex items-start gap-4 bg-orange-50/50 p-4 rounded-2xl border-l-4 border-orange-400">
                                                                        <Star className="h-4 w-4 text-orange-600 shrink-0 mt-1" />
                                                                        <p className="text-sm font-bold text-m3-on-surface-variant italic leading-relaxed">{q.hint}</p>
                                                                    </div>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Card className="m3-card bg-emerald-100/30 border border-emerald-200">
                                                    <CardHeader className="py-4">
                                                        <CardTitle className="text-xs font-black text-emerald-800 flex items-center gap-3 tracking-[0.2em]">
                                                            <Sparkles className="h-4 w-4" />
                                                            TACTICAL ADVANTAGES
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
                                                        {questions.tips.map((tip: string, i: number) => (
                                                            <div key={i} className="p-4 rounded-2xl bg-white/70 m3-elev-1 border border-emerald-100/50">
                                                                <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                                                                    {tip}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ) : (
                                            <div className="m3-card bg-m3-surface-variant/10 border-dashed border-2 border-m3-outline-variant/30 h-full min-h-[400px] flex flex-col items-center justify-center p-20 text-center">
                                                <div className="h-32 w-32 rounded-[2.5rem] bg-m3-surface m3-elev-1 flex items-center justify-center mb-8">
                                                    <MessageSquare className="h-14 w-14 text-m3-on-surface-variant/30" />
                                                </div>
                                                <h3 className="text-2xl font-black text-m3-on-surface mb-3">No Intel Loaded</h3>
                                                <p className="text-m3-on-surface-variant max-w-sm font-medium opacity-70 leading-relaxed">
                                                    Enter a target job description and get tactical questions designed specifically for your profile.
                                                </p>
                                            </div>
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
