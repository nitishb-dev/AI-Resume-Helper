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
    <div className="flex flex-col w-full space-y-2">
      <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        Job Description
        <span className="text-xs font-normal text-gray-400 ml-1">(paste here)</span>
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={charLimit}
        placeholder="Paste the full job description for the most accurate analysis..."
        className={`w-full h-40 p-4 border-2 rounded-xl resize-none transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
      />
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{value.length}/{charLimit} characters</span>
        {error && <span className="text-red-600 font-medium">{error}</span>}
      </div>
    </div>
  );
};
