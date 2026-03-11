import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";
import {
    ROAST_PROMPT_MILD,
    ROAST_PROMPT_SPICY,
    ROAST_PROMPT_BRUTAL,
} from "@/lib/prompts";

const ROAST_PROMPTS = {
    mild: ROAST_PROMPT_MILD,
    spicy: ROAST_PROMPT_SPICY,
    brutal: ROAST_PROMPT_BRUTAL,
};

export async function POST(request: NextRequest) {
    try {
        const { resumeText, roastLevel = "spicy" } = await request.json();

        if (!resumeText) {
            return NextResponse.json(
                { error: "Resume text is required" },
                { status: 400 }
            );
        }

        const level = roastLevel as keyof typeof ROAST_PROMPTS;
        const prompt = ROAST_PROMPTS[level] || ROAST_PROMPTS.spicy;

        const result = await callAI(
            prompt,
            `Here is the resume to roast:\n\n${resumeText}`
        );

        const roast = JSON.parse(result);

        return NextResponse.json({
            success: true,
            roast,
        });
    } catch (error) {
        console.error("Roast error:", error);
        return NextResponse.json(
            { error: "Failed to roast resume" },
            { status: 500 }
        );
    }
}
