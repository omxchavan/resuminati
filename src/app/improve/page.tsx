"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";

export default function ImprovePage() {
    const [resumeText, setResumeText] = useState("");
    // Bullet improver
    const [bulletPoint, setBulletPoint] = useState("");
    const [improving, setImproving] = useState(false);
    const [improvement, setImprovement] = useState<{
        original: string;
        improved: string;
        explanation: string;
    } | null>(null);

    // Cover letter
    const [coverLetterJD, setCoverLetterJD] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [generatingCL, setGeneratingCL] = useState(false);
    const [coverLetter, setCoverLetter] = useState<{
        coverLetter: string;
        highlights: string[];
    } | null>(null);

    // Interview questions
    const [interviewJD, setInterviewJD] = useState("");
    const [generatingIQ, setGeneratingIQ] = useState(false);
    const [questions, setQuestions] = useState<{
        technical: Array<{ question: string; hint: string; difficulty: string }>;
        behavioral: Array<{ question: string; hint: string; difficulty: string }>;
        tips: string[];
    } | null>(null);

    const [copied, setCopied] = useState(false);

    const handleUpload = (data: { parsedText: string }) => {
        setResumeText(data.parsedText);
    };

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
            if (data.success) setImprovement(data.improvement);
        } catch (error) {
            console.error(error);
        } finally {
            setImproving(false);
        }
    };

    const generateCoverLetter = async () => {
        if (!resumeText) return;
        setGeneratingCL(true);
        try {
            const res = await fetch("/api/generate-cover-letter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText,
                    jobDescription: coverLetterJD,
                    companyName,
                }),
            });
            const data = await res.json();
            if (data.success) setCoverLetter(data.coverLetter);
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingCL(false);
        }
    };

    const generateQuestions = async () => {
        if (!resumeText) return;
        setGeneratingIQ(true);
        try {
            const res = await fetch("/api/interview-questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText,
                    jobDescription: interviewJD,
                }),
            });
            const data = await res.json();
            if (data.success) setQuestions(data.questions);
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

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold">
                    <span className="text-foreground">
                        AI Career{" "}
                    </span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Tools
                    </span>
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Powerful AI tools to optimize every aspect of your job application
                </p>
            </motion.div>

            {/* Resume Upload (shared) */}
            <Card className="neo mb-6">
                <CardContent className="pt-6">
                    <ResumeUploader onUploadComplete={handleUpload} compact />
                </CardContent>
            </Card>

            <Tabs defaultValue="bullet" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 h-12">
                    <TabsTrigger value="bullet" className="gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                        <PenTool className="h-4 w-4" />
                        <span className="hidden sm:inline">Bullet Improver</span>
                        <span className="sm:hidden">Bullets</span>
                    </TabsTrigger>
                    <TabsTrigger value="cover" className="gap-2 data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-400">
                        <FileText className="h-4 w-4" />
                        <span className="hidden sm:inline">Cover Letter</span>
                        <span className="sm:hidden">Cover</span>
                    </TabsTrigger>
                    <TabsTrigger value="interview" className="gap-2 data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Interview Prep</span>
                        <span className="sm:hidden">Interview</span>
                    </TabsTrigger>
                </TabsList>

                {/* Bullet Improver */}
                <TabsContent value="bullet" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="neo">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PenTool className="h-5 w-5 text-purple-400" />
                                    Original Bullet Point
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea
                                    placeholder='e.g., "Worked on API development"'
                                    value={bulletPoint}
                                    onChange={(e) => setBulletPoint(e.target.value)}
                                    rows={4}
                                    className="border-white/10 bg-white/[0.03] resize-none"
                                />
                                <Button
                                    onClick={improveBullet}
                                    disabled={improving || !bulletPoint}
                                    className="w-full gap-2 bg-gradient-to-r from-purple-700 to-pink-800 text-white font-bold h-12 rounded-2xl"
                                >
                                    {improving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Sparkles className="h-4 w-4" />
                                    )}
                                    {improving ? "Improving..." : "Improve Bullet Point"}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="neo">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ArrowRight className="h-5 w-5 text-emerald-400" />
                                    Improved Version
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {improvement ? (
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                                            <p className="text-xs text-red-400 mb-1">Original</p>
                                            <p className="text-sm text-foreground/70 line-through">
                                                {improvement.original}
                                            </p>
                                        </div>
                                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                                            <p className="text-xs text-emerald-400 mb-1">Improved</p>
                                            <p className="text-sm text-foreground font-medium">
                                                {improvement.improved}
                                            </p>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {improvement.explanation}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                                        <PenTool className="h-10 w-10 mb-3 opacity-30" />
                                        <p className="text-sm">Your improved bullet will appear here</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Cover Letter Generator */}
                <TabsContent value="cover" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Card className="neo">
                                <CardHeader>
                                    <CardTitle className="text-lg">Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-1 block">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Google"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm focus:border-indigo-500/50 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground mb-1 block">
                                            Job Description (optional)
                                        </label>
                                        <Textarea
                                            placeholder="Paste the job description..."
                                            value={coverLetterJD}
                                            onChange={(e) => setCoverLetterJD(e.target.value)}
                                            rows={6}
                                            className="border-white/10 bg-white/[0.03] resize-none"
                                        />
                                    </div>
                                    <Button
                                        onClick={generateCoverLetter}
                                        disabled={generatingCL || !resumeText}
                                        className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
                                    >
                                        {generatingCL ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <FileText className="h-4 w-4" />
                                        )}
                                        {generatingCL ? "Generating..." : "Generate Cover Letter"}
                                    </Button>
                                    {!resumeText && (
                                        <p className="text-xs text-amber-400">
                                            ↑ Upload your resume first
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="neo">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Generated Letter</CardTitle>
                                    {coverLetter && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(coverLetter.coverLetter)}
                                            className="gap-1"
                                        >
                                            {copied ? (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                            {copied ? "Copied!" : "Copy"}
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                {coverLetter ? (
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 max-h-96 overflow-y-auto">
                                            <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                                                {coverLetter.coverLetter}
                                            </p>
                                        </div>
                                        {coverLetter.highlights && (
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    Key highlights:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {coverLetter.highlights.map((h, i) => (
                                                        <Badge key={i} className="bg-indigo-500/15 text-indigo-400 border-indigo-500/20 text-xs">
                                                            {h}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                                        <FileText className="h-10 w-10 mb-3 opacity-30" />
                                        <p className="text-sm">Your cover letter will appear here</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Interview Questions */}
                <TabsContent value="interview" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="neo">
                            <CardHeader>
                                <CardTitle className="text-lg">Configure</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm text-muted-foreground mb-1 block">
                                        Job Description (optional)
                                    </label>
                                    <Textarea
                                        placeholder="Paste JD for targeted questions..."
                                        value={interviewJD}
                                        onChange={(e) => setInterviewJD(e.target.value)}
                                        rows={6}
                                        className="border-white/10 bg-white/[0.03] resize-none"
                                    />
                                </div>
                                <Button
                                    onClick={generateQuestions}
                                    disabled={generatingIQ || !resumeText}
                                    className="w-full gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700"
                                >
                                    {generatingIQ ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <MessageSquare className="h-4 w-4" />
                                    )}
                                    {generatingIQ ? "Generating..." : "Generate Questions"}
                                </Button>
                                {!resumeText && (
                                    <p className="text-xs text-amber-400">
                                        ↑ Upload your resume first
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <div className="lg:col-span-2">
                            {questions ? (
                                <div className="space-y-6">
                                    {/* Technical */}
                                    <Card className="neo">
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                💻 Technical Questions
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {questions.technical?.map((q, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <p className="text-sm font-medium text-foreground">
                                                            {q.question}
                                                        </p>
                                                        <Badge
                                                            className={`shrink-0 text-xs ${q.difficulty === "hard"
                                                                    ? "bg-red-500/20 text-red-400"
                                                                    : q.difficulty === "medium"
                                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                                        : "bg-emerald-500/20 text-emerald-400"
                                                                }`}
                                                        >
                                                            {q.difficulty}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        💡 {q.hint}
                                                    </p>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    {/* Behavioral */}
                                    <Card className="neo">
                                        <CardHeader>
                                            <CardTitle className="text-base flex items-center gap-2">
                                                🧠 Behavioral Questions
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {questions.behavioral?.map((q, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <p className="text-sm font-medium text-foreground">
                                                            {q.question}
                                                        </p>
                                                        <Badge
                                                            className={`shrink-0 text-xs ${q.difficulty === "hard"
                                                                    ? "bg-red-500/20 text-red-400"
                                                                    : q.difficulty === "medium"
                                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                                        : "bg-emerald-500/20 text-emerald-400"
                                                                }`}
                                                        >
                                                            {q.difficulty}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        💡 {q.hint}
                                                    </p>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    {/* Tips */}
                                    {questions.tips && (
                                        <Card className="neo">
                                            <CardHeader>
                                                <CardTitle className="text-base">📝 Prep Tips</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {questions.tips.map((tip, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-3"
                                                        >
                                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                                                            <p className="text-sm text-foreground/80">{tip}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            ) : (
                                <Card className="neo">
                                    <CardContent className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
                                        <MessageSquare className="h-10 w-10 mb-3 opacity-30" />
                                        <p className="text-sm">Interview questions will appear here</p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
