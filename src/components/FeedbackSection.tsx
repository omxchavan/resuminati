"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
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
            <TabsList className="grid w-full grid-cols-3 bg-white/5">
                <TabsTrigger value="strengths" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
                    Strengths
                </TabsTrigger>
                <TabsTrigger value="weaknesses" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
                    Weaknesses
                </TabsTrigger>
                <TabsTrigger value="improvements" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                    Improvements
                </TabsTrigger>
            </TabsList>

            <TabsContent value="strengths" className="mt-4">
                <div className="space-y-3">
                    {strengths.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3"
                        >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            <p className="text-sm text-foreground/80">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="weaknesses" className="mt-4">
                <div className="space-y-3">
                    {weaknesses.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3"
                        >
                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                            <p className="text-sm text-foreground/80">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="improvements" className="mt-4">
                <div className="space-y-3">
                    {improvements.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3"
                        >
                            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                            <p className="text-sm text-foreground/80">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
