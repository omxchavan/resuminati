import mongoose, { Schema, Document, Model } from "mongoose";

export interface IATSBreakdown {
    formatting: number;
    keywords: number;
    impact: number;
    readability: number;
    skills: number;
}

export interface IRoast {
    roastLevel: "mild" | "spicy" | "brutal";
    roastText: string;
}

export interface IFeedback {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
}

export interface IJobMatch {
    fitScore: number;
    matchedKeywords: string[];
    missingKeywords: string[];
}

export interface IAnalysis extends Document {
    resumeId: string;
    userId: string;
    atsScore: number;
    atsBreakdown: IATSBreakdown;
    roast?: IRoast;
    feedback?: IFeedback;
    suggestions: string[];
    jobMatch?: IJobMatch;
    createdAt: Date;
}

const AnalysisSchema = new Schema<IAnalysis>(
    {
        resumeId: { type: String, required: true, index: true },
        userId: { type: String, required: true, index: true },
        atsScore: { type: Number, required: true },
        atsBreakdown: {
            formatting: { type: Number, default: 0 },
            keywords: { type: Number, default: 0 },
            impact: { type: Number, default: 0 },
            readability: { type: Number, default: 0 },
            skills: { type: Number, default: 0 },
        },
        roast: {
            roastLevel: { type: String, enum: ["mild", "spicy", "brutal"] },
            roastText: { type: String },
        },
        feedback: {
            strengths: [{ type: String }],
            weaknesses: [{ type: String }],
            improvements: [{ type: String }],
        },
        suggestions: [{ type: String }],
        jobMatch: {
            fitScore: { type: Number },
            matchedKeywords: [{ type: String }],
            missingKeywords: [{ type: String }],
        },
    },
    { timestamps: true }
);

const Analysis: Model<IAnalysis> =
    mongoose.models.Analysis ||
    mongoose.model<IAnalysis>("Analysis", AnalysisSchema);

export default Analysis;
