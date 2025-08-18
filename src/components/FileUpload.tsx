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
    (file: File) => {
      if (file.type !== "application/pdf") {
        onFileSelect(null);
        alert("Only PDF files are allowed.");
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
      // Reset input so user can re-select the same file if needed
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <p className="block text-sm font-medium text-gray-700">{label}</p>

      {/* Drop Zone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors outline-none ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              <File className="text-blue-500" size={20} />
              <span className="text-sm text-gray-700">{selectedFile.name}</span>
            </div>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect(null);
              }}
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="text-gray-400" size={24} />
            <p className="text-sm text-gray-600">
              Drop your{" "}
              <span className="font-medium text-blue-600">PDF</span> here, or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
          </div>
        )}

        {/* Hidden input */}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={handleBrowse}
          className="hidden"
        />
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500">{description}</p>

      {/* Error */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
