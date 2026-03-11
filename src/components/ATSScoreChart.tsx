"use client";

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface ATSScoreChartProps {
    scores: {
        formatting: number;
        keywords: number;
        impact: number;
        readability: number;
        skills: number;
    };
    overallScore: number;
}

export default function ATSScoreChart({
    scores,
    overallScore,
}: ATSScoreChartProps) {
    const data = [
        { category: "Formatting", score: scores.formatting, fullMark: 100 },
        { category: "Keywords", score: scores.keywords, fullMark: 100 },
        { category: "Impact", score: scores.impact, fullMark: 100 },
        { category: "Readability", score: scores.readability, fullMark: 100 },
        { category: "Skills", score: scores.skills, fullMark: 100 },
    ];

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-500 dark:text-emerald-400";
        if (score >= 60) return "text-french-blue dark:text-cool-sky";
        if (score >= 40) return "text-slate-500 dark:text-slate-400";
        return "text-destructive";
    };

    const getGradientColors = (score: number) => {
        if (score >= 80) return { start: "#10b981", end: "#059669" };
        if (score >= 60) return { start: "#2a4494", end: "#5da9e9" };
        if (score >= 40) return { start: "#64748b", end: "#475569" };
        return { start: "#89043d", end: "#d2065f" };
    };

    const colors = getGradientColors(overallScore);

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Overall Score Circle */}
            <div className="relative flex h-32 w-32 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted/30"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke={colors.start}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(overallScore / 100) * 339.292} 339.292`}
                        style={{
                            filter: `drop-shadow(0 0 4px ${colors.start}30)`,
                        }}
                    />
                </svg>
                <div className="text-center">
                    <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                        {overallScore}
                    </span>
                    <p className="text-xs text-muted-foreground">Score</p>
                </div>
            </div>

            {/* Radar Chart */}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={data}>
                        <PolarGrid stroke="currentColor" className="text-muted/30" />
                        <PolarAngleAxis
                            dataKey="category"
                            tick={{ fill: "currentColor", fontSize: 11, className: "text-muted-foreground font-medium" }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "12px",
                                color: "hsl(var(--foreground))",
                            }}
                        />
                        <Radar
                            name="Score"
                            dataKey="score"
                            stroke={colors.start}
                            fill={colors.start}
                            fillOpacity={0.2}
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Individual Scores */}
            <div className="grid w-full grid-cols-5 gap-2">
                {data.map((item) => (
                    <div key={item.category} className="text-center">
                        <p className={`text-base font-bold ${getScoreColor(item.score)}`}>
                            {item.score}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-tight font-medium truncate">{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
