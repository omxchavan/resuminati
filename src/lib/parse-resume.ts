import mammoth from "mammoth";
import * as pdf from "pdf-parse";

/**
 * Clean and normalize text extracted from documents
 */
function cleanText(text: string): string {
    if (!text) return "";

    return text
        // Replace non-breaking spaces and other weird whitespace with standard space
        .replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/g, " ")
        // Normalize line breaks
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        // Remove common random characters/artifacts mentioned by user
        .replace(/\u0000/g, "") // Null character
        .replace(/\uFFFD/g, "") // Replacement character
        .replace(/\u00B0/g, "") // Degree symbol (°)
        .replace(/\u2021/g, "") // Double dagger (‡)
        .replace(/\u0152/g, "OE") // Latin Capital Ligature OE (Œ)
        .replace(/\u0153/g, "oe") // Latin Small Ligature OE (œ)
        .replace(/\u00AD/g, "") // Soft hyphen
        // Replace common ligatures with standard characters
        .replace(/\uFB00/g, "ff")
        .replace(/\uFB01/g, "fi")
        .replace(/\uFB02/g, "fl")
        .replace(/\uFB03/g, "ffi")
        .replace(/\uFB04/g, "ffl")
        // Normalize bullets to a simple dash
        .replace(/[\u2022\u2023\u25E6\u2043\u2219\u2013\u2014]/g, "-")
        // Remove other unusual control characters
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
        // Clean up multiple spaces
        .replace(/[ \t]+/g, " ")
        // Collapse 3+ newlines into 2
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export async function parsePDF(buffer: Buffer): Promise<string> {
    try {
        // Handle different export styles of pdf-parse for compatibility
        const parseFunction = (pdf as any).default || pdf;
        const data = await parseFunction(buffer);
        return cleanText(data.text);
    } catch (error) {
        console.error("PDF parse error:", error);
        throw new Error("Failed to parse PDF file");
    }
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return cleanText(result.value);
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
