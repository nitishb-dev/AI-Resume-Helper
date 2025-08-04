import React from 'react';
import { CheckCircle, AlertCircle, TrendingUp, Target, Lightbulb } from 'lucide-react';

interface ResultsDisplayProps {
  results: any;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) return null;


  const data = results;


  const matchRating = typeof data.matchRating === 'number' ? data.matchRating : 0;
  const missingSkills = Array.isArray(data.missingSkills) ? data.missingSkills : [];
  const overallSuggestions = Array.isArray(data.overallSuggestions) ? data.overallSuggestions : [];
  const relevantProjects = Array.isArray(data.relevantProjects) ? data.relevantProjects : [];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Match Score */}
      <div className={`p-6 rounded-lg ${getScoreBgColor(matchRating)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className={`h-8 w-8 ${getScoreColor(matchRating)}`} />
            <div>
              <h3 className={`text-lg font-semibold ${getScoreColor(matchRating)}`}>
                Resume Match Score
              </h3>
              <p className="text-sm text-gray-600">
                How well your resume matches the job description
              </p>
            </div>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(matchRating)}`}>
            {matchRating}%
          </div>
        </div>
      </div>

      {/* Keywords Section */}
      {missingSkills.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Key Skills & Keywords</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions Section */}
      {overallSuggestions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">Quick Suggestions</h3>
          </div>
          <ul className="space-y-2">
            {overallSuggestions.map((suggestion: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detailed Improvements Section */}
      {relevantProjects.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-900">Detailed Improvements</h3>
          </div>
          <div className="space-y-4">
            {relevantProjects.map((project: string, index: number) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{project}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor('medium')}`}>
                    MEDIUM
                  </span>
                </div>
                <p className="text-gray-700">
                  Consider enhancing the project "{project}" with more technical details or quantified results.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
