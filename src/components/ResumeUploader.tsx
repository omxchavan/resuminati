"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, CheckCircle2 } from "lucide-react";
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
                    className={`relative flex items-center gap-4 rounded-full border-none px-6 py-4 transition-all cursor-pointer m3-elev-0 bg-m3-surface-variant/20 hover:bg-m3-surface-variant/40
                        ${isDragActive ? "bg-m3-primary/5 ring-2 ring-m3-primary" : ""}
                        ${uploading ? "pointer-events-none opacity-50" : ""}`}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-m3-primary" />
                    ) : globalResumeData ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                        <Upload className="h-5 w-5 text-m3-on-surface-variant" />
                    )}
                    <span className="text-sm font-black text-m3-on-surface-variant truncate">
                        {uploading
                            ? "PROCESSING..."
                            : globalResumeData
                                ? globalResumeData.fileName
                                : "UPLOAD RESUME"}
                    </span>
                    {globalResumeData && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                reset();
                            }}
                            className="ml-auto p-1.5 rounded-full hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-[10px] font-black uppercase text-red-500 tracking-widest text-center">{error}</p>
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
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-m3-surface-variant/10 p-10 text-center"
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 m3-elev-1">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <div>
                            <p className="font-black text-2xl text-m3-on-surface tracking-tight">{globalResumeData.fileName}</p>
                            <p className="text-sm text-m3-on-surface-variant font-bold mt-2 uppercase tracking-widest opacity-60">
                                Vectorized & Ready
                            </p>
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={reset} 
                            className="rounded-full px-8 h-12 mt-4 bg-transparent border-m3-outline-variant text-m3-on-surface-variant font-black text-xs uppercase tracking-widest hover:bg-m3-surface-variant/30"
                        >
                            Replace Document
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div
                            {...getRootProps()}
                            className={`relative flex flex-col items-center gap-8 rounded-[3rem] p-16 transition-all cursor-pointer border-2 border-dashed
                                ${isDragActive 
                                    ? "bg-m3-primary/5 border-m3-primary scale-95" 
                                    : "bg-m3-surface border-m3-outline-variant hover:border-m3-primary/50 hover:bg-m3-primary/5"}
                                ${uploading ? "pointer-events-none opacity-50" : ""}`}
                        >
                            <input {...getInputProps()} />

                            {uploading ? (
                                <>
                                    <div className="relative">
                                        <Loader2 className="h-20 w-20 animate-spin text-m3-primary" />
                                        <div className="absolute inset-0 bg-m3-primary/10 blur-3xl animate-pulse rounded-full" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-3xl text-m3-on-surface tracking-tighter">
                                            Semantic Parsing...
                                        </p>
                                        <p className="text-sm text-m3-on-surface-variant font-black uppercase tracking-widest mt-3 opacity-60">
                                            Structuring data for AI analysis
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-m3-surface m3-elev-1 text-m3-primary">
                                        <Upload className="h-10 w-10" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-3xl text-m3-on-surface tracking-tighter">
                                            {isDragActive
                                                ? "RELEASE TO UPLOAD"
                                                : "UPLOAD RESUME"}
                                        </p>
                                        <p className="text-base text-m3-on-surface-variant font-bold mt-3 max-w-sm opacity-60">
                                            PDF or DOCX supported. Your data remains local and secure.
                                        </p>
                                    </div>
                                    <Button
                                        className="m3-button-filled h-14 px-10 rounded-full font-black text-sm uppercase tracking-widest"
                                    >
                                        CHOOSE FILE
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
                    className="mt-6 text-center text-xs font-black text-red-600 uppercase tracking-widest"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
