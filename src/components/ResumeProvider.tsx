"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ResumeData {
  id: string;
  fileName: string;
  parsedText: string;
}

interface Analyses {
  dashboard?: any;
  roast?: any;
  jobMatch?: any;
  bulletImprover?: any;
  coverLetter?: any;
  interviewPrep?: any;
}

interface ResumeContextType {
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData | null) => void;
  analyses: Analyses;
  setAnalysis: (key: keyof Analyses, data: any) => void;
  isLoaded: boolean;
  clearResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeDataState] = useState<ResumeData | null>(null);
  const [analyses, setAnalysesState] = useState<Analyses>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedResume = localStorage.getItem("resuminati_resume");
    const savedAnalyses = localStorage.getItem("resuminati_analyses");

    if (savedResume) {
      try {
        setResumeDataState(JSON.parse(savedResume));
      } catch (e) {
        console.error("Failed to parse saved resume", e);
        localStorage.removeItem("resuminati_resume");
      }
    }

    if (savedAnalyses) {
      try {
        setAnalysesState(JSON.parse(savedAnalyses));
      } catch (e) {
        console.error("Failed to parse saved analyses", e);
        localStorage.removeItem("resuminati_analyses");
      }
    }
    
    setIsLoaded(true);
  }, []);

  const setResumeData = (data: ResumeData | null) => {
    // If the resume is changing (even if not to null), clear the analyses
    if (!data || (resumeData && data.id !== resumeData.id)) {
      setAnalysesState({});
      localStorage.removeItem("resuminati_analyses");
    }

    setResumeDataState(data);
    if (data) {
      localStorage.setItem("resuminati_resume", JSON.stringify(data));
    } else {
      localStorage.removeItem("resuminati_resume");
    }
  };

  const setAnalysis = (key: keyof Analyses, data: any) => {
    setAnalysesState(prev => {
      const next = { ...prev, [key]: data };
      localStorage.setItem("resuminati_analyses", JSON.stringify(next));
      return next;
    });
  };

  const clearResume = () => {
    setResumeData(null);
  };

  return (
    <ResumeContext.Provider value={{ 
      resumeData, 
      setResumeData, 
      analyses,
      setAnalysis,
      isLoaded, 
      clearResume 
    }}>
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
