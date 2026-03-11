import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";
import { COVER_LETTER_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
    try {
        const { resumeText, jobDescription, companyName } = await request.json();

        if (!resumeText) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            );
        }

        const result = await callAI(
            COVER_LETTER_PROMPT,
            `Generate a cover letter for:
      
RESUME:
${resumeText}

${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}\n` : ""}
${companyName ? `COMPANY: ${companyName}\n` : ""}

Make it professional, personalized, and compelling.`
        );

        const coverLetter = JSON.parse(result);

        return NextResponse.json({
            success: true,
            coverLetter,
        });
    } catch (error) {
        console.error("Cover letter error:", error);
        return NextResponse.json(
            { error: "Failed to generate cover letter" },
            { status: 500 }
        );
    }
}
