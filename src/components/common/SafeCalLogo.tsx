import React from 'react';

interface SafeCalLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const SafeCalLogo: React.FC<SafeCalLogoProps> = ({
  size = 36,
  showText = true,
  className = '',
  variant = 'dark'
}) => {
  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* SVG Emblem: Shield + Precision Balance Beam + Verification Checkmark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbdf7e" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="checkGrad" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Shield Outer Outline */}
        <path
          d="M 50 8 C 70 8, 88 16, 88 28 C 88 60, 68 84, 50 94 C 32 84, 12 60, 12 28 C 12 16, 30 8, 50 8 Z"
          fill="url(#shieldGrad)"
          stroke="#3b82f6"
          strokeWidth="3"
        />

        {/* Inner Shield Accent */}
        <path
          d="M 50 14 C 65 14, 81 21, 81 31 C 81 58, 63 78, 50 87 C 37 78, 19 58, 19 31 C 19 21, 35 14, 50 14 Z"
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth="2"
          strokeDasharray="4 2"
          opacity="0.8"
        />

        {/* Precision Balance Scale Pillar */}
        <line x1="50" y1="30" x2="50" y2="68" stroke="url(#goldGrad)" strokeWidth="3.5" strokeLinecap="round" />
        {/* Scale Base */}
        <path d="M 38 68 L 62 68 L 50 60 Z" fill="url(#goldGrad)" />

        {/* Scale Beam */}
        <line x1="26" y1="38" x2="74" y2="38" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />

        {/* Left Scale Pan */}
        <line x1="26" y1="38" x2="20" y2="52" stroke="#93c5fd" strokeWidth="1.5" />
        <line x1="26" y1="38" x2="32" y2="52" stroke="#93c5fd" strokeWidth="1.5" />
        <path d="M 18 52 C 18 57, 34 57, 34 52 Z" fill="url(#goldGrad)" />

        {/* Right Scale Pan */}
        <line x1="74" y1="38" x2="68" y2="52" stroke="#93c5fd" strokeWidth="1.5" />
        <line x1="74" y1="38" x2="80" y2="52" stroke="#93c5fd" strokeWidth="1.5" />
        <path d="M 66 52 C 66 57, 82 57, 82 52 Z" fill="url(#goldGrad)" />

        {/* Verification Stamp Checkmark Badge */}
        <circle cx="50" cy="50" r="14" fill="#065f46" stroke="#34d399" strokeWidth="2" />
        <path d="M 43 50 L 48 55 L 58 44" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Brand Text Header */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className={`font-black text-xl tracking-tight font-sans ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}>
              SafeCal
            </span>
            <span className="text-[9px] uppercase font-extrabold tracking-widest bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200">
              Legal Verification
            </span>
          </div>
          <span className={`text-[10px] font-semibold ${variant === 'light' ? 'text-blue-200' : 'text-slate-500'}`}>
            Statutory Metrology Portal
          </span>
        </div>
      )}
    </div>
  );
};
