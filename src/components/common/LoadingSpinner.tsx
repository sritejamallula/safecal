import React from 'react';

export const LoadingSpinner: React.FC<{ label?: string }> = ({ label = 'Loading data...' }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
};
