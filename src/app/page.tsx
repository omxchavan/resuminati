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
  { icon: Target, title: "ATS Score Analyzer", desc: "Detailed ATS compatibility score with category breakdowns", color: "from-m3-primary to-m3-secondary" },
  { icon: Flame, title: "AI Resume Roaster", desc: "Get roasted with humor — mild, spicy, or brutal levels", color: "from-orange-500 to-red-500" },
  { icon: FileSearch, title: "Professional Feedback", desc: "Serious recruiter-level analysis with improvements", color: "from-blue-500 to-cyan-500" },
  { icon: Zap, title: "Job Description Match", desc: "Compare your resume against any job posting for fit score", color: "from-green-500 to-emerald-500" },
  { icon: PenTool, title: "Bullet Point Improver", desc: "Transform weak bullet points into impactful statements", color: "from-purple-500 to-pink-500" },
  { icon: Brain, title: "Interview Prep", desc: "AI-generated questions based on your specific resume", color: "from-indigo-500 to-blue-500" },
  { icon: MessageSquare, title: "Cover Letter Generator", desc: "Personalized cover letters for any job application", color: "from-blue-600 to-indigo-600" },
  { icon: FileText, title: "Skill Gap Detector", desc: "Identify missing skills compared to requirements", color: "from-amber-500 to-orange-500" },
  { icon: BarChart3, title: "Resume Benchmark", desc: "Compare against top candidates in your field", color: "from-teal-500 to-emerald-600" },
  { icon: Shield, title: "Version History", desc: "Track improvements across multiple resume versions", color: "from-sky-500 to-blue-500" },
];

const demoRoast = {
  level: "spicy",
  text: `"Passionate team player with strong communication skills" — congratulations, you've just described every resume since 2010. 📄\n\nYour "experience" section reads like a todo list. "Worked on APIs" — did you build them? Break them? Stare at them? The mystery continues.\n\nBut hey, at least you have a pulse and Microsoft Office skills. That puts you ahead of 12% of applicants. 📊`,
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-m3-surface overflow-hidden">
      <BackgroundBeams />
      <div className="relative z-10 w-full">

        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full bg-m3-primary-container px-5 py-2 text-sm font-bold text-m3-on-primary-container mb-10 m3-elev-1"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Career Intelligence
            </motion.div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-m3-on-surface">
              Your Resume,
              <br />
              <span className="text-m3-primary italic decoration-m3-outline-variant">
                Perfected.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-8 max-w-2xl text-xl text-m3-on-surface-variant leading-relaxed font-medium opacity-80">
              Upload your resume and get instant AI analysis — ATS scoring, professional feedback, and optimization suggestions. Build a resume that recruiters actually read.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/dashboard">
                <Button className="m3-button-filled h-16 px-10 text-lg">
                  <Upload className="h-6 w-6 mr-2" />
                  Upload Resume
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a href="#demo">
                <Button
                  variant="outline"
                  className="h-16 px-10 text-lg rounded-full border-2 border-m3-outline text-m3-primary hover:bg-m3-primary/5"
                >
                  <BarChart3 className="h-6 w-6 mr-2" />
                  See Sample
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-20 flex items-center justify-center gap-10 sm:gap-24">
              {[
                { value: "10K+", label: "Analyzed" },
                { value: "85%", label: "Improvement" },
                { value: "4.9/5", label: "Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl sm:text-4xl font-black text-m3-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-m3-on-surface-variant uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-m3-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Arsenal</span>
            <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface">
              Everything You Need to <span className="bg-m3-primary-container px-2 rounded-lg">Lead</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group relative overflow-hidden rounded-[2rem] bg-m3-surface-variant/30 p-8 m3-elev-0 hover:m3-elev-3 hover:bg-m3-surface transition-all duration-300 border border-m3-outline-variant/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-m3-primary-container text-m3-primary transition-transform group-hover:scale-110 group-hover:rotate-3 m3-elev-1">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-black text-m3-on-surface text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-m3-on-surface-variant leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-m3-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">Deep Dive</span>
            <h2 className="text-4xl sm:text-5xl font-black text-m3-on-surface">
              AI Assessment
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <div className="m3-card !p-12 relative overflow-hidden bg-m3-surface-variant/20 border border-m3-outline-variant">
              <div className="absolute top-0 right-0 w-32 h-32 bg-m3-primary/5 rounded-bl-full" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-12 w-12 rounded-full bg-m3-primary text-m3-on-primary flex items-center justify-center m3-elev-2">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-m3-primary uppercase tracking-widest block mb-1">Status: Complete</span>
                    <h4 className="text-xl font-black text-m3-on-surface">Intelligence Feedback</h4>
                  </div>
                </div>
                <div className="space-y-6">
                  {demoRoast.text.split("\n").map((line, i) => (
                    <p key={i} className="text-m3-on-surface-variant text-lg leading-relaxed font-medium italic opacity-90">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-12 flex h-2 bg-m3-surface-variant rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    className="bg-m3-primary h-full"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-m3-primary">Confidence Score: 85%</p>
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center bg-m3-primary-container px-8 py-20 rounded-[3rem] border border-m3-primary/10 m3-elev-1"
          >
            <h3 className="text-4xl font-black mb-8 text-m3-on-primary-container">
              Ready to lead your field?
            </h3>
            <Link href="/dashboard">
              <Button className="m3-button-filled h-16 px-12 text-xl shadow-2xl">
                <Upload className="h-6 w-6 mr-3" />
                Upload Now
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-m3-outline-variant/30 py-16 bg-m3-surface-variant/10 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-m3-primary text-m3-on-primary m3-elev-2">
                  <Flame className="h-6 w-6" />
                </div>
                <span className="text-2xl font-black text-m3-on-surface tracking-tighter">
                  Resuminati
                </span>
              </div>
              <div className="flex gap-8 text-sm font-bold text-m3-on-surface-variant">
                <a href="#" className="hover:text-m3-primary transition-colors">Analyzer</a>
                <a href="#" className="hover:text-m3-primary transition-colors">Roaster</a>
                <a href="#" className="hover:text-m3-primary transition-colors">Privacy</a>
              </div>
              <p className="text-sm font-medium text-m3-on-surface-variant/60">
                © 2025 Resuminati. Built with M3 Precision.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
