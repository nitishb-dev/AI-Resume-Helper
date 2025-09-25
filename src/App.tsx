import React, { useState, useRef, useEffect } from "react";
import { FileUpload } from "./components/FileUpload";
import { JobDescriptionInput } from "./components/JobDescriptionInput";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { submitResumeAnalysis } from "./services/api";
import { LoadingSpinner } from "./components/LoadingSpinner";

export interface ResumeAnalysisResult {
  matchRating: number;
  missingSkills: string[];
  overallSuggestions: string[];
  relevantProjects: string[];
}

const App: React.FC = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  const [resumeError, setResumeError] = useState<string>();
  const [jobError, setJobError] = useState<string>();

  const [results, setResults] = useState<ResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      setResumeError("Please upload your resume.");
      return;
    }
    if (resumeFile.type !== "application/pdf") {
      setResumeError("Only PDF files are allowed.");
      return;
    }
    setResumeError(undefined);

    if (!jobDescription) {
      setJobError("Please provide a job description.");
      return;
    }
    setJobError(undefined);

    try {
      setLoading(true);
      setResults(null);

      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescriptionText", jobDescription);

      const response: ResumeAnalysisResult = await submitResumeAnalysis(formData);
      setResults(response);
    } catch (err) {
      console.error("❌ API error:", err);
      setJobError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 md:space-y-10 border border-gray-100">
        
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            🚀 AI Resume Helper
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto">
            Upload your resume and job description to get{" "}
            <span className="font-semibold text-blue-600">
              instant AI-powered feedback
            </span>{" "}
            on how well you match.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Resume Upload */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-inner">
            <FileUpload
              onFileSelect={setResumeFile}
              label="Upload Resume"
              description="Upload your resume in PDF format (max 10MB)"
              selectedFile={resumeFile}
              error={resumeError}
            />
          </div>

          {/* Job Description */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-inner">
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              error={jobError}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 md:px-10 md:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        </form>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {/* Results */}
        {results && (
          <div ref={resultsRef} className="mt-6 sm:mt-8 md:mt-10">
            <ResultsDisplay results={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

