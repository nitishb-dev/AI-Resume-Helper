//const API_ENDPOINT = "https://n8n-deploy-0voq.onrender.com/webhook-test/a8719fcd-367a-4d20-92e7-c47ff591f1cd";  //TEST URL

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
console.log('API Endpoint:', API_ENDPOINT);


import { ResumeAnalysisResult } from '../App';

export const submitResumeAnalysis = async (
  formData: FormData
): Promise<ResumeAnalysisResult> => {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  if (!text) {
    throw new Error("Empty response from server");
  }

  return JSON.parse(text) as ResumeAnalysisResult;
};
