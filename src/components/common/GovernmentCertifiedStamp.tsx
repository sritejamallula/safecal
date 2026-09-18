import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface GovernmentCertifiedStampProps {
  certNumber?: string;
}

export const GovernmentCertifiedStamp: React.FC<GovernmentCertifiedStampProps> = ({ certNumber }) => {
  return (
    <div className="flex items-center space-x-3 bg-amber-50/90 border-2 border-amber-600/60 p-3 rounded-2xl shadow-xs">
      <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
        <Award className="w-6 h-6" />
      </div>
      <div>
        <div className="flex items-center space-x-1 text-amber-950 font-black text-xs uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>INDIAN GOVERNMENT CERTIFIED</span>
        </div>
        <p className="text-[10px] text-amber-900 font-bold">
          Directorate of Legal Metrology • Section 24, Act 2009
        </p>
        {certNumber && (
          <p className="text-[9px] font-mono font-bold text-amber-950 mt-0.5">
            Ref: {certNumber}
          </p>
        )}
      </div>
    </div>
  );
};
