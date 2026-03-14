"use client";

import { CheckCircle2, XCircle, Lightbulb, Zap, ShieldCheck, AlertTriangle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface FeedbackSectionProps {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
}

export default function FeedbackSection({
    strengths,
    weaknesses,
    improvements,
}: FeedbackSectionProps) {
    return (
        <div className="space-y-12">
            {/* Strengths / Assets */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 m3-elev-1">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-emerald-800 uppercase tracking-wider">Core Assets</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {strengths.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-3xl bg-emerald-50/30 dark:bg-emerald-950/20 p-5 border border-emerald-100/50 m3-elev-1"
                        >
                            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-bold text-m3-on-surface-variant opacity-80 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Weaknesses / Liabilities */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 m3-elev-1 border border-red-200">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-red-800 uppercase tracking-wider">Critical Liabilities</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {weaknesses.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-3xl bg-red-50/40 dark:bg-red-950/20 p-5 border border-red-200/50 m3-elev-1 shadow-sm shadow-red-100/20"
                        >
                            <div className="h-8 w-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <XCircle className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-bold text-m3-on-surface-variant leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-m3-outline-variant/30 to-transparent my-4" />

            {/* Improvements / Strategy */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-2xl bg-m3-primary-container text-m3-primary flex items-center justify-center shrink-0 m3-elev-1 border border-m3-primary/10">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-m3-on-primary-container uppercase tracking-wider">Strategic Roadmap</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {improvements.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-3xl bg-m3-primary-container/10 p-5 border border-m3-primary-container/30 m3-elev-1"
                        >
                            <div className="h-8 w-8 rounded-xl bg-m3-primary-container text-m3-primary flex items-center justify-center shrink-0">
                                <Lightbulb className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-bold text-m3-on-surface-variant opacity-80 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

