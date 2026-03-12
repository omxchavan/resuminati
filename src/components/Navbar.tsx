"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Flame,
    LayoutDashboard,
    LogIn,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useResume } from "@/components/ResumeProvider";

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { resumeData } = useResume();

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-none"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl neo-interactive group-hover:neo-pressed transition-all">
                        <Flame className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                    </div>
                    <span className="text-xl font-bold text-foreground tracking-tight">
                        ResuMinati
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    <Link href="/dashboard" className="px-4 py-2 text-sm font-bold text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        ATS
                    </Link>
                    <Link href="/roast" className="px-4 py-2 text-sm font-bold text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        Roaster
                    </Link>
                    <Link href="/job-match" className="px-4 py-2 text-sm font-bold text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        Match
                    </Link>
                    <Link href="/improve" className="px-4 py-2 text-sm font-bold text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        Tools
                    </Link>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {resumeData && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full neo-pressed bg-background/50">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-muted-foreground truncate max-w-[120px]">
                                {resumeData.fileName}
                            </span>
                        </div>
                    )}
                    <ThemeToggle />
                    <div className="h-6 w-[2px] neo-pressed rounded-full mx-1 opacity-50" />
                    {session ? (
                        <Link href="/dashboard">
                            <Button variant="default" size="sm" className="gap-2 px-5 rounded-xl font-bold neo-interactive hover:neo-pressed border-none">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            onClick={() => signIn()}
                            size="sm"
                            className="gap-2 px-5 rounded-xl text-french-blue dark:text-cool-sky font-bold neo-interactive hover:neo-pressed border-none"
                        >
                            <LogIn className="h-4 w-4" />
                            Get Started
                        </Button>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        className="p-2 text-muted-foreground neo-interactive rounded-xl active:neo-pressed transition-all"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl pb-6"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {resumeData && (
                                <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-2xl neo-pressed bg-background/50">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="text-sm font-bold text-muted-foreground truncate">
                                        Active: {resumeData.fileName}
                                    </span>
                                </div>
                            )}
                            <Link href="/dashboard" className="block px-4 py-3 text-base font-bold text-muted-foreground hover:neo-pressed rounded-2xl transition-all" onClick={() => setMobileOpen(false)}>
                                ATS Dashboard
                            </Link>
                            <Link href="/roast" className="block px-4 py-3 text-base font-bold text-french-blue dark:text-cool-sky hover:neo-pressed rounded-2xl transition-all" onClick={() => setMobileOpen(false)}>
                                AI Roaster
                            </Link>
                            <Link href="/job-match" className="block px-3 py-3 text-base font-bold text-muted-foreground hover:neo-pressed rounded-2xl transition-all" onClick={() => setMobileOpen(false)}>
                                Job Match
                            </Link>
                            <Link href="/improve" className="block px-3 py-3 text-base font-bold text-muted-foreground hover:neo-pressed rounded-2xl transition-all" onClick={() => setMobileOpen(false)}>
                                AI Tools
                            </Link>
                            <div className="pt-4 border-t border-border mt-4">
                                {session ? (
                                    <Button variant="ghost" size="lg" onClick={() => signOut()} className="w-full justify-start gap-4 text-muted-foreground hover:text-destructive rounded-2xl font-bold">
                                        <LogOut className="h-5 w-5" /> Sign Out
                                    </Button>
                                ) : (
                                    <Button onClick={() => signIn()} size="lg" className="w-full gap-2 rounded-2xl font-bold">
                                        <LogIn className="h-5 w-5" /> Get Started
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
