// import React from 'react';

// export const LoadingSpinner: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center p-8">
//       <div className="relative">
//         <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
//         <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
//       </div>
//     </div>
//   );
// };

// ✅ LoadingSpinner.tsx
import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin [animation-duration:1s]"></div>
      </div>
    </div>
  );
};
