import React from "react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
        AI Resume Helper
      </h1>
      <p className="text-lg sm:text-xl max-w-3xl text-slate-600 dark:text-slate-300">
      Instantly analyze your resume against any job description with AI-powered feedback!
      </p>
      <button
        onClick={() => navigate("/analyze")}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Analyze Resume
      </button>
    </div>
  );
};
