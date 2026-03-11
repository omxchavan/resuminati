import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoastMyResume AI — AI Career Copilot",
  description:
    "Upload your resume and get AI-powered ATS scoring, humorous roasts, professional feedback, and optimization suggestions. Your AI career copilot.",
  keywords: [
    "resume",
    "ATS score",
    "resume roast",
    "career",
    "AI",
    "job matching",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
