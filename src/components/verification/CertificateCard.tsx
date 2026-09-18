import React from 'react';
import { Instrument } from '../../types';
import { QRCodeCard } from '../common/QRCodeCard';
import { Printer, Download, Share2, ShieldCheck, Building2, Calendar, FileText } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CertificateCardProps {
  instrument: Instrument;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ instrument }) => {
  const { addToast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Importer Registration Certificate ${instrument.certificateNumber}`,
        text: `SafeCal Certificate of Registration for ${instrument.importerName || instrument.ownerName}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Certificate Link Copied',
        description: 'Certificate URL has been copied to your clipboard.'
      });
    }
  };

  const certNumber = instrument.certificateNumber || 'IMP/MH/162/2026';
  const regNo = instrument.registrationNo || '0316936936';
  const ownerName = instrument.importerName || instrument.ownerName || 'SUPREME INSTRUMENT TECHNOLOGY PRIVATE LIMITED';
  const itemScope = instrument.itemCategory || instrument.instrumentType || 'All types of weighing and measuring instruments';
  const issueDate = instrument.issueDateStr || (instrument.verificationDate ? new Date(instrument.verificationDate).toLocaleDateString('en-GB') : '16/09/2026');
  const validityDate = instrument.validityDateStr || (instrument.validUntil ? new Date(instrument.validUntil).toLocaleDateString('en-GB') : '15/09/2031');
  const stateName = instrument.state || 'Maharashtra';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900">SafeCal Statutory Registration Certificate</h3>
          <p className="text-xs text-slate-500">Legal Verification System</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Document Box */}
      <div
        id="printable-certificate"
        className="bg-white rounded-3xl border-4 border-blue-950 p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8"
      >
        {/* Decorative Inner Border Frame */}
        <div className="absolute inset-2 border border-blue-200 rounded-2xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center border-b border-slate-200 pb-6 space-y-2 relative z-10">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <div className="w-12 h-12 rounded-xl bg-blue-950 text-white flex items-center justify-center font-black text-2xl shadow-md">
              S
            </div>
          </div>

          <span className="text-sm font-black uppercase tracking-widest text-blue-950 block">
            SafeCal Legal Verification Portal
          </span>
          <span className="text-xs font-bold text-slate-600 block uppercase">
            Issued under Rule 27 of Legal Metrology (General) Rules & Statutory Regulations
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight pt-2">
            Certificate of Registration of Importers of Weights & Measures
          </h1>
        </div>

        {/* Certificate Identification Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50/70 p-4 rounded-2xl border border-blue-100 relative z-10">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-500">Certificate Registration Number</span>
            <p className="text-xl font-black font-mono text-blue-950">{certNumber}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-slate-500">Registration / IEC Code</span>
              <p className="text-sm font-mono font-black text-slate-900">{regNo}</p>
            </div>
            
            <div className="px-4 py-2 bg-emerald-600 text-white font-black text-xs rounded-xl flex items-center shadow-xs">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              VERIFIED
            </div>
          </div>
        </div>

        {/* Certificate Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 text-xs">
          
          <div className="md:col-span-8 space-y-5">
            
            {/* 1. Owner & Importer Details */}
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1 flex items-center">
                <Building2 className="w-4 h-4 mr-1.5 text-blue-800" />
                1. Details of Registered Owner / Importer Entity
              </h4>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Name of Registered Entity / Owner</span>
                  <span className="font-black text-slate-900 text-base block">{ownerName}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Registration / IEC Code</span>
                    <span className="font-bold text-slate-900 font-mono text-xs">{regNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Jurisdiction State</span>
                    <span className="font-bold text-slate-900 text-xs">{stateName}, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Scope of Importer Category */}
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-blue-800" />
                2. Scope of Weights & Measures Imported
              </h4>
              <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Approved Instrument Scope & Description</span>
                <p className="font-bold text-slate-900 text-sm leading-relaxed">
                  {itemScope}
                </p>
              </div>
            </div>

            {/* 3. Validity & Dates */}
            <div className="space-y-2">
              <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1 flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-blue-800" />
                3. Certificate Period of Validity
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Date of Registration</span>
                  <span className="font-bold text-slate-900 text-sm">{issueDate}</span>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-900 font-bold uppercase block">Statutory Valid Until</span>
                  <span className="font-black text-emerald-900 text-sm">{validityDate}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right QR Code & Signatures (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between items-center space-y-6 text-center border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
            
            <div className="space-y-2 w-full">
              <QRCodeCard value={instrument.verificationId || certNumber} size={150} label="Scan QR Seal to Verify" />
              <p className="text-[10px] text-slate-500 font-medium">Scan QR code seal to query the single source database record live on the SafeCal Portal.</p>
            </div>

            {/* Official Authority Signature Box */}
            <div className="w-full pt-4 border-t border-slate-200 space-y-1">
              <div className="h-10 flex items-center justify-center font-serif text-slate-800 text-lg italic font-bold">
                Controller of Legal Metrology
              </div>
              <p className="font-black text-slate-900 text-xs">Directorate of Legal Metrology</p>
              <p className="text-[10px] text-slate-600 font-semibold uppercase">SafeCal Verification Portal</p>
            </div>

          </div>

        </div>

        {/* Legal Disclaimer Footer */}
        <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2 relative z-10">
          <p className="flex items-center font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700 mr-1" />
            SafeCal digitally authenticated statutory registration certificate.
          </p>
          <span className="font-mono text-slate-500">http://localhost:3000/verify/{instrument.verificationId}</span>
        </div>

      </div>
    </div>
  );
};
