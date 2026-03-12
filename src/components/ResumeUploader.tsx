"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResume } from "@/components/ResumeProvider";

interface ResumeUploaderProps {
    onUploadComplete?: (data: {
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
    const { setResumeData, resumeData: globalResumeData } = useResume();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

                const newResumeData = {
                    id: data.resume.id,
                    fileName: data.resume.fileName,
                    parsedText: data.resume.parsedText,
                };

                setResumeData(newResumeData);
                if (onUploadComplete) {
                    onUploadComplete(newResumeData);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Upload failed");
            } finally {
                setUploading(false);
            }
        },
        [onUploadComplete, setResumeData]
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
        setResumeData(null);
        setError(null);
    };

    if (compact) {
        return (
            <div className="w-full">
                <div
                    {...getRootProps()}
                    className={`relative flex items-center gap-3 rounded-xl border-none p-4 transition-all cursor-pointer neo-sm active:neo-pressed
            ${isDragActive ? "neo-pressed bg-french-blue/5" : "hover:neo-pressed hover:bg-white/5"}
            ${uploading ? "pointer-events-none opacity-50" : ""}`}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-french-blue dark:text-cool-sky" />
                    ) : globalResumeData ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                        <Upload className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium text-muted-foreground">
                        {uploading
                            ? "Processing..."
                            : globalResumeData
                                ? globalResumeData.fileName
                                : "Drop resume or click to upload"}
                    </span>
                    {globalResumeData && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                reset();
                            }}
                            className="ml-auto p-1 rounded-full hover:bg-muted transition-colors"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {globalResumeData ? (
                    <motion.div
                        key="uploaded"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center gap-4 rounded-2xl neo-pressed p-8 sm:p-12"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full neo-sm bg-emerald-500/5">
                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-lg text-foreground">{globalResumeData.fileName}</p>
                            <p className="text-sm text-muted-foreground font-medium mt-1">
                                Successfully uploaded & parsed
                            </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={reset} className="rounded-xl px-6 h-10 mt-4 neo-interactive hover:neo-pressed border-none">
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
                            className={`relative flex flex-col items-center gap-6 rounded-3xl p-12 transition-all cursor-pointer neo active:neo-pressed
                ${isDragActive ? "neo-pressed scale-[0.98]" : "hover:neo-pressed"}
                ${uploading ? "pointer-events-none opacity-50" : ""}`}
                        >
                            <input {...getInputProps()} />

                            {uploading ? (
                                <>
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full neo-pressed">
                                        <Loader2 className="h-10 w-10 animate-spin text-french-blue dark:text-cool-sky" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-xl text-foreground">
                                            Processing...
                                        </p>
                                        <p className="text-sm text-muted-foreground font-medium mt-2">
                                            Extracting details with AI
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full neo-sm text-french-blue dark:text-cool-sky">
                                        <Upload className="h-10 w-10" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-xl text-foreground">
                                            {isDragActive
                                                ? "Drop it here!"
                                                : "Upload Your Resume"}
                                        </p>
                                        <p className="text-sm text-muted-foreground font-medium mt-2 max-w-xs">
                                            PDF or DOCX supported. Your privacy is our priority.
                                        </p>
                                    </div>
                                    <Button
                                        variant="default"
                                        size="lg"
                                        className="mt-2 h-12 px-8 rounded-2xl font-bold"
                                    >
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
                    className="mt-4 text-center text-sm font-bold text-destructive"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
