import React from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ClipboardCheck, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InspectorDashboard: React.FC = () => {
  const { instruments } = useData();

  const assigned = instruments.length;
  const completed = instruments.filter(i => i.status === 'VERIFIED').length;
  const pending = instruments.filter(i => i.status === 'PENDING').length;
  const rejected = instruments.filter(i => i.status === 'REJECTED').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inspector Verification Dashboard"
        subtitle="Legal Metrology Inspection & Statutory Calibration Portal (Andhra Pradesh)"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Inspections"
          value={assigned}
          subtitle="Total queue"
          icon={ClipboardCheck}
          color="blue"
        />
        <StatCard
          title="Completed / Verified"
          value={completed}
          subtitle="Certificates issued"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Reviews"
          value={pending}
          subtitle="Awaiting calibration"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Rejected / Non-Compliant"
          value={rejected}
          subtitle="Failed tolerance"
          icon={XCircle}
          color="rose"
        />
      </div>

      {/* Assigned Tasks Queue */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Pending Inspection Queue</h3>
            <p className="text-xs text-slate-500">Instruments awaiting physical verification & seal calibration</p>
          </div>
          <Link
            to="/inspector/inspections"
            className="text-xs font-bold text-blue-700 hover:underline flex items-center space-x-1"
          >
            <span>View Full Queue ({pending})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {instruments.map((inst) => (
            <div key={inst.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-xl transition">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-blue-900">{inst.id}</span>
                  <StatusBadge status={inst.status} size="sm" />
                </div>
                <p className="font-semibold text-slate-800 mt-0.5">{inst.type} • {inst.businessName}</p>
                <p className="text-[11px] text-slate-500">Location: {inst.district}, AP</p>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  to={`/inspector/inspections/${inst.id}`}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-xs shadow-xs transition"
                >
                  Conduct Inspection Workflow →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
