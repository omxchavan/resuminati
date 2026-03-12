"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ResumeData {
  id: string;
  fileName: string;
  parsedText: string;
}

interface ResumeContextType {
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData | null) => void;
  isLoaded: boolean;
  clearResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeDataState] = useState<ResumeData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedResume = localStorage.getItem("resuminati_resume");
    if (savedResume) {
      try {
        setResumeDataState(JSON.parse(savedResume));
      } catch (e) {
        console.error("Failed to parse saved resume", e);
        localStorage.removeItem("resuminati_resume");
      }
    }
    setIsLoaded(true);
  }, []);

  const setResumeData = (data: ResumeData | null) => {
    setResumeDataState(data);
    if (data) {
      localStorage.setItem("resuminati_resume", JSON.stringify(data));
    } else {
      localStorage.removeItem("resuminati_resume");
    }
  };

  const clearResume = () => {
    setResumeData(null);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, isLoaded, clearResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
}
