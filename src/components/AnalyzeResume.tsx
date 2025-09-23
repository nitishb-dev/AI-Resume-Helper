import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FileUpload } from "../components/FileUpload";
import { JobDescriptionInput } from "../components/JobDescriptionInput";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { submitResumeAnalysis } from "../services/api";
import { validateFile } from "../utils/fileValidation";
import { Footer } from "../components/Footer";
import { ResumeAnalysisResult } from "../types";

const AnalyzeResume: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [resumeError, setResumeError] = useState<string>();
  const [jobError, setJobError] = useState<string>();
  const [results, setResults] = useState<ResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return setResumeError("Please upload your resume.");
    const { isValid, error } = validateFile(resumeFile);
    if (!isValid) return setResumeError(error);
    setResumeError(undefined);

    if (!jobDescription) return setJobError("Please provide a job description.");
    setJobError(undefined);

    try {
      setLoading(true);
      setResults(null);
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescriptionText", jobDescription);
      const response: ResumeAnalysisResult = await submitResumeAnalysis(formData);
      setResults(response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <main className="flex-grow px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
            AI Resume Analyzer
          </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileUpload
              onFileSelect={setResumeFile}
              label="Your Resume"
              description="PDF, DOC, DOCX (Max 10MB)"
              selectedFile={resumeFile}
              error={resumeError}
            />
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              error={jobError}
            />
          </fieldset>
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze My Resume"}
            </button>
          </div>
        </form>

        {loading && <LoadingSpinner />}
        {results && <div ref={resultsRef}><ResultsDisplay results={results} /></div>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyzeResume;
