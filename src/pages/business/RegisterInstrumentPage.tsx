import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { InstrumentCategory } from '../../types';
import { Upload, PlusCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RegisterInstrumentPage: React.FC = () => {
  const { registerNewInstrument } = useData();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    type: 'Electronic Weighing Scale' as InstrumentCategory,
    manufacturer: 'Essae-Teraoka Ltd',
    modelNumber: 'DS-215-HL',
    serialNumber: `SN-${Math.floor(10000000 + Math.random() * 90000000)}`,
    capacity: '30 kg (Accuracy: 1g)',
    accuracyClass: 'Class III (Medium)' as any,
    businessName: 'ABC Retail Store',
    businessAddress: 'Plot 42, Main Road, Commercial Complex',
    district: 'Kakinada',
    state: 'Andhra Pradesh',
    installationDate: new Date().toISOString().split('T')[0],
    prevCertNo: 'CERT-2025-AP-000889',
    docUploaded: true,
    photoUploaded: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.manufacturer.trim()) errs.manufacturer = 'Manufacturer name is required.';
    if (!formData.modelNumber.trim()) errs.modelNumber = 'Model number is required.';
    if (!formData.serialNumber.trim()) errs.serialNumber = 'Serial number is required.';
    if (!formData.capacity.trim()) errs.capacity = 'Capacity specification is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const created = await registerNewInstrument(formData);
      navigate('/business/instruments');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="Register New Instrument"
        subtitle="Submit weighing or measuring instrument specs for official Legal Metrology verification"
      />

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          
          {/* Section 1: Instrument Classification */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-blue-600" /> 1. Instrument Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Instrument Category *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as InstrumentCategory })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Electronic Weighing Scale">Electronic Weighing Scale</option>
                  <option value="Counter Weighing Scale">Counter Weighing Scale</option>
                  <option value="Fuel Dispenser Meter">Fuel Dispenser Meter</option>
                  <option value="Water & Flow Meter">Water & Flow Meter</option>
                  <option value="Retail Weighing Instrument">Retail Weighing Instrument</option>
                  <option value="Heavy Industrial Scale">Heavy Industrial Scale</option>
                  <option value="Linear Measurement Tape / Ruler">Linear Measurement Tape / Ruler</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Accuracy Class *</label>
                <select
                  value={formData.accuracyClass}
                  onChange={(e) => setFormData({ ...formData, accuracyClass: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Class I (Special)">Class I (Special Accuracy)</option>
                  <option value="Class II (High)">Class II (High Accuracy)</option>
                  <option value="Class III (Medium)">Class III (Medium Accuracy)</option>
                  <option value="Class IIII (Ordinary)">Class IIII (Ordinary Accuracy)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Manufacturer *</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                {errors.manufacturer && <p className="text-rose-600 text-[10px] mt-0.5">{errors.manufacturer}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Model Number *</label>
                <input
                  type="text"
                  value={formData.modelNumber}
                  onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                {errors.modelNumber && <p className="text-rose-600 text-[10px] mt-0.5">{errors.modelNumber}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Serial Number *</label>
                <input
                  type="text"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold font-mono text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                {errors.serialNumber && <p className="text-rose-600 text-[10px] mt-0.5">{errors.serialNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Rated Capacity & Verification Scale Interval *</label>
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="e.g. 30 kg (Accuracy: 1g)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                {errors.capacity && <p className="text-rose-600 text-[10px] mt-0.5">{errors.capacity}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Installation Date</label>
                <input
                  type="date"
                  value={formData.installationDate}
                  onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Business & Premises */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
              2. Commercial Establishment Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Physical Installation Address</label>
              <input
                type="text"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 3: Document Uploads Simulation */}
          <div className="space-y-4 pt-2">
            <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
              3. Verification Documents & Photo Upload
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50/50 hover:bg-blue-50/20 transition">
                <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Invoice / Purchase Proof</span>
                <span className="text-[10px] text-slate-400 block mb-2">PDF, PNG, JPG (Max 5MB)</span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Purchase_Invoice_2026.pdf
                </span>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center bg-slate-50/50 hover:bg-blue-50/20 transition">
                <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Instrument Photo & Serial Plate</span>
                <span className="text-[10px] text-slate-400 block mb-2">High resolution scale image</span>
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Instrument_Plate_Photo.jpg
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/business/instruments')}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold shadow-md flex items-center space-x-1.5 transition disabled:opacity-50"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Submit for Verification'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
