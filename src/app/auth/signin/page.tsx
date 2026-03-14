"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Mail, Sparkles } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
    const [email, setEmail] = useState("demo@roastmyresume.ai");

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 bg-m3-surface">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-10">
                    <motion.div 
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-m3-primary text-m3-on-primary m3-elev-3"
                    >
                        <Flame className="h-10 w-10" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-m3-on-surface tracking-tighter">RESUMINATI</h1>
                    <p className="mt-4 text-sm font-black text-m3-on-surface-variant uppercase tracking-widest opacity-60">
                        AI-POWERED CAREER COMMAND CENTER
                    </p>
                </div>

                <Card className="m3-card !p-8 bg-m3-surface border border-m3-outline-variant/30 m3-elev-1 rounded-[3rem]">
                    <CardContent className="p-0 space-y-6">
                        {/* Google Sign In */}
                        <Button
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            className="w-full h-16 rounded-full bg-m3-surface border border-m3-outline-variant text-m3-on-surface font-black uppercase tracking-widest text-xs gap-4 hover:bg-m3-surface-variant/20 transition-all shadow-none"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 border-t border-m3-outline-variant/30" />
                            <span className="relative bg-m3-surface px-4 text-[10px] font-black uppercase text-m3-on-surface-variant/40 tracking-[0.3em]">
                                Secure Gateway
                            </span>
                        </div>

                        {/* Demo Login */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-m3-on-surface-variant uppercase tracking-widest ml-4 opacity-60">
                                    Identity Access
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 rounded-2xl bg-m3-surface-variant/20 border-none px-6 text-base font-black text-m3-on-surface focus:ring-2 focus:ring-m3-primary transition-all outline-none"
                                />
                            </div>
                            <Button
                                onClick={() =>
                                    signIn("credentials", {
                                        email,
                                        callbackUrl: "/dashboard",
                                    })
                                }
                                className="m3-button-filled w-full h-16 text-lg gap-3 m3-elev-2 shadow-m3-primary/20"
                            >
                                <Sparkles className="h-6 w-6" />
                                Demo Access
                            </Button>
                            <p className="text-[10px] text-center text-m3-on-surface-variant font-black uppercase tracking-widest opacity-40">
                                Sandbox Mode — No Persistence
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
