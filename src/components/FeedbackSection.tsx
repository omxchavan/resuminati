"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Lightbulb, Zap, Target, Star } from "lucide-react";
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
        <Tabs defaultValue="strengths" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-m3-surface-variant/30 rounded-2xl p-1 h-14 mb-8">
                <TabsTrigger value="strengths" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">
                    Assets
                </TabsTrigger>
                <TabsTrigger value="weaknesses" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-red-500 data-[state=active]:text-white transition-all">
                    Liabilities
                </TabsTrigger>
                <TabsTrigger value="improvements" className="rounded-xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-m3-primary data-[state=active]:text-m3-on-primary transition-all">
                    Strategy
                </TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="transition-all">
                <div className="space-y-4">
                    {strengths.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 p-5 border border-emerald-100/50"
                        >
                            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <p className="text-base font-bold text-m3-on-surface-variant opacity-80 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="weaknesses">
                <div className="space-y-4">
                    {weaknesses.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-2xl bg-red-50/50 dark:bg-red-950/20 p-5 border border-red-100/50"
                        >
                            <div className="h-8 w-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <XCircle className="h-5 w-5" />
                            </div>
                            <p className="text-base font-bold text-m3-on-surface-variant opacity-80 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="improvements">
                <div className="space-y-4">
                    {improvements.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-4 rounded-2xl bg-m3-primary-container/20 p-5 border border-m3-primary-container/30"
                        >
                            <div className="h-8 w-8 rounded-xl bg-m3-primary-container text-m3-primary flex items-center justify-center shrink-0">
                                <Lightbulb className="h-5 w-5" />
                            </div>
                            <p className="text-base font-bold text-m3-on-surface-variant opacity-80 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
