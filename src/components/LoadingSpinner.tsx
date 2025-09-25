import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-14 h-14 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};
