// import React from "react";
// import {
//   CheckCircle,
//   AlertCircle,
//   TrendingUp,
//   Target,
//   Lightbulb,
// } from "lucide-react";
// import { ResumeAnalysisResult } from "../App";

// interface ResultsDisplayProps {
//   results: ResumeAnalysisResult;
// }

// export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
//   if (!results) return null;

//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-8 border border-gray-100 dark:border-gray-700">
//       {/* ✅ Match Rating with Progress Circle */}
//       <div className="flex flex-col items-center space-y-3">
//         <div className="relative w-28 h-28">
//           <svg className="w-28 h-28 transform -rotate-90">
//             <circle
//               cx="56"
//               cy="56"
//               r="50"
//               stroke="currentColor"
//               className="text-gray-200"
//               strokeWidth="8"
//               fill="transparent"
//             />
//             <circle
//               cx="56"
//               cy="56"
//               r="50"
//               stroke="currentColor"
//               className="text-blue-600"
//               strokeWidth="8"
//               fill="transparent"
//               strokeDasharray={2 * Math.PI * 50}
//               strokeDashoffset={
//                 2 * Math.PI * 50 * (1 - results.matchRating / 100)
//               }
//               strokeLinecap="round"
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-400">
//             {results.matchRating}%
//           </div>
//         </div>
//         <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
//           <Target className="w-5 h-5 text-blue-600" /> Match Rating
//         </h2>
//       </div>

//       {/* ✅ Missing Skills */}
//       {results.missingSkills.length > 0 && (
//         <div className="bg-red-50 dark:bg-red-900/30 p-5 rounded-xl">
//           <div className="flex items-center space-x-2 mb-3">
//             <AlertCircle className="text-red-500 w-6 h-6" />
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-red-200">
//               Missing Skills
//             </h3>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {results.missingSkills.map((skill, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ✅ Suggestions */}
//       {results.overallSuggestions.length > 0 && (
//         <div className="bg-yellow-50 dark:bg-yellow-900/30 p-5 rounded-xl">
//           <div className="flex items-center space-x-2 mb-3">
//             <Lightbulb className="text-yellow-500 w-6 h-6" />
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-yellow-200">
//               Suggestions
//             </h3>
//           </div>
//           <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
//             {results.overallSuggestions.map((s, index) => (
//               <li key={index}>{s}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* ✅ Relevant Projects */}
//       {results.relevantProjects.length > 0 && (
//         <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl">
//           <div className="flex items-center space-x-2 mb-3">
//             <TrendingUp className="text-green-600 w-6 h-6" />
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-green-200">
//               Relevant Projects
//             </h3>
//           </div>
//           <div className="flex flex-col gap-2">
//             {results.relevantProjects.map((proj, index) => (
//               <div
//                 key={index}
//                 className="p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600"
//               >
//                 {proj}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ✅ Success Note */}
//       <div className="flex items-center space-x-2 border-t pt-5 dark:border-gray-700">
//         <CheckCircle className="text-green-600 w-5 h-5" />
//         <p className="text-gray-700 dark:text-gray-300">
//           Analysis complete - use these insights to improve your resume!
//         </p>
//       </div>
//     </div>
//   );
// };

// ✅ ResultsDisplay.tsx
import React from "react";
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";
import { ResumeAnalysisResult } from "../App";

interface ResultsDisplayProps {
  results: ResumeAnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) return null;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-8 border border-gray-200 dark:border-gray-700">
      {/* Match Rating */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              className="text-gray-200"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              className="text-blue-600"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={
                2 * Math.PI * 56 * (1 - results.matchRating / 100)
              }
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-400">
            {results.matchRating}%
          </div>
        </div>
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <Target className="text-blue-600 w-5 h-5" /> Match Rating
        </h2>
      </div>

      {/* Missing Skills */}
      {results.missingSkills.length > 0 && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/30 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-500 w-6 h-6" />
            <h3 className="font-semibold text-gray-800 dark:text-red-200">
              Missing Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.missingSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-full bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {results.overallSuggestions.length > 0 && (
        <div className="rounded-xl bg-yellow-50 dark:bg-yellow-900/30 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-yellow-500 w-6 h-6" />
            <h3 className="font-semibold text-gray-800 dark:text-yellow-200">
              Suggestions
            </h3>
          </div>
          <ul className="space-y-2 list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
            {results.overallSuggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {results.relevantProjects.length > 0 && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/30 p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-green-600 w-6 h-6" />
            <h3 className="font-semibold text-gray-800 dark:text-green-200">
              Relevant Projects
            </h3>
          </div>
          <div className="space-y-2">
            {results.relevantProjects.map((proj, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-white dark:bg-gray-700 border shadow-sm text-sm"
              >
                {proj}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success note */}
      <div className="flex items-center gap-2 pt-5 border-t border-gray-200 dark:border-gray-700">
        <CheckCircle className="text-green-600 w-5 h-5" />
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Analysis complete — use these insights to improve your resume!
        </p>
      </div>
    </div>
  );
};
