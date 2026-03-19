import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";
import { JOB_MATCH_PROMPT } from "@/lib/prompts";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { resumeText, jobDescription } = await request.json();

        if (!resumeText || !jobDescription) {
            return NextResponse.json(
                { error: "Resume text and job description are required" },
                { status: 400 }
            );
        }

        const result = await callAI(
            JOB_MATCH_PROMPT,
            `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`
        );

        const match = JSON.parse(result);

        return NextResponse.json({
            success: true,
            match,
        });
    } catch (error) {
        console.error("Job match error:", error);
        return NextResponse.json(
            { error: "Failed to match job description" },
            { status: 500 }
        );
    }
}
