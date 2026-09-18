import React from 'react';
import { MeasurementTest } from '../../types';
import { Gauge, CheckCircle2, AlertTriangle } from 'lucide-react';

interface MeasurementTestFormProps {
  testData: MeasurementTest;
  onChange: (updated: MeasurementTest) => void;
}

export const MeasurementTestForm: React.FC<MeasurementTestFormProps> = ({ testData, onChange }) => {
  const handleStandardChange = (val: number) => {
    const std = val || 0;
    const obs = testData.observedWeight;
    const err = parseFloat((obs - std).toFixed(4));
    const errPct = std > 0 ? parseFloat(((err / std) * 100).toFixed(3)) : 0;
    const isPass = Math.abs(err) <= testData.maxPermissibleError;

    onChange({
      ...testData,
      standardWeight: std,
      errorValue: err,
      errorPercentage: errPct,
      passed: isPass,
    });
  };

  const handleObservedChange = (val: number) => {
    const obs = val || 0;
    const std = testData.standardWeight;
    const err = parseFloat((obs - std).toFixed(4));
    const errPct = std > 0 ? parseFloat(((err / std) * 100).toFixed(3)) : 0;
    const isPass = Math.abs(err) <= testData.maxPermissibleError;

    onChange({
      ...testData,
      observedWeight: obs,
      errorValue: err,
      errorPercentage: errPct,
      passed: isPass,
    });
  };

  const handleMpeChange = (val: number) => {
    const mpe = val || 0.005;
    const isPass = Math.abs(testData.errorValue) <= mpe;
    onChange({
      ...testData,
      maxPermissibleError: mpe,
      passed: isPass,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <Gauge className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">Standard Calibration Measurement Test</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-black flex items-center ${
            testData.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}
        >
          {testData.passed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              TOLERANCE PASSED
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-600" />
              OUT OF TOLERANCE
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Standard Weight (kg)</label>
          <input
            type="number"
            step="0.001"
            value={testData.standardWeight}
            onChange={(e) => handleStandardChange(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Observed Weight (kg)</label>
          <input
            type="number"
            step="0.001"
            value={testData.observedWeight}
            onChange={(e) => handleObservedChange(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Max Permissible Error MPE (±kg)</label>
          <input
            type="number"
            step="0.001"
            value={testData.maxPermissibleError}
            onChange={(e) => handleMpeChange(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Calculated Results Banner */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Calculated Error</span>
          <span className={`font-mono font-bold text-sm ${testData.errorValue === 0 ? 'text-slate-800' : testData.errorValue > 0 ? 'text-blue-700' : 'text-amber-700'}`}>
            {testData.errorValue > 0 ? `+${testData.errorValue}` : testData.errorValue} kg
          </span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Percentage Deviation</span>
          <span className="font-mono font-bold text-sm text-slate-900">
            {testData.errorPercentage}%
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Statutory Threshold</span>
          <span className="text-slate-700 font-semibold text-xs">
            ±{(testData.maxPermissibleError * 1000).toFixed(0)} grams tolerance
          </span>
        </div>
      </div>
    </div>
  );
};
