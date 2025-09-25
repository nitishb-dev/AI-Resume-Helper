import React from "react";

export const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">About AI Resume Helper</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        AI Resume Helper is a cutting-edge web application designed to make resume
        optimization fast, smart, and efficient. Using AI-powered analysis, it
        evaluates your resume against any job description and provides actionable
        feedback to help you land your dream job.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        The platform highlights missing keywords, scores compatibility, and gives
        priority-based recommendations to improve your chances with Applicant Tracking
        Systems (ATS). Whether you are a fresher or a professional, AI Resume Helper
        helps you present your skills in the most impactful way.
      </p>
      <p className="text-lg text-slate-600 dark:text-slate-300">
        With support for PDF uploads and direct text input, our tool is secure, fast,
        and easy to use. Make your resume stand out, save time, and approach
        applications with confidence.
      </p>
    </div>
  );
};
