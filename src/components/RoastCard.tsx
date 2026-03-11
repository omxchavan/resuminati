"use client";

import { motion } from "framer-motion";
import { Flame, ThermometerSun, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RoastCardProps {
    roastLevel: "mild" | "spicy" | "brutal";
    roastText: string;
}

const levelConfig = {
    mild: {
        icon: ThermometerSun,
        label: "Mild Roast",
        gradient: "from-yellow-500/20 to-orange-500/20",
        border: "border-yellow-500/30",
        badge: "bg-yellow-500/20 text-yellow-400",
        iconColor: "text-yellow-400",
    },
    spicy: {
        icon: Flame,
        label: "Spicy Roast",
        gradient: "from-orange-500/20 to-red-500/20",
        border: "border-orange-500/30",
        badge: "bg-orange-500/20 text-orange-400",
        iconColor: "text-orange-400",
    },
    brutal: {
        icon: Zap,
        label: "Brutal Roast",
        gradient: "from-red-500/20 to-pink-500/20",
        border: "border-red-500/30",
        badge: "bg-red-500/20 text-red-400",
        iconColor: "text-red-400",
    },
};

export default function RoastCard({ roastLevel, roastText }: RoastCardProps) {
    const config = levelConfig[roastLevel];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-2xl border ${config.border} bg-gradient-to-br ${config.gradient} p-6`}
        >
            {/* Background decoration */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/10 to-transparent blur-2xl" />

            <div className="relative">
                {/* Header */}
                <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${config.gradient}`}>
                        <Icon className={`h-5 w-5 ${config.iconColor}`} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-foreground">AI Roast</h3>
                        <Badge className={`${config.badge} border-0 text-xs`}>
                            🔥 {config.label}
                        </Badge>
                    </div>
                </div>

                {/* Roast Text */}
                <div className="prose prose-invert max-w-none">
                    {roastText.split("\n").map((paragraph, i) => (
                        <p
                            key={i}
                            className="text-sm leading-relaxed text-foreground/80 mb-3 last:mb-0"
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
