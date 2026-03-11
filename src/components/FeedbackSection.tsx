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
            <TabsList className="grid w-full grid-cols-3 bg-muted">
                <TabsTrigger value="strengths" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">
                    Strengths
                </TabsTrigger>
                <TabsTrigger value="weaknesses" className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive">
                    Weaknesses
                </TabsTrigger>
                <TabsTrigger value="improvements" className="data-[state=active]:bg-french-blue/10 data-[state=active]:text-french-blue dark:data-[state=active]:text-cool-sky">
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
                            className="flex items-start gap-3 rounded-lg border border-emerald-500/10 bg-emerald-500/5 dark:bg-emerald-500/10 p-3"
                        >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
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
                            className="flex items-start gap-3 rounded-lg border border-destructive/10 bg-destructive/5 p-3"
                        >
                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
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
                            className="flex items-start gap-3 rounded-lg border border-french-blue/10 bg-french-blue/5 dark:bg-french-blue/10 p-3"
                        >
                            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-french-blue dark:text-cool-sky" />
                            <p className="text-sm text-foreground/80">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
