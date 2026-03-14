"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-10 h-10 bg-m3-surface-variant/20 hover:bg-m3-surface-variant/50 border-none transition-all"
    >
      <div className="relative h-5 w-5">
        <Sun className="absolute inset-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-m3-primary" />
        <Moon className="absolute inset-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-m3-primary" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
