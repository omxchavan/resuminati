import { NextRequest, NextResponse } from "next/server";
import { callAI } from "@/lib/ai";
import { BULLET_IMPROVE_PROMPT } from "@/lib/prompts";

export async function POST(request: NextRequest) {
    try {
        const { bulletPoint, context } = await request.json();

        if (!bulletPoint) {
            return NextResponse.json(
                { error: "Bullet point is required" },
                { status: 400 }
            );
        }

        const result = await callAI(
            BULLET_IMPROVE_PROMPT,
            `Improve this resume bullet point:\n"${bulletPoint}"${context ? `\n\nContext about the role: ${context}` : ""}`
        );

        const improvement = JSON.parse(result);

        return NextResponse.json({
            success: true,
            improvement,
        });
    } catch (error) {
        console.error("Bullet improve error:", error);
        return NextResponse.json(
            { error: "Failed to improve bullet point" },
            { status: 500 }
        );
    }
}
