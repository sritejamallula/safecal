import React from 'react';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Award, Printer, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BusinessCertificatesPage: React.FC = () => {
  const { certificates } = useData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Certificates"
        subtitle="Official Legal Metrology certificates issued to your commercial establishment"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div key={cert.certificateNumber} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-700" />
                <span className="font-mono font-bold text-slate-900 text-sm">{cert.certificateNumber}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {cert.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Instrument ID:</span>
                <span className="font-mono font-bold text-slate-900">{cert.instrumentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Device Type:</span>
                <span className="font-bold">{cert.instrumentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issue Date:</span>
                <span>{cert.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valid Until:</span>
                <span className="font-extrabold text-emerald-700">{cert.validUntil}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">Seal: {cert.sealId}</span>
              <Link
                to={`/certificate/${cert.certificateNumber}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>View & Print</span>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
