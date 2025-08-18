// import React, { useState, useRef, useEffect } from "react";
// import { FileUpload } from "./components/FileUpload";
// import { JobDescriptionInput } from "./components/JobDescriptionInput";
// import { ResultsDisplay } from "./components/ResultsDisplay";
// import { submitResumeAnalysis } from "./services/api";
// import { LoadingSpinner } from "./components/LoadingSpinner";

// // ✅ Backend response type
// export interface ResumeAnalysisResult {
//   matchRating: number;
//   missingSkills: string[];
//   overallSuggestions: string[];
//   relevantProjects: string[];
// }

// const App: React.FC = () => {
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [jobDescription, setJobDescription] = useState<string>("");
//   const [jobFile, setJobFile] = useState<File | null>(null);

//   const [resumeError, setResumeError] = useState<string>();
//   const [jobError, setJobError] = useState<string>();

//   const [results, setResults] = useState<ResumeAnalysisResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Ref for results section
//   const resultsRef = useRef<HTMLDivElement | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // ✅ Resume validation
//     if (!resumeFile) {
//       setResumeError("Please upload your resume.");
//       return;
//     }
//     if (resumeFile.type !== "application/pdf") {
//       setResumeError("Only PDF files are allowed.");
//       return;
//     }
//     setResumeError(undefined);

//     // ✅ Job description validation
//     if (!jobDescription && !jobFile) {
//       setJobError("Please provide a job description (text or file).");
//       return;
//     }
//     setJobError(undefined);

//     try {
//       setLoading(true);
//       setResults(null);

//       const formData = new FormData();
//       formData.append("resume", resumeFile);

//       if (jobFile) {
//         formData.append("jobDescriptionFile", jobFile);
//       } else {
//         formData.append("jobDescriptionText", jobDescription);
//       }

//       const response: ResumeAnalysisResult = await submitResumeAnalysis(formData);
//       setResults(response);
//     } catch (err) {
//       console.error("❌ API error:", err);
//       setJobError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Auto-scroll when results update
//   useEffect(() => {
//     if (results && resultsRef.current) {
//       resultsRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [results]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <h1 className="text-3xl font-extrabold text-gray-800">
//             🚀 AI Resume Helper
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Upload your resume and job description to get{" "}
//             <span className="font-semibold text-blue-600">
//               instant AI-powered feedback
//             </span>
//             .
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* ✅ Resume Upload (Only PDF) */}
//           <FileUpload
//             onFileSelect={setResumeFile}
//             label="Upload Resume"
//             description="Upload your resume in PDF format (max 10MB)"
//             selectedFile={resumeFile}
//             error={resumeError}
//           />

//           {/* ✅ Job Description (Text or File) */}
//           <JobDescriptionInput
//             value={jobDescription}
//             onChange={setJobDescription}
//             onFileSelect={setJobFile}
//             selectedFile={jobFile}
//             error={jobError}
//           />

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
//             >
//               {loading ? "Analyzing..." : "Analyze Resume"}
//             </button>
//           </div>
//         </form>

//         {/* Loader */}
//         {loading && (
//           <div className="flex justify-center">
//             <LoadingSpinner />
//           </div>
//         )}

//         {/* Results */}
//         {results && (
//           <div ref={resultsRef} className="mt-6">
//             <ResultsDisplay results={results} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

// App.tsx
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
  const [jobFile, setJobFile] = useState<File | null>(null);

  const [resumeError, setResumeError] = useState<string>();
  const [jobError, setJobError] = useState<string>();

  const [results, setResults] = useState<ResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const resultsRef = useRef<HTMLDivElement | null>(null);

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

    if (!jobDescription && !jobFile) {
      setJobError("Please provide a job description (text or file).");
      return;
    }
    setJobError(undefined);

    try {
      setLoading(true);
      setResults(null);

      const formData = new FormData();
      formData.append("resume", resumeFile);

      if (jobFile) {
        formData.append("jobDescriptionFile", jobFile);
      } else {
        formData.append("jobDescriptionText", jobDescription);
      }

      const response: ResumeAnalysisResult = await submitResumeAnalysis(formData);
      setResults(response);
    } catch (err) {
      console.error("❌ API error:", err);
      setJobError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-5xl mx-auto p-6">
        {/* ✅ Hero Section */}
        <header className="text-center py-8 space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-100 text-blue-600 text-3xl font-bold shadow-sm">
              🚀
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            AI Resume Helper
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume and job description to get{" "}
            <span className="font-semibold text-blue-600">
              instant AI-powered feedback
            </span>{" "}
            and boost your chances of landing interviews.
          </p>
        </header>

        {/* ✅ Form Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <FileUpload
              onFileSelect={setResumeFile}
              label="Upload Resume"
              description="Upload your resume in PDF format (max 10MB)"
              selectedFile={resumeFile}
              error={resumeError}
            />

            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onFileSelect={setJobFile}
              selectedFile={jobFile}
              error={jobError}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          </form>

          {loading && (
            <div className="flex justify-center py-4">
              <LoadingSpinner />
            </div>
          )}

          {results && (
            <div ref={resultsRef} className="mt-10">
              <ResultsDisplay results={results} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
