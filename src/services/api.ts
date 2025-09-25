import { ResumeAnalysisResult } from '../App';

/**
 * The shape of the API response from the Express backend.
 */
interface ExpressApiResponse {
  success: boolean;
  data: ResumeAnalysisResult;
  error?: string;
  metadata?: {
    resumeWordCount?: number;
    jobDescWordCount?: number;
    analysisTimestamp?: string;
    analysisType?: string;
    aiModel?: string;
    [key: string]: unknown; // optional extra metadata without using 'any'
  };
}

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const submitResumeAnalysis = async (
  formData: FormData
): Promise<ResumeAnalysisResult> => {
  if (!API_ENDPOINT) {
    throw new Error(
      "API endpoint is not configured. Please set the VITE_API_ENDPOINT environment variable."
    );
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    try {
      const errorBody: ExpressApiResponse = await response.json();
      throw new Error(errorBody.error || `HTTP error! Status: ${response.status}`);
    } catch {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }

  try {
    const result: ExpressApiResponse = await response.json();
    if (result.success && result.data) {
      return result.data;
    } else {
      throw new Error(result.error || "API request was not successful.");
    }
  } catch (error) {
    console.error("Failed to parse JSON response from server:", error);
    throw new Error("Received an invalid response from the server.");
  }
};
