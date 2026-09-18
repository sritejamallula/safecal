import React from 'react';
import { Scale, Zap, Fuel, Gauge, ShoppingBag, Ruler } from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const categories = [
    {
      title: 'Electronic Weighing Machines',
      icon: Zap,
      desc: 'Digital retail counter scales, jewel scales, & platform scales.',
      standard: 'OIML R 76 / IS 9281',
    },
    {
      title: 'Fuel Dispensers',
      icon: Fuel,
      desc: 'Petrol & Diesel outlet dispensing pumps & totalizers.',
      standard: 'OIML R 117 / IS 14198',
    },
    {
      title: 'Retail Weighing Scales',
      icon: ShoppingBag,
      desc: 'Grocery, supermarket, vegetable & meat market scales.',
      standard: 'Class III & IIII accuracy',
    },
    {
      title: 'Measuring Meters',
      icon: Gauge,
      desc: 'Industrial water meters, flow meters & gas volume meters.',
      standard: 'OIML R 49 / IS 779',
    },
    {
      title: 'Heavy Industrial Weighbridges',
      icon: Scale,
      desc: 'Truck weighbridge scales, hopper scales & bulk weighers.',
      standard: 'Up to 100 Tonne capacity',
    },
    {
      title: 'Linear & Volume Measures',
      icon: Ruler,
      desc: 'Commercial measuring tapes, dipsticks & capacity measures.',
      standard: 'IS 1269 / Metrology Rules',
    },
  ];

  return (
    <section id="categories" className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-extrabold text-blue-700 uppercase tracking-widest mb-2">
            Coverage & Scope
          </h2>
          <p className="text-3xl font-black text-slate-900 tracking-tight">
            Supported Instrument Categories
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Verifying weighing and measuring devices regulated under Legal Metrology Act, 2009.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{cat.title}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">{cat.desc}</p>
                <span className="inline-block px-2.5 py-1 rounded bg-slate-200/70 text-slate-700 text-[10px] font-mono font-bold">
                  {cat.standard}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
