import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/parse-resume";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as { id?: string })?.id || "demo-user-001";

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const validTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Please upload a PDF or DOCX file" },
                { status: 400 }
            );
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size must be less than 10MB" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const parsedText = await parseResume(buffer, file.name);

        if (!parsedText || parsedText.length < 50) {
            return NextResponse.json(
                { error: "Could not extract meaningful text from the file. Please try a different file." },
                { status: 400 }
            );
        }

        let resume;
        try {
            await connectDB();
            resume = await Resume.create({
                userId,
                fileName: file.name,
                parsedText,
            });
        } catch {
            // DB not configured — return without saving
            resume = {
                _id: `temp-${Date.now()}`,
                userId,
                fileName: file.name,
                parsedText,
                createdAt: new Date(),
            };
        }

        return NextResponse.json({
            success: true,
            resume: {
                id: resume._id?.toString(),
                fileName: file.name,
                parsedText,
                createdAt: resume.createdAt || new Date(),
            },
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to process resume" },
            { status: 500 }
        );
    }
}
