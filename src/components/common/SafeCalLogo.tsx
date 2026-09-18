import React from 'react';

interface SafeCalLogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export const SafeCalLogo: React.FC<SafeCalLogoProps> = ({
  size = 38,
  showText = true,
  className = '',
  variant = 'dark'
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Innovative SafeCal Emblem: Dual Shield + Digital QR Matrix + Precision Scale + Gold Checkmark Seal */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-md transition-all duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="primaryShield" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0b192c" />
            <stop offset="50%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="goldBeam" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="emeraldSeal" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <radialGradient id="glowRing" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow */}
        <circle cx="50" cy="50" r="46" fill="url(#glowRing)" />

        {/* Outer Hexagonal Shield */}
        <path
          d="M 50 6 L 88 24 L 88 56 C 88 74, 70 90, 50 96 C 30 90, 12 74, 12 56 L 12 24 Z"
          fill="url(#primaryShield)"
          stroke="#3b82f6"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Gold Precision Accent Ring */}
        <path
          d="M 50 12 L 82 28 L 82 54 C 82 69, 66 83, 50 89 C 34 83, 18 69, 18 54 L 18 28 Z"
          fill="none"
          stroke="url(#goldBeam)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.9"
        />

        {/* Digital QR Code Pattern Nodes in Upper Shield */}
        <rect x="26" y="26" width="6" height="6" fill="#93c5fd" rx="1" />
        <rect x="68" y="26" width="6" height="6" fill="#93c5fd" rx="1" />
        <rect x="26" y="62" width="6" height="6" fill="#93c5fd" rx="1" />
        <rect x="68" y="62" width="6" height="6" fill="#93c5fd" rx="1" />

        {/* Scale Central Pillar */}
        <line x1="50" y1="28" x2="50" y2="68" stroke="url(#goldBeam)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 38 68 L 62 68 L 50 58 Z" fill="url(#goldBeam)" />

        {/* Balance Scale Main Beam */}
        <line x1="24" y1="36" x2="76" y2="36" stroke="url(#goldBeam)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Left Scale Pan Chains & Dish */}
        <line x1="24" y1="36" x2="18" y2="50" stroke="#bfdbfe" strokeWidth="1.5" />
        <line x1="24" y1="36" x2="30" y2="50" stroke="#bfdbfe" strokeWidth="1.5" />
        <path d="M 16 50 C 16 55, 32 55, 32 50 Z" fill="url(#goldBeam)" />

        {/* Right Scale Pan Chains & Dish */}
        <line x1="76" y1="36" x2="70" y2="50" stroke="#bfdbfe" strokeWidth="1.5" />
        <line x1="76" y1="36" x2="82" y2="50" stroke="#bfdbfe" strokeWidth="1.5" />
        <path d="M 68 50 C 68 55, 84 55, 84 50 Z" fill="url(#goldBeam)" />

        {/* Central Statutory Verification Checkmark Seal */}
        <circle cx="50" cy="50" r="14" fill="url(#emeraldSeal)" stroke="#6ee7b7" strokeWidth="2.5" />
        <path d="M 42 50 L 48 56 L 59 43" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Brand Label Header */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className={`font-black text-xl tracking-tight font-sans ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}>
              SafeCal
            </span>
            <span className="text-[9px] uppercase font-black tracking-widest bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded-md border border-blue-200 shadow-2xs">
              Legal Verification
            </span>
          </div>
          <span className={`text-[10px] font-bold ${variant === 'light' ? 'text-blue-200' : 'text-slate-500'}`}>
            Statutory Metrology Portal
          </span>
        </div>
      )}
    </div>
  );
};
