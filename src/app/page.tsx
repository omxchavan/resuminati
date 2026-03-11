"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Target,
  Zap,
  FileSearch,
  PenTool,
  Brain,
  MessageSquare,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
  Sparkles,
  Upload,
} from "lucide-react";

const features = [
  { icon: Target, title: "ATS Score Analyzer", desc: "Get a detailed ATS compatibility score with category breakdowns", color: "from-blue-500 to-cyan-500" },
  { icon: Flame, title: "AI Resume Roaster", desc: "Get your resume roasted with humor — mild, spicy, or brutal", color: "from-orange-500 to-red-500" },
  { icon: FileSearch, title: "Professional Feedback", desc: "Serious recruiter-level analysis with strengths and improvements", color: "from-emerald-500 to-teal-500" },
  { icon: Zap, title: "Job Description Match", desc: "Compare your resume against any job posting for fit score", color: "from-yellow-500 to-amber-500" },
  { icon: PenTool, title: "Bullet Point Improver", desc: "Transform weak bullet points into impactful statements", color: "from-purple-500 to-pink-500" },
  { icon: Brain, title: "Interview Prep", desc: "Get AI-generated interview questions based on your resume", color: "from-rose-500 to-pink-500" },
  { icon: MessageSquare, title: "Cover Letter Generator", desc: "Generate personalized cover letters for any job application", color: "from-indigo-500 to-blue-500" },
  { icon: FileText, title: "Skill Gap Detector", desc: "Identify missing skills compared to job requirements", color: "from-teal-500 to-emerald-500" },
  { icon: BarChart3, title: "Resume Benchmark", desc: "Compare your resume against top candidates in your field", color: "from-violet-500 to-purple-500" },
  { icon: Shield, title: "Version History", desc: "Track improvements across multiple resume versions", color: "from-slate-500 to-zinc-500" },
];

const demoRoast = {
  level: "spicy",
  text: `"Passionate team player with strong communication skills" — congratulations, you've just described every resume since 2010. 🔥

Your "experience" section reads like a todo list. "Worked on APIs" — did you build them? Break them? Stare at them? The mystery continues.

But hey, at least you have a pulse and Microsoft Office skills. That puts you ahead of 12% of applicants. 📊`,
};

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-orange-500/5 to-red-500/5 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-400 mb-8"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Intelligence
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Your Resume,{" "}
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Roasted & Perfected
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Upload your resume and get instant AI analysis — ATS scoring, brutal
            (but helpful) roasts, professional feedback, and optimization
            suggestions. All in one place.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-xl shadow-orange-500/25 text-base px-8 h-12"
              >
                <Upload className="h-5 w-5" />
                Upload Your Resume
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#demo">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/15 hover:bg-white/5 text-base px-8 h-12"
              >
                <Flame className="h-5 w-5 text-orange-400" />
                See Demo Roast
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-8 sm:gap-16">
            {[
              { value: "10K+", label: "Resumes Analyzed" },
              { value: "85%", label: "Avg Score Improvement" },
              { value: "4.9/5", label: "User Rating" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Everything You Need to{" "}
            </span>
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            10 powerful AI tools to analyze, optimize, and perfect your resume
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo Roast Section */}
      <section id="demo" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Sample Roast 🔥
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Here&apos;s what our AI thinks of generic resumes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-orange-400" />
                <span className="text-sm font-medium text-orange-400">
                  🌶️ Spicy Level
                </span>
              </div>
              {demoRoast.text.split("\n").map((line, i) => (
                <p key={i} className="text-foreground/80 text-sm leading-relaxed mb-3 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to get{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              roasted
            </span>
            ?
          </h3>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-xl shadow-orange-500/25 px-8 h-12"
            >
              <Upload className="h-5 w-5" />
              Upload Your Resume Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <span className="font-semibold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                RoastMyResume AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 RoastMyResume AI. Built with 🔥 and AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
