import React from 'react';

interface IndianGovernmentEmblemProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const IndianGovernmentEmblem: React.FC<IndianGovernmentEmblemProps> = ({
  className = '',
  size = 64,
  showText = true
}) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Ashoka Lion Capital Emblem SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-amber-700 drop-shadow-sm"
      >
        {/* Outer Circular Seal Frame */}
        <circle cx="50" cy="50" r="46" stroke="#9A3412" strokeWidth="2.5" fill="#FFFBEB" />
        <circle cx="50" cy="50" r="41" stroke="#B45309" strokeWidth="1" strokeDasharray="2 2" />

        {/* Ashoka Chakra Center Emblem */}
        <circle cx="50" cy="45" r="16" stroke="#1E3A8A" strokeWidth="1.5" fill="#FFFFFF" />
        <circle cx="50" cy="45" r="3" fill="#1E3A8A" />
        
        {/* 24 Spokes of Ashoka Chakra */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const x2 = 50 + 15 * Math.cos(rad);
          const y2 = 45 + 15 * Math.sin(rad);
          return (
            <line
              key={i}
              x1="50"
              y1="45"
              x2={x2}
              y2={y2}
              stroke="#1E3A8A"
              strokeWidth="0.75"
            />
          );
        })}

        {/* Lions Crown Representation */}
        <path
          d="M38 32 C38 25, 44 20, 50 20 C56 20, 62 25, 62 32 C60 35, 54 36, 50 36 C46 36, 40 35, 38 32 Z"
          fill="#B45309"
        />
        <path
          d="M32 36 C30 30, 36 24, 42 25 M68 36 C70 30, 64 24, 58 25"
          stroke="#9A3412"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Base Pedestal (Abacus & Animals) */}
        <rect x="30" y="62" width="40" height="8" rx="2" fill="#78350F" />
        <rect x="26" y="70" width="48" height="4" rx="1" fill="#9A3412" />

        {/* Satyameva Jayate (सत्यमेव जयते) Inscription Box */}
        <text
          x="50"
          y="84"
          textAnchor="middle"
          fontSize="7"
          fontWeight="bold"
          fontFamily="serif, sans-serif"
          fill="#78350F"
        >
          सत्यमेव जयते
        </text>

        {/* Arc Text: GOVERNMENT OF INDIA */}
        <path id="circlePath" d="M 12 50 A 38 38 0 0 1 88 50" fill="none" />
        <text fontSize="5.5" fontWeight="900" fill="#78350F" letterSpacing="0.8">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            GOVERNMENT OF INDIA
          </textPath>
        </text>

        {/* Arc Text Bottom: LEGAL METROLOGY */}
        <path id="circlePathBottom" d="M 88 50 A 38 38 0 0 1 12 50" fill="none" />
        <text fontSize="5" fontWeight="900" fill="#1E3A8A" letterSpacing="0.8">
          <textPath href="#circlePathBottom" startOffset="50%" textAnchor="middle">
            • LEGAL METROLOGY •
          </textPath>
        </text>
      </svg>

      {showText && (
        <div className="mt-1 space-y-0.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 block">
            Government of India
          </span>
          <span className="text-[10px] font-bold text-slate-700 block font-serif">
            सत्यमेव जयते • Ministry of Consumer Affairs
          </span>
        </div>
      )}
    </div>
  );
};
