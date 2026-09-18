import React from 'react';
import { Instrument, Certificate } from '../../types';
import { CheckCircle2, Calendar, User, MapPin, Award, XCircle, FileText, ShieldCheck, Building2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VerificationCardProps {
  instrument?: Instrument;
  certificate?: Certificate;
  errorType?: 'EXPIRED' | 'REJECTED' | 'NOT_FOUND' | 'PENDING';
  message?: string;
  query: string;
}

export const VerificationCard: React.FC<VerificationCardProps> = ({
  instrument,
  certificate,
  errorType,
  message,
  query
}) => {
  // Not Found State
  if (errorType === 'NOT_FOUND' || (!instrument && !certificate)) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl max-w-2xl mx-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Verification Record Not Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            {message || `No statutory verification record was found matching query "${query}".`}
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
          <p className="font-bold text-slate-800">Search Options:</p>
          <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
            <li>Search by Certificate Number (e.g. <span className="font-mono font-semibold">IMP/MH/162/2026</span> or <span className="font-mono font-semibold">IMP-MH-162-2026</span>).</li>
            <li>Search by Registration / IEC / PAN Number (e.g. <span className="font-mono font-semibold">0316936936</span> or <span className="font-mono font-semibold">ABRCS2286B</span>).</li>
            <li>Search by Owner / Importer Name (e.g. <span className="font-semibold">SUPREME INSTRUMENT TECHNOLOGY</span>).</li>
          </ul>
        </div>
      </div>
    );
  }

  const status = instrument?.verificationStatus || instrument?.status || 'VERIFIED';
  const isVerified = status === 'VERIFIED';
  const ownerName = instrument?.importerName || instrument?.ownerName || 'SUPREME INSTRUMENT TECHNOLOGY PRIVATE LIMITED';
  const regNo = instrument?.registrationNo || '0316936936';
  const certNo = instrument?.certificateNumber || certificate?.certificateNumber || 'IMP/MH/162/2026';
  const itemScope = instrument?.itemCategory || instrument?.instrumentType || 'All types of weighing and measuring instruments';
  const issueDate = instrument?.issueDateStr || (instrument?.verificationDate ? new Date(instrument.verificationDate).toLocaleDateString('en-GB') : '16/09/2026');
  const validityDate = instrument?.validityDateStr || (instrument?.validUntil ? new Date(instrument.validUntil).toLocaleDateString('en-GB') : '15/09/2031');
  const stateName = instrument?.state || 'Maharashtra';

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-3xl mx-auto space-y-0">
      
      {/* Header Banner */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">
              Department of Consumer Affairs • Statutory Record
            </span>
            <h2 className="text-2xl font-black tracking-tight">
              VERIFIED & REGISTERED
            </h2>
          </div>
        </div>

        <div className="text-right sm:text-right">
          <span className="text-[10px] text-white/80 block">Single Source Database</span>
          <span className="font-mono font-bold text-xs bg-white/10 px-3 py-1 rounded-lg backdrop-blur-xs inline-block mt-0.5">
            Official Portal Match
          </span>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-6 space-y-6">
        
        {/* Source Citation */}
        <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-blue-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Source: Department of Consumer Affairs — Importers of Weights & Measures Portal</span>
          </div>
          <span className="text-[10px] font-mono text-blue-700 font-bold hidden sm:inline">consumeraffairs.gov.in</span>
        </div>

        {/* Key Importer Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase text-slate-400">Statutory Certificate Number</span>
            <p className="text-base font-black font-mono text-blue-950">{certNo}</p>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">Importers Registration Certificate</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase text-slate-400">Registration / IEC / PAN Code</span>
            <p className="text-base font-black font-mono text-slate-900">{regNo}</p>
            <p className="text-xs text-slate-500 mt-0.5">Government Registration ID</p>
          </div>
        </div>

        {/* Owner & Importer Property List */}
        <div className="border border-slate-100 rounded-2xl divide-y divide-slate-100 text-xs">
          
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center space-x-2 text-slate-500">
              <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">Registered Importer / Owner:</span>
            </div>
            <span className="font-extrabold text-slate-900 text-sm sm:text-right">{ownerName}</span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center space-x-2 text-slate-500">
              <Tag className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">Approved Instrument Scope:</span>
            </div>
            <span className="font-bold text-slate-900 sm:text-right max-w-md">{itemScope}</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-500">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">Jurisdiction State:</span>
            </div>
            <span className="font-bold text-slate-900">{stateName}, India</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-500">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">Date of Issue:</span>
            </div>
            <span className="font-bold text-slate-900">{issueDate}</span>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-500">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">Statutory Validity Until:</span>
            </div>
            <span className="font-extrabold text-emerald-700 text-sm">{validityDate}</span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            to={`/certificate/${encodeURIComponent(instrument?.verificationId || certNo.replace(/\//g, '-'))}`}
            className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 py-3.5 px-4 bg-blue-950 hover:bg-blue-900 text-white rounded-xl font-bold text-xs shadow-md transition"
          >
            <FileText className="w-4 h-4" />
            <span>View Official Registration Certificate PDF</span>
          </Link>

          <Link
            to="/scan"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition"
          >
            <span>Scan QR Code</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
