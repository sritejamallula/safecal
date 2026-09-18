import React from 'react';
import { ExternalLink, ShieldCheck, FileCheck } from 'lucide-react';

interface ProvenanceBadgeProps {
  sourceType?: 'OFFICIAL_REFERENCE' | 'USER_SUBMISSION' | 'IMPORTED_DATA' | string;
  sourceReference?: string;
  variant?: 'banner' | 'badge';
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  sourceType = 'OFFICIAL_REFERENCE',
  sourceReference,
  variant = 'banner'
}) => {
  const isOfficial = sourceType === 'OFFICIAL_REFERENCE';

  if (variant === 'badge') {
    return isOfficial ? (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
        <ShieldCheck className="w-3 h-3 mr-1 text-blue-700" />
        Official Reference Record
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
        <FileCheck className="w-3 h-3 mr-1 text-emerald-700" />
        Registered Establishment Submission
      </span>
    );
  }

  return isOfficial ? (
    <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-3.5 text-xs text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <div className="flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
        <div>
          <span className="font-extrabold text-blue-900 block">Verified Official Source Record</span>
          <span className="text-[11px] text-blue-800/80">Source: Department of Consumer Affairs Legal Metrology Importers Database</span>
        </div>
      </div>

      <a
        href="https://share.google/apFisFMgU03PV6rgr"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-900 text-white hover:bg-blue-800 font-bold text-[10px] rounded-lg transition shrink-0"
      >
        <span>Portal Source</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  ) : (
    <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-center space-x-3">
      <FileCheck className="w-5 h-5 text-emerald-700 shrink-0" />
      <div>
        <span className="font-extrabold text-emerald-900 block">Registered Establishment Submission</span>
        <span className="text-[11px] text-emerald-800">
          This record was submitted by a registered importer establishment and verified by a Legal Metrology Inspector.
        </span>
      </div>
    </div>
  );
};
