import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { InspectionChecklist, DEFAULT_CHECKLIST } from '../../components/inspector/InspectionChecklist';
import { MeasurementTestForm } from '../../components/inspector/MeasurementTestForm';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Instrument, ChecklistItem, MeasurementTest } from '../../types';
import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Save,
  ArrowRight,
  ArrowLeft,
  Upload,
  Gauge,
  ShieldCheck,
  Award
} from 'lucide-react';

export const InspectionWorkflowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { instruments, approveInspection, rejectInspection } = useData();
  const { userName } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [inst, setInst] = useState<Instrument | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);
  
  const [measurementTest, setMeasurementTest] = useState<MeasurementTest>({
    standardWeight: 10.000,
    observedWeight: 10.002,
    errorValue: 0.002,
    errorPercentage: 0.02,
    maxPermissibleError: 0.005,
    passed: true,
  });

  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const found = instruments.find(i => i.id === id);
      if (found) setInst(found);
    }
  }, [id, instruments]);

  if (!inst) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Instrument record not found.</p>
        <Link to="/inspector/inspections" className="text-blue-700 font-bold text-xs mt-2 inline-block">
          Return to Inspections List
        </Link>
      </div>
    );
  }

  const handleApprove = async () => {
    setSubmitting(true);
    try {
      const result = await approveInspection(inst.id, userName || 'Shri R. V. Rao');
      navigate(`/certificate/${result.certificate.certificateNumber}`);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please specify rejection rationale.');
      return;
    }
    setSubmitting(true);
    try {
      await rejectInspection(inst.id, rejectionReason);
      navigate('/inspector/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader
        title={`Inspection Workflow: ${inst.id}`}
        subtitle={`Legal Metrology Calibration & Seal Audit for ${inst.businessName}`}
        action={<StatusBadge status={inst.status} size="md" />}
      />

      {/* 5-Step Pipeline Navigation Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between text-xs overflow-x-auto gap-2">
        {[
          { step: 1, label: '1. Details' },
          { step: 2, label: '2. Physical Check' },
          { step: 3, label: '3. Accuracy Test' },
          { step: 4, label: '4. Evidence Upload' },
          { step: 5, label: '5. Final Decision' },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`px-3 py-2 rounded-xl font-extrabold transition shrink-0 flex items-center space-x-1.5 ${
              currentStep === s.step
                ? 'bg-blue-900 text-white shadow-xs'
                : currentStep > s.step
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: Instrument Details */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
            Step 1: Instrument & Business Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">INSTRUMENT ID</span>
              <span className="font-mono font-black text-sm text-slate-900">{inst.id}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">CATEGORY</span>
              <span className="font-bold text-slate-900 text-xs">{inst.type}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">MANUFACTURER & MODEL</span>
              <span className="font-bold text-slate-900">{inst.manufacturer} ({inst.modelNumber})</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 font-bold block">SERIAL NUMBER</span>
              <span className="font-mono font-bold text-slate-900">{inst.serialNumber}</span>
            </div>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 text-xs space-y-1">
            <p><span className="text-slate-500">Business Name:</span> <span className="font-bold text-slate-900">{inst.businessName}</span></p>
            <p><span className="text-slate-500">Address:</span> <span className="font-bold text-slate-900">{inst.businessAddress}, {inst.district}</span></p>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5"
            >
              <span>Next: Physical Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Physical Inspection */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <InspectionChecklist checklist={checklist} onChange={setChecklist} />
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5"
            >
              <span>Next: Accuracy Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Measurement Accuracy Test */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <MeasurementTestForm testData={measurementTest} onChange={setMeasurementTest} />

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5"
            >
              <span>Next: Upload Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Evidence Photo Upload */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
            Step 4: Inspection Photo Evidence
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
              <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block">Instrument Photo</span>
              <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                ✓ Scale_Front_Photo.jpg
              </span>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
              <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block">Holographic Seal Photo</span>
              <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                ✓ Seal_Wire_CloseUp.jpg
              </span>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50">
              <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <span className="font-bold text-slate-800 block">Test Calibration Photo</span>
              <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                ✓ Standard_Weight_Test.jpg
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-5 py-2.5 bg-blue-900 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5"
            >
              <span>Next: Final Decision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Approve / Reject Decision */}
      {currentStep === 5 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-2">
            Step 5: Official Statutory Decision
          </h3>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <p className="font-bold text-slate-800">Inspection Summary Audit:</p>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div>• Physical Checklist: <span className="font-bold text-emerald-700">9/9 Passed</span></div>
              <div>• Calibration Test: <span className="font-bold text-emerald-700">Tolerance OK ({measurementTest.errorValue}kg)</span></div>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1 text-xs">Rejection Rationale (Required only if rejecting)</label>
            <textarea
              rows={2}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Provide reason if instrument fails physical seal or accuracy standards..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/inspector/dashboard')}
              className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-100 transition"
            >
              Save as Draft
            </button>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReject}
                disabled={submitting}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-sm flex items-center justify-center space-x-1 transition"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Instrument</span>
              </button>

              <button
                type="button"
                onClick={handleApprove}
                disabled={submitting}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 transition"
              >
                <Award className="w-4 h-4" />
                <span>{submitting ? 'Issuing Certificate...' : 'Approve & Issue Digital Certificate'}</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
