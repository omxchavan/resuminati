import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";
import { ATS_ANALYSIS_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
    try {
        const { resumeText, resumeId } = await request.json();

        if (!resumeText) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            );
        }

        const result = await callAI(
            ATS_ANALYSIS_PROMPT,
            `Here is the resume to analyze:\n\n${resumeText}`
        );

        const analysis = JSON.parse(result);

        return NextResponse.json({
            success: true,
            resumeId,
            analysis,
        });
    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            { error: "Failed to analyze resume" },
            { status: 500 }
        );
    }
}
