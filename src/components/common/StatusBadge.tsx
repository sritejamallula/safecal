import React from 'react';
import { VerificationStatus } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: VerificationStatus | 'VALID' | 'Approved' | 'Draft';
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normStatus = status.toUpperCase();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm',
  };

  switch (normStatus) {
    case 'VERIFIED':
    case 'VALID':
    case 'APPROVED':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 ${sizeClasses[size]}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
          VERIFIED
        </span>
      );

    case 'PENDING':
    case 'DRAFT':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300/60 ${sizeClasses[size]}`}
        >
          <Clock className="w-3.5 h-3.5 mr-1 text-amber-600 shrink-0" />
          PENDING
        </span>
      );

    case 'EXPIRED':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-300/60 ${sizeClasses[size]}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600 shrink-0" />
          EXPIRED
        </span>
      );

    case 'REJECTED':
      return (
        <span
          className={`inline-flex items-center font-bold rounded-full bg-red-100 text-red-900 border border-red-300/60 ${sizeClasses[size]}`}
        >
          <XCircle className="w-3.5 h-3.5 mr-1 text-red-600 shrink-0" />
          REJECTED
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 ${sizeClasses[size]}`}>
          {status}
        </span>
      );
  }
};
