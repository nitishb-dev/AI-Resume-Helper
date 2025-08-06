import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { validateFile, formatFileSize } from '../utils/fileValidation';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  label: string;
  description: string;
  selectedFile?: File | null;
  error?: string;
  acceptedTypes?: string[]; // ✅ NEW prop
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  label,
  description,
  selectedFile,
  error,
  acceptedTypes = ['application/pdf'], // ✅ Default to PDF
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [acceptedTypes]);

  const handleFileSelection = (file: File) => {
    // Validate allowed types
    if (!acceptedTypes.includes(file.type)) {
      setValidationError('Only PDF files are allowed.');
      return;
    }

    setValidationError(null);
    onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const removeFile = () => {
    setValidationError(null);
    onFileSelect(null);
  };

  const displayError = error || validationError;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
            isDragOver
              ? 'border-blue-400 bg-blue-50'
              : displayError
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className={`mx-auto h-12 w-12 ${displayError ? 'text-red-400' : 'text-gray-400'}`} />
            <div className="mt-4">
              <label htmlFor={`file-upload-${label}`} className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drop your PDF here, or{' '}
                  <span className="text-blue-600 hover:text-blue-500">browse</span>
                </span>
                <input
                  id={`file-upload-${label}`}
                  name={`file-upload-${label}`}
                  type="file"
                  className="sr-only"
                  accept={acceptedTypes.join(',')} // ✅ Accept only allowed types
                  onChange={handleFileInput}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-green-900">{selectedFile.name}</p>
              <p className="text-xs text-green-700">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {displayError && <p className="text-sm text-red-600">{displayError}</p>}
    </div>
  );
};
