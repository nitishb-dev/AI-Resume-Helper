// import React, { useState, useRef, useEffect } from "react";
// import { FileUpload } from "./components/FileUpload";
// import { JobDescriptionInput } from "./components/JobDescriptionInput";
// import { ResultsDisplay } from "./components/ResultsDisplay";
// import { submitResumeAnalysis } from "./services/api";
// import { LoadingSpinner } from "./components/LoadingSpinner";

// export interface ResumeAnalysisResult {
//   matchRating: number;
//   missingSkills: string[];
//   overallSuggestions: string[];
//   relevantProjects: string[];
// }

// const App: React.FC = () => {
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [jobDescription, setJobDescription] = useState<string>("");

//   const [resumeError, setResumeError] = useState<string>();
//   const [jobError, setJobError] = useState<string>();

//   const [results, setResults] = useState<ResumeAnalysisResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const resultsRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (results && resultsRef.current) {
//       resultsRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [results]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!resumeFile) {
//       setResumeError("Please upload your resume.");
//       return;
//     }
//     if (resumeFile.type !== "application/pdf") {
//       setResumeError("Only PDF files are allowed.");
//       return;
//     }
//     setResumeError(undefined);

//     if (!jobDescription) {
//       setJobError("Please provide a job description.");
//       return;
//     }
//     setJobError(undefined);

//     try {
//       setLoading(true);
//       setResults(null);

//       const formData = new FormData();
//       formData.append("resume", resumeFile);
//       formData.append("jobDescriptionText", jobDescription);

//       const response: ResumeAnalysisResult = await submitResumeAnalysis(formData);
//       setResults(response);
//     } catch (err) {
//       console.error("❌ API error:", err);
//       setJobError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-10">
//       <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 md:space-y-10 border border-gray-100">
        
//         {/* Header */}
//         <div className="text-center space-y-3 sm:space-y-4">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
//             🚀 AI Resume Helper
//           </h1>
//           <p className="text-gray-600 text-base sm:text-lg max-w-xl sm:max-w-2xl mx-auto">
//             Upload your resume and job description to get{" "}
//             <span className="font-semibold text-blue-600">
//               instant AI-powered feedback
//             </span>{" "}
//             on how well you match.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//           {/* Resume Upload */}
//           <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-inner">
//             <FileUpload
//               onFileSelect={setResumeFile}
//               label="Upload Resume"
//               description="Upload your resume in PDF format (max 10MB)"
//               selectedFile={resumeFile}
//               error={resumeError}
//             />
//           </div>

//           {/* Job Description */}
//           <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-inner">
//             <JobDescriptionInput
//               value={jobDescription}
//               onChange={setJobDescription}
//               error={jobError}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-3 md:px-10 md:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
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
//           <div ref={resultsRef} className="mt-6 sm:mt-8 md:mt-10">
//             <ResultsDisplay results={results} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from 'react'

function App() {
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Create stars
    const starArray = []
    for (let i = 0; i < 50; i++) {
      starArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2
      })
    }
    setStars(starArray)

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const rocket = document.querySelector('.rocket') as HTMLElement
      if (rocket) {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight
        rocket.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px) rotate(${x * 10 - 5}deg)`
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-white" 
         style={{ 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
         }}>
      
      {/* Animated Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite'
        }}
      />

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animation: 'twinkle 2s infinite alternate'
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-5 text-center">
        
        {/* Rocket */}
        <div 
          className="rocket text-6xl md:text-7xl mb-8 transition-transform duration-100 ease-out"
          style={{ animation: 'float 3s ease-in-out infinite' }}
        >
          🚀
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          AI Resume Helper
        </h1>
        
        <h2 className="text-2xl md:text-3xl mb-4 opacity-90">
          Under Construction
        </h2>
        
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-8 opacity-80">
          I'm currently developing an innovative AI-powered resume optimization tool. 
          This personal project will help job seekers match their resumes perfectly with job descriptions!
        </p>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md bg-white/20 rounded-full p-2 mb-4 backdrop-blur-sm">
          <div 
            className="h-5 rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
              animation: 'loading 3s ease-in-out infinite'
            }}
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ animation: 'shine 2s infinite' }}
            />
          </div>
        </div>
        
        <p className="text-base opacity-70 mb-12">
          Estimated completion: Working on it daily
        </p>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 transition-transform hover:-translate-y-1">
            <span className="text-4xl block mb-4">🤖</span>
            <h3 className="text-xl font-semibold mb-2">Smart AI Analysis</h3>
            <p className="opacity-80 leading-relaxed">
              Implementing advanced AI to analyze resumes and provide actionable feedback
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 transition-transform hover:-translate-y-1">
            <span className="text-4xl block mb-4">⚡</span>
            <h3 className="text-xl font-semibold mb-2">Real-time Matching</h3>
            <p className="opacity-80 leading-relaxed">
              Building instant compatibility scoring between resumes and job postings
            </p>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 transition-transform hover:-translate-y-1">
            <span className="text-4xl block mb-4">🎯</span>
            <h3 className="text-xl font-semibold mb-2">Optimization Tips</h3>
            <p className="opacity-80 leading-relaxed">
              Developing personalized suggestions to improve your resume's impact
            </p>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="opacity-70">
          <p className="text-lg mb-2">👨‍💻 Individual Project in Development</p>
          <p className="text-sm mb-4">Follow the progress or get in touch!</p>
          
          <div className="flex justify-center gap-4">
            <a 
              href="#" 
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl transition-all hover:bg-white/30 hover:scale-110" 
              title="Email"
            >
              📧
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl transition-all hover:bg-white/30 hover:scale-110" 
              title="LinkedIn"
            >
              💼
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl transition-all hover:bg-white/30 hover:scale-110" 
              title="GitHub"
            >
              ⚡
            </a>
          </div>
        </div>
      </div>


    </div>
  )
}

export default App