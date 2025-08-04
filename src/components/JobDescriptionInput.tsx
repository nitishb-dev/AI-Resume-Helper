import React, { useState } from 'react';
import { FileText, Upload } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  selectedFile?: File | null;
  error?: string;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  onFileSelect,
  selectedFile,
  error
}) => {
  const [inputMode, setInputMode] = useState<'text' | 'file'>('text');

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => setInputMode('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
            inputMode === 'text'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Paste Text</span>
        </button>
        <button
          type="button"
          onClick={() => setInputMode('file')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
            inputMode === 'file'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>Upload File</span>
        </button>
      </div>

      {inputMode === 'text' ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste the job description here..."
            rows={8}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      ) : (
        <FileUpload
          onFileSelect={onFileSelect}
          label="Job Description File"
          description="Upload PDF or DOCX file (max 10MB)"
          selectedFile={selectedFile}
          error={error}
        />
      )}
    </div>
  );
};