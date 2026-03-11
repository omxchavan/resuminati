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

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                        <Flame className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                        RoastMyResume
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    <Link href="/dashboard" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
                        Dashboard
                    </Link>
                    <Link href="/job-match" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
                        Job Match
                    </Link>
                    <Link href="/improve" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
                        AI Tools
                    </Link>
                </div>

                {/* Auth buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {session ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => signOut()}
                                className="gap-2 text-muted-foreground"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => signIn()}
                            size="sm"
                            className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25"
                        >
                            <LogIn className="h-4 w-4" />
                            Get Started
                        </Button>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-muted-foreground"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl"
                >
                    <div className="px-4 py-3 space-y-1">
                        <Link href="/dashboard" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                            Dashboard
                        </Link>
                        <Link href="/job-match" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                            Job Match
                        </Link>
                        <Link href="/improve" className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5" onClick={() => setMobileOpen(false)}>
                            AI Tools
                        </Link>
                        <div className="pt-2 border-t border-white/10">
                            {session ? (
                                <Button variant="ghost" size="sm" onClick={() => signOut()} className="w-full justify-start gap-2">
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </Button>
                            ) : (
                                <Button onClick={() => signIn()} size="sm" className="w-full gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white">
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
