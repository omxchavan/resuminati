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
import { BackgroundBeams } from "@/components/BackgroundBeams";

const features = [
  { icon: Target, title: "ATS Score Analyzer", desc: "Get a detailed ATS compatibility score with category breakdowns", color: "from-blue-500 to-indigo-500" },
  { icon: Flame, title: "AI Resume Roaster", desc: "Get your resume roasted with humor — mild, spicy, or brutal", color: "from-indigo-500 to-purple-500" },
  { icon: FileSearch, title: "Professional Feedback", desc: "Serious recruiter-level analysis with strengths and improvements", color: "from-purple-500 to-pink-500" },
  { icon: Zap, title: "Job Description Match", desc: "Compare your resume against any job posting for fit score", color: "from-blue-600 to-cyan-500" },
  { icon: PenTool, title: "Bullet Point Improver", desc: "Transform weak bullet points into impactful statements", color: "from-violet-500 to-purple-600" },
  { icon: Brain, title: "Interview Prep", desc: "Get AI-generated interview questions based on your resume", color: "from-blue-500 to-sky-500" },
  { icon: MessageSquare, title: "Cover Letter Generator", desc: "Generate personalized cover letters for any job application", color: "from-indigo-500 to-blue-500" },
  { icon: FileText, title: "Skill Gap Detector", desc: "Identify missing skills compared to job requirements", color: "from-cyan-500 to-blue-500" },
  { icon: BarChart3, title: "Resume Benchmark", desc: "Compare your resume against top candidates in your field", color: "from-purple-500 to-indigo-500" },
  { icon: Shield, title: "Version History", desc: "Track improvements across multiple resume versions", color: "from-blue-500 to-purple-500" },
];

const demoRoast = {
  level: "spicy",
  text: `"Passionate team player with strong communication skills" — congratulations, you've just described every resume since 2010. 📄


Your "experience" section reads like a todo list. "Worked on APIs" — did you build them? Break them? Stare at them? The mystery continues.

But hey, at least you have a pulse and Microsoft Office skills. That puts you ahead of 12% of applicants. 📊`,
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <BackgroundBeams />
      <div className="relative z-10 w-full">

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full neo-pressed px-5 py-2 text-sm font-medium text-french-blue dark:text-cool-sky mb-8"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Intelligence
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Your Resume,
            <br />
            <span className="text-french-blue dark:text-cool-sky">
              Analyzed & Perfected
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed font-medium">
            Upload your resume and get instant AI analysis — ATS scoring, professional feedback, and optimization suggestions. Build a resume that recruiters actually read.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="gap-2 text-base px-8 h-12 rounded-2xl"
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
                className="gap-2 text-base px-8 h-12 rounded-2xl"
              >
                <BarChart3 className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                See Sample Analysis
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
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-french-blue to-cool-sky bg-clip-text text-transparent">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything You Need to{" "}
            <span className="text-french-blue dark:text-cool-sky">
              Get Hired
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group relative overflow-hidden rounded-3xl neo p-6 hover:neo-pressed transition-shadow duration-300"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl neo-interactive text-french-blue dark:text-cool-sky transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-2">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed text-pretty font-medium">
                {feature.desc}
              </p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Professional Feedback
          </h2>
          <p className="mt-4 text-muted-foreground">
            Actionable insights to make your resume stand out
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-3xl neo p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full neo-pressed opacity-50 blur-xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 neo-pressed inline-flex px-4 py-2 rounded-xl w-auto">
                <Brain className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                <span className="text-sm font-bold text-french-blue dark:text-cool-sky uppercase tracking-wider">
                  AI Assessment
                </span>
              </div>
              <div className="space-y-4">
                {demoRoast.text.split("\n").map((line, i) => (
                  <p key={i} className="text-muted-foreground text-base leading-relaxed font-medium">
                    {line}
                  </p>
                ))}
              </div>
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
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Ready to optimize your career?
          </h3>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="gap-2 text-base px-8 h-14 rounded-2xl font-bold"
            >
              <Upload className="h-5 w-5" />
              Upload Your Resume Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl neo-interactive">
                <Flame className="h-5 w-5 text-french-blue dark:text-cool-sky" />
              </div>
              <span className="text-lg font-bold text-foreground">
                RoastMyResume AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 RoastMyResume AI. Built with professional precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}
