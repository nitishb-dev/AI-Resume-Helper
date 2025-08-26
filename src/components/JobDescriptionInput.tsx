// import React from "react";

// interface JobDescriptionInputProps {
//   value: string;
//   onChange: (value: string) => void;
//   error?: string;
// }

// export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
//   value,
//   onChange,
//   error,
// }) => {
//   const charLimit = 2500; // limit for JD length

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">
//         Job Description <span className="text-gray-400 text-xs">(paste here)</span>
//       </label>

//       <textarea
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Example: We are looking for a Data Science Intern skilled in Python, Machine Learning, SQL, and data visualization. The role involves working with large datasets, building predictive models, and collaborating with cross-functional teams..."
//         rows={8}
//         maxLength={charLimit}
//         className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm leading-relaxed ${
//           error ? "border-red-300" : "border-gray-300"
//         }`}
//       />

//       {/* Character count */}
//       <div className="flex justify-between text-xs text-gray-500">
//         <span>{value.length}/{charLimit} characters</span>
//         {error && <p className="text-red-600">{error}</p>}
//       </div>

//       {/* Helper text */}
//       <p className="text-xs text-gray-400">
//         Tip: Paste the full job description for the most accurate resume analysis.
//       </p>
//     </div>
//   );
// };

// ✅ JobDescriptionInput.tsx
import React from "react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const charLimit = 2500;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Job Description{" "}
        <span className="ml-1 text-xs text-gray-400">(paste here)</span>
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        maxLength={charLimit}
        placeholder="Paste the full job description here for best results..."
        className={`w-full px-4 py-3 rounded-xl text-sm leading-relaxed resize-none border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-400" : "border-gray-300"}`}
      />

      <div className="flex justify-between text-xs mt-1">
        <span className="text-gray-500">
          {value.length}/{charLimit} characters
        </span>
        {error && <p className="text-red-600 font-medium">{error}</p>}
      </div>

      <p className="text-xs text-gray-400">
        Tip: Paste the full job description for the most accurate resume
        analysis.
      </p>
    </div>
  );
};
