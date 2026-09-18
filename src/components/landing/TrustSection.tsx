import React from 'react';
import { ShieldCheck, Award, Building2, ClipboardCheck } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      label: 'Instruments Verified',
      value: '48,520+',
      icon: ShieldCheck,
      desc: 'Active verified scales and meters',
    },
    {
      label: 'Active Certificates',
      value: '45,110+',
      icon: Award,
      desc: 'Digital statutory certificates issued',
    },
    {
      label: 'Registered Businesses',
      value: '12,850+',
      icon: Building2,
      desc: 'Establishments onboarded',
    },
    {
      label: 'Inspections Completed',
      value: '54,200+',
      icon: ClipboardCheck,
      desc: 'Calibrations & accuracy tests',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-2">
            Trust & Compliance Metrics
          </h2>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            Transparent. Verified. Digital.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Building consumer protection and statutory compliance through real-time verification technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:bg-blue-50/20 transition duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-800 mt-1">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
