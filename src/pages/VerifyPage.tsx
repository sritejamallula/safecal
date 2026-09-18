import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Instrument } from '../types';
import { VerificationCard } from '../components/verification/VerificationCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Search, QrCode, ShieldCheck, Building2, Calendar } from 'lucide-react';

export const VerifyPage: React.FC = () => {
  const { verificationId } = useParams<{ verificationId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQuery = verificationId || searchParams.get('id') || searchParams.get('cert') || 'IMP/MH/162/2026';

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
    if (!queryToSearch.trim()) return;
    setLoading(true);
    setActiveQuery(queryToSearch);

    try {
      const res = await apiService.verifyInstrumentOrCertificate(queryToSearch);
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
    const q = verificationId || searchParams.get('id') || searchParams.get('cert') || 'IMP/MH/162/2026';
    setInputQuery(q);
    performSearch(q);
  }, [verificationId, searchParams]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      navigate(`/verify/${encodeURIComponent(inputQuery.trim().replace(/\//g, '-'))}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-950 text-xs font-bold border border-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            <span>Government of India • Department of Consumer Affairs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            National Legal Metrology Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Search authentic statutory certificates and registered owner details across all years (2020–2026) issued by the Directorate of Legal Metrology.
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

          {/* All-Years Real Search Triggers */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center text-xs text-slate-500 font-bold space-x-1">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              <span>Multi-Year Statutory Certificate Queries:</span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => navigate('/verify/IMP-MH-162-2026')}
                className="px-2.5 py-1 bg-amber-50 text-amber-950 border border-amber-300 rounded-lg font-mono font-bold hover:bg-amber-100 transition"
              >
                2026 • IMP/MH/162/2026 (SUPREME INSTRUMENT)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-GJ-130-2024')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                2024 • IMP/GJ/130/2024 (DBD WATER)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-WB-136-2023')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                2023 • IMP/WB/136/2023 (AQUANAUTS SEVEN)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-GJ-148-2022')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                2022 • IMP/GJ/148/2022 (HAMILTON INSTRUMENTS)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-TN-129-2021')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                2021 • IMP/TN/129/2021 (KANIMOZHI WEIGHING)
              </button>

              <button
                onClick={() => navigate('/verify/IMP-TS-124-2020')}
                className="px-2.5 py-1 bg-blue-50 text-blue-950 border border-blue-200 rounded-lg font-mono font-bold hover:bg-blue-100 transition"
              >
                2020 • IMP/TS/124/2020 (MARIAM ENTERPRISES)
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
