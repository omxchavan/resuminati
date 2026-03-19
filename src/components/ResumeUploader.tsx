"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, CheckCircle2, FileText } from "lucide-react";
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
                    className={`relative flex items-center gap-3 rounded-2xl border border-m3-outline-variant/30 px-4 py-3 transition-all cursor-pointer m3-elev-0 bg-m3-surface-variant/10 hover:bg-m3-surface-variant/20 hover:m3-elev-1
                        ${isDragActive ? "bg-m3-primary/5 ring-1 ring-m3-primary" : ""}
                        ${uploading ? "pointer-events-none opacity-50" : ""}`}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-m3-primary" />
                    ) : globalResumeData ? (
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    ) : (
                        <Upload className="h-4 w-4 text-m3-on-surface-variant" />
                    )}
                    <span className="text-[10px] font-black text-m3-on-surface-variant uppercase tracking-widest truncate">
                        {uploading
                            ? "PROCESSING..."
                            : globalResumeData
                                ? globalResumeData.fileName
                                : "DROP RESUME"}
                    </span>
                    {globalResumeData && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                reset();
                            }}
                            className="ml-auto p-1 rounded-full hover:bg-m3-error/10 text-m3-on-surface-variant/40 hover:text-red-500 transition-colors"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-[8px] font-black uppercase text-red-500 tracking-[0.2em] text-center">{error}</p>
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 p-4 rounded-3xl bg-m3-primary/5 border border-m3-primary/10 group"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-m3-primary text-m3-on-primary m3-elev-1 transition-transform group-hover:scale-105">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-m3-on-surface text-sm truncate uppercase tracking-tight">
                                {globalResumeData.fileName}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[9px] text-m3-on-surface-variant font-black uppercase tracking-widest opacity-60">
                                    Vectorized & Ready
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={reset}
                            className="p-2 rounded-full hover:bg-red-50 text-m3-on-surface-variant/30 hover:text-red-500 transition-all active:scale-90"
                            title="Replace Resume"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            {...getRootProps()}
                            className={`relative flex flex-col items-center gap-4 rounded-[2rem] p-8 transition-all cursor-pointer border-2 border-dashed
                                ${isDragActive 
                                    ? "bg-m3-primary/5 border-m3-primary scale-[0.98]" 
                                    : "bg-m3-surface-variant/5 border-m3-outline-variant hover:border-m3-primary/40 hover:bg-m3-primary/5"}
                                ${uploading ? "pointer-events-none opacity-50" : ""}`}
                        >
                            <input {...getInputProps()} />

                            {uploading ? (
                                <>
                                    <div className="relative">
                                        <Loader2 className="h-10 w-10 animate-spin text-m3-primary" />
                                        <div className="absolute inset-0 bg-m3-primary/5 blur-2xl animate-pulse rounded-full" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-base text-m3-on-surface tracking-tight uppercase">
                                            Semantic Parsing...
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-m3-surface m3-elev-1 text-m3-primary group-hover:scale-110 transition-transform">
                                        <Upload className="h-6 w-6" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-lg text-m3-on-surface uppercase tracking-tight">
                                            {isDragActive ? "RELEASE FILE" : "UPLOAD RESUME"}
                                        </p>
                                        <p className="text-[10px] text-m3-on-surface-variant font-black mt-2 opacity-50 uppercase tracking-[0.2em]">
                                            PDF OR DOCX • MAX 10MB
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-center text-[9px] font-black text-red-600 uppercase tracking-widest"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
