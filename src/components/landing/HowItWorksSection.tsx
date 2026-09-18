import React from 'react';
import { Store, ClipboardCheck, Award, QrCode } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Register Instrument',
      description: 'Business owner registers weighing or measuring device specs, manufacturer model, and location details online.',
      icon: Store,
      color: 'border-blue-500 text-blue-600 bg-blue-50',
    },
    {
      step: '02',
      title: 'Official Inspection',
      description: 'Authorized Legal Metrology Inspector conducts physical inspection, seal verification, and standard weight calibration tests.',
      icon: ClipboardCheck,
      color: 'border-amber-500 text-amber-600 bg-amber-50',
    },
    {
      step: '03',
      title: 'Digital Verification',
      description: 'Upon passing accuracy standards, a digital verification certificate is generated with statutory validity dates.',
      icon: Award,
      color: 'border-emerald-500 text-emerald-600 bg-emerald-50',
    },
    {
      step: '04',
      title: 'QR-Based Verification',
      description: 'Tamper-evident QR code badge is attached to the scale. Consumers scan QR code to instantly verify authenticity.',
      icon: QrCode,
      color: 'border-indigo-500 text-indigo-600 bg-indigo-50',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-2">
            Simple 4-Step Process
          </h2>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            How Digital Verification Works
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Connecting merchants, certified inspectors, and consumers in a unified trust network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">{item.step}</span>
                    <div className={`p-3 rounded-xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
