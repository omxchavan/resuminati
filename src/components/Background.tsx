"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Background = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the spotlight movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden bg-background">
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 h-full w-full opacity-[0.15] dark:opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />

      {/* Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-[100px] opacity-50 dark:opacity-40"
        style={{
          background: "radial-gradient(600px circle at var(--x) var(--y), var(--color-cool-sky), transparent 80%)",
          // @ts-ignore - custom CSS properties work with motion
          "--x": smoothX,
          // @ts-ignore
          "--y": smoothY,
        }}
      />

      {/* Secondary Ambient Light */}
      <div className="absolute top-0 h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(42,68,148,0.15),rgba(255,255,255,0))]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-20" />
    </div>
  );
};
