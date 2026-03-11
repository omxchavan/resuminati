"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 z-0 h-screen w-full overflow-hidden pointer-events-none",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full opacity-60 dark:opacity-80"
        preserveAspectRatio="xMidYMid slice"
      >
        <g filter="url(#filter0_f)">
          <motion.path
            d="M-200 450C-200 450 100 300 450 450C800 600 1100 450 1440 450"
            stroke="url(#paint0_linear)"
            strokeWidth="120"
            strokeLinecap="round"
            animate={{
              d: [
                "M-200 450C-200 450 100 300 450 450C800 600 1100 450 1440 450",
                "M-200 450C-200 450 100 600 450 450C800 300 1100 450 1440 450",
                "M-200 450C-200 450 100 300 450 450C800 600 1100 450 1440 450",
              ],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.path
            d="M0 200C200 200 400 600 720 450C1040 300 1240 700 1440 700"
            stroke="url(#paint1_linear)"
            strokeWidth="100"
            strokeLinecap="round"
            animate={{
              d: [
                "M0 200C200 200 400 600 720 450C1040 300 1240 700 1440 700",
                "M0 700C200 700 400 300 720 450C1040 600 1240 200 1440 200",
                "M0 200C200 200 400 600 720 450C1040 300 1240 700 1440 700",
              ],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </g>
        <defs>
          <filter id="filter0_f" x="-400" y="-200" width="2240" height="1300" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="120" result="effect1_foregroundBlur" />
          </filter>
          <linearGradient id="paint0_linear" x1="-200" y1="450" x2="1440" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="0" y1="450" x2="1440" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5da9e9" />
            <stop offset="0.5" stopColor="#2a4494" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Moving Particles/Stars for extra depth */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {isMounted && [...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};
