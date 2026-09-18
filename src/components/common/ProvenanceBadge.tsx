import React from 'react';
import { ExternalLink, ShieldCheck, Info } from 'lucide-react';

interface ProvenanceBadgeProps {
  sourceType?: 'OFFICIAL_REFERENCE' | 'DEMO' | 'IMPORTED_DATA' | string;
  sourceReference?: string;
  variant?: 'banner' | 'badge';
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  sourceType = 'DEMO',
  sourceReference,
  variant = 'banner'
}) => {
  const isOfficial = sourceType === 'OFFICIAL_REFERENCE';

  if (variant === 'badge') {
    return isOfficial ? (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
        <ShieldCheck className="w-3 h-3 mr-1 text-blue-700" />
        Official Reference Source
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
        <Info className="w-3 h-3 mr-1 text-amber-700" />
        Demo Record — Hackathon Prototype
      </span>
    );
  }

  return isOfficial ? (
    <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <div className="flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
        <div>
          <span className="font-extrabold text-blue-900 block">Verified Official Source Record</span>
          <span className="text-[11px] text-blue-800/80">Source: Department of Consumer Affairs, Government of India</span>
        </div>
      </div>

      <a
        href="https://consumeraffairs.gov.in/pages/legal-metrology-overview"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-900 text-white hover:bg-blue-800 font-bold text-[10px] rounded-lg transition shrink-0"
      >
        <span>View Official Overview</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  ) : (
    <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-3.5 text-xs text-amber-950 flex items-center space-x-3">
      <Info className="w-5 h-5 text-amber-700 shrink-0" />
      <div>
        <span className="font-extrabold text-amber-900 block">Demo Record — Hackathon Prototype</span>
        <span className="text-[11px] text-amber-800">
          This record was generated for offline demonstration. It does not represent an actual issued government certificate.
        </span>
      </div>
    </div>
  );
};
