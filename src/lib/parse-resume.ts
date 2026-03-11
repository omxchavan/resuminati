import mammoth from "mammoth";

export async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require("pdf-parse");
        const data = await pdfParse(buffer);
        return data.text.trim();
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
