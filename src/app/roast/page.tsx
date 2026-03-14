"use client";

import { useState, useEffect } from "react";
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
    Sparkles,
    Target,
    ArrowRight,
} from "lucide-react";
import { useResume } from "@/components/ResumeProvider";

export default function RoastPage() {
    const { resumeData, isLoaded, analyses, setAnalysis } = useResume();
    const roast = analyses.roast;
    const [roasting, setRoasting] = useState(false);
    const [intensity, setIntensity] = useState<"mild" | "medium" | "brutal">("medium");

    // Sync state when data is loaded from localStorage
    useEffect(() => {
        if (isLoaded && analyses.roast?.roastLevel) {
            const level = analyses.roast.roastLevel;
            setIntensity(level === "spicy" ? "medium" : level);
        }
    }, [isLoaded, analyses.roast]);

    const getRoast = async () => {
        if (!resumeData) return;
        setRoasting(true);
        try {
            // Map our UI intensity to the API's roast level
            const roastLevel = intensity === "medium" ? "spicy" : 
                             intensity === "mild" ? "mild" : "brutal";

            const res = await fetch("/api/roast-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resumeText: resumeData.parsedText,
                    roastLevel,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setAnalysis("roast", data.roast);
            }
        } catch (error) {
            console.error("Roast failed:", error);
        } finally {
            setRoasting(false);
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
            >
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-[2rem] bg-orange-100 text-orange-600 m3-elev-1 mb-8">
                    <Flame className="h-8 w-8" />
                </div>
                <h1 className="text-5xl font-black tracking-tight text-m3-on-surface">
                    AI Resume <span className="text-orange-600 italic">Roaster</span>
                </h1>
                <p className="mt-4 text-xl text-m3-on-surface-variant font-medium max-w-2xl mx-auto opacity-80">
                    Brutal honesty is the fastest way to a better career. Choose your intensity and let's go.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column - Controls */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="m3-card !p-2 bg-m3-surface-variant/20 border-m3-outline-variant/40">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-4 text-xl font-black text-m3-on-surface">
                                <FileText className="h-6 w-6 text-m3-primary" />
                                Resume Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader />
                        </CardContent>
                    </Card>

                    <Card className="m3-card bg-m3-surface border-2 border-m3-primary/5">
                        <CardHeader className="pb-6">
                            <CardTitle className="text-xl font-black text-m3-on-surface">Roast Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div>
                                <label className="text-xs font-black text-m3-on-surface-variant uppercase tracking-[0.2em] mb-4 block">Intensity Level</label>
                                <div className="grid grid-cols-3 gap-3 p-1.5 rounded-3xl bg-m3-surface-variant/30">
                                    {(["mild", "medium", "brutal"] as const).map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setIntensity(level)}
                                            className={`py-3 rounded-[1.25rem] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                                intensity === level
                                                    ? "bg-m3-primary text-m3-on-primary m3-elev-2 scale-105"
                                                    : "text-m3-on-surface-variant hover:bg-m3-surface-variant/50"
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                onClick={getRoast}
                                disabled={roasting || !resumeData}
                                className={`w-full h-16 text-lg font-black rounded-full transition-all m3-elev-2 active:scale-95 ${
                                    intensity === "brutal" 
                                    ? "bg-red-600 text-white hover:bg-red-700" 
                                    : "m3-button-filled"
                                }`}
                            >
                                {roasting ? (
                                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                                ) : (
                                    <Flame className="h-6 w-6 mr-3" />
                                )}
                                {roasting ? "Igniting..." : "Start Roasting"}
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="p-8 rounded-[2.5rem] bg-m3-secondary-container/20 border border-m3-outline-variant/10">
                        <h4 className="flex items-center gap-3 text-lg font-black text-m3-on-secondary-container mb-4">
                            <Zap className="h-5 w-5" />
                            Why Roast?
                        </h4>
                        <p className="text-sm font-bold text-m3-on-surface-variant/70 leading-relaxed mb-6">
                            Traditional advice is soft. Our AI points out the clichés, formatting disasters, and empty buzzwords that recruiters hate but won't tell you to your face.
                        </p>
                        <div className="flex items-center gap-3 text-m3-primary">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-xs font-black uppercase tracking-widest">Powered by Resume-LLM</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Results */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {roasting ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="m3-card !bg-transparent border-dashed border-2 border-orange-200/50 py-32 flex flex-col items-center justify-center text-center"
                            >
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Flame className="h-20 w-20 text-orange-600" />
                                    </motion.div>
                                </div>
                                <h3 className="text-3xl font-black italic text-m3-on-surface mb-3">Pre-heating the grill...</h3>
                                <p className="text-m3-on-surface-variant font-bold opacity-70">Sifting through buzzwords and identifying structural weaknesses.</p>
                            </motion.div>
                        ) : roast ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-10"
                            >
                                <RoastCard 
                                    roastText={roast.roastText} 
                                    roastLevel={roast.roastLevel} 
                                />
                                
                                <Card className="m3-card bg-m3-surface border-none m3-elev-1 overflow-hidden">
                                    <div className="bg-m3-primary-container/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-2xl bg-m3-primary text-m3-on-primary">
                                                <Target className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-xl text-m3-on-surface">Done with the roast?</h4>
                                                <p className="text-sm font-bold text-m3-on-surface-variant/70">Check your compatibility score now.</p>
                                            </div>
                                        </div>
                                        <Button 
                                            className="m3-button-filled h-14 px-8"
                                            onClick={() => window.location.href = "/dashboard"}
                                        >
                                            Back to Dashboard
                                            <ArrowRight className="h-5 w-5 ml-2" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="m3-card h-full bg-m3-surface-variant/10 border-none flex flex-col items-center justify-center p-20 text-center"
                            >
                                <div className="h-32 w-32 rounded-[2.5rem] bg-m3-surface m3-elev-1 flex items-center justify-center mb-8">
                                    <Flame className="h-14 w-14 text-m3-on-surface-variant/30" />
                                </div>
                                <h3 className="text-2xl font-black text-m3-on-surface mb-3">Silent Grill</h3>
                                <p className="text-m3-on-surface-variant max-w-sm font-medium opacity-70 leading-relaxed">
                                    Upload your resume and hit "Start Roasting" to see how you measure up in the court of AI opinion.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
