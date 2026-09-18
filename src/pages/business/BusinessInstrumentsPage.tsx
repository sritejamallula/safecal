import React from 'react';
import { useData } from '../../context/DataContext';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Instrument } from '../../types';
import { Link } from 'react-router-dom';
import { PlusCircle, Award, Eye, ExternalLink } from 'lucide-react';

export const BusinessInstrumentsPage: React.FC = () => {
  const { instruments } = useData();

  const columns = [
    {
      header: 'Instrument ID',
      accessor: (item: Instrument) => (
        <div>
          <span className="font-mono font-extrabold text-blue-900">{item.id}</span>
          <span className="text-[10px] text-slate-400 block">SN: {item.serialNumber}</span>
        </div>
      ),
    },
    {
      header: 'Instrument Type',
      accessor: (item: Instrument) => (
        <div>
          <span className="font-bold text-slate-800">{item.type}</span>
          <span className="text-[10px] text-slate-500 block">{item.capacity}</span>
        </div>
      ),
    },
    {
      header: 'Make / Model',
      accessor: (item: Instrument) => (
        <span className="font-medium text-slate-700">{item.manufacturer} ({item.modelNumber})</span>
      ),
    },
    {
      header: 'Location',
      accessor: (item: Instrument) => (
        <span className="text-slate-600">{item.district}, AP</span>
      ),
    },
    {
      header: 'Last Verification',
      accessor: (item: Instrument) => (
        <span className="text-slate-600">{item.lastVerificationDate || 'N/A'}</span>
      ),
    },
    {
      header: 'Valid Until',
      accessor: (item: Instrument) => (
        <span className="font-bold text-slate-800">{item.validUntil || 'Pending'}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (item: Instrument) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: 'Actions',
      accessor: (item: Instrument) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/verify?id=${item.id}`}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center space-x-1 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Audit</span>
          </Link>

          {item.certificateNumber && (
            <Link
              to={`/certificate/${item.certificateNumber}`}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-[11px] flex items-center space-x-1 transition"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Cert</span>
            </Link>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Instruments Directory"
        subtitle="Complete statutory log of registered weighing and measuring devices"
        action={
          <Link
            to="/business/instruments/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register New Instrument</span>
          </Link>
        }
      />

      <DataTable
        data={instruments}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search by Instrument ID, Serial No, or Type..."
        searchFilterKey={(item) => `${item.id} ${item.type} ${item.serialNumber} ${item.manufacturer}`}
        filterOptions={[
          { label: 'Verified', value: 'VERIFIED', filterFn: (i) => i.status === 'VERIFIED' },
          { label: 'Pending', value: 'PENDING', filterFn: (i) => i.status === 'PENDING' },
          { label: 'Expired', value: 'EXPIRED', filterFn: (i) => i.status === 'EXPIRED' },
          { label: 'Rejected', value: 'REJECTED', filterFn: (i) => i.status === 'REJECTED' },
        ]}
      />
    </div>
  );
};
