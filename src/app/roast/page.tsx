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
} from "lucide-react";
import { useResume } from "@/components/ResumeProvider";

interface RoastResponse {
    roastLevel: "mild" | "spicy" | "brutal";
    roastText: string;
}

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
                    <Flame className="h-6 w-6 text-french-blue dark:text-cool-sky" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    <span className="text-foreground">AI Resume </span>
                    <span className="bg-gradient-to-r from-french-blue to-cool-sky bg-clip-text text-transparent">
                        Roaster
                    </span>
                </h1>
                <p className="mt-2 text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
                    Brutal honesty is the best policy. Let our AI tear apart your resume so you can build it back stronger.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Control Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Resume Card */}
                    <Card className="neo p-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                <FileText className="h-6 w-6 text-french-blue dark:text-cool-sky" />
                                Your Identity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResumeUploader />
                        </CardContent>
                    </Card>

                    {/* roast Settings */}
                    <AnimatePresence>
                        {resumeData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-8"
                            >
                                <Card className="neo">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg font-bold">Roast Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-3 gap-3">
                                            {(["mild", "medium", "brutal"] as const).map((lvl) => (
                                                <button
                                                    key={lvl}
                                                    onClick={() => setIntensity(lvl)}
                                                    className={`py-3 px-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all
                                                        ${intensity === lvl 
                                                            ? "neo-pressed text-french-blue dark:text-cool-sky" 
                                                            : "neo-interactive hover:neo-pressed text-muted-foreground"}`}
                                                >
                                                    {lvl}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        <Button
                                            onClick={getRoast}
                                            disabled={roasting}
                                            className="w-full gap-3 text-french-blue dark:text-cool-sky font-bold h-16 rounded-3xl neo-interactive hover:neo-pressed border-none bg-background text-lg shadow-none"
                                        >
                                            {roasting ? (
                                                <Loader2 className="h-6 w-6 animate-spin" />
                                            ) : (
                                                <Zap className="h-6 w-6 fill-current" />
                                            )}
                                            {roasting ? "Roasting..." : "Start the Roast"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                <div className="p-8 rounded-3xl neo bg-background/50 text-center">
                                    <p className="text-sm font-bold text-muted-foreground leading-relaxed italic">
                                        "My resume is perfect" 
                                        <br />
                                        <span className="text-french-blue dark:text-cool-sky not-italic">— You, 5 minutes before this.</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Roast Area */}
                <div className="lg:col-span-8">
                    {!resumeData ? (
                        <Card className="neo-pressed border-none">
                            <CardContent className="flex flex-col items-center justify-center py-32 text-center px-6">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className="mb-8"
                                >
                                    <div className="h-32 w-32 flex items-center justify-center rounded-3xl neo">
                                        <Flame className="h-16 w-16 text-french-blue dark:text-cool-sky/50" />
                                    </div>
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-3">Feed the AI</h3>
                                <p className="text-muted-foreground max-w-sm text-lg font-medium">
                                    Upload your resume in the sidebar to begin your journey of self-improvement through pain.
                                </p>
                            </CardContent>
                        </Card>
                    ) : roasting ? (
                        <Card className="neo-pressed border-none min-h-[500px] flex items-center justify-center">
                            <CardContent>
                                <div className="text-center space-y-6">
                                    <div className="relative inline-block">
                                        <Loader2 className="h-20 w-20 animate-spin text-french-blue dark:text-cool-sky" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Flame className="h-8 w-8 text-french-blue/30" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">Sharpening the AI's Wit...</h3>
                                        <p className="text-muted-foreground font-medium">Evaluating your life choices and formatting.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ) : roast ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <RoastCard
                                roastLevel={roast.roastLevel}
                                roastText={roast.roastText}
                            />
                            
                            <div className="mt-8 p-8 rounded-3xl neo-pressed flex flex-col sm:flex-row gap-6 items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-french-blue dark:text-cool-sky text-lg">Want serious feedback?</h4>
                                    <p className="text-base text-muted-foreground font-medium mt-1">Check out our ATS Analysis for professional improvements.</p>
                                </div>
                                <Button variant="outline" className="h-12 px-6 rounded-2xl neo-interactive hover:neo-pressed border-none bg-background font-bold" onClick={() => window.location.href = "/dashboard"}>
                                    Go to Dashboard
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <Card className="neo overflow-hidden border-none cursor-default">
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-br from-french-blue/5 to-cool-sky/5 p-12 text-center">
                                    <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center rounded-2xl neo-sm">
                                        <Target className="h-8 w-8 text-french-blue dark:text-cool-sky" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Ready to Roast</h3>
                                    <p className="text-muted-foreground text-lg font-medium max-w-md mx-auto leading-relaxed">
                                        Select your intensity level and hit the big button to see what the AI really thinks about your accomplishments.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20">
                                    <div className="p-8 bg-background">
                                        <h4 className="font-bold flex items-center gap-2 mb-3">
                                            <Sparkles className="h-4 w-4 text-french-blue" />
                                            Mild Roast
                                        </h4>
                                        <p className="text-sm text-muted-foreground font-medium">Constructive criticism with a polite smile. Mostly.</p>
                                    </div>
                                    <div className="p-8 bg-background">
                                        <h4 className="font-bold flex items-center gap-2 mb-3">
                                            <Flame className="h-4 w-4 text-cool-sky" />
                                            Brutal Roast
                                        </h4>
                                        <p className="text-sm text-muted-foreground font-medium">No holding back. Prepare for emotional damage.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
