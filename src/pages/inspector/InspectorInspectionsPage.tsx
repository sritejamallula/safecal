import React from 'react';
import { useData } from '../../context/DataContext';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Instrument } from '../../types';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Play } from 'lucide-react';

export const InspectorInspectionsPage: React.FC = () => {
  const { instruments } = useData();

  const columns = [
    {
      header: 'Instrument ID',
      accessor: (item: Instrument) => (
        <span className="font-mono font-bold text-blue-900">{item.id}</span>
      ),
    },
    {
      header: 'Establishment / Owner',
      accessor: (item: Instrument) => (
        <div>
          <span className="font-bold text-slate-800">{item.businessName}</span>
          <span className="text-[10px] text-slate-500 block">{item.district}, AP</span>
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
      header: 'Make / Serial',
      accessor: (item: Instrument) => (
        <span className="text-slate-700">{item.manufacturer} ({item.serialNumber})</span>
      ),
    },
    {
      header: 'Status',
      accessor: (item: Instrument) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: 'Action',
      accessor: (item: Instrument) => (
        <Link
          to={`/inspector/inspections/${item.id}`}
          className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-[11px] rounded-lg inline-flex items-center space-x-1 shadow-xs transition"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Inspect</span>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Inspections List"
        subtitle="Perform physical verification, tolerance tests, and issue digital seals"
      />

      <DataTable
        data={instruments}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Search by ID, business name, or serial number..."
        searchFilterKey={(item) => `${item.id} ${item.businessName} ${item.type}`}
        filterOptions={[
          { label: 'Pending', value: 'PENDING', filterFn: (i) => i.status === 'PENDING' },
          { label: 'Verified', value: 'VERIFIED', filterFn: (i) => i.status === 'VERIFIED' },
          { label: 'Expired', value: 'EXPIRED', filterFn: (i) => i.status === 'EXPIRED' },
          { label: 'Rejected', value: 'REJECTED', filterFn: (i) => i.status === 'REJECTED' },
        ]}
      />
    </div>
  );
};
