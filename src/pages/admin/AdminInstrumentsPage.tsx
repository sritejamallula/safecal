import React from 'react';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Instrument } from '../../types';
import { Eye, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminInstrumentsPage: React.FC = () => {
  const { instruments } = useData();

  const columns = [
    {
      header: 'Instrument ID',
      accessor: (item: Instrument) => (
        <span className="font-mono font-bold text-blue-900">{item.id}</span>
      ),
    },
    {
      header: 'Establishment Name',
      accessor: (item: Instrument) => (
        <div>
          <span className="font-bold text-slate-800">{item.businessName}</span>
          <span className="text-[10px] text-slate-500 block">{item.district}, AP</span>
        </div>
      ),
    },
    {
      header: 'Type & Capacity',
      accessor: (item: Instrument) => (
        <div>
          <span className="font-bold text-slate-800">{item.type}</span>
          <span className="text-[10px] text-slate-500 block">{item.capacity}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Inspector',
      accessor: (item: Instrument) => (
        <span className="text-slate-700">{item.inspectorName || 'Unassigned'}</span>
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
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] inline-flex items-center space-x-1 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Audit</span>
          </Link>
          {item.certificateNumber && (
            <Link
              to={`/certificate/${item.certificateNumber}`}
              className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-[11px] inline-flex items-center space-x-1 transition"
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
        title="Statewide Instrument Audit Directory"
        subtitle="Filter and monitor all weighing and measuring devices registered in Andhra Pradesh"
      />

      <DataTable
        data={instruments}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search by ID, business name, or category..."
        searchFilterKey={(item) => `${item.id} ${item.businessName} ${item.type} ${item.district}`}
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
