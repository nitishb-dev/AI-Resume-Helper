import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const featuresList = [
  {
    title: "AI-Powered Analysis",
    description: "Automatically analyze your resume and compare it with any job description.",
  },
  {
    title: "Keyword Matching",
    description: "See which keywords from the job description match your resume.",
  },
  {
    title: "Actionable Suggestions",
    description: "Get recommendations to improve your resume and increase match score.",
  },
  {
    title: "Priority Feedback",
    description: "Know which sections need high, medium, or low priority improvements.",
  },
];

const Features: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-16 max-w-6xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Features</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {featuresList.map((feature, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <CheckCircle className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{feature.title}</h2>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
        onClick={() => navigate("/analyze")}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        Analyze Resume
      </button>
      </div>
    </div>
  );
};

export default Features;
