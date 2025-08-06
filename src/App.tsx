import React, { useState, useRef } from 'react';
import { FileText, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { submitResumeAnalysis } from './services/api';

function App() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ resume?: string; jobDescription?: string }>({});

  const resultsRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    const errors: { resume?: string; jobDescription?: string } = {};

    if (!resumeFile) {
      errors.resume = 'Please upload your resume';
    } else if (resumeFile.type !== 'application/pdf') {
      errors.resume = 'Only PDF files are supported';
    }

    if (!jobDescription.trim() && !jobDescriptionFile) {
      errors.jobDescription = 'Please provide a job description';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();

      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      if (jobDescriptionFile) {
        formData.append('jobDescription', jobDescriptionFile);
      } else {
        formData.append('jobDescriptionText', jobDescription);
      }

      const response = await submitResumeAnalysis(formData);
      setResults(response);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to analyze your resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResumeFile(null);
    setJobDescription('');
    setJobDescriptionFile(null);
    setResults(null);
    setError(null);
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="container mx-auto py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="py-2 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Helper Agent
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your resume and job description to get AI-powered suggestions and improve your chances of landing the job.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <FileUpload
              onFileSelect={setResumeFile}
              label="Upload Your Resume"
              description="Only PDF format (max 10MB)"
              selectedFile={resumeFile}
              error={formErrors.resume}
              acceptedTypes={['application/pdf']}
            />

            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onFileSelect={setJobDescriptionFile}
              selectedFile={jobDescriptionFile}
              error={formErrors.jobDescription}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 px-8 py-3 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    <span>Analyze Resume</span>
                  </>
                )}
              </button>

              {(results || error) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
                >
                  Start Over
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <LoadingSpinner />
            <h3 className="text-lg font-semibold text-gray-900 mt-4">
              Analyzing Your Resume
            </h3>
            <p className="text-gray-600 mt-2">
              Our AI is comparing your resume with the job description...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">Analysis Failed</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div ref={resultsRef} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Analysis Complete</h2>
            </div>
            <ResultsDisplay results={results.data} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          Powered by AI • Secure file upload • Your data is processed safely
        </div>
      </div>
    </div>
  );
}

export default App;
