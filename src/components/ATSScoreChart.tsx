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
        if (score >= 80) return "text-emerald-400";
        if (score >= 60) return "text-yellow-400";
        if (score >= 40) return "text-orange-400";
        return "text-red-400";
    };

    const getGradientColors = (score: number) => {
        if (score >= 80) return { start: "#34d399", end: "#059669" };
        if (score >= 60) return { start: "#fbbf24", end: "#d97706" };
        if (score >= 40) return { start: "#fb923c", end: "#ea580c" };
        return { start: "#f87171", end: "#dc2626" };
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
                        className="text-white/5"
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
                            filter: `drop-shadow(0 0 8px ${colors.start}50)`,
                        }}
                    />
                </svg>
                <div className="text-center">
                    <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                        {overallScore}
                    </span>
                    <p className="text-xs text-muted-foreground">ATS Score</p>
                </div>
            </div>

            {/* Radar Chart */}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={data}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis
                            dataKey="category"
                            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                        />
                        <PolarRadiusAxis
                            angle={90}
                            domain={[0, 100]}
                            tick={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(0,0,0,0.8)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "#fff",
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
                        <p className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                            {item.score}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
