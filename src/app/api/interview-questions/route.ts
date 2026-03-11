import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";
import { INTERVIEW_QUESTIONS_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
    try {
        const { resumeText, jobDescription } = await request.json();

        if (!resumeText) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            );
        }

        const result = await callAI(
            INTERVIEW_QUESTIONS_PROMPT,
            `Generate interview questions for:

RESUME:
${resumeText}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : "Generate general interview questions based on the resume content."}`
        );

        const questions = JSON.parse(result);

        return NextResponse.json({
            success: true,
            questions,
        });
    } catch (error) {
        console.error("Interview questions error:", error);
        return NextResponse.json(
            { error: "Failed to generate interview questions" },
            { status: 500 }
        );
    }
}
