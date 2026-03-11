import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        await parser.destroy();
        console.log(result.text);
        return result.text.trim();
    } catch (error) {
        console.error("PDF parse error:", error);
        throw new Error("Failed to parse PDF file");
    }
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value.trim();
    } catch (error) {
        console.error("DOCX parse error:", error);
        throw new Error("Failed to parse DOCX file");
    }
}

export async function parseResume(
    buffer: Buffer,
    filename: string
): Promise<string> {
    const ext = filename.toLowerCase().split(".").pop();

    switch (ext) {
        case "pdf":
            return parsePDF(buffer);
        case "docx":
            return parseDOCX(buffer);
        default:
            throw new Error(`Unsupported file format: ${ext}. Please upload PDF or DOCX.`);
    }
}
