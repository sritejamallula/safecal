import React from 'react';
import { ChecklistItem } from '../../types';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface InspectionChecklistProps {
  checklist: ChecklistItem[];
  onChange: (updated: ChecklistItem[]) => void;
}

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'CHK-1', label: 'Instrument physically available', description: 'Scale is present at declared business site.', passed: true },
  { id: 'CHK-2', label: 'Serial number matches records', description: 'Manufacturer serial plate corresponds to registration.', passed: true },
  { id: 'CHK-3', label: 'Physical seal intact', description: 'Security wire seal shows no signs of tampering.', passed: true },
  { id: 'CHK-4', label: 'Digital display functioning', description: 'LED/LCD segments illumination test passed.', passed: true },
  { id: 'CHK-5', label: 'Zero error checked', description: 'Scale returns to 0.000g accurately upon unloading.', passed: true },
  { id: 'CHK-6', label: 'Accuracy tested against standard weights', description: 'Calibrated weight standard accuracy verified.', passed: true },
  { id: 'CHK-7', label: 'Capacity verified', description: 'Maximum load test within rated capacity.', passed: true },
  { id: 'CHK-8', label: 'Required statutory markings present', description: 'Model approval number and accuracy class plate.', passed: true },
  { id: 'CHK-9', label: 'Previous certificate checked', description: 'Last verification certificate checked for continuity.', passed: true },
];

export const InspectionChecklist: React.FC<InspectionChecklistProps> = ({ checklist, onChange }) => {
  const handleToggle = (id: string) => {
    const updated = checklist.map(item => item.id === id ? { ...item, passed: !item.passed } : item);
    onChange(updated);
  };

  const passedCount = checklist.filter(c => c.passed).length;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">Physical Inspection Checklist</h3>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
          {passedCount} / {checklist.length} Passed
        </span>
      </div>

      <div className="divide-y divide-slate-100 text-xs">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className="py-3 flex items-start justify-between cursor-pointer hover:bg-slate-50/80 px-2 rounded-xl transition"
          >
            <div className="pr-4">
              <p className="font-extrabold text-slate-800">{item.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
            </div>

            <button
              type="button"
              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center space-x-1 shrink-0 transition ${
                item.passed
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {item.passed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pass</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Fail</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
