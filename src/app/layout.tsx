import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
