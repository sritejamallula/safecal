import React from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Scale, CheckCircle2, Clock, AlertTriangle, PlusCircle, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BusinessDashboard: React.FC = () => {
  const { instruments, certificates } = useData();

  const total = instruments.length;
  const verified = instruments.filter(i => i.status === 'VERIFIED').length;
  const pending = instruments.filter(i => i.status === 'PENDING').length;
  const expiring = instruments.filter(i => i.status === 'EXPIRED').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Owner Dashboard"
        subtitle="Manage weighing and measuring instruments certified under Legal Metrology"
        action={
          <Link
            to="/business/instruments/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Instrument</span>
          </Link>
        }
      />

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Instruments"
          value={total}
          subtitle="Registered devices"
          icon={Scale}
          color="blue"
        />
        <StatCard
          title="Verified"
          value={verified}
          subtitle="Active certificates"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Inspection"
          value={pending}
          subtitle="Inspector assigned"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Expiring / Expired"
          value={expiring}
          subtitle="Action required"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Recent Instruments Overview */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Your Registered Instruments</h3>
            <p className="text-xs text-slate-500">Live calibration status and statutory validity</p>
          </div>
          <Link
            to="/business/instruments"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center space-x-1"
          >
            <span>View All ({total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {instruments.slice(0, 4).map((inst) => (
            <div key={inst.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 p-2 rounded-xl transition">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-900">{inst.id}</span>
                  <StatusBadge status={inst.status} size="sm" />
                </div>
                <p className="font-semibold text-slate-800 text-xs mt-0.5">{inst.type} • {inst.manufacturer} ({inst.capacity})</p>
                <p className="text-[11px] text-slate-500">Serial: {inst.serialNumber}</p>
              </div>

              <div className="flex items-center space-x-3 text-right">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">VALID UNTIL</span>
                  <span className="font-bold text-slate-900">{inst.validUntil || 'Pending Inspection'}</span>
                </div>

                {inst.certificateNumber && (
                  <Link
                    to={`/certificate/${inst.certificateNumber}`}
                    className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold transition"
                    title="View Certificate"
                  >
                    <Award className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
