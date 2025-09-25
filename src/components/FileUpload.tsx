import React, { useCallback, useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  label: string;
  description: string;
  selectedFile?: File | null;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  label,
  description,
  selectedFile,
  error,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = useCallback(
    (file: File) => onFileSelect(file),
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
    e.target.value = "";
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
        {label}
      </label>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? inputRef.current?.click() : null)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer focus:outline-none
          ${dragActive ? "border-blue-500 bg-blue-50 shadow-lg" : error ? "border-red-400 bg-red-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}`}
      >
        {selectedFile ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 truncate">
              <File className="text-blue-500" size={20} />
              <span className="truncate max-w-xs font-medium text-gray-800 dark:text-gray-200">
                {selectedFile.name}
              </span>
            </div>
            <button
              type="button"
              className="p-1.5 rounded-full text-red-500 hover:bg-red-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect(null);
              }}
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Upload size={28} />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Drag & Drop or Click to Upload</p>
            <p className="text-xs text-gray-400">{description}</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleBrowse}
          className="hidden"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
