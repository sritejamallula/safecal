import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface QRCodeCardProps {
  value: string; // e.g. LM-AP-DEMO-000001 or full URL http://localhost:3000/verify/LM-AP-DEMO-000001
  label?: string;
  size?: number;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({
  value,
  label = 'Official Verification QR Code',
  size = 160,
}) => {
  const [copied, setCopied] = useState(false);

  // Ensure target URL encodes ONLY the verification URL format
  const qrUrl = value.startsWith('http')
    ? value
    : `${window.location.origin}/verify/${encodeURIComponent(value)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col items-center text-center">
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-3 shadow-inner">
        <QRCodeSVG value={qrUrl} size={size} level="H" includeMargin={true} />
      </div>
      <p className="text-xs font-bold text-slate-900 tracking-tight">{label}</p>
      <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-[200px]">{qrUrl}</p>

      <div className="flex items-center space-x-2 mt-3 w-full">
        <button
          onClick={handleCopy}
          className="flex-1 inline-flex items-center justify-center space-x-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-[11px] font-semibold transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy URL'}</span>
        </button>
      </div>
    </div>
  );
};
