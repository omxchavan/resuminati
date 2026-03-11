"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
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

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl neo-sm border-none"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl neo-interactive group-hover:neo-pressed transition-all">
                        <Flame className="h-5 w-5 text-french-blue dark:text-cool-sky" />
                    </div>
                    <span className="text-xl font-bold text-foreground tracking-tight">
                        RoastMyResume
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    <Link href="/roast" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        AI Roaster
                    </Link>
                    <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        ATS
                    </Link>
                    <Link href="/job-match" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        Job Match
                    </Link>
                    <Link href="/improve" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:neo-pressed rounded-xl transition-all">
                        Redesign
                    </Link>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    <div className="h-6 w-[2px] neo-pressed rounded-full mx-1" />
                    {session ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="default" size="sm" className="gap-2 px-4 rounded-xl">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => signOut()}
                                className="gap-2 text-muted-foreground hover:text-destructive rounded-xl"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => signIn()}
                            size="sm"
                            className="gap-2 px-5 rounded-xl text-french-blue dark:text-cool-sky font-bold"
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
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
                >
                    <div className="px-4 py-3 space-y-1">
                        <Link href="/dashboard" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50" onClick={() => setMobileOpen(false)}>
                            Dashboard
                        </Link>
                        <Link href="/roast" className="block px-3 py-2 text-sm font-medium text-french-blue dark:text-cool-sky hover:opacity-80 rounded-md hover:bg-accent/50" onClick={() => setMobileOpen(false)}>
                            AI Roaster
                        </Link>
                        <Link href="/job-match" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50" onClick={() => setMobileOpen(false)}>
                            Job Match
                        </Link>
                        <Link href="/improve" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50" onClick={() => setMobileOpen(false)}>
                            AI Tools
                        </Link>
                        <div className="pt-2 border-t border-border">
                            {session ? (
                                <Button variant="ghost" size="sm" onClick={() => signOut()} className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </Button>
                            ) : (
                                <Button onClick={() => signIn()} size="sm" className="w-full gap-2 bg-gradient-to-r from-french-blue to-cool-sky text-white">
                                    <LogIn className="h-4 w-4" /> Get Started
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
