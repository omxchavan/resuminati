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
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
        >
            <div className="bg-m3-surface/80 backdrop-blur-2xl rounded-full border border-m3-outline-variant/30 m3-elev-2 px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-m3-primary text-m3-on-primary m3-elev-1 group-hover:scale-110 transition-transform">
                        <Flame className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-black text-m3-on-surface tracking-tighter">
                        RESUMINATI
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                    {[
                        { href: "/dashboard", label: "ATS" },
                        { href: "/roast", label: "Roaster" },
                        { href: "/job-match", label: "Match" },
                        { href: "/improve", label: "Tools" },
                    ].map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            className="px-5 py-2 text-sm font-black text-m3-on-surface-variant hover:bg-m3-primary/5 rounded-full transition-all uppercase tracking-widest"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {resumeData && (
                        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 text-emerald-700 m3-elev-0">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest truncate max-w-[100px]">
                                {resumeData.fileName}
                            </span>
                        </div>
                    )}
                    <ThemeToggle />
                    <div className="h-6 w-[1px] bg-m3-outline-variant/50 mx-1" />
                    {session ? (
                        <Link href="/dashboard">
                            <Button className="m3-button-filled h-10 px-6 rounded-full font-black text-xs uppercase tracking-widest gap-2">
                                <LayoutDashboard className="h-3.5 w-3.5" />
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            onClick={() => signIn()}
                            className="bg-m3-secondary-container text-m3-on-secondary-container h-10 px-6 rounded-full font-black text-xs uppercase tracking-widest hover:bg-m3-secondary-container/80 transition-all border-none"
                        >
                            Get Started
                        </Button>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        className="p-3 text-m3-on-surface-variant hover:bg-m3-surface-variant/50 rounded-full transition-all"
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-20 left-0 right-0 bg-m3-surface m3-elev-4 rounded-[2.5rem] border border-m3-outline-variant/30 p-6 md:hidden overflow-hidden"
                    >
                        <div className="space-y-4">
                            {resumeData && (
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="text-xs font-black text-emerald-800 truncate">
                                        ACTIVE: {resumeData.fileName}
                                    </span>
                                </div>
                            )}
                            {[
                                { href: "/dashboard", label: "ATS Dashboard" },
                                { href: "/roast", label: "AI Roaster" },
                                { href: "/job-match", label: "Job Match" },
                                { href: "/improve", label: "AI Career Tools" },
                            ].map((link) => (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className="block p-5 text-lg font-black text-m3-on-surface hover:bg-m3-surface-variant/50 rounded-2xl transition-all" 
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-m3-outline-variant/30 mt-4">
                                {session ? (
                                    <Button onClick={() => signOut()} className="w-full h-14 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-black gap-3 border-none">
                                        <LogOut className="h-5 w-5" /> Sign Out
                                    </Button>
                                ) : (
                                    <Button onClick={() => signIn()} className="m3-button-filled w-full h-14 rounded-2xl font-black gap-3 text-lg">
                                        <LogIn className="h-6 w-6" /> Get Started
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
