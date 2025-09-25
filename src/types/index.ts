// src/types/index.ts

export interface ResumeData {
  resume: File;
  jobDescription: string | File;
}

export interface ResumeAnalysisResult {
  matchScore: number;
  keywords: string[];
  suggestions: string[];
  improvements: {
    section: string;
    recommendation: string;
    priority: "high" | "medium" | "low";
  }[];
}

export interface APIResponse {
  success: boolean;
  data?: ResumeAnalysisResult;
  error?: string;
}

export interface UploadStatus {
  isUploading: boolean;
  progress: number;
  error: string | null;
}
