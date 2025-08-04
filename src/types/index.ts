export interface ResumeData {
  resume: File;
  jobDescription: string | File;
}

export interface APIResponse {
  success: boolean;
  data?: {
    keywords: string[];
    suggestions: string[];
    matchScore: number;
    improvements: {
      section: string;
      recommendation: string;
      priority: 'high' | 'medium' | 'low';
    }[];
  };
  error?: string;
}

export interface UploadStatus {
  isUploading: boolean;
  progress: number;
  error: string | null;
}