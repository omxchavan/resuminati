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
        if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
        if (score >= 60) return "text-m3-primary";
        if (score >= 40) return "text-m3-on-surface-variant";
        return "text-red-500";
    };

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
                {/* Overall Score Circle */}
                <div className="flex flex-col items-center justify-center p-10 rounded-[3rem] bg-m3-surface-variant/10 m3-elev-0 border border-m3-outline-variant/30">
                    <div className="relative flex h-56 w-56 items-center justify-center mb-8">
                        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
                            <circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="text-m3-outline-variant/20"
                            />
                            <motion.circle
                                cx="60"
                                cy="60"
                                r="54"
                                fill="none"
                                stroke="var(--md-sys-color-primary)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray="339.292"
                                initial={{ strokeDashoffset: 339.292 }}
                                animate={{ strokeDashoffset: 339.292 - (overallScore / 100) * 339.292 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="text-center z-10">
                            <motion.span 
                                key={overallScore}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-7xl font-black tracking-tighter ${getScoreColor(overallScore)}`}
                            >
                                {overallScore}
                            </motion.span>
                            <p className="text-xs font-black text-m3-on-surface-variant/60 uppercase tracking-[0.2em] mt-2">ATS Index</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 w-full">
                        <div className="flex-1 p-5 rounded-[2rem] bg-m3-surface m3-elev-1 text-center">
                            <p className="text-[10px] text-m3-on-surface-variant font-black uppercase tracking-widest mb-1 opacity-50">PERCENTILE</p>
                            <p className="text-xl font-black text-m3-primary">TOP 15%</p>
                        </div>
                        <div className="flex-1 p-5 rounded-[2rem] bg-m3-surface m3-elev-1 text-center">
                            <p className="text-[10px] text-m3-on-surface-variant font-black uppercase tracking-widest mb-1 opacity-50">STRENGTH</p>
                            <p className="text-xl font-black text-emerald-600">STRONG</p>
                        </div>
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="h-[400px] w-full bg-m3-surface m3-elev-1 rounded-[3rem] p-8 border border-m3-outline-variant/30 relative">
                    <div className="absolute top-8 right-8 flex flex-col gap-2 text-[10px] font-black uppercase tracking-widest z-10 opacity-60">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-m3-primary" />
                            <span className="text-m3-on-surface">You</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-m3-on-surface-variant/20" />
                            <span className="text-m3-on-surface-variant">Market</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                            <span className="text-emerald-500/50">Elite</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                            <PolarGrid stroke="currentColor" className="text-m3-outline-variant opacity-30" />
                            <PolarAngleAxis
                                dataKey="category"
                                tick={{ fill: "currentColor", fontSize: 10, className: "text-m3-on-surface-variant font-black uppercase tracking-widest" }}
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
                                            <div className="bg-m3-surface m3-elev-4 p-5 rounded-2xl border border-m3-outline-variant/30 backdrop-blur-xl">
                                                <p className="font-black mb-3 text-xs text-m3-primary uppercase tracking-widest border-b border-m3-outline-variant/30 pb-2">{payload[0].payload.category}</p>
                                                <div className="space-y-2">
                                                    {payload.map((p: any) => (
                                                        <div key={p.name} className="flex items-center justify-between gap-8">
                                                            <span className="text-[10px] font-black text-m3-on-surface-variant/60 uppercase">{p.name}:</span>
                                                            <span className="text-sm font-black text-m3-on-surface">{p.value}</span>
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
                                stroke="var(--md-sys-color-on-surface-variant)"
                                fill="var(--md-sys-color-on-surface-variant)"
                                fillOpacity={0.05}
                                strokeWidth={1}
                            />
                            <Radar
                                name="Your Score"
                                dataKey="yourScore"
                                stroke="var(--md-sys-color-primary)"
                                fill="var(--md-sys-color-primary)"
                                fillOpacity={0.2}
                                strokeWidth={4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Individual Scores Comparison grid */}
            <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-6">
                {data.map((item) => (
                    <div key={item.category} className="m3-card !bg-m3-surface-variant/10 border-none !p-6 flex flex-col items-center hover:bg-m3-surface-variant/20 transition-all">
                        <span className="text-[10px] text-m3-on-surface-variant font-black uppercase tracking-widest mb-4 block opacity-60">{item.category}</span>
                        <div className="flex items-baseline gap-1 mb-3">
                             <span className={`text-4xl font-black ${getScoreColor(item.yourScore)}`}>{item.yourScore}</span>
                             <span className="text-xs text-m3-on-surface-variant/40 font-black">/ 100</span>
                        </div>
                        <div className="w-full h-1.5 bg-m3-outline-variant/20 rounded-full overflow-hidden mb-4">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.yourScore}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="h-full bg-m3-primary rounded-full transition-all" 
                            />
                        </div>
                        <div className="flex justify-between w-full text-[9px] font-black uppercase tracking-widest text-m3-on-surface-variant/40">
                            <span>AVG: {item.marketAvg}</span>
                            <span className="text-emerald-500/70">TOP: {item.topCandidates}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
