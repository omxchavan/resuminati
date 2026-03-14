"use client";

import { motion } from "framer-motion";
import { Flame, ThermometerSun, Zap, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoastCardProps {
    roastLevel: "mild" | "spicy" | "brutal";
    roastText: string;
}

const levelConfig = {
    mild: {
        icon: ThermometerSun,
        label: "Mild Roast",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    spicy: {
        icon: Flame,
        label: "Spicy Roast",
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    brutal: {
        icon: Zap,
        label: "Brutal Roast",
        color: "text-red-600",
        bg: "bg-red-50",
    },
};

export default function RoastCard({ roastLevel, roastText }: RoastCardProps) {
    const config = (levelConfig[roastLevel] || levelConfig.spicy);
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="m3-card !p-0 bg-m3-surface border-none m3-elev-2 overflow-hidden"
        >
            <div className="p-8 sm:p-12 relative overflow-hidden">
                <Quote className="absolute top-10 right-10 h-32 w-32 text-m3-primary/5 -rotate-12" />
                
                <div className="relative z-10">
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className={`h-16 w-16 flex items-center justify-center rounded-[1.5rem] ${config.bg} m3-elev-1`}>
                                <Icon className={`h-8 w-8 ${config.color}`} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-m3-on-surface tracking-tight">AI Reality Check</h3>
                                <p className="text-sm font-bold text-m3-on-surface-variant opacity-60 uppercase tracking-widest">Surgical Precision Roast</p>
                            </div>
                        </div>
                        <Badge className={`${config.bg} ${config.color} border-none px-6 py-2 text-xs font-black uppercase tracking-[0.2em] rounded-full`}>
                            {config.label}
                        </Badge>
                    </div>

                    <div className="space-y-8 p-10 rounded-[3rem] bg-m3-surface-variant/10 border border-m3-outline-variant/10 relative">
                        {roastText.split("\n").filter(p => p.trim()).map((paragraph, i) => (
                            <p
                                key={i}
                                className="text-lg sm:text-xl leading-relaxed text-m3-on-surface font-black italic opacity-90"
                            >
                                {`"${paragraph}"`}
                            </p>
                        ))}
                    </div>

                    <div className="mt-10 flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-m3-primary animate-pulse" />
                            <p className="text-[10px] font-black text-m3-on-surface-variant/50 uppercase tracking-[0.3em]">
                                RESUME-LLM CORE V.3.0
                            </p>
                        </div>
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-6 w-6 rounded-full bg-m3-surface-variant/30 border-2 border-m3-surface" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
