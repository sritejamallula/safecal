import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import { apiService, extractCertificateId } from '../services/api';
import { Instrument } from '../types';
import { VerificationCard } from '../components/verification/VerificationCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Search, QrCode, ShieldCheck, Building2, Calendar } from 'lucide-react';

export const VerifyPage: React.FC = () => {
  const { verificationId } = useParams<{ verificationId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawQuery = verificationId || searchParams.get('id') || searchParams.get('cert') || searchParams.get('regNo') || 'IMP/MH/162/2026';
  const initialQuery = extractCertificateId(rawQuery) || rawQuery;

  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    found: boolean;
    instrument?: Instrument;
    errorType?: 'EXPIRED' | 'REJECTED' | 'NOT_FOUND' | 'PENDING';
    message?: string;
  } | null>(null);

  const performSearch = async (queryToSearch: string) => {
    const cleanQ = extractCertificateId(queryToSearch);
    if (!cleanQ) return;
    setLoading(true);
    setActiveQuery(cleanQ);

    try {
      const res = await apiService.verifyInstrumentOrCertificate(cleanQ);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult({
        found: false,
        errorType: 'NOT_FOUND',
        message: 'Unable to connect to verification service.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rawQ = verificationId || searchParams.get('id') || searchParams.get('cert') || searchParams.get('regNo') || 'IMP/MH/162/2026';
    const cleanQ = extractCertificateId(rawQ) || rawQ;
    setInputQuery(cleanQ);
    performSearch(cleanQ);
  }, [verificationId, searchParams]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQ = extractCertificateId(inputQuery);
    if (cleanQ) {
      navigate(`/verify/${encodeURIComponent(cleanQ.replace(/\//g, '-'))}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-950 text-xs font-bold border border-blue-300">
            <ShieldCheck className="w-4 h-4 text-blue-800" />
            <span>SafeCal • Legal Verification Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Legal Verification Search Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Search authentic statutory certificates and registered owner details across all years (2020–2026) issued by the Legal Metrology authority.
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xl space-y-4">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter Certificate No (e.g. IMP/MH/162/2026), IEC Code (0316936936), or Owner Name..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold font-mono text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white rounded-2xl text-sm font-bold shadow-md flex items-center justify-center space-x-2 transition shrink-0 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>Search Portal</span>
            </button>
          </form>

          {/* Authentic Portal Search Triggers (10+ Presets) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                <span>Statutory Importer Certificate Presets:</span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-mono">10+ Certificates</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => navigate('/verify/IMP-MH-162-2026')}
                className="px-2.5 py-1 bg-amber-50 text-amber-950 border border-amber-300 rounded-lg font-mono font-bold hover:bg-amber-100 transition"
              >
                IMP/MH/162/2026 (SUPREME INSTRUMENT)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-MH-161-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/MH/161/2026 (Industrial Electronic)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-MH-160-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/MH/160/2026 (UDEYRAJ ELECTRICALS)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-MH-159-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/MH/159/2026 (SENSUS METERING)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-MH-158-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/MH/158/2026 (AK TRADE SOLUTION)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-GJ-157-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/GJ/157/2026 (NATIONAL INSTRUMENTS)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-MH-156-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/MH/156/2026 (HAMILTON INSTRUMENTS)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-DL-155-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/DL/155/2026 (ARAGYA ENTERPRISES)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-DL-154-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/DL/154/2026 (MAHI TRADING)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-TN-153-2026')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                IMP/TN/153/2026 (BRONIK INSTRUMENTS)
              </button>

              <Link
                to="/scan"
                className="ml-auto inline-flex items-center space-x-1 text-blue-700 font-bold hover:text-blue-900"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Camera QR Scanner</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Results Render Area */}
        {loading ? (
          <LoadingSpinner label="Searching Department of Consumer Affairs Database..." />
        ) : result ? (
          <VerificationCard
            instrument={result.instrument}
            errorType={result.errorType}
            message={result.message}
            query={activeQuery}
          />
        ) : null}

      </div>
    </div>
  );
};
