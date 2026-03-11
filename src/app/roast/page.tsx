"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import RoastCard from "@/components/RoastCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Flame,
    Loader2,
    FileText,
    Zap,
    ThermometerSun,
    Sparkles,
} from "lucide-react";

interface ResumeData {
    id: string;
    fileName: string;
    parsedText: string;
}

interface RoastData {
    roastLevel: "mild" | "spicy" | "brutal";
    roastText: string;
}

export default function RoastPage() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [roast, setRoast] = useState<RoastData | null>(null);
    const [roasting, setRoasting] = useState(false);
    const [selectedRoastLevel, setSelectedRoastLevel] = useState<
        "mild" | "spicy" | "brutal"
    >("spicy");

    const handleUploadComplete = (data: ResumeData) => {
        setResumeData(data);
        setRoast(null);
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-xl shadow-orange-500/20">
                    <Flame className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        AI Resume Roaster
                    </span>
                </h1>
                <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                    Sometimes the truth hurts. Upload your resume and let our AI tear it apart (or be gentle, your choice).
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Controls */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-white/10 bg-white/[0.03] backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <FileText className="h-5 w-5 text-orange-400" />
                                1. Upload Resume
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader onUploadComplete={handleUploadComplete} />
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        {resumeData && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <Card className="border-white/10 bg-white/[0.03] backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Flame className="h-5 w-5 text-orange-400" />
                                            2. Choose Intensity
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { level: "mild" as const, icon: ThermometerSun, label: "Mild" },
                                                { level: "spicy" as const, icon: Flame, label: "Spicy" },
                                                { level: "brutal" as const, icon: Zap, label: "Brutal" },
                                            ].map(({ level, icon: Icon, label }) => (
                                                <Button
                                                    key={level}
                                                    variant={selectedRoastLevel === level ? "default" : "outline"}
                                                    onClick={() => setSelectedRoastLevel(level)}
                                                    className={`h-20 flex-col gap-2 ${selectedRoastLevel === level
                                                        ? "bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30"
                                                        : "border-white/10 hover:bg-white/5"
                                                        }`}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                    <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
                                                </Button>
                                            ))}
                                        </div>
                                        <Button
                                            onClick={roastResume}
                                            disabled={roasting}
                                            size="lg"
                                            className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 h-14 text-lg font-bold shadow-lg shadow-orange-500/25"
                                        >
                                            {roasting ? (
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                            ) : (
                                                <Flame className="h-6 w-6" />
                                            )}
                                            {roasting ? "Roasting..." : "Roast My Resume"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column - Result */}
                <div className="lg:col-span-8">
                    {!resumeData && (
                        <Card className="border-white/10 bg-white/[0.03] border-dashed h-full min-h-[400px] flex items-center justify-center">
                            <CardContent className="text-center py-12">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 mx-auto mb-6">
                                    <Sparkles className="h-10 w-10 text-orange-400/50" />
                                </div>
                                <h3 className="text-xl font-semibold opacity-50">Waiting for your resume...</h3>
                                <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                                    Upload your resume to see the roast. Don't worry, we're mostly joking.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <AnimatePresence mode="wait">
                        {roasting ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="h-full min-h-[400px]"
                            >
                                <Card className="border-orange-500/20 bg-orange-500/5 h-full flex items-center justify-center">
                                    <CardContent className="text-center">
                                        <div className="relative mx-auto mb-6 h-20 w-20">
                                            <Flame className="h-20 w-20 text-orange-500 animate-pulse" />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                className="absolute inset-0 bg-orange-500 blur-2xl rounded-full"
                                            />
                                        </div>
                                        <h3 className="text-2xl font-bold text-orange-400">Sharpening the logic...</h3>
                                        <p className="text-muted-foreground mt-2">Preparing a {selectedRoastLevel} roast for your resume.</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : roast ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <RoastCard
                                    roastLevel={roast.roastLevel}
                                    roastText={roast.roastText}
                                />

                                <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-blue-400">Want serious feedback?</h4>
                                        <p className="text-sm text-blue-300/80">Check out our ATS Analysis for professional improvements.</p>
                                    </div>
                                    <Button variant="outline" className="border-blue-500/30 hover:bg-blue-500/20" onClick={() => window.location.href = "/dashboard"}>
                                        Go to Dashboard
                                    </Button>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
