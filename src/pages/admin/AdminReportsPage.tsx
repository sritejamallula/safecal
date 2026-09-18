import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { FileSpreadsheet, Download, Filter, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminReportsPage: React.FC = () => {
  const { addToast } = useToast();

  const handleExport = (reportName: string) => {
    addToast({
      type: 'success',
      title: 'Report Download Started',
      description: `Exporting statutory audit report: ${reportName}.csv`
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Reports & Audit Exports"
        subtitle="Generate monthly calibration audit logs and compliance metrics for Legal Metrology Department"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Verification Summary</h3>
              <p className="text-xs text-slate-500">District-wise breakdown of issued vs pending certificates</p>
            </div>
          </div>
          <button
            onClick={() => handleExport('Monthly_Verification_Summary_AP')}
            className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Audit Report</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Expired Instruments Compliance Report</h3>
              <p className="text-xs text-slate-500">List of establishments with overdue scale re-stampings</p>
            </div>
          </div>
          <button
            onClick={() => handleExport('Expired_Scales_Compliance_AP')}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export Overdue Audit List</span>
          </button>
        </div>

      </div>
    </div>
  );
};
