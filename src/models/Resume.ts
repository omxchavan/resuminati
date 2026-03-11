import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResume extends Document {
    userId: string;
    fileName: string;
    parsedText: string;
    atsScore?: number;
    createdAt: Date;
}

const ResumeSchema = new Schema<IResume>(
    {
        userId: { type: String, required: true, index: true },
        fileName: { type: String, required: true },
        parsedText: { type: String, required: true },
        atsScore: { type: Number },
    },
    { timestamps: true }
);

const Resume: Model<IResume> =
    mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;
