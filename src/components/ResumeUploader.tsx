"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeUploaderProps {
    onUploadComplete: (data: {
        id: string;
        fileName: string;
        parsedText: string;
    }) => void;
    compact?: boolean;
}

export default function ResumeUploader({
    onUploadComplete,
    compact = false,
}: ResumeUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            setUploading(true);
            setError(null);

            try {
                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch("/api/upload-resume", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Upload failed");
                }

                setUploadedFile(file.name);
                onUploadComplete({
                    id: data.resume.id,
                    fileName: data.resume.fileName,
                    parsedText: data.resume.parsedText,
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : "Upload failed");
            } finally {
                setUploading(false);
            }
        },
        [onUploadComplete]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
        },
        maxFiles: 1,
        maxSize: 10 * 1024 * 1024,
        disabled: uploading,
    });

    const reset = () => {
        setUploadedFile(null);
        setError(null);
    };

    if (compact) {
        return (
            <div className="w-full">
                <div
                    {...getRootProps()}
                    className={`relative flex items-center gap-3 rounded-xl border-2 border-dashed p-4 transition-all cursor-pointer
            ${isDragActive ? "border-orange-500 bg-orange-500/10" : "border-white/15 hover:border-orange-500/50 hover:bg-white/5"}
            ${uploading ? "pointer-events-none opacity-50" : ""}`}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                    ) : uploadedFile ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                        <Upload className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                        {uploading
                            ? "Processing..."
                            : uploadedFile
                                ? uploadedFile
                                : "Drop resume or click to upload"}
                    </span>
                    {uploadedFile && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                reset();
                            }}
                            className="ml-auto"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
            </div>
        );
    }

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {uploadedFile ? (
                    <motion.div
                        key="uploaded"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-foreground">{uploadedFile}</p>
                            <p className="text-sm text-emerald-400">
                                Successfully uploaded & parsed
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={reset}>
                            Upload Different Resume
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div
                            {...getRootProps()}
                            className={`relative flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-12 transition-all cursor-pointer
                ${isDragActive ? "border-orange-500 bg-orange-500/10 scale-[1.02]" : "border-white/15 hover:border-orange-500/50 hover:bg-white/5"}
                ${uploading ? "pointer-events-none" : ""}`}
                        >
                            <input {...getInputProps()} />

                            {uploading ? (
                                <>
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/20">
                                        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-foreground">
                                            Processing your resume...
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Extracting text and analyzing
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20">
                                        <FileText className="h-8 w-8 text-orange-400" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-medium text-foreground">
                                            {isDragActive
                                                ? "Drop your resume here!"
                                                : "Drag & drop your resume"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            PDF or DOCX, up to 10MB
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-2 border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Browse Files
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-center text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
