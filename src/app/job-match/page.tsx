"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "@/components/ResumeUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Loader2,
  Sparkles,
  FileText,
  Workflow,
  TrendingUp,
} from "lucide-react";
import { useResume } from "@/components/ResumeProvider";
import { Separator } from "@/components/ui/separator";

interface MatchResult {
  fitScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  interviewProbability: number;
  summary: string;
}

export default function JobMatchPage() {
  const { resumeData, isLoaded } = useResume();
  const [jobDescription, setJobDescription] = useState("");
  const [matching, setMatching] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  const calculateMatch = async () => {
    if (!resumeData || !jobDescription) return;
    setMatching(true);
    try {
      const res = await fetch("/api/job-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: resumeData.parsedText,
          jobDescription,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.match);
      }
    } catch (error) {
      console.error("Match failed:", error);
    } finally {
      setMatching(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-french-blue" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl neo-sm mb-6">
          <Target className="h-6 w-6 text-french-blue dark:text-cool-sky" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">
          <span className="text-foreground">Precision </span>
          <span className="bg-gradient-to-r from-french-blue to-cool-sky bg-clip-text text-transparent">
            Job Matching
          </span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
          Compare your resume against any job description to see how well you rank and what's missing.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resume Upload Column */}
            <div className="space-y-6">
              <Card className="neo p-2">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <FileText className="h-6 w-6 text-french-blue dark:text-cool-sky" />
                    1. Select Resume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumeUploader />
                </CardContent>
              </Card>

              {resumeData && (
                <div className="p-8 rounded-3xl neo-pressed bg-background/30 border-none">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-xl neo-sm flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-french-blue" />
                    </div>
                    <h3 className="font-bold text-foreground">Pro Tip</h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    ATS systems prioritize keywords. Ensure your technical skills match exactly as written in the job post.
                  </p>
                </div>
              )}
            </div>

            {/* Job Description Column */}
            <Card className="neo p-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl font-bold">
                  <Workflow className="h-6 w-6 text-french-blue dark:text-cool-sky" />
                  2. Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  placeholder="Paste the full job description here..."
                  className="w-full h-48 rounded-2xl neo-pressed bg-transparent p-6 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:neo-pressed transition-all border-none"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <Button
                  onClick={calculateMatch}
                  disabled={matching || !resumeData || !jobDescription}
                  className="w-full gap-3 text-french-blue dark:text-cool-sky font-bold h-14 rounded-2xl neo-interactive hover:neo-pressed border-none bg-background text-base shadow-none"
                >
                  {matching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Target className="h-5 w-5" />
                  )}
                  {matching ? "Analyzing Fit..." : "Calculate Match Score"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {matching ? (
            <motion.div
              key="matching"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:col-span-12"
            >
              <Card className="neo-pressed border-none py-24">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="relative mb-8">
                    <Loader2 className="h-16 w-16 animate-spin text-french-blue" />
                    <motion.div 
                      animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-french-blue/30 blur-2xl rounded-full"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Calculating Compatibility...</h3>
                  <p className="text-muted-foreground font-medium max-w-sm">Comparing semantically between your experience and requirements.</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-12 space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Circle */}
                <Card className="neo border-none h-fit">
                  <CardContent className="pt-10 flex flex-col items-center">
                    <div className="relative h-48 w-48 mb-8">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="text-muted-foreground/5 stroke-current"
                          strokeWidth="8"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <motion.circle
                          className="text-french-blue stroke-current"
                          strokeWidth="8"
                          strokeLinecap="round"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          initial={{ strokeDasharray: "0 251" }}
                          animate={{ strokeDasharray: `${(result.fitScore / 100) * 251} 251` }}
                          transition={{ duration: 2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-extrabold text-foreground">
                          {result.fitScore}%
                        </span>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Match</span>
                      </div>
                    </div>
                    <Badge className={`px-6 py-2 text-sm font-bold rounded-xl ${
                      result.fitScore >= 80 ? "bg-emerald-500/10 text-emerald-600" :
                      result.fitScore >= 50 ? "bg-yellow-500/10 text-yellow-600" :
                      "bg-red-500/10 text-red-600"
                    }`}>
                      {result.fitScore >= 80 ? "Highly Compatible" : 
                       result.fitScore >= 50 ? "Partial Match" : "Significant Gap"}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Keywords & Analysis */}
                <Card className="neo lg:col-span-2 border-none">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-french-blue" />
                      Gap Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Matching Keywords */}
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                        Matched Skills ({result.matchedKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedKeywords.map((kw, i) => (
                          <span key={i} className="px-4 py-2 rounded-xl neo-pressed text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Keywords */}
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                        <div className="h-2 w-2 rounded-full bg-red-400" />
                        Missing Requirements ({result.missingKeywords.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.map((kw, i) => (
                          <span key={i} className="px-4 py-2 rounded-xl neo-sm text-sm font-bold text-red-500 dark:text-red-400">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendation Card */}
              <Card className="neo border-none overflow-hidden h-fit">
                <CardHeader className="bg-french-blue/5 border-b border-border/5">
                  <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-xl font-bold flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-french-blue" />
                      Strategic Insights
                    </CardTitle>
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full neo-sm bg-background/50">
                      <span className="text-xs font-bold text-muted-foreground">Interview Prob:</span>
                      <span className="text-sm font-bold text-french-blue">{result.interviewProbability}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <p className="text-lg font-medium text-foreground/90 leading-relaxed italic">
                    {result.summary}
                  </p>
                  
                  <Separator className="opacity-10" />
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-foreground">Actionable Recommendations:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                      {result.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl neo-pressed font-medium text-muted-foreground/80">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg neo-sm text-xs font-bold text-french-blue">
                            {i+1}
                          </span>
                          {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
