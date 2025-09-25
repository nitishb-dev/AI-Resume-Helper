// ✅ ResultsDisplay.tsx
import React, { useRef, useState } from "react";
import {
  CheckCircle,
  TrendingUp,
  Target,
  Lightbulb,
  Tags,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ResumeAnalysisResult } from "../types";

interface ResultsDisplayProps {
  results: ResumeAnalysisResult;
}

const PriorityIndicator = ({
  priority,
}: {
  priority: "high" | "medium" | "low";
}) => {
  const styles = {
    high: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      label: "High Priority",
    },
    medium: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      label: "Medium Priority",
    },
    low: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      label: "Low Priority",
    },
  };
  const style = styles[priority];

  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${style.bgColor} ${style.textColor}`}
    >
      {style.label}
    </span>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsExporting(true);

    // Use the computed background color to support both light and dark themes in the PDF
    const backgroundColor = window.getComputedStyle(document.body).backgroundColor;

    const canvas = await html2canvas(element, {
      scale: 2, // Render at a higher resolution for better quality
      useCORS: true,
      backgroundColor: backgroundColor,
    });

    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;

    const imgWidth = pdfWidth;
    const imgHeight = imgWidth / ratio;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("ai-resume-analysis.pdf");
    setIsExporting(false);
  };

  if (!results) return null;

  return (
    <div className="space-y-6">
      <div ref={printRef} className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 space-y-8 border border-gray-200 dark:border-gray-700">
        {/* Match Score */}
        <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              className="text-gray-200"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              className="text-blue-600"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={
                2 * Math.PI * 56 * (1 - results.matchScore / 100)
              }
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-400">
            {results.matchScore}%
          </div>
        </div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <Target className="text-blue-600 w-6 h-6" /> Match Score
          </h2>
        </div>

        {/* Matched Keywords */}
        {results.keywords && results.keywords.length > 0 && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/30 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Tags className="text-green-600 w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-green-200">
              Matched Keywords
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.keywords.map((keyword, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-sm rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        )}

        {/* Actionable Improvements */}
        {results.improvements && results.improvements.length > 0 && (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-900/30 p-6 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-indigo-500 w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-indigo-200">
              Actionable Improvements
            </h3>
          </div>
          <div className="space-y-3">
            {results.improvements.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-gray-200 bg-white dark:bg-gray-800"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-gray-500 text-sm">
                      {item.section}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      {item.recommendation}
                    </p>
                  </div>
                  <PriorityIndicator priority={item.priority} />
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* General Suggestions */}
        {results.suggestions && results.suggestions.length > 0 && (
        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-blue-500 w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-blue-200">
              General Suggestions
            </h3>
          </div>
          <ul className="space-y-2 list-inside list-disc text-sm text-gray-700 dark:text-gray-300">
            {results.suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
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
      <div className="flex justify-center pt-2">
        <button onClick={handleExportPdf} disabled={isExporting} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-wait">
          <Download size={18} />
          {isExporting ? "Exporting..." : "Export as PDF"}
        </button>
      </div>
    </div>
  );
};
