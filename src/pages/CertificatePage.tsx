import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CertificateCard } from '../components/verification/CertificateCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorState } from '../components/common/ErrorState';
import { Instrument } from '../types';
import { fetchVerificationRecord } from '../services/api';
import { ArrowLeft } from 'lucide-react';

export const CertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inst, setInst] = useState<Instrument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchVerificationRecord(id)
        .then(record => {
          if (record) {
            setInst(record);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner label="Retrieving official statutory certificate record..." />;
  }

  if (!inst) {
    return (
      <div className="max-w-md mx-auto py-12 px-4">
        <ErrorState
          title="Certificate Record Not Found"
          message={`No statutory certificate found for query "${id}".`}
        />
        <div className="text-center mt-4">
          <Link to="/verify" className="text-xs font-bold text-blue-700 hover:underline">
            Return to Public Verification Portal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="no-print">
          <Link
            to="/verify"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Verification Portal</span>
          </Link>
        </div>

        <CertificateCard instrument={inst} />
      </div>
    </div>
  );
};
