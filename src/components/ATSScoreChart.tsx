"use client";

import { motion } from "framer-motion";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface ScoreDetail {
    score: number;
    avg: number;
    top10: number;
}

interface ATSScoreChartProps {
    scores: {
        formatting: ScoreDetail;
        keywords: ScoreDetail;
        impact: ScoreDetail;
        readability: ScoreDetail;
        skills: ScoreDetail;
    };
    overallScore: number;
}

export default function ATSScoreChart({
    scores,
    overallScore,
}: ATSScoreChartProps) {
    const data = [
        { 
            category: "Formatting", 
            yourScore: scores.formatting.score, 
            marketAvg: scores.formatting.avg, 
            topCandidates: scores.formatting.top10 
        },
        { 
            category: "Keywords", 
            yourScore: scores.keywords.score, 
            marketAvg: scores.keywords.avg, 
            topCandidates: scores.keywords.top10 
        },
        { 
            category: "Impact", 
            yourScore: scores.impact.score, 
            marketAvg: scores.impact.avg, 
            topCandidates: scores.impact.top10 
        },
        { 
            category: "Readability", 
            yourScore: scores.readability.score, 
            marketAvg: scores.readability.avg, 
            topCandidates: scores.readability.top10 
        },
        { 
            category: "Skills", 
            yourScore: scores.skills.score, 
            marketAvg: scores.skills.avg, 
            topCandidates: scores.skills.top10 
        },
    ];

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-500 dark:text-emerald-400";
        if (score >= 60) return "text-french-blue dark:text-cool-sky";
        if (score >= 40) return "text-slate-500 dark:text-slate-400";
        return "text-destructive";
    };

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
                {/* Overall Score Circle */}
                <div className="flex flex-col items-center justify-center p-8 rounded-3xl neo-pressed bg-background/30">
                    <div className="relative flex h-48 w-48 items-center justify-center mb-6">
                        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
                            <circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                className="text-muted/10"
                            />
                            <circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="url(#scoreGradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${(overallScore / 100) * 339.292} 339.292`}
                                className="transition-all duration-1000 ease-out"
                            />
                            <defs>
                                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#2a4494" />
                                    <stop offset="100%" stopColor="#5da9e9" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="text-center z-10">
                            <motion.span 
                                key={overallScore}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-6xl font-black tracking-tighter ${getScoreColor(overallScore)}`}
                            >
                                {overallScore}
                            </motion.span>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">ATS Score</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 w-full">
                        <div className="flex-1 p-3 rounded-2xl neo-sm text-center">
                            <p className="text-xs text-muted-foreground font-bold mb-1">PERCENTILE</p>
                            <p className="text-xl font-black text-french-blue dark:text-cool-sky">Top 15%</p>
                        </div>
                        <div className="flex-1 p-3 rounded-2xl neo-sm text-center">
                            <p className="text-xs text-muted-foreground font-bold mb-1">STRENGTH</p>
                            <p className="text-xl font-black text-emerald-500">Strong</p>
                        </div>
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="h-[350px] w-full neo rounded-3xl p-4 overflow-visible relative">
                    <div className="absolute top-4 right-4 flex flex-col gap-1 text-[10px] font-bold uppercase tracking-tight z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-french-blue" />
                            <span className="text-foreground">You</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            <span className="text-muted-foreground/60">Average</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                            <span className="text-emerald-500/50">Top 10%</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                            <PolarGrid stroke="currentColor" className="text-muted/20" />
                            <PolarAngleAxis
                                dataKey="category"
                                tick={{ fill: "currentColor", fontSize: 10, className: "text-muted-foreground font-bold uppercase" }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={false}
                                axisLine={false}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="neo-glass p-4 rounded-2xl border-none shadow-2xl backdrop-blur-md">
                                                <p className="font-bold mb-2 text-sm text-french-blue dark:text-cool-sky border-b border-border/20 pb-1">{payload[0].payload.category}</p>
                                                <div className="space-y-1.5">
                                                    {payload.map((p: any) => (
                                                        <div key={p.name} className="flex items-center justify-between gap-6">
                                                            <span className="text-[11px] font-bold text-muted-foreground">{p.name}:</span>
                                                            <span className="text-xs font-black">{p.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                             <Radar
                                name="Top Candidates"
                                dataKey="topCandidates"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.05}
                                strokeDasharray="4 4"
                                strokeWidth={1}
                            />
                            <Radar
                                name="Market Average"
                                dataKey="marketAvg"
                                stroke="currentColor"
                                fill="currentColor"
                                fillOpacity={0.05}
                                className="text-muted-foreground/30"
                                strokeWidth={1}
                            />
                            <Radar
                                name="Your Score"
                                dataKey="yourScore"
                                stroke="#2a4494"
                                fill="#2a4494"
                                fillOpacity={0.3}
                                strokeWidth={3}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Individual Scores Comparison Table */}
            <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                {data.map((item) => (
                    <div key={item.category} className="neo-sm p-4 rounded-2xl text-center flex flex-col items-center">
                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-3 block">{item.category}</span>
                        <div className="flex items-baseline gap-1 mb-2">
                             <span className={`text-3xl font-black ${getScoreColor(item.yourScore)}`}>{item.yourScore}</span>
                             <span className="text-xs text-muted-foreground font-bold">/ 100</span>
                        </div>
                        <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden mb-3">
                            <div 
                                className="h-full bg-french-blue transition-all duration-1000" 
                                style={{ width: `${item.yourScore}%` }} 
                            />
                        </div>
                        <div className="flex justify-between w-full text-[9px] font-black uppercase tracking-tighter text-muted-foreground/60">
                            <span>Avg: {item.marketAvg}</span>
                            <span className="text-emerald-500/70">Top: {item.topCandidates}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
