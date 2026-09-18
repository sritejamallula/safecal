import React from 'react';
import { useData } from '../../context/DataContext';
import { StatCard } from '../../components/common/StatCard';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/common/StatusBadge';
import { MOCK_BUSINESSES, MOCK_INSPECTORS } from '../../services/mockData';
import { Scale, CheckCircle2, Clock, AlertTriangle, Building2, Users, PieChart, BarChart3, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { instruments } = useData();

  const total = instruments.length;
  const verified = instruments.filter(i => i.status === 'VERIFIED').length;
  const pending = instruments.filter(i => i.status === 'PENDING').length;
  const expired = instruments.filter(i => i.status === 'EXPIRED').length;
  const businessesCount = MOCK_BUSINESSES.length;
  const inspectorsCount = MOCK_INSPECTORS.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Governance & Analytics Dashboard"
        subtitle="State-level monitoring of Legal Metrology verification, inspection performance, and statutory compliance"
      />

      {/* Top Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Registered Instruments"
          value={total}
          subtitle="Active statewide inventory"
          icon={Scale}
          color="blue"
        />
        <StatCard
          title="Verified Instruments"
          value={verified}
          subtitle="Valid certificates"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Pending Requests"
          value={pending}
          subtitle="Awaiting inspector review"
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Expired Certificates"
          value={expired}
          subtitle="Re-stamping overdue"
          icon={AlertTriangle}
          color="rose"
        />
        <StatCard
          title="Registered Businesses"
          value={businessesCount}
          subtitle="Commercial establishments"
          icon={Building2}
          color="indigo"
        />
        <StatCard
          title="Active Inspectors"
          value={inspectorsCount}
          subtitle="Field verification officers"
          icon={Users}
          color="blue"
        />
      </div>

      {/* Visual Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Verification Status Distribution (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900">Verification Status Distribution</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Statewide AP</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-800">Verified ({verified})</span>
                <span>{Math.round((verified / total) * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(verified / total) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-800">Pending Inspection ({pending})</span>
                <span>{Math.round((pending / total) * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(pending / total) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-rose-800">Expired ({expired})</span>
                <span>{Math.round((expired / total) * 100)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(expired / total) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-700" />
              <h3 className="text-sm font-bold text-slate-900">Instruments by Category</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Live Count</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Electronic Weighing Scale</span>
              <span className="font-bold text-blue-900">62%</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Fuel Dispenser Meter</span>
              <span className="font-bold text-blue-900">18%</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Heavy Industrial Scale</span>
              <span className="font-bold text-blue-900">12%</span>
            </div>
            <div className="flex justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Retail Weighing Instrument</span>
              <span className="font-bold text-blue-900">8%</span>
            </div>
          </div>
        </div>

      </div>

      {/* District-wise Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">District-wise Verification Breakdown</h3>
          </div>
          <Link to="/admin/reports" className="text-xs font-bold text-blue-700 hover:underline">
            Export Report
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                <th className="py-2.5 px-3">District</th>
                <th className="py-2.5 px-3">Total Devices</th>
                <th className="py-2.5 px-3">Verified</th>
                <th className="py-2.5 px-3">Pending</th>
                <th className="py-2.5 px-3">Compliance Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              <tr>
                <td className="py-3 px-3">Kakinada</td>
                <td className="py-3 px-3">12,450</td>
                <td className="py-3 px-3 text-emerald-700">11,890</td>
                <td className="py-3 px-3 text-amber-700">560</td>
                <td className="py-3 px-3 font-bold text-emerald-800">95.5%</td>
              </tr>
              <tr>
                <td className="py-3 px-3">Visakhapatnam</td>
                <td className="py-3 px-3">18,210</td>
                <td className="py-3 px-3 text-emerald-700">17,100</td>
                <td className="py-3 px-3 text-amber-700">1,110</td>
                <td className="py-3 px-3 font-bold text-emerald-800">93.9%</td>
              </tr>
              <tr>
                <td className="py-3 px-3">NTR Vijayawada</td>
                <td className="py-3 px-3">14,800</td>
                <td className="py-3 px-3 text-emerald-700">13,950</td>
                <td className="py-3 px-3 text-amber-700">850</td>
                <td className="py-3 px-3 font-bold text-emerald-800">94.2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
